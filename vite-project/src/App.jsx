import { useEffect } from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Home from '../components/Home';
import Note from '../components/Note';
import userServices from '../services/userServices';
import UserPage from '../components/UserPage';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserActions } from './user-store'

function App() {
  const { setUsername, setId } = useUserActions();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userServices.setToken(user.token);
      setUsername(user.user.username);
      setId(user.user._id);
    }
  }, [setUsername, setId])

  return (
    <Routes>
      <Route path="/login" element={
        <LoginPage/>
      }/>
      <Route path="/" element={
        <Home/>
      }/>
      <Route path="/notes" element={
        <UserPage/>
      }/>
      <Route path="/home" element={
        <Home/>
      }/>
      <Route path="/notes/:id" element={
        <Note/>
      }/>
    </Routes>
    )

}

export default App
