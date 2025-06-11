import React from "react"
import { useDropzone } from "react-dropzone"

export default function DropZoneUpload({ onFileUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file => {
        onFileUpload({ target: { files: [file] } })
      })
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`w-full border-2 border-dashed rounded-lg p-6 mt-4 text-center transition-colors duration-200 ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? "Drop files here..."
          : "Drag & drop files here or click to browse"}
      </p>
    </div>
  )
}
