import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  contact: { type: String },
  credits: [{ type: String }],
  isPremium: { type: Boolean, default: false },
  premiumActivatedAt: { type: Date },
  bmcPaymentId: { type: Number },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);
