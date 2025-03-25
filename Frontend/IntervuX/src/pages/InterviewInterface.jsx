"use client"

import { useState } from "react"

function InterviewInterface() {
  const [code, setCode] = useState("")
  const [whiteboard, setWhiteboard] = useState("")

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Interview Interface</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Coding Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 border rounded font-mono text-sm"
            placeholder="Write your code here..."
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Whiteboard</h2>
          <textarea
            value={whiteboard}
            onChange={(e) => setWhiteboard(e.target.value)}
            className="w-full h-64 p-4 border rounded"
            placeholder="Use this area for notes and diagrams..."
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300">
          End Interview
        </button>
      </div>
    </div>
  )
}

export default InterviewInterface

