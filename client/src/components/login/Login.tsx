import React, { useState } from 'react';
import { UserStateInterface } from '../../types.d';

interface LogInProps {
    setLoggedInStatus: React.Dispatch<React.SetStateAction<boolean>>
    setThisUserId: React.Dispatch<React.SetStateAction<string>>
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
 }

const Login = (props: LogInProps) => {
    const { setLoggedInStatus, setThisUserId, setUserState } = props;

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [authRejectionStatus, setAuthRejectionStatus] = useState(false)

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(usernameInput) {
            setUsernameInput("");
            setPasswordInput("");
            const user = { "user": usernameInput }

            await fetch('http://localhost:8080/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(user)
            })
            .then(authOK => authOK.json())
            .then(authData => {
                if(authData.rejected) { 
                    setAuthRejectionStatus(true);
                } else {
                    setUserState(JSON.parse(authData.allUsers));
                    setThisUserId(authData.userId);
                    setLoggedInStatus(true);
                };
            })            
        }
    };

    return (
        <div className='login-container'>
            <h2>Log-in to your account</h2>
            {authRejectionStatus && <h3>Wrong username or password. Try again</h3>}
            <form>
                <input
                    type="text"
                    onChange={e => setUsernameInput(e.target.value)}
                    value={usernameInput}
                    placeholder="Username"
                />
                <input
                    type="text"
                    onChange={e => setPasswordInput(e.target.value)}
                    value={passwordInput}
                    placeholder="Password"
                />
                <button id="btnAddTodo" onClick={handleClick}>Log in</button>
            </form>
        </div>
    );
}

export default Login;