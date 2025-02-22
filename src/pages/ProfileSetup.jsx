"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

const roleSchema = Yup.object().shape({
  role: Yup.string().oneOf(["candidate", "interviewer"]).required("Required"),
})

const candidateSchema = Yup.object().shape({
  image: Yup.mixed().required("Required"),
  college: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  gender: Yup.string().oneOf(["male", "female", "other"]).required("Required"),
  interests: Yup.string().required("Required"),
  resume: Yup.mixed().required("Required"),
  education: Yup.string().required("Required"),
  experience: Yup.string().required("Required"),
  certifications: Yup.string(),
})

const interviewerSchema = Yup.object().shape({
  image: Yup.mixed().required("Required"),
  companyName: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  experience: Yup.string().required("Required"),
  skills: Yup.string().required("Required"),
  hiringPreferences: Yup.string().required("Required"),
})

function ProfileSetup() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (values, { setSubmitting }) => {
    if (step === 1) {
      setRole(values.role)
      setStep(2)
    } else {
      // TODO: Implement profile setup logic
      console.log(values)
      setSubmitting(false)
      navigate("/dashboard")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Profile</h1>
      {step === 1 ? (
        <Formik initialValues={{ role: "" }} validationSchema={roleSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Choose your role</label>
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
                Next
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={
            role === "candidate"
              ? {
                  image: null,
                  college: "",
                  dob: "",
                  gender: "",
                  interests: "",
                  resume: null,
                  education: "",
                  experience: "",
                  certifications: "",
                }
              : {
                  image: null,
                  companyName: "",
                  designation: "",
                  experience: "",
                  skills: "",
                  hiringPreferences: "",
                }
          }
          validationSchema={role === "candidate" ? candidateSchema : interviewerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0])
                  }}
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic" />
              </div>
              {role === "candidate" ? (
                <>
                  <div className="mb-4">
                    <label htmlFor="college" className="block text-gray-700 text-sm font-bold mb-2">
                      College
                    </label>
                    <Field
                      type="text"
                      name="college"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="college" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                      Date of Birth
                    </label>
                    <Field
                      type="date"
                      name="dob"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="dob" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                      Gender
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="interests" className="block text-gray-700 text-sm font-bold mb-2">
                      Interests
                    </label>
                    <Field
                      type="text"
                      name="interests"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="interests" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="resume" className="block text-gray-700 text-sm font-bold mb-2">
                      Resume
                    </label>
                    <input
                      type="file"
                      onChange={(event) => {
                        setFieldValue("resume", event.currentTarget.files[0])
                      }}
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage name="resume" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="education" className="block text-gray-700 text-sm font-bold mb-2">
                      Education
                    </label>
                    <Field
                      as="textarea"
                      name="education"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="education" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
                      Experience
                    </label>
                    <Field
                      as="textarea"
                      name="experience"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="experience" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="certifications" className="block text-gray-700 text-sm font-bold mb-2">
                      Certifications
                    </label>
                    <Field
                      type="text"
                      name="certifications"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="certifications" component="div" className="text-red-500 text-xs italic" />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
                      Company Name
                    </label>
                    <Field
                      type="text"
                      name="companyName"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="companyName" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">
                      Designation
                    </label>
                    <Field
                      type="text"
                      name="designation"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="designation" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
                      Experience
                    </label>
                    <Field
                      as="textarea"
                      name="experience"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="experience" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
                      Skills
                    </label>
                    <Field
                      type="text"
                      name="skills"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="skills" component="div" className="text-red-500 text-xs italic" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="hiringPreferences" className="block text-gray-700 text-sm font-bold mb-2">
                      Hiring Preferences
                    </label>
                    <Field
                      as="textarea"
                      name="hiringPreferences"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="hiringPreferences" component="div" className="text-red-500 text-xs italic" />
                  </div>
                </>
              )}
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
      )}
    </div>
  )
}

export default ProfileSetup

