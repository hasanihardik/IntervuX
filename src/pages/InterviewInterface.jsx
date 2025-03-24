"use client"

import { useState, useRef } from "react"
import CanvasDraw from "react-canvas-draw"

function InterviewInterface() {
  const [code, setCode] = useState("")
  const [brushColor, setBrushColor] = useState("#000000")
  const [brushRadius, setBrushRadius] = useState(2)
  const whiteboardRef = useRef(null)

  const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"]

  const handleClearWhiteboard = () => {
    whiteboardRef.current?.clear()
  }

  const handleUndoWhiteboard = () => {
    whiteboardRef.current?.undo()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Interview Interface</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Coding Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[500px] p-4 border rounded font-mono text-sm bg-gray-50"
            placeholder="Write your code here..."
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Whiteboard</h2>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    brushColor === color ? "border-gray-600" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBrushColor(color)}
                />
              ))}
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={brushRadius}
              onChange={(e) => setBrushRadius(Number.parseInt(e.target.value))}
              className="w-32"
            />
            <button
              onClick={handleUndoWhiteboard}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              Undo
            </button>
            <button
              onClick={handleClearWhiteboard}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="border rounded bg-white">
            <CanvasDraw
              ref={whiteboardRef}
              brushColor={brushColor}
              brushRadius={brushRadius}
              canvasWidth={600}
              canvasHeight={500}
              className="w-full touch-none"
              hideGrid
              lazyRadius={0}
            />
          </div>
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

