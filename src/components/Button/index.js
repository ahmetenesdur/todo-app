import React, { useContext } from 'react'
import Switch from '@mui/material/Switch';

import ThemeContext from '../../context/ThemeContext'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Button() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div className='onoff'>
            <Switch {...label} color="secondary" defaultChecked onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </div>
    )
}

export default Button