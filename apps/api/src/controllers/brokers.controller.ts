import type { Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export class BrokersController {
  static async getBrokers(req: AuthRequest, res: Response) {
    try {
      const brokers = await prisma.broker.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          document: true,
          license: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              leads: true,
              properties: true,
            }
          }
        },
        orderBy: { name: 'asc' }
      });

      const formattedBrokers = brokers.map(broker => ({
        id: broker.id,
        name: broker.name,
        email: broker.email,
        phone: broker.phone,
        document: broker.document,
        license: broker.license || 'N/A',
        avatarUrl: broker.avatarUrl,
        leads: broker._count.leads,
        properties: broker._count.properties,
        status: 'Ativo',
        createdAt: broker.createdAt,
        updatedAt: broker.updatedAt
      }));

      res.status(200).json({ success: true, data: formattedBrokers });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getBrokerById(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      
      const broker = await prisma.broker.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          document: true,
          license: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              leads: true,
              properties: true,
            }
          }
        }
      });

      if (!broker) {
        return res.status(404).json({ success: false, message: 'Corretor não encontrado.' });
      }

      const formattedBroker = {
        id: broker.id,
        name: broker.name,
        email: broker.email,
        phone: broker.phone,
        document: broker.document,
        license: broker.license || '',
        avatarUrl: broker.avatarUrl,
        leads: broker._count.leads,
        properties: broker._count.properties,
        status: 'Ativo',
        createdAt: broker.createdAt,
        updatedAt: broker.updatedAt
      };

      res.status(200).json({ success: true, data: formattedBroker });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createBroker(req: AuthRequest, res: Response) {
    try {
      const { name, email, phone, document, license, password } = req.body;

      if (!name || !email || !document) {
        return res.status(400).json({ success: false, message: 'Nome, e-mail e documento (CPF) são obrigatórios.' });
      }

      // Check duplicate email or document
      const existing = await prisma.broker.findFirst({
        where: {
          OR: [
            { email },
            { document }
          ]
        }
      });

      if (existing) {
        return res.status(400).json({ 
          success: false, 
          message: 'Já existe um corretor cadastrado com este e-mail ou documento (CPF).' 
        });
      }

      const passwordHash = await bcrypt.hash(password || 'corretor123', SALT_ROUNDS);

      const newBroker = await prisma.broker.create({
        data: {
          name,
          email,
          phone: phone || '',
          document,
          license: license || null,
          passwordHash
        }
      });

      res.status(201).json({ 
        success: true, 
        data: {
          id: newBroker.id,
          name: newBroker.name,
          email: newBroker.email,
          phone: newBroker.phone,
          document: newBroker.document,
          license: newBroker.license || ''
        } 
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateBroker(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      const { name, email, phone, document, license, password } = req.body;

      const broker = await prisma.broker.findUnique({
        where: { id }
      });

      if (!broker) {
        return res.status(404).json({ success: false, message: 'Corretor não encontrado.' });
      }

      // Check duplicates for email/document if they are being updated
      if (email !== broker.email || document !== broker.document) {
        const existing = await prisma.broker.findFirst({
          where: {
            id: { not: id },
            OR: [
              ...(email !== broker.email ? [{ email }] : []),
              ...(document !== broker.document ? [{ document }] : [])
            ]
          }
        });

        if (existing) {
          return res.status(400).json({ 
            success: false, 
            message: 'Já existe outro corretor cadastrado com este e-mail ou documento (CPF).' 
          });
        }
      }

      const updateData: any = {
        name,
        email,
        phone: phone || '',
        document,
        license: license || null
      };

      if (password) {
        updateData.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      }

      const updatedBroker = await prisma.broker.update({
        where: { id },
        data: updateData
      });

      res.status(200).json({ 
        success: true, 
        data: {
          id: updatedBroker.id,
          name: updatedBroker.name,
          email: updatedBroker.email,
          phone: updatedBroker.phone,
          document: updatedBroker.document,
          license: updatedBroker.license || ''
        } 
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteBroker(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;

      const broker = await prisma.broker.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              leads: true,
              properties: true
            }
          }
        }
      });

      if (!broker) {
        return res.status(404).json({ success: false, message: 'Corretor não encontrado.' });
      }

      if (broker._count.leads > 0 || broker._count.properties > 0) {
        return res.status(400).json({
          success: false,
          message: 'Não é possível excluir este corretor pois ele possui leads ou imóveis vinculados. Reatribua-os antes de realizar a exclusão.'
        });
      }

      await prisma.broker.delete({
        where: { id }
      });

      res.status(200).json({ success: true, message: 'Corretor excluído com sucesso.' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
