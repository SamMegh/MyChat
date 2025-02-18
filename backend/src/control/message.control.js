import User from "../model/user.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../lib/socketio.lib.js";
import cloudinary from '../lib/couldinary.lib.js';

export const getusers = async (req, res) => {
     try {
        let loginuser= req.user._id;
           let users = await User.find({ _id: { $ne: loginuser } }).select('-password');
           res.status(200).json(users);
     } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
        
     }
    }

export const getmessages = async (req, res) => {
    try {
        let {id:receiverid} = req.params;
        let loginuser= req.user._id;
        let messages= await Message.find({
            $or:[
                {
                    senderid:loginuser,receiverid:receiverid
                },
                {
                    senderid:receiverid,receiverid:loginuser
                }
            ]
        });
        res.status(200).json(messages);


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const sendmessage = async (req, res) => {
    try {
        let {id:receiverid} = req.params;
        let senderid= req.user._id;
        let {message, image} = req.body;
        let imgurl;
        if(image){
            const resimage = await cloudinary.uploader.upload(image);
            imgurl= resimage.secure_url;
        }
        let newmessage = new Message({
            senderid,
            receiverid,
            message,
            image:imgurl
        });
        await newmessage.save();

const receiverSocketid=getReceiverSocketId(receiverid);
if(receiverSocketid){
    io.to(receiverSocketid).emit("newone",newmessage)
}

        res.status(200).json(newmessage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}