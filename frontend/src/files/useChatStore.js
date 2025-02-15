import {create} from 'zustand';
import toast from 'react-hot-toast';
import Instance from "../lib/axios.js";
// import { useAuthStore } from "./useAuthStore";
export const useChatStore=create((set)=>(
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
        setSelectedUser:(selecteduserid)=>{
            set({selectedUser:selecteduserid})
        }       
}
)
)