// File.js
import React from "react"
import { Card } from "react-bootstrap"
import { FaFileAlt, FaImage, FaFilePdf } from "react-icons/fa"

export default function File({ file }) {
  const getIcon = (name) => {
    if (name.endsWith(".pdf")) return <FaFilePdf size={30} className="text-danger" />
    if (/\.(jpg|jpeg|png|gif)$/i.test(name)) return <FaImage size={30} className="text-primary" />
    return <FaFileAlt size={30} className="text-secondary" />
  }

  const handleOpenFile = () => {
    window.open(file.url, "_blank") // Open file in new tab
  }

  return (
    <Card
      onClick={handleOpenFile}
      style={{ cursor: "pointer", height: "100%" }}
      className="shadow-sm h-100"
    >
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        {getIcon(file.name)}
        <div className="mt-2 text-center" style={{ wordBreak: "break-word" }}>
          <small>{file.name}</small>
        </div>
      </Card.Body>
    </Card>
  )
}
