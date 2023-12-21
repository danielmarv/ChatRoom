// controllers/messageController.js
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js'; // Import the Conversation model
import getCurrentUser from '@/app/actions/getCurrentUser';

export const message = async (req, res) => {
    try {
        const currentUser = await getCurrentUser();
        const { message, image, conversationId } = req.body;

        if (!currentUser?.id || !currentUser?.email) {
            return res.status(401).send('Unauthorized');
        }

        const newMessage = await Message.create({
            body: message,
            image: image,
            conversation: conversationId,
            sender: currentUser.id,
            seen: currentUser.id,
        });

        const updatedConversation = await Conversation.findByIdAndUpdate(
            conversationId,
            {
                $set: {
                    lastMessageAt: new Date(),
                },
                $push: {
                    messages: newMessage._id,
                },
            },
            { new: true }
        ).populate('users messages.seen');

        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error, 'ERROR_MESSAGES');
        res.status(500).send('InternalError');
    }
};

