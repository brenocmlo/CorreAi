import type { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import mongoose from 'mongoose';
import { ChatInteraction } from '../models/ChatInteraction.js';
import { inMemoryStore } from './chat.controller.js';

export class LeadsController {
  static async getLeads(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      
      if (!brokerId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      
      const leads = await prisma.lead.findMany({
        where: { brokerId },
        orderBy: { updatedAt: 'desc' }
      });

      res.status(200).json({ success: true, data: leads });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createLead(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      if (!brokerId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const { name, email, phone, budgetMin, budgetMax, locationInterest, propertyTypePref } = req.body;

      const newLead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          budgetMin,
          budgetMax,
          locationInterest,
          propertyTypePref,
          brokerId
        }
      });

      res.status(201).json({ success: true, data: newLead });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateLead(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      // CORREÇÃO: Forçando o TypeScript a tratar o parâmetro de rota 'id' como string
      const id = req.params.id as string;
      const data = req.body;

      if (!brokerId) return res.status(401).json({ success: false, message: 'Unauthorized' });
      if (!id) return res.status(400).json({ success: false, message: 'Lead ID is required' });

      const lead = await prisma.lead.update({
        where: { id, brokerId },
        data
      });

      res.status(200).json({ success: true, data: lead });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteLead(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      // CORREÇÃO: Forçando o TypeScript a tratar o parâmetro de rota 'id' como string
      const id = req.params.id as string;

      if (!brokerId) return res.status(401).json({ success: false, message: 'Unauthorized' });
      if (!id) return res.status(400).json({ success: false, message: 'Lead ID is required' });

      await prisma.lead.delete({
        where: { id, brokerId }
      });

      res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async createPublicLead(req: Request, res: Response) {
    try {
      const { name, email, phone, budgetMin, budgetMax, locationInterest, propertyTypePref, brokerId, chatHistory } = req.body;

      let assignedBrokerId = brokerId;

      if (!assignedBrokerId) {
        const latestBroker = await prisma.broker.findFirst({
          orderBy: { createdAt: 'desc' }
        });
        if (!latestBroker) {
          return res.status(400).json({ success: false, message: 'Nenhum corretor cadastrado no sistema para receber o lead.' });
        }
        assignedBrokerId = latestBroker.id;
      }

      const newLead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          budgetMin: budgetMin ? Number(budgetMin) : null,
          budgetMax: budgetMax ? Number(budgetMax) : null,
          locationInterest,
          propertyTypePref: propertyTypePref || [],
          brokerId: assignedBrokerId
        }
      });

      if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
        const mappedMessages = chatHistory.map((msg: any) => ({
          role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: msg.text,
          timestamp: new Date()
        }));

        const isMongoConnected = mongoose.connection.readyState === 1;
        if (isMongoConnected) {
          await ChatInteraction.create({
            leadId: newLead.id,
            brokerId: assignedBrokerId,
            channel: 'web',
            messages: mappedMessages,
            status: 'active'
          });
        } else {
          inMemoryStore[newLead.id] = {
            leadId: newLead.id,
            brokerId: assignedBrokerId,
            channel: 'web',
            messages: mappedMessages,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
            save: async function() {
              this.updatedAt = new Date();
              inMemoryStore[newLead.id] = this;
            }
          };
        }
      }

      res.status(201).json({ success: true, data: newLead });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
