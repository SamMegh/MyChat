import { create } from "zustand";

export const usedtheme=create((set)=>({
        theme:localStorage.getItem("user-theme")||"synthwave",
        setTheme:(theme)=>{
            localStorage.setItem("user-theme",theme)
            set({theme})}
}))