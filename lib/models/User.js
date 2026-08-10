import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  contact: { type: String },
  credits: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);
