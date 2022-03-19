import './App.css';
import React, { useState } from 'react';
import { UserStateInterface } from './types.d';
import Home from './components/home/Home'
import Login from './components/login/Login';

function App() {
  const [loggedIn, setLoggedInStatus] = useState(false)
  const [thisUserId, setThisUserId] = useState("")
  const [userState, setUserState] = useState<UserStateInterface[]>([])

  console.log(userState)

  return (
    <div className="App">
      {!loggedIn && <Login 
        setLoggedInStatus={setLoggedInStatus}
        setUserState={setUserState}
        setThisUserId={setThisUserId}
        />}
      {loggedIn && <Home 
        thisUserId={thisUserId}
        userState={userState}
        setUserState={setUserState}
      />}
    </div>
  );
}

export default App;
