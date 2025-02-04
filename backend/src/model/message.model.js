import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderid: {
        type: String,
        required: true,
        ref: "User"
    },
    receiverid: {
        type: String,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
    },
    image:{
        type:String,
    },},
    {
        timestamps: true,
    });

const Message= mongoose.model("Message", messageSchema);
export default Message;