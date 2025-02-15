import {create} from 'zustand';
import toast from 'react-hot-toast';
import Instance from "../lib/axios.js";
import { sendmessage } from '../../../backend/src/control/message.control.js';
// import { useAuthStore } from "./useAuthStore";
export const useChatStore=create((set,get)=>(
    {
        message:[],
        users:[],
        selectedUser: null,
        isUsersLoading:false,
        isMessageLoading:false,

        getUsers:async()=>{
            set({isUsersLoading:true})
            try {
                const res= await Instance.get("/message/users");
                set({users:res.data})
            } catch (error) {
                toast.error(error.response.data.message)
            }
            finally{
                set({isUsersLoading:false})
            }
        },

        getMessages: async(userid)=>{
            set({isMessageLoading:true})
            try {
                const res= await Instance.get(`/message/${userid}`)
                set({message:res.data});
            } catch (error) {
                toast.error(error.response.data.message)
            }finally{
                set({isMessageLoading:false})
            }
        },

        sendMessage: async(messagedata)=>{
            const {selectedUser, message}=get();
        try {
            const res=await Instance.post(`/message/send/${selectedUser._id}`,messagedata);
            set({message:[...message,res.data]})
        } catch (error) {
            
        }
        },

        setSelectedUser:(selecteduserid)=>{
            set({selectedUser:selecteduserid})
        }       
}
)
)