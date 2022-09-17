import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const initialFormValues = { input: '', completed: false }

function Form({ addTodos, todos }) {
    const [formValues, setFormValues] = useState(initialFormValues)

    useEffect(() => {
        setFormValues(initialFormValues)
    }, [todos])

    const handleChange = (e) => {
        setFormValues({ ...formValues, input: e.target.value })
    }

    const alert = () => {
        if (formValues.input.length < 3 && formValues.input.length > 0) {
            return (<Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="warning">
                    Todo must be at least 3 characters long
                </Alert>
            </Stack>)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formValues.input.trim() === '') return '';
        if (formValues.input.length < 3) return '';

        addTodos([...todos, formValues])
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}>
                <input
                    className='new-todo'
                    placeholder='What needs to be done?'
                    autoFocus
                    autoComplete='off'
                    name='input'
                    value={formValues.input}
                    onChange={handleChange}
                />
            </form>
            {alert()}
        </div>
    )
}

export default Form;