import React, { useState } from 'react';
import './Login.css';

export default function Login({ setToken, token }) {

    const [username, setUsername] = useState('')

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={e => {
                e.preventDefault();
                setToken(username);
            }}>
                <label>
                    <input 
                    type="text" 
                    value={username} 
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div >
    )
}