import type { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export class PropertiesController {
  static async getProperties(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      
      if (!brokerId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const properties = await prisma.property.findMany({
        where: { brokerId },
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({ success: true, data: properties });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createProperty(req: AuthRequest, res: Response) {
    try {
      const brokerId = req.user?.id;
      if (!brokerId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const { title, description, type, price, area, bedrooms, bathrooms, parkingSpots, address, city, state, zipCode, features } = req.body;

      const newProperty = await prisma.property.create({
        data: {
          title,
          description,
          type,
          price,
          area,
          bedrooms,
          bathrooms,
          parkingSpots,
          address,
          city,
          state,
          zipCode,
          features,
          brokerId
        }
      });

      res.status(201).json({ success: true, data: newProperty });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getPublicProperties(req: Request, res: Response) {
    try {
      const properties = await prisma.property.findMany({
        where: { status: 'AVAILABLE' },
        include: {
          broker: {
            select: {
              name: true,
              email: true,
              phone: true,
              avatarUrl: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({ success: true, data: properties });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
