import {create} from 'zustand';
import toast from 'react-hot-toast';
import Instance from "../lib/axios.js";
import { checkAuthStore } from './checkAuthFile.js';
// import { useAuthStore } from "./useAuthStore";
export const useChatStore=create((set,get)=>(
    {
        messages:[],
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
                set({messages:res.data});
            } catch (error) {
                // toast.error(error.response.data.message)
                 console.log(error)
            }finally{
                set({isMessageLoading:false})
            }
        },

        sendMessage: async(messagedata)=>{
            const {selectedUser, message}=get();
        try {
            const res=await Instance.post(`/message/send/${selectedUser._id}`,messagedata);
            set({messages:[...messages,res.data]})
        } catch (error) {
            
        }
        },

        setSelectedUser:(selecteduserid)=>{
            set({selectedUser:selecteduserid})
        },
        setToMessage:()=>{
            const {selectedUser}=get()
            if(!selectedUser)return;
            const socket=checkAuthStore.getState().socket
            socket.on("newone",(data)=>{
                const isSendingMessageToSelectedUser=data.senderid===selectedUser._id
                if(!isSendingMessageToSelectedUser) return;
                set({messages:[...get().messages,data]})
            })
        },
        unSetToMessage:()=>{
            const socket=checkAuthStore.getState().socket
            socket.off("newone");
        }
}
)
)