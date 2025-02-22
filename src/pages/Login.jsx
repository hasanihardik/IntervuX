import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
})

function Login() {
  const handleSubmit = (values, { setSubmitting }) => {
    // TODO: Implement login logic
    console.log(values)
    setSubmitting(false)

    // Authentication logic (to be implemented)
    // 1. Send a POST request to your backend API with the user's credentials
    // 2. If the credentials are valid, receive a token from the server
    // 3. Store the token securely (e.g., in localStorage or httpOnly cookie)
    // 4. Redirect the user to the dashboard or home page
    // 5. Update the app's state to reflect that the user is logged in
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Log in to IntervuX</h1>
      <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
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
                Log In
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

