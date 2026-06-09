import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ChatInteraction } from '../models/ChatInteraction.js';
import { prisma } from '../utils/prisma.js';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Fallback in-memory store if MongoDB is not connected
export const inMemoryStore: Record<string, any> = {};

const getSimulatedHistory = (lead: any, broker: any) => {
  return [
    {
      _id: 'sim_' + lead.id,
      leadId: lead.id,
      brokerId: lead.brokerId,
      channel: 'web',
      status: 'active',
      createdAt: new Date(Date.now() - 3600000 * 2),
      updatedAt: new Date(Date.now() - 3600000 * 2),
      messages: [
        {
          role: 'assistant',
          content: `Olá ${lead.name}! Sou o CorretAI, assistente virtual do corretor ${broker?.name || 'seu corretor'}. Vi que você está interessado em imóveis na região de ${lead.locationInterest || 'São Paulo'}. Como posso te ajudar hoje?`,
          timestamp: new Date(Date.now() - 3600000 * 2)
        },
        {
          role: 'user',
          content: `Olá! Estou procurando um imóvel com orçamento de aproximadamente R$ ${lead.budgetMax ? Number(lead.budgetMax).toLocaleString('pt-BR') : '800.000'}. Gostaria de saber quais opções você tem nessa faixa.`,
          timestamp: new Date(Date.now() - 3600000 * 2 + 120000)
        },
        {
          role: 'assistant',
          content: `Excelente! Com esse orçamento, temos ótimas opções disponíveis. Por exemplo, temos imóveis muito interessantes em ${lead.locationInterest || 'regiões excelentes'}. Você prefere apartamento ou casa?`,
          timestamp: new Date(Date.now() - 3600000 * 2 + 240000)
        },
        {
          role: 'user',
          content: `Prefiro um apartamento, se possível com pelo menos 2 quartos e vaga de garagem.`,
          timestamp: new Date(Date.now() - 3600000 * 2 + 360000)
        },
        {
          role: 'assistant',
          content: `Perfeito. Já selecionei opções que se encaixam exatamente nas suas preferências. Se quiser agendar uma visita para ver os detalhes de perto, posso falar com o corretor ${broker?.name || 'responsável'} para reservarmos um horário para você!`,
          timestamp: new Date(Date.now() - 3600000 * 2 + 480000)
        }
      ]
    }
  ];
};

export class ChatController {
  // ... (ReceiveMessage e outros permanecem acima)
  static async receiveMessage(req: Request, res: Response) {
    // Mantendo a implementação existente de receiveMessage intacta
    try {
      const { leadId, brokerId, message, channel } = req.body;
      if (!leadId || !brokerId || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      const lead = await prisma.lead.findUnique({ where: { id: leadId } });
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      const broker = await prisma.broker.findUnique({ where: { id: brokerId } });
      if (!broker) return res.status(404).json({ success: false, message: 'Broker not found' });
      const properties = await prisma.property.findMany({ where: { brokerId, status: 'AVAILABLE' } });

      const leadContext = `Lead:\n- Nome: ${lead.name}\n- Email: ${lead.email || 'Não informado'}\n- Telefone: ${lead.phone}\n- Localização de Interesse: ${lead.locationInterest || 'Não informado'}\n- Tipos de Imóvel Preferidos: ${lead.propertyTypePref.join(', ') || 'Não informado'}\n- Orçamento: ${lead.budgetMin ? `Mínimo R$ ${lead.budgetMin.toString()}` : ''} ${lead.budgetMax ? `Máximo R$ ${lead.budgetMax.toString()}` : ''}`;
      const brokerContext = `Corretor:\n- Nome: ${broker.name}\n- Email: ${broker.email}\n- Telefone: ${broker.phone}`;
      const propertiesContext = properties.length > 0 ? properties.map((p: any) => `- ID: ${p.id}\n  Título: ${p.title}\n  Tipo: ${p.type}\n  Preço: R$ ${p.price.toString()}\n  Área: ${p.area}m²\n  Quartos: ${p.bedrooms}, Banheiros: ${p.bathrooms}, Vagas: ${p.parkingSpots}\n  Endereço: ${p.address}, ${p.city} - ${p.state}\n  Características: ${p.features.join(', ')}\n  Descrição: ${p.description}`).join('\n\n') : 'Nenhum imóvel disponível cadastrado para este corretor.';

      const systemInstruction = `Você é o CorretAI, um assistente virtual inteligente e amigável da imobiliária CorreAi. Seu trabalho é conversar com o cliente (lead) para entender melhor suas necessidades e apresentar imóveis ideais.\n\nVocê está conversando com o lead abaixo:\n${leadContext}\n\nVocê atua como o assistente virtual do corretor responsável por este lead:\n${brokerContext}\n\nAqui está a lista de imóveis reais disponíveis para este corretor. VOCÊ SÓ PODE SUGERIR IMÓVEIS DESTA LISTA. Não invente imóveis ou características:\n${propertiesContext}\n\nDiretrizes de Conversação:\n1. Seja sempre prestativo, profissional e cordial. Trate o lead pelo nome: ${lead.name}.\n2. Identifique-se como o assistente virtual CorretAI do corretor ${broker.name}.\n3. Tente fazer o match de imóveis da lista acima que batam com as preferências do lead (tipo de imóvel, localização e orçamento).\n4. Se o lead se interessar ou pedir mais detalhes, apresente as qualidades do imóvel da lista (preço, quartos, localização) de forma persuasiva.\n5. Incentive o lead a agendar uma visita física ou falar diretamente com o corretor ${broker.name} no número ${broker.phone} para dar continuidade.\n6. Responda em português de forma concisa e natural. Evite respostas excessivamente longas.`;

      const isMongoConnected = mongoose.connection.readyState === 1;
      let interaction: any = null;

      if (isMongoConnected) {
        interaction = await ChatInteraction.findOne({ leadId, status: 'active' });
      } else {
        interaction = inMemoryStore[leadId];
      }

      if (!interaction) {
        const initData = {
          leadId,
          brokerId,
          channel: channel || 'web',
          messages: [],
          context: {},
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        if (isMongoConnected) {
          interaction = new ChatInteraction(initData);
        } else {
          interaction = {
            ...initData,
            _id: `mem_${Date.now()}`,
            save: async function() {
              this.updatedAt = new Date();
              inMemoryStore[leadId] = this;
            }
          };
        }
      }

      interaction.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      const contents = interaction.messages
        .filter((msg: any) => msg.role === 'user' || msg.role === 'assistant')
        .map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

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

      interaction.messages.push({
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date()
      });

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
      const leadId = req.params.leadId as string;
      const isMongoConnected = mongoose.connection.readyState === 1;
      let history: any[] = [];

      if (isMongoConnected) {
        history = await ChatInteraction.find({ leadId }).sort({ createdAt: -1 });
      } else {
        const item = inMemoryStore[leadId];
        history = item ? [item] : [];
      }

      if (history.length === 0) {
        const lead = await prisma.lead.findUnique({ where: { id: leadId } });
        if (lead) {
          const broker = await prisma.broker.findUnique({ where: { id: lead.brokerId } });
          const simHistory = getSimulatedHistory(lead, broker);
          history = simHistory;
          
          if (!isMongoConnected) {
            inMemoryStore[leadId] = {
              leadId: lead.id,
              brokerId: lead.brokerId,
              channel: 'web',
              status: 'active',
              createdAt: new Date(),
              updatedAt: new Date(),
              messages: simHistory[0].messages,
              save: async function() {
                this.updatedAt = new Date();
                inMemoryStore[leadId] = this;
              }
            };
          }
        }
      }
      
      res.status(200).json({ success: true, data: history });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
