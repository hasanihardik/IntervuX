"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  bio: Yup.string().required("Required"),
  role: Yup.string().oneOf(["candidate", "interviewer"]).required("Required"),
})

function ProfileSetup() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("authToken")

    if (!token) {
      console.error("No token found in localStorage")
      setError("Authentication error. Please log in again.")
      setSubmitting(false)
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/profile",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Profile submitted successfully:", response.data)
      setSubmitting(false)
      navigate("/dashboard")
    } catch (error) {
      console.error("Error submitting profile:", error.response?.data || error.message)
      setError("Failed to submit profile. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Profile</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          bio: "",
          role: "",
        }}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                Bio
              </label>
              <Field
                as="textarea"
                name="bio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="bio" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a role</option>
                <option value="candidate">Candidate</option>
                <option value="interviewer">Interviewer</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-xs italic" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Complete Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProfileSetup
