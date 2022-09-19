import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const initialFormValues = { input: '', isCompleted: false }

function Form({ addTodos, todos }) {
    const [formValues, setFormValues] = useState(initialFormValues)

    useEffect(() => {
        setFormValues(initialFormValues)
    }, [todos])

    const alert = () => {
        if (formValues.input.length < 3 && formValues.input.length > 0) {
            return (<Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="warning">
                    Todo must be at least 3 characters long
                </Alert>
            </Stack>)
        }
    }

    const handleChange = (e) => {
        setFormValues({ ...formValues, input: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formValues.input.trim() === '') return '';
        if (formValues.input.length < 3) return '';

        addTodos([...todos, formValues])
    }

    const sendTodo = (e) => {
        e.preventDefault()
        axios.post('https://632796839a053ff9aaa7bdc3.mockapi.io/todos', {
            formValues
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        return setFormValues(initialFormValues);
    }

    return (
        <div>
            {alert()}
            <form
                onSubmit={sendTodo}>
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
        </div>
    )
}

export default Form;