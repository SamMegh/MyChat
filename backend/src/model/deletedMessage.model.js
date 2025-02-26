import mongoose from "mongoose";

const deletedMessageSchema = new mongoose.Schema({
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

const DeletedMessage= mongoose.model("DeletedMessage", deletedMessageSchema);
export default DeletedMessage;