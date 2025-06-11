// src/components/Drive-Clone/UpdateFolderName.js
import React, { useState } from 'react';
import { Button, Form, Collapse } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebase';

const UpdateFolderName = ({ currentFolder }) => {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState(currentFolder?.name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
    setMessage('');
    setNewName(currentFolder?.name || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!currentFolder || !currentFolder.id) return;

    setLoading(true);
    setMessage('');

    try {
      const folderRef = doc(database.folders, currentFolder.id);
      await updateDoc(folderRef, { name: newName });
      setMessage('✅ Folder name updated!');
      setShowForm(false); // Auto-close after update
    } catch (err) {
      console.error('Error updating folder name:', err);
      setMessage('❌ Failed to update folder name');
    }

    setLoading(false);
  };

  return (
    <div className="my-3">
      <Button variant="outline-secondary" onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Rename Folder'}
      </Button>

      <Collapse in={showForm}>
        <div>
          <Form onSubmit={handleUpdate} className="mt-3">
            <Form.Group className="mb-2" controlId="folderName">
              <Form.Label>New Folder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading || newName.trim() === ''}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
            {message && <div className="mt-2 text-muted">{message}</div>}
          </Form>
        </div>
      </Collapse>
    </div>
  );
};

export default UpdateFolderName;
