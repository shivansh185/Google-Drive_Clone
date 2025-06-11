import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

const AddFolder = ({ currentFolder }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [name, setName] = React.useState('');
    const { currentUser } = useAuth();
    const db = getFirestore();

    function openModalBox() {
        setOpenModal(true);
    }

    function closeModalBox() {
        setOpenModal(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (currentFolder == null) return;

        const path = [...(currentFolder.path || [])];
        if (currentFolder !== ROOT_FOLDER) {
            path.push({
                id: currentFolder.id,
                name: currentFolder.name,
            });
        }

        try {
            const foldersCollection = collection(db, 'folders');
            await addDoc(foldersCollection, {
                name: name,
                parentId: currentFolder.id,
                userId: currentUser.uid,
                path: path,
                createdAt: serverTimestamp(),
            });

            setName('');
            closeModalBox();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <>
            <Button onClick={openModalBox} variant="outline-dark" size="sm">
                <FontAwesomeIcon icon={faFolderPlus} className="mr-2 px-2" />
                Add New Folder
            </Button>
            <Modal show={openModal} onHide={closeModalBox}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formFolderName">
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter folder name"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModalBox}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AddFolder;
