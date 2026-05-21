import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export class AuthService {
  static async register(data: any) {
    const { name, email, password, phone, document, license } = data;

    const existingBroker = await prisma.broker.findFirst({
      where: {
        OR: [
          { email },
          { document }
        ]
      }
    });

    if (existingBroker) {
      throw new Error('Broker with this email or document already exists');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newBroker = await prisma.broker.create({
      data: {
        name,
        email,
        phone,
        document,
        license,
        passwordHash,
      }
    });

    const token = this.generateToken(newBroker.id);

    return {
      broker: {
        id: newBroker.id,
        name: newBroker.name,
        email: newBroker.email,
      },
      token
    };
  }

  static async login(data: any) {
    const { email, password } = data;

    // Support for temporary and admin credentials
    const isTempUser = email === 'corretor123' && password === 'corretor123';
    const isAdmin = email === 'admin' && password === 'admin';
    
    let broker;
    if (isAdmin) {
      broker = await prisma.broker.findUnique({
        where: { email: 'admin@correai.com' }
      });

      if (!broker) {
        const passwordHash = await bcrypt.hash('admin', SALT_ROUNDS);
        broker = await prisma.broker.create({
          data: {
            name: 'Administrador Global',
            email: 'admin@correai.com',
            passwordHash,
            phone: '999999999',
            document: 'ADMIN001',
          }
        });
      }
    } else if (isTempUser) {
      broker = await prisma.broker.findUnique({
        where: { email: 'corretor123@correai.com' }
      });

      if (!broker) {
        // Create temporary user if not exists
        const passwordHash = await bcrypt.hash('corretor123', SALT_ROUNDS);
        broker = await prisma.broker.create({
          data: {
            name: 'Corretor Temporário',
            email: 'corretor123@correai.com',
            passwordHash,
            phone: '000000000',
            document: 'TEMP123',
          }
        });
      }
    } else {
      broker = await prisma.broker.findUnique({
        where: { email }
      });

      if (!broker) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, broker.passwordHash);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }
    }

    const token = this.generateToken(broker.id);

    return {
      broker: {
        id: broker.id,
        name: broker.name,
        email: broker.email,
        avatarUrl: broker.avatarUrl
      },
      token
    };
  }

  private static generateToken(brokerId: string) {
    return jwt.sign({ id: brokerId }, JWT_SECRET, { expiresIn: '7d' });
  }
}
