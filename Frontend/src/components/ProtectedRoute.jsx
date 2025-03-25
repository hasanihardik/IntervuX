import { Navigate } from "react-router-dom"

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) // Decode JWT payload
    return payload.exp * 1000 < Date.now() // Check if expired
  } catch (error) {
    return true // If decoding fails, consider token invalid
  }
}

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken")
  console.log(token);

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("authToken") // Remove expired token
    return <Navigate to="/login" replace />
  }

  return element
}

export default ProtectedRoute
