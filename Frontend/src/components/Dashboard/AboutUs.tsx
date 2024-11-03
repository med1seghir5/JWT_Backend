import React from 'react'
import { Link } from 'react-router-dom';
function AboutUs() {
  return (
    <div className="flex flex-col items-center space-y-5">
    {/* Sidebar */}
    <div className="fixed flex flex-col p-5 left-0 justify-between text-center hover:w-52 md:w-52 bg-gradient-to-r h-screen from-[#283342] to-[#009099] text-gray-600 transition-all duration-300 z-10 sidebar">
    {/* Logo */}
      <div className="text-white font-poppins font-bold mb-4">
        <img src="/Pictures/Logo.svg" alt="Logo" />
      </div>
    
    {/* Menu */}
    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-white text-center">Menu</h2>
      <ul className="flex flex-col justify-center py-4 space-y-1">
          <li>
            <Link to="/Dashboard.tsx" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">
              <p className="ml-2 text-sm">General Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/AdminDashboard.tsx" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">
              <p className="ml-2 text-sm">Admin Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/AboutUs.tsx" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">
              <p className="ml-2 text-sm">About Us</p>
            </Link>
          </li>
      </ul>
    </div>

    {/* Logout button & User information */}
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-lg font-semibold text-white">Username</h1>
      <button className="rounded-lg w-20 bg-transparent border-2 border-white text-white font-poppins font-semibold hover:border-[#283342] hover:text-[#283342] transition">
        Logout
      </button>
    </div>
  </div>

  {/* Main Content */}
  <div className="">
      <div className="text-center mb-5">
        <span className="font-poppins font-bold text-xl">About Us</span>
      </div>

      {/* Sections */}
      <div className="">
        <div className="bg-gray-200"></div>
        <div className="bg-gray-200"></div>
        <div className="bg-gray-200"></div>
        <div className="bg-gray-200"></div>
      </div>
     <div className="">
        <div className="bg-gray-200 h-32"></div>
        <div className="bg-gray-200 h-32"></div>
        <div className="bg-gray-200 h-32"></div>
        <div className="bg-gray-200 h-32"></div>
    </div>
  </div>
</div>
  )
}

export default AboutUs