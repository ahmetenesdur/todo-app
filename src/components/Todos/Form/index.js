import { useState, useEffect } from 'react'

const initialFormValues = { input: '', completed: false }

function Form({ addTodos, todos }) {
    const [formValues, setFormValues] = useState(initialFormValues)

    useEffect(() => {
        setFormValues(initialFormValues)
    }, [todos])

    const handleChange = (e) => {
        setFormValues({ ...formValues, input: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formValues.input.trim() === '') return '';

        addTodos([...todos, formValues])
    }

    return (
        <form onSubmit={handleSubmit}>
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
    )
}

export default Form;