import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import React from 'react'

export default function Folder({ folder }) {
  return (
    <div className="p-3 w-full max-w-xs">
      <Link
        to={`/folder/${folder.id}`}
        className="flex items-center gap-2 w-full whitespace-nowrap overflow-hidden text-ellipsis truncate backdrop-blur-sm bg-gradient-to-r from-teal-100 to-sky-100 hover:from-teal-200 hover:to-sky-200 border border-white/30 text-gray-800 font-medium rounded-lg px-4 py-2 shadow hover:shadow-lg transition-all duration-200 no-underline"
        title={folder.name}
        role="button"
      >
        <FontAwesomeIcon icon={faFolder} className="text-yellow-500 text-lg flex-shrink-0" />
        <span className="truncate">{folder.name}</span>
      </Link>
    </div>
  )
}
