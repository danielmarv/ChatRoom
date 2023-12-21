// messages model
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  body: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  seenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
