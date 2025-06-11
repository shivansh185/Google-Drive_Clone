import React, { useState, useEffect } from 'react';
import { Form, Dropdown, InputGroup } from 'react-bootstrap';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser } = useAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchFolders = async () => {
      try {
        const foldersCollection = collection(db, 'folders');
        const q = query(
          foldersCollection,
          where('userId', '==', currentUser.uid),
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff')
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Search Results: ", results);
        setSearchResults(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error searching folders: ", error);
        setSearchResults([]);
      }
    };

    const timer = setTimeout(() => {
      searchFolders();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, db, currentUser.uid]);

  const handleSelect = (folderId) => {
    navigate(`/folder/${folderId}`);
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <div className="position-relative">
      <InputGroup style={{ width: '300px' }}>
        <Form.Control
          type="search"
          placeholder="Search folders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
      </InputGroup>

      {showDropdown && (
        <Dropdown.Menu show className="w-100 mt-1">
          {searchResults.length > 0 ? (
            searchResults.map((folder) => (
              <Dropdown.Item
                key={folder.id}
                onClick={() => handleSelect(folder.id)}
                className="d-flex align-items-center"
              >
                <span className="text-truncate">
                  {folder.path ? folder.path.map(f => f.name).join(' / ') + ' / ' : ''}
                  {folder.name}
                </span>
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No folders found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default SearchBar;
