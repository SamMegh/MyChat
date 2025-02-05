import {create} from 'zustand';
import Instance from '../lib/axios';
export const checkAuthStore = create((set) => ({
    isAuth: null,
    isSignup:false,
    isLogin:false,
    isUpdateprfile:false,
    ischeckauth:true,
    checkauth: async () => {
        try {
            const res = await Instance.get('/auth/check');
            set ({isAuth: res.data});
        } catch (error) {
            set({isAuth:false});
        }
        finally {
            set({isCheckauth:false});
        }
    }
}));