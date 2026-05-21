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

    const broker = await prisma.broker.findUnique({
      where: { email }
    });

    if (!broker) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, broker.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
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
