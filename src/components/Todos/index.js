import React, { useEffect, useState } from 'react'

import Form from './Form'
import List from './List'
import Footer from './Footer'
import './styles.css'

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

    return (
        <div className='todo'>
            <section className='todoapp'>
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
        </div>
    )
}

export default Todo;