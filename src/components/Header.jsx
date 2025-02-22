"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            IntervuX
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup" className="bg-indigo-600 text-white">
              Sign Up
            </NavLink>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <NavLink to="/pricing" mobile>
              Pricing
            </NavLink>
            <NavLink to="/login" mobile>
              Login
            </NavLink>
            <NavLink to="/signup" mobile className="bg-indigo-600 text-white">
              Sign Up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavLink({ to, children, mobile, className }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200"
  const desktopClasses = "hover:bg-gray-100"
  const mobileClasses = "block w-full text-left mb-2"

  return (
    <Link to={to} className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses} ${className}`}>
      {children}
    </Link>
  )
}

export default Header

