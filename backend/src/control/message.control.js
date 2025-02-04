import User from "../model/user.model";
import Message from "../model/message.model";
export const getusers = async (req, res) => {
     try {
        let loginuser= res.user._id;
           let users = await User.find({ _id: { $ne: loginuser } }).select('-password');
           res.status(200).json(users);
     } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
        
     }
    }


export const getmessages = async (req, res) => {
    try {
        let {id:receiverid} = req.params;
        let loginuser= res.user._id;
        let messages= await Message.find({
            $or:[
                {
                    sender:loginuser,receiver:receiverid
                },
                {
                    sender:receiverid,receiver:loginuser
                }
            ]
        });
        res.status(200).json(messages);
        

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}