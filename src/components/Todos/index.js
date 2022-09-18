import React, { useEffect, useState, useContext } from 'react'

import Form from './Form'
import List from './List'
import Footer from './Footer'
import './styles.css'

import ThemeContext from '../../context/ThemeContext'
import Button from '../Button/index'

function Todo({ token }) {
    const [filtering, setFiltering] = useState(0);
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || [
            { input: 'Learn React', completed: false },
            { input: 'Learn Firebase', completed: true },
            { input: 'Learn GraphQL', completed: false },
        ]
    )

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('todos', todos)
    }, [todos])

    var foot;
    if (todos.length > 0) {
        foot = (
            <Footer
                addTodos={setTodos}
                todos={todos}
                filtering={filtering}
                setFiltering={setFiltering}
            />
        )
    }

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.add(theme)
        return () => {
            document.body.classList.remove(theme)
        }
    }, [theme])

    return (
        <div className={`todo ${theme}`}>
            <section className={`todoapp ${theme}`}>
                <header className='header'>
                    <h1>{token}'s todos</h1>
                    <Form
                        addTodos={setTodos}
                        todos={todos}
                    />
                </header>

                <div>
                    <List
                        addTodos={setTodos}
                        todos={todos}
                        filtering={filtering}
                    />
                </div>
                {foot}
            </section>
            <Button />
        </div>
    )
}

export default Todo;