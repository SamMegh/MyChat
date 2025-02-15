import {create} from 'zustand';
import Instance from '../lib/axios';
import toast from 'react-hot-toast';
export const checkAuthStore = create((set) => ({
    isAuth: null,
    isSignup:false,
    isLogin:false,
    isUpdateprfile:false,
    ischeckauth:false,
    onlineUsers:[],

    checkauth: async () => {
        set({isCheckauth:true});
        try {
            const res = await Instance.get('/auth/check');
            set ({isAuth: res.data});
        } catch (error) {
            set({isAuth:false});
        }
        finally {
            set({isCheckauth:false});
        }
    },

    signup: async (data) => {
        set({isSignup:true});
        try {
            const res = await Instance.post('/auth/signup', data);
            set ({isAuth: res.data});
            if(isAuth) {
                toast.success('Signup Success');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally {
            set({isSignup:false});
        }
    },

    logout: async () => {
        try {
            const res = await Instance.get('/auth/logout');
            set({isAuth: false});
            if(!isAuth){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({isLogin:true});
        try {
            const res= await Instance.post('/auth/login', data);
            set ({isAuth: res.data});
            if(isAuth) {
                toast.success('Login Success');
            }
        } catch (error) {
        toast.error(error.response.data.message);
        } finally {
            set({isLogin:false});
        }
    },

    updateprofile: async (data)=>{
        set({isUpdateprfile:true});
        try {
            const res = await Instance.put('/auth/update', data);
            set({isAuth: res.data});
            if(isAuth) {
                toast.success('Profile Updated');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally {
            set({isUpdateprfile:false});
        }
    }
}));