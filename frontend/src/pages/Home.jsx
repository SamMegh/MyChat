import React from 'react'
import { checkAuthStore } from '../files/checkAuthFile';

function Home() {
  const {logout} = checkAuthStore();
  return (
    <div>Home</div>
    
  )
}

export default Home