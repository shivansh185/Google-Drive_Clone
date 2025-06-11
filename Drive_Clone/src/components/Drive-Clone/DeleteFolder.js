import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';

const DeleteFolder = ({ currentFolder }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const { currentUser } = useAuth();
    const db = getFirestore();

    function openModalBox() {
        setOpenModal(true);
    }

    function closeModalBox() {
        setOpenModal(false);
    }

    async function deleteFolderAndChildren(folderId) {
        // Delete all child folders first
        const foldersCollection = collection(db, 'folders');
        const q = query(foldersCollection, where('parentId', '==', folderId));
        
        const querySnapshot = await getDocs(q);
        const deletePromises = [];
        
        querySnapshot.forEach((docSnapshot) => {
            deletePromises.push(deleteFolderAndChildren(docSnapshot.id));
        });
        
        await Promise.all(deletePromises);
        
        // Then delete the current folder
        await deleteDoc(doc(db, 'folders', folderId));
    }

    async function handleDelete() {
        if (!currentFolder || currentFolder.id === null) return;
        
        setIsDeleting(true);
        try {
            await deleteFolderAndChildren(currentFolder.id);
            closeModalBox();
        } catch (error) {
            console.error("Error deleting folder: ", error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Button 
                onClick={openModalBox} 
                variant="outline-danger" 
                size="sm"
                disabled={!currentFolder || currentFolder.id === null}
            >
                <FontAwesomeIcon icon={faTrash} className="mr-2 px-2" />
                Delete Folder
            </Button>
            
            <Modal show={openModal} onHide={closeModalBox}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this folder and all its contents?</p>
                    <p className="text-danger">This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModalBox} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteFolder;