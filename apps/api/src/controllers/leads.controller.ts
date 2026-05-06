import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export class LeadsController {
  static async getLeads(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      
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
}
