import React, { useEffect } from 'react';
import { useReducer } from 'react';
import { database } from '../firebase';
import { data } from 'react-router-dom';
import { doc,getDoc,query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/authContext';
  const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDER: 'set-child-folder',
}

 export const ROOT_FOLDER = {
  id: null,
  name: 'Root',
  path:[]
}

function reducer(state,{type,payload}){
switch(type){
  case ACTIONS.SELECT_FOLDER:
    return {
      folderId: payload.folderId,
      folder: payload.folder,
      childFolders: [],
      childFiles: [],
    }
  case ACTIONS.UPDATE_FOLDER:
    return {
      ...state,
      folder: payload.folder,
    }
  case ACTIONS.SET_CHILD_FOLDER:
    return {
      ...state,
      childFolders: payload.childFolders,
    }
  default:
    return state;
  }
}

export function useFolder(folderId=null, folder=null) {
  const [state,dispatch] = useReducer(reducer,{
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  })

  const {currentUser} =useAuth()
  useEffect(()=>{
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  },[folderId, folder]);

useEffect(() => {
  if (folderId === null) {
    dispatch({
      type: ACTIONS.UPDATE_FOLDER,
      payload: { folder: ROOT_FOLDER }
    });
    return;
  }

  async function fetchFolder() {
    try {
      const docRef = doc(database.folders, folderId);
      getDoc(docRef).then((doc) => {
         dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: database.formatDoc(doc) }
      });

      });
      // You can update the state here if needed
    } catch (error) {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER }
      });
    }
  }

  fetchFolder();
}, [folderId]);

useEffect(() => {
  if (!currentUser) return;

  const conditions = [
    where("userId", "==", currentUser.uid),
    orderBy("createdAt"),
  ];

  // Handle root folder vs. subfolder query
  if (folderId === null) {
    conditions.unshift(where("parentId", "==", null));
  } else {
    conditions.unshift(where("parentId", "==", folderId));
  }

  const q = query(database.folders, ...conditions);

  const unsubscribe = onSnapshot(q, snapshot => {
    const folders = snapshot.docs.map(database.formatDoc);

    dispatch({
      type: ACTIONS.SET_CHILD_FOLDER,
      payload: {
        childFolders: folders,
      },
    });
  });

  return unsubscribe;
}, [folderId, currentUser]);



  return state;
}