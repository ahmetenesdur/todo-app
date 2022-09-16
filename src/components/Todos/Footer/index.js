import React from 'react'

function Footer({ addTodos, todos, filtering, setFiltering }) {

    const clearCompleted = () => {
        addTodos(todos.filter((todo) => todo.completed === false))
    }

    var clearCompletedButton;
    if (todos.filter((todo) => todo.completed === true).length > 0) {
        clearCompletedButton =
            <button className='clear-completed' onClick={clearCompleted}>
                Clear completed
            </button>
    }


    return (
        <footer className='footer'>
            <span className='todo-count'>
                <strong>{todos.filter(item => item.completed === false).length}</strong> item left
            </span>
            <ul className='filters'>
                <li>
                    <a
                        href='#/'
                        id='all'
                        onClick={() => setFiltering(0)}
                        className={filtering === 0 ? "selected" : null}
                    >
                        All
                    </a>
                </li>
                <li>
                    <a
                        href='#/active'
                        id='active'
                        onClick={() => setFiltering(1)}
                        className={filtering === 1 ? "selected" : null}
                    >
                        Active
                    </a>
                </li>
                <li>
                    <a
                        href='#/completed'
                        id='completed'
                        onClick={() => setFiltering(2)}
                        className={filtering === 2 ? "selected" : null}
                    >
                        Completed
                    </a>
                </li>
            </ul>
            {clearCompletedButton}
        </footer>
    )
}

export default Footer;