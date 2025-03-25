"use client"

import { useState, useRef, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import {
  PencilSquareIcon,
  CircleStackIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentTextIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
  PaintBrushIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from "@heroicons/react/24/outline"

function InterviewInterface() {
  const [code, setCode] = useState("")
  const [color, setColor] = useState("#000000")
  const [fillColor, setFillColor] = useState("transparent")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFillColorPicker, setShowFillColorPicker] = useState(false)
  const [activeTab, setActiveTab] = useState("code")
  const [selectedTool, setSelectedTool] = useState("pen")
  const [showShapeMenu, setShowShapeMenu] = useState(false)
  const [showPenMenu, setShowPenMenu] = useState(false)
  const [penType, setPenType] = useState("brush")
  const [brushWidth, setBrushWidth] = useState(2)
  const [brushOpacity, setBrushOpacity] = useState(1)
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef(null)
  const fabricRef = useRef(null)
  const eventListenersRef = useRef([])

  const penTypes = [
    { id: 'brush', name: 'Brush', width: 2 },
    { id: 'pencil', name: 'Pencil', width: 1 },
    { id: 'highlighter', name: 'Highlighter', width: 15, opacity: 0.4 },
    { id: 'marker', name: 'Marker', width: 8, opacity: 0.8 }
  ]

  const shapes = [
    { id: 'rect', name: 'Rectangle', icon: PencilSquareIcon },
    { id: 'circle', name: 'Circle', icon: CircleStackIcon },
    { id: 'triangle', name: 'Triangle', icon: ArrowUpIcon },
    { id: 'line', name: 'Line', icon: ArrowUpIcon },
    { id: 'arrow', name: 'Arrow', icon: ArrowUpIcon },
    { id: 'diamond', name: 'Diamond', icon: PencilSquareIcon },
  ]

  const tools = [
    { 
      id: 'pen', 
      icon: PencilIcon, 
      name: 'Drawing Tools',
      onClick: () => {
        if (selectedTool === 'pen') {
          setShowPenMenu(!showPenMenu)
          setShowShapeMenu(false)
        } else {
          setSelectedTool('pen')
          setShowPenMenu(true)
          setShowShapeMenu(false)
          const canvas = fabricRef.current
          if (canvas) {
            canvas.isDrawingMode = true
            handlePenTypeChange(penType)
          }
        }
      }
    },
    { 
      id: 'shape', 
      icon: PencilSquareIcon, 
      name: 'Shapes',
      onClick: () => {
        setShowShapeMenu(!showShapeMenu)
        setShowPenMenu(false)
      }
    },
    { id: 'eraser', icon: XMarkIcon, name: 'Eraser' },
    { id: 'text', icon: DocumentTextIcon, name: 'Text' },
  ]

  useEffect(() => {
    if (!canvasRef.current || !window.fabric) return

    const canvas = new window.fabric.Canvas(canvasRef.current, {
      width: window.innerWidth > 1024 ? 800 : window.innerWidth - 48,
      height: window.innerWidth > 1024 ? 600 : window.innerWidth - 48,
      isDrawingMode: true,
      backgroundColor: '#fff',
      preserveObjectStacking: true
    })

    fabricRef.current = canvas

    canvas.freeDrawingBrush = new window.fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.color = color
    canvas.freeDrawingBrush.width = brushWidth
    canvas.freeDrawingBrush.strokeLineCap = 'round'
    canvas.freeDrawingBrush.strokeLineJoin = 'round'

    window.fabric.Object.prototype.transparentCorners = false
    window.fabric.Object.prototype.cornerColor = '#0096FF'
    window.fabric.Object.prototype.cornerStyle = 'circle'
    window.fabric.Object.prototype.borderColor = '#0096FF'
    window.fabric.Object.prototype.cornerSize = 12
    window.fabric.Object.prototype.padding = 8

    canvas.setZoom(zoom)

    const handleKeyboard = (e) => {
      if (!canvas) return

      if ((e.key === 'Delete' || e.key === 'Backspace') && canvas.getActiveObject()) {
        canvas.remove(canvas.getActiveObject())
        canvas.renderAll()
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        handleUndo()
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && canvas.getActiveObject()) {
        canvas.getActiveObject().clone((cloned) => {
          canvas._clipboard = cloned
        })
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && canvas._clipboard) {
        canvas._clipboard.clone((cloned) => {
          canvas.discardActiveObject()
          cloned.set({
            left: cloned.left + 10,
            top: cloned.top + 10,
            evented: true,
          })
          canvas.add(cloned)
          canvas.setActiveObject(cloned)
          canvas.renderAll()
        })
      }

      if (e.code === 'Space' && !canvas.isDrawingMode) {
        canvas.defaultCursor = 'grab'
        canvas.selection = false
        canvas.forEachObject((o) => {
          o.selectable = false
        })
      }
    }

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        canvas.defaultCursor = 'default'
        canvas.selection = true
        canvas.forEachObject((o) => {
          o.selectable = true
        })
      }
    }

    const handleResize = () => {
      const width = window.innerWidth > 1024 ? 800 : window.innerWidth - 48
      const height = window.innerWidth > 1024 ? 600 : window.innerWidth - 48
      canvas.setDimensions({ width, height })
      canvas.renderAll()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyboard)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyboard)
      window.removeEventListener('keyup', handleKeyUp)
      eventListenersRef.current.forEach(([event, handler]) => {
        canvas.off(event, handler)
      })
      canvas.dispose()
    }
  }, [])

  const handlePenTypeChange = (type) => {
    setPenType(type)
    if (!fabricRef.current) return

    const canvas = fabricRef.current
    canvas.isDrawingMode = true

    if (type === 'highlighter') {
      canvas.freeDrawingBrush.color = color + '66'
      canvas.freeDrawingBrush.width = 15
    } else if (type === 'pencil') {
      canvas.freeDrawingBrush.color = color
      canvas.freeDrawingBrush.width = 1
    } else if (type === 'marker') {
      canvas.freeDrawingBrush.color = color + 'CC'
      canvas.freeDrawingBrush.width = 8
    } else {
      canvas.freeDrawingBrush.color = color
      canvas.freeDrawingBrush.width = brushWidth
    }
  }

  const handleToolChange = (tool) => {
    if (tool.onClick) {
      tool.onClick()
      return
    }

    setSelectedTool(tool.id)
    setShowShapeMenu(false)
    setShowPenMenu(false)

    const canvas = fabricRef.current
    if (!canvas) return

    canvas.isDrawingMode = tool.id === 'pen' || tool.id === 'eraser'

    if (tool.id === 'eraser') {
      canvas.freeDrawingBrush.color = '#ffffff'
      canvas.freeDrawingBrush.width = 20
    } else if (tool.id === 'pen') {
      handlePenTypeChange(penType)
    }
  }

  const handleShapeSelect = (shapeType) => {
    if (!fabricRef.current) return

    setSelectedTool(shapeType)
    setShowShapeMenu(false)
    
    const canvas = fabricRef.current
    canvas.isDrawingMode = false

    let drawing = false
    let origX = 0
    let origY = 0
    let shape = null

    const handleMouseDown = (o) => {
      if (o.target) return
      drawing = true
      const pointer = canvas.getPointer(o.e)
      origX = pointer.x
      origY = pointer.y

      const shapeOptions = {
        left: origX,
        top: origY,
        fill: fillColor,
        stroke: color,
        strokeWidth: 2,
        selectable: true,
        strokeUniform: true,
      }

      switch (shapeType) {
        case 'rect':
          shape = new window.fabric.Rect({
            ...shapeOptions,
            width: 0,
            height: 0,
          })
          break
        case 'circle':
          shape = new window.fabric.Circle({
            ...shapeOptions,
            radius: 0,
          })
          break
        case 'triangle':
          shape = new window.fabric.Triangle({
            ...shapeOptions,
            width: 0,
            height: 0,
          })
          break
        case 'text':
          shape = new window.fabric.IText('Type here', {
            ...shapeOptions,
            fontFamily: 'Arial',
            fontSize: 20,
          })
          break
        case 'line':
        case 'arrow':
          shape = new window.fabric.Line([origX, origY, origX, origY], {
            ...shapeOptions,
            fill: color,
          })
          break
      }

      if (shape) {
        canvas.add(shape)
        canvas.setActiveObject(shape)
      }
    }

    const handleMouseMove = (o) => {
      if (!drawing || !shape) return
      
      const pointer = canvas.getPointer(o.e)
      const width = Math.abs(origX - pointer.x)
      const height = Math.abs(origY - pointer.y)

      switch (shapeType) {
        case 'rect':
        case 'triangle':
          shape.set({
            width,
            height,
            left: Math.min(origX, pointer.x),
            top: Math.min(origY, pointer.y)
          })
          break
        case 'circle':
          const radius = Math.sqrt(width * width + height * height) / 2
          shape.set({
            radius,
            left: origX - radius,
            top: origY - radius
          })
          break
        case 'line':
        case 'arrow':
          shape.set({
            x2: pointer.x,
            y2: pointer.y
          })
          if (shapeType === 'arrow') {
            // Calculate arrow head
            const angle = Math.atan2(pointer.y - origY, pointer.x - origX)
            if (shape.arrowHead) {
              canvas.remove(shape.arrowHead)
            }
            shape.arrowHead = new window.fabric.Triangle({
              left: pointer.x,
              top: pointer.y,
              fill: color,
              width: 15,
              height: 15,
              angle: (angle * 180 / Math.PI) + 90,
              originX: 'center',
              originY: 'center'
            })
            canvas.add(shape.arrowHead)
          }
          break
      }

      canvas.renderAll()
    }

    const handleMouseUp = () => {
      drawing = false
      if (shapeType === 'arrow' && shape?.arrowHead) {
        const group = new window.fabric.Group([shape, shape.arrowHead], {
          selectable: true
        })
        canvas.remove(shape, shape.arrowHead)
        canvas.add(group)
      }
      canvas.renderAll()
    }

    // Clean up previous event listeners
    eventListenersRef.current.forEach(([event, handler]) => {
      canvas.off(event, handler)
    })

    // Add new event listeners
    const newListeners = [
      ['mouse:down', handleMouseDown],
      ['mouse:move', handleMouseMove],
      ['mouse:up', handleMouseUp]
    ]
    
    newListeners.forEach(([event, handler]) => {
      canvas.on(event, handler)
    })
    
    eventListenersRef.current = newListeners
  }

  const handleZoom = (delta) => {
    if (!fabricRef.current) return
    
    let newZoom = zoom + delta
    if (newZoom > 0.1 && newZoom < 5) {
      setZoom(newZoom)
      fabricRef.current.setZoom(newZoom)
      fabricRef.current.renderAll()
    }
  }

  const handleClear = () => {
    if (!fabricRef.current) return
    fabricRef.current.clear()
    fabricRef.current.backgroundColor = '#fff'
  }

  const handleUndo = () => {
    const canvas = fabricRef.current
    if (!canvas || !canvas._objects.length) return
    
    canvas.remove(canvas._objects[canvas._objects.length - 1])
    canvas.renderAll()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Interview Interface</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'code'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('code')}
        >
          Code Editor
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'whiteboard'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('whiteboard')}
        >
          Whiteboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className={`${activeTab === 'code' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Code Editor</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[600px] p-4 border rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your code here..."
            />
          </div>
        </div>

        {/* Whiteboard */}
        <div className={`${activeTab === 'whiteboard' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Whiteboard</h2>
            
            <div className="mb-4 space-y-4">
              {/* Main Toolbar */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolChange(tool)}
                      className={`p-2 rounded-lg ${
                        selectedTool === tool.id
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title={tool.name}
                    >
                      <tool.icon className="h-6 w-6" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {/* Stroke Color */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowColorPicker(!showColorPicker)
                        setShowFillColorPicker(false)
                      }}
                      className="w-8 h-8 rounded-lg border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                      title="Stroke Color"
                    />
                    {showColorPicker && (
                      <div className="absolute z-10 mt-2 bg-white p-2 rounded-lg shadow-xl">
                        <HexColorPicker color={color} onChange={setColor} />
                        <div className="mt-2 grid grid-cols-5 gap-1">
                          {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#FFFFFF', '#FFA500'].map((presetColor) => (
                            <button
                              key={presetColor}
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: presetColor }}
                              onClick={() => {
                                setColor(presetColor)
                                setShowColorPicker(false)
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fill Color */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowFillColorPicker(!showFillColorPicker)
                        setShowColorPicker(false)
                      }}
                      className="w-8 h-8 rounded-lg border-2 border-gray-300"
                      style={{ backgroundColor: fillColor }}
                      title="Fill Color"
                    >
                      <PaintBrushIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    {showFillColorPicker && (
                      <div className="absolute z-10 mt-2 bg-white p-2 rounded-lg shadow-xl">
                        <HexColorPicker
                          color={fillColor === 'transparent' ? '#ffffff' : fillColor}
                          onChange={setFillColor}
                        />
                        <div className="mt-2 grid grid-cols-5 gap-1">
                          <button
                            className="w-6 h-6 rounded border border-gray-300 bg-white"
                            onClick={() => {
                              setFillColor('transparent')
                              setShowFillColorPicker(false)
                            }}
                            title="Transparent"
                          >
                            <XMarkIcon className="h-4 w-4 mx-auto text-gray-600" />
                          </button>
                          {['#FFFFFF', '#FFE0E0', '#E0FFE0', '#E0E0FF', '#FFFFD0', '#FFE0FF', '#E0FFFF', '#F0F0F0', '#000000'].map((presetColor) => (
                            <button
                              key={presetColor}
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: presetColor }}
                              onClick={() => {
                                setFillColor(presetColor)
                                setShowFillColorPicker(false)
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    title="Zoom Out"
                  >
                    <MagnifyingGlassMinusIcon className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-600">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    title="Zoom In"
                  >
                    <MagnifyingGlassPlusIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setZoom(1)
                      fabricRef.current?.setZoom(1)
                    }}
                    className="px-3 py-1 text-sm rounded-lg text-gray-600 hover:bg-gray-100"
                    title="Reset Zoom"
                  >
                    100%
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUndo}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Undo"
                  >
                    <ArrowUturnLeftIcon className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={handleClear}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Clear"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Pen Properties Menu */}
              {showPenMenu && (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {penTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handlePenTypeChange(type.id)}
                        className={`p-2 rounded ${
                          penType === type.id
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brush Size: {brushWidth}px
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushWidth}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setBrushWidth(value)
                          if (fabricRef.current) {
                            fabricRef.current.freeDrawingBrush.width = value
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opacity: {Math.round(brushOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={brushOpacity}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setBrushOpacity(value)
                          if (fabricRef.current) {
                            const newColor = color + Math.round(value * 255).toString(16).padStart(2, '0')
                            fabricRef.current.freeDrawingBrush.color = newColor
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shapes Menu */}
              {showShapeMenu && (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <div className="grid grid-cols-3 gap-2">
                    {shapes.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => handleShapeSelect(shape.id)}
                        className={`p-2 rounded flex flex-col items-center ${
                          selectedTool === shape.id
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <shape.icon className="h-6 w-6 mb-1" />
                        <span className="text-sm">{shape.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border rounded-lg bg-white overflow-hidden whiteboard-container">
              <canvas ref={canvasRef} />
            </div>
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
