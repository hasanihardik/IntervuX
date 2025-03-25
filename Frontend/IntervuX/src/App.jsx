import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProfileSetup from "./pages/ProfileSetup"
import Dashboard from "./pages/Dashboard"
import InterviewInterface from "./pages/InterviewInterface"
import Pricing from "./pages/Pricing"
import ProtectedRoute from "./components/ProtectedRoute" // Import the Protected Route component
import { AuthProvider } from "./components/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Protected Routes - Accessible only when logged in */}
              <Route path="/profile-setup" element={<ProtectedRoute element={<ProfileSetup />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/interview" element={<ProtectedRoute element={<InterviewInterface />} />} />
              <Route path="/pricing" element={<ProtectedRoute element={<Pricing />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
