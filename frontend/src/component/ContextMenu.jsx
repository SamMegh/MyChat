import React from 'react'
import { useState } from 'react';
import { useChatStore } from '../files/useChatStore';

function ContextMenu({handlecontaxtmenu}) {
    const {list}=useChatStore();
  return (
    <div>
        <div className="w-[116px] bg-base-300 rounded-xl z-2 p-4 px-7 flex flex-col gap-2 cursor-default">
        {list.map((item,index)=>(
                    <span 
                    key={index}
                    className={`text-center w-15 `}
                    onClick={()=>handlecontaxtmenu(item)}
                    >
                    {item}
                    <hr className={`mt-1 border-t-2 transition-all duration-200 ease-in-out`}/>
                    </span>
                    
                ))}
            </div>
        
    </div>
  )
}

export default ContextMenu
