import React, { useEffect, useState, useContext } from 'react';
import './Login.css';

import ThemeContext from '../../context/ThemeContext'


export default function Login({ setToken, token }) {

    const [username, setUsername] = useState('')
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.add(theme)
        return () => {
            document.body.classList.remove(theme)
        }
    }, [theme])

    return (
        <div className={`login-wrapper ${theme}`}>
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