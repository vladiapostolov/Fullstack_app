import { useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage';
import ToggleVisibility from '../components/ToggleVisiblity';
import noteServices from '../services/noteServices';
import userServices from '../services/userServices';
import UserPage from '../components/UserPage'; 

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteServices.getNotes()
            .then(data => setNotes(data))
            .catch(e => setErrorMessage(e.message));
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.user)
      setUsername(user.user.username);
      setIsUserLogged(true)
      userServices.setToken(user.token)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    userServices.logUser(username, password)
      .then(user => {
        setUser(user.user)
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        userServices.setToken(user.token)
      })
      .then(() => setIsUserLogged(true))
      .catch(e => setErrorMessage(e.message))
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const loginForm = () => (
    <ToggleVisibility>
      <LoginPage 
        handleSubmit={handleSubmit} 
        handlePassword={handlePassword} 
        handleUsername={handleUsername} 
        username={username} 
        password={password}/>
    </ToggleVisibility>
  )

  const showUserPage = () => {
    return (
            <UserPage 
              username={username} 
              user={user}
              notes={notes}
              isUserLogged={isUserLogged}
              handleLogin={() => {setIsUserLogged(!isUserLogged); setUser(null)}}
            />
          )
  }

  return (
    <>
      {!isUserLogged && loginForm()}

      {!errorMessage && !isUserLogged && notes.map(note => {
        return (
          <>
            <p key={note._id}>{note.text} is important: {note.important} </p>
          </>
        )
      })}

      {user && showUserPage()}

      {errorMessage && <p>We have the following error: {errorMessage}</p>}
    </>
  )
}

export default App
