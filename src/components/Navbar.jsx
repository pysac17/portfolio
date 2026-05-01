import React from 'react'
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-12 py-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(12px)' }}>
      <NavLink to="/about" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md" onClick={handleNavClick}>
        <p className="blue-gradient_text">
          SS
        </p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink 
          to="/about" 
          className={({ isActive}) => 
            isActive 
              ? 'text-black font-bold' 
              : 'text-black hover:text-gray-700'
          }
          onClick={handleNavClick}
        >
          About
        </NavLink>
        <NavLink 
          to="/projects" 
          className={({ isActive}) => 
            isActive 
              ? 'text-black font-bold' 
              : 'text-black hover:text-gray-700'
          }
          onClick={handleNavClick}
        >
          Projects
        </NavLink>
        <NavLink 
          to="/art" 
          className={({ isActive}) => 
            isActive 
              ? 'text-black font-bold' 
              : 'text-black hover:text-gray-700'
          }
          onClick={handleNavClick}
        >
          Art
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive}) => 
            isActive 
              ? 'text-black font-bold' 
              : 'text-black hover:text-gray-700'
          }
          onClick={handleNavClick}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar