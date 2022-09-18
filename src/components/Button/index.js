import React, { useContext } from 'react'

import ThemeContext from '../../context/ThemeContext'

function Button() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change Theme</button>
        </div>
    )
}

export default Button