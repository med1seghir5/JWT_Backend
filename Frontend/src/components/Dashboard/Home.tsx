import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col items-center justify-center space-y-10 bg-gradient-to-r h-screen from-[#283342] to-[#009099]'>
      <img src='/Pictures/Logo.svg'alt='Logo' className='w-96'/>
      <div className='flex flex-row space-x-5 '>
        <Link to='./Signup.tsx'><button className='rounded-lg w-20 bg-transparent border-2 border-[#009099] text-[#009099] font-poppins font-semibold hover:border-[#283342] hover:text-[#283342]'>Signup</button></Link>
        <Link to='./Login.tsx'><button className="rounded-lg w-20 bg-transparent border-2 border-[#009099] text-[#009099] font-poppins font-semibold hover:border-[#283342] hover:text-[#283342]">Login</button></Link>
      </div>
    </div>
  )
}

export default Home