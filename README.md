#  Google Drive Clone

A fully functional Google Drive-inspired cloud storage application built with **React** and **Firebase**. This project allows users to securely **upload**, **manage**, and **organize** their files and folders — all in **real-time**, with a user-friendly interface and responsive design.

> ⚠️ **Note:** This project uses Firebase's free-tier services. The storage quota may be exceeded. If you're cloning or testing the app, it's **strongly recommended** to use your own Firebase project for full functionality.

---

## 📖 Overview

This **Google Drive Clone** provides a real-world simulation of a cloud storage service where users can:

- Log in securely with Firebase Authentication
- Upload and access files
- Create, rename, and delete folders
- Navigate folder structure with breadcrumb UI
- Enjoy a real-time, personalized file system

It’s built with **React** on the frontend and **Firebase (Authentication, Firestore, Storage)** on the backend.

---

##  Features

###  Authentication
- Email/password-based login and signup
- Secure access to user-specific folders and files

###  Folder Management
-  Create new folders
-  Rename existing folders
-  Delete folders with confirmation
-  Nested folder structure support

###  File Upload & Display
- Upload files (PDF, images, docs, etc.)
- Display file icons and metadata (name, timestamp)
- View files inside their respective folders

###  Real-Time Sync
- Live updates across the app using Firestore listeners
- No page reload needed after changes

###  Folder Navigation
- Breadcrumb navigation for deep folder paths
- Backtracking to any parent folder easily

###  Clean UI
- Built using React Bootstrap for a smooth, responsive experience
- Organized layout inspired by Google Drive’s interface

---

## 🛠️ Tech Stack

| Category       | Technology                     |
|----------------|---------------------------------|
| Frontend       | React, React Bootstrap         |
| Backend        | Firebase (Auth, Firestore, Storage) |
| Routing        | React Router DOM               |
| State Handling | React Hooks & Context API      |

---


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shivansh185/google-drive-clone.git
cd google-drive-clone
npm install
npm start


