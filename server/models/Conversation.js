import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    lastMessageAt: { type: Date, default: Date.now },
    name: String,
    isGroup: Boolean,
    messagesIds: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Message' 
        }
    ],
    userIds: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
