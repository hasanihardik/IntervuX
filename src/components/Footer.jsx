import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">IntervuX</h3>
            <p className="text-gray-400">Empowering interviews with AI and real-time collaboration.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-indigo-400 transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-indigo-400 transition-colors duration-200">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-400">Email: support@intervux.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} IntervuX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

