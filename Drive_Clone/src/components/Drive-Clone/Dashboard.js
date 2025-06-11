import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from './navBar'
import AddFolder from './AddFolder'
import Folder from "./Folder"
import { useFolder } from '../../hooks/useFolder'
import { useParams, useLocation } from 'react-router-dom' // ✅ Correctly import useLocation
import FolderNavigation from './FolderNavigation '
import DeleteFolder from './DeleteFolder'
import UpdateFolderName from './UpdateFolderName'
import AddFileButton from './Addfile'
import File from './File'

const Dashboard = () => {
    const { folderId } = useParams()
const location = useLocation()
const passedFolder = location?.state?.folder || null
const { folder, childFolders, childFiles } = useFolder(folderId, passedFolder)


    return (
        <>
          <Navbar />
<Container fluid>
  <FolderNavigation currentFolder={folder} />

  {/* ✅ Wrap all buttons inside a flex container */}
  <div className="d-flex align-items-center flex-wrap gap-2 my-3">
    <AddFolder currentFolder={folder} />
    <UpdateFolderName currentFolder={folder} />
    <DeleteFolder currentFolder={folder} />
    <AddFileButton currentFolder={folder} />
  </div>

  {childFolders.length > 0 && (
    <div className="d-flex flex-nowrap">
      {childFolders.map((childFolder) => (
        <div key={childFolder.id} style={{ minWidth: "250px" }} className="p-2">
          <Folder folder={childFolder} />
        </div>
      ))}
    </div>
  )}
  {childFolders.length > 0 && childFiles.length > 0 && <hr />}
  {childFiles.length > 0 && (
    <div className="d-flex flex-wrap">
      {childFiles.map(childFile => (
        <div
          key={childFile.id}
          style={{ maxWidth: "250px" }}
          className="p-2"
        >
          <File file={childFile} />
        </div>
      ))}
    </div>
  )}
</Container>

        </>
    )
}

export default Dashboard
