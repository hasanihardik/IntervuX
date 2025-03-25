"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    navigate("/")
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            IntervuX
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/interview">Interview</NavLink>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                      {localStorage.getItem("userEmail")?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                      <Link
                        to="/profile-setup"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/pricing">Pricing</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" mobile>
                  Dashboard
                </NavLink>
                <NavLink to="/interview" mobile>
                  Interview
                </NavLink>
                <NavLink to="/profile-setup" mobile>
                  Profile Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 rounded-md font-medium hover:bg-gray-100 mb-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/pricing" mobile>
                  Pricing
                </NavLink>
                <NavLink to="/login" mobile>
                  Login
                </NavLink>
                <NavLink to="/signup" mobile className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ to, children, mobile, className }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200"
  const desktopClasses = "hover:bg-gray-100 text-gray-700"
  const mobileClasses = "block w-full text-left mb-2 text-gray-700"

  return (
    <Link to={to} className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses} ${className}`}>
      {children}
    </Link>
  )
}

export default Header
