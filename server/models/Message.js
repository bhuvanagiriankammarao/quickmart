import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // 'user' or 'admin'
  content: { type: String, required: true },
  time: { type: String, required: true },
  userEmail: { type: String, required: true }, // To identify the user
  replies: [
    {
      sender: { type: String, required: true },
      content: { type: String, required: true },
      time: { type: String, required: true },
    }
  ]
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
