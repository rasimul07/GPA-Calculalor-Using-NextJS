import mongoose from 'mongoose';

const paymentEventSchema = new mongoose.Schema({
  eventId: { type: Number, required: true, unique: true },
  type: { type: String },
  supporterEmail: { type: String },
  processedAt: { type: Date, default: Date.now },
});

export default mongoose.models.PaymentEvent
  || mongoose.model('PaymentEvent', paymentEventSchema);
