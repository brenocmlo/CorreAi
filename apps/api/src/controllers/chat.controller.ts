import type { Request, Response } from 'express';
import { ChatInteraction } from '../models/ChatInteraction.js';
import { prisma } from '../utils/prisma.js';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export class ChatController {
  static async receiveMessage(req: Request, res: Response) {
    try {
      const { leadId, brokerId, message, channel } = req.body;

      if (!leadId || !brokerId || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // 1. Fetch lead details from Prisma
      const lead = await prisma.lead.findUnique({
        where: { id: leadId }
      });
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }

      // 2. Fetch broker details from Prisma
      const broker = await prisma.broker.findUnique({
        where: { id: brokerId }
      });
      if (!broker) {
        return res.status(404).json({ success: false, message: 'Broker not found' });
      }

      // 3. Fetch available properties for the broker from Prisma
      const properties = await prisma.property.findMany({
        where: {
          brokerId: brokerId,
          status: 'AVAILABLE'
        }
      });

      // 4. Format contexts
      const leadContext = `
Lead:
- Nome: ${lead.name}
- Email: ${lead.email || 'Não informado'}
- Telefone: ${lead.phone}
- Localização de Interesse: ${lead.locationInterest || 'Não informado'}
- Tipos de Imóvel Preferidos: ${lead.propertyTypePref.join(', ') || 'Não informado'}
- Orçamento: ${lead.budgetMin ? `Mínimo R$ ${lead.budgetMin.toString()}` : ''} ${lead.budgetMax ? `Máximo R$ ${lead.budgetMax.toString()}` : ''}
`;

      const brokerContext = `
Corretor:
- Nome: ${broker.name}
- Email: ${broker.email}
- Telefone: ${broker.phone}
`;

      const propertiesContext = properties.length > 0 
        ? properties.map(p => `- ID: ${p.id}\n  Título: ${p.title}\n  Tipo: ${p.type}\n  Preço: R$ ${p.price.toString()}\n  Área: ${p.area}m²\n  Quartos: ${p.bedrooms}, Banheiros: ${p.bathrooms}, Vagas: ${p.parkingSpots}\n  Endereço: ${p.address}, ${p.city} - ${p.state}\n  Características: ${p.features.join(', ')}\n  Descrição: ${p.description}`).join('\n\n')
        : 'Nenhum imóvel disponível cadastrado para este corretor.';

      // 5. Construct System Instruction
      const systemInstruction = `Você é o CorretAI, um assistente virtual inteligente e amigável da imobiliária CorreAi. Seu trabalho é conversar com o cliente (lead) para entender melhor suas necessidades e apresentar imóveis ideais.

Você está conversando com o lead abaixo:
${leadContext}

Você atua como o assistente virtual do corretor responsável por este lead:
${brokerContext}

Aqui está a lista de imóveis reais disponíveis para este corretor. VOCÊ SÓ PODE SUGERIR IMÓVEIS DESTA LISTA. Não invente imóveis ou características:
${propertiesContext}

Diretrizes de Conversação:
1. Seja sempre prestativo, profissional e cordial. Trate o lead pelo nome: ${lead.name}.
2. Identifique-se como o assistente virtual CorretAI do corretor ${broker.name}.
3. Tente fazer o match de imóveis da lista acima que batam com as preferências do lead (tipo de imóvel, localização e orçamento).
4. Se o lead se interessar ou pedir mais detalhes, apresente as qualidades do imóvel da lista (preço, quartos, localização) de forma persuasiva.
5. Incentive o lead a agendar uma visita física ou falar diretamente com o corretor ${broker.name} no número ${broker.phone} para dar continuidade.
6. Responda em português de forma concisa e natural. Evite respostas excessivamente longas.
`;

      // 6. Manage chat interaction in MongoDB
      let interaction = await ChatInteraction.findOne({ leadId, status: 'active' });

      if (!interaction) {
        interaction = new ChatInteraction({
          leadId,
          brokerId,
          channel: channel || 'web',
          messages: [],
          context: {}
        });
      }

      // Add user message to history
      interaction.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      // Prepare history for Gemini API
      const contents = interaction.messages
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

      // 7. Call Gemini AI or Fallback
      let aiResponseText = '';
      if (!ai) {
        console.warn('⚠️ GEMINI_API_KEY is not defined in the environment. Falling back to mock response.');
        aiResponseText = `Olá ${lead.name}! Recebi a sua mensagem: "${message}". Sou o assistente virtual CorretAI do corretor ${broker.name}. No momento, a integração com o Gemini AI está aguardando a configuração da chave de API (GEMINI_API_KEY). Assim que estiver pronta, poderei recomendar imóveis perfeitos para si!`;
      } else {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            }
          });
          aiResponseText = response.text || 'Desculpe, não consegui formular uma resposta no momento.';
        } catch (apiError: any) {
          console.error('Error calling Gemini API:', apiError);
          aiResponseText = `Olá ${lead.name}, peço desculpas, mas encontrei um problema temporário ao processar sua mensagem. Por favor, tente novamente ou fale com o corretor ${broker.name} pelo telefone ${broker.phone}.`;
        }
      }

      // Add assistant response to history
      interaction.messages.push({
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date()
      });

      // Save to MongoDB
      await interaction.save();

      res.status(200).json({ 
        success: true, 
        reply: aiResponseText,
        interactionId: interaction._id
      });

    } catch (error: any) {
      console.error('Error in receiveMessage:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getHistory(req: Request, res: Response) {
    try {
      const { leadId } = req.params;
      const history = await ChatInteraction.find({ leadId }).sort({ createdAt: -1 });
      
      res.status(200).json({ success: true, data: history });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
