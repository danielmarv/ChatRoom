import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(req.params.friendId);

        if (user.friends.includes(friend._id)) {
            user.friends = user.friends.filter((friendId) => friendId !== friend._id);
            friend.friends = friend.friends.filter((friendId) => friendId !== id);
        } else {
            user.friends.push(friend._id);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
