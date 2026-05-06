import { Request, Response } from 'express';
import { ChatInteraction } from '../models/ChatInteraction';

export class ChatController {
  static async receiveMessage(req: Request, res: Response) {
    try {
      // In a real scenario, this might come from WhatsApp Webhook or Web Chat
      const { leadId, brokerId, message, channel } = req.body;

      if (!leadId || !brokerId || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Find active session or create new one
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

      // Append user message
      interaction.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      // MOCK AI RESPONSE
      // In production, you would call OpenAI/Anthropic API here
      const mockAiResponse = `Recebi a sua mensagem: "${message}". Sou o assistente CorretAI e em breve poderei ajudá-lo com recomendações de imóveis perfeitos para si!`;
      
      interaction.messages.push({
        role: 'assistant',
        content: mockAiResponse,
        timestamp: new Date()
      });

      await interaction.save();

      res.status(200).json({ 
        success: true, 
        reply: mockAiResponse,
        interactionId: interaction._id
      });

    } catch (error: any) {
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
