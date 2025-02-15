import React from 'react'
import logo from '../pages/logoimg/sam.jpg';
import { Settings,LogOut ,UserRoundPen } from 'lucide-react';
import {checkAuthStore} from '../files/checkAuthFile';
import { Link ,useNavigate } from 'react-router-dom';
function Navbar() {
  const {logout,isAuth} = checkAuthStore();
  const navigate = useNavigate();
  return (
    <div>
    <div className='flex justify-between items-center'>

       <div className="w-15 m-2 grid grid-cols-2 gap-1 justify-center shrink-0 cursor-default" onClick={() => navigate('/')}>
                  <img src={logo} alt="Sam Logo" className="size-7 rounded-[14px]" />
      <h3 className="text-[16px] font-bold m-0.5">
        MyChat
      </h3>
       </div>
       
    <div className='pr-2.5 flex gap-2 justify-center items-center'>
     <Link to='/setting' className='btn btn-sm pt-0.5 pr-3 pl-3 pb-0.5 items-center rounded-xl'>
     <button className='text-[15px] flex gap-1 cursor-pointer'>
    <Settings size={18} className='mt-0.5' />
    <span className='hidden sm:inline'>Settings</span>
      </button>
      </Link>
{isAuth&& (
  <>
      <Link to='/profile' className='btn btn-sm pt-0.5 pr-3 pl-3 pb-0.5 flex justify-center items-center rounded-xl'>
      <button className='text-[15px] flex gap-1 cursor-pointer'>
    <UserRoundPen  size={18} className='mt-0.5' />
    <span className='hidden sm:inline'>Profile</span>
      </button>
      </Link>
      <button onClick={logout} className='btn btn-sm pt-0.5 pr-3 pl-3 pb-0.5 flex justify-center items-center rounded-xl cursor-pointer transition duration-300 bg-[#ff838366] hover:bg-[#ff00007d]'>
    <LogOut size={18} />
    <span className='hidden sm:inline'>Logout</span>
      </button>
      <div className="cursor-default overflow-hidden rounded-[14px] scale-130" onClick={() => navigate('/')}>
                  <img src={isAuth.profileimage} alt="Profile Logo" className="size-7 scale-130" />
       </div>
</>)
}
    </div>
       
    </div>
       <hr />
       </div>
  )
}

export default Navbar