import React, { useContext } from 'react'

import ThemeContext from '../../../context/ThemeContext';

function Footer({ addTodos, todos, filtering, setFiltering }) {

    const clearCompleted = () => {
        addTodos(todos.filter((todo) => todo.isCompleted === false))
    }

    var clearCompletedButton;
    if (todos.filter((todo) => todo.isCompleted === true).length > 0) {
        clearCompletedButton =
            <button className='clear-isCompleted' onClick={clearCompleted}>
                Clear isCompleted
            </button>
    }

    const { theme } = useContext(ThemeContext);

    return (
        <footer className={`footer ${theme}`}>
            <span className='todo-count'>
                <strong>{todos.filter(item => item.isCompleted === false).length}</strong> item left
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
                        href='#/isCompleted'
                        id='isCompleted'
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