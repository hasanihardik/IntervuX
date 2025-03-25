import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from '../components/AuthContext' // Import the useAuth hook

const LoginSchema = Yup.object().shape({
  identifier: Yup.string().required("Email/Username is required"),
  password: Yup.string().required("Password is required"),
})

function Login() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth() // Use the setIsAuthenticated function from AuthContext

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null)
    try {
      const response = await axios.post("http://localhost:8080/api/login", values)
      const { token, message, profileCompleted } = response.data

      // Store token in localStorage
      localStorage.setItem("authToken", token)

      // Update the authentication state
      setIsAuthenticated(true)

      console.log("Login successful:", message)

      // Redirect user based on profile completion
      if (profileCompleted) {
        navigate("/dashboard")
      } else {
        navigate("/profile-setup")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid Credentials") // Token expired case
        } else {
          setError(error.response.data.message || "Login failed. Please try again.")
        }
      } else {
        setError("Network error. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Log in to IntervuX</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Formik initialValues={{ identifier: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-gray-700 text-sm font-bold mb-2">
                Email/Username
              </label>
              <Field
                type="text"
                name="identifier"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="identifier" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
              <Link
                to="/forgot-password"
                className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800"
              >
                Forgot Password?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Login
