import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface IChatInteraction extends Document {
  leadId: string;       // Foreign key to PostgreSQL Lead UUID
  brokerId: string;     // Foreign key to PostgreSQL Broker UUID
  channel: 'whatsapp' | 'web' | 'mobile';
  messages: IMessage[];
  context: {
    lastPropertyRecommended?: string;
    budgetConfirmed?: boolean;
    locationConfirmed?: boolean;
    aiSessionId?: string;
    summary?: string;
  };
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
});

const ChatInteractionSchema = new Schema<IChatInteraction>(
  {
    leadId: { type: String, required: true, index: true },
    brokerId: { type: String, required: true, index: true },
    channel: { type: String, enum: ['whatsapp', 'web', 'mobile'], required: true },
    messages: [MessageSchema],
    context: {
      lastPropertyRecommended: { type: String },
      budgetConfirmed: { type: Boolean, default: false },
      locationConfirmed: { type: Boolean, default: false },
      aiSessionId: { type: String },
      summary: { type: String },
    },
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

// Index for quick history lookup
ChatInteractionSchema.index({ leadId: 1, createdAt: -1 });

export const ChatInteraction = mongoose.model<IChatInteraction>('ChatInteraction', ChatInteractionSchema);
