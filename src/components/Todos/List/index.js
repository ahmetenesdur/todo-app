import axios from 'axios';
import React, { useEffect, useState } from 'react'

function List({ addTodos, todos, filtering }) {

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [editedInput, setEditedInput] = useState("");
    var toggle;

    useEffect(() => {
        if (todos.filter((todo) => todo.isCompleted === false).length > 0) {
            setIsSubscribed(false)
        } else setIsSubscribed(true)
    }, [todos])

    const handleChange = () => {
        if (isSubscribed === true) {
            addTodos(todos.map(todo => {
                return { ...todo, isCompleted: true }
            }))
        } else {
            addTodos(todos.map(todo => {
                return { ...todo, isCompleted: false }
            }))
        }
    }

    const done = () => {
        setIsSubscribed(isSubscribed === false ? true : false);
    }

    if (todos.length > 0) {
        toggle =
            <section className='main'>
                <input
                    id="toggle-all"
                    className='toggle-all'
                    type="checkbox"
                    onChange={handleChange}
                    checked={isSubscribed} />
                <label
                    htmlFor="toggle-all"
                    onClick={done}>
                    Mark all as complete
                </label>
            </section >
    }

    const changeEditedInput = (e) => {
        setEditedInput(e.target.value);
    }

    const submitEditedInput = (e) => {
        var newArr = [...todos];
        newArr[e.target.parentElement.id].input = editedInput;
        addTodos(newArr.filter((e) => e.input !== ""));

        newArr[e.target.parentElement.id].isCompleted === true ?
            e.target.parentElement.className = "isCompleted" :
            e.target.parentElement.className = "";

        axios.put(`https://632796839a053ff9aaa7bdc3.mockapi.io/todos/${Number(e.target.parentElement.id) + 1}`, {
            formValues: newArr[e.target.parentElement.id]
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get('https://632796839a053ff9aaa7bdc3.mockapi.io/todos')
            .then((response) => {
                setApiData(response.data.map((e) => e.formValues));
            }, (error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        addTodos(apiData);
    }, [apiData])

    return (
        <div>
            {toggle}
            <ul className='todo-list'>
                {
                    (filtering === 0
                        ? todos
                        : (filtering === 1
                            ? (todos.filter(e => e.isCompleted === false))
                            : (todos.filter(e => e.isCompleted === true))
                        )).map((todo, index) => (
                            <li
                                key={index}
                                id={index}
                                className={todo.isCompleted ? 'isCompleted' : ''}>
                                <div className='view'>
                                    <input
                                        className='toggle'
                                        type='checkbox'
                                        id={todo.id}
                                        checked={todo.isCompleted}
                                        onChange={() => {
                                            const newTodos = [...todos]
                                            newTodos[index].isCompleted = !newTodos[index].isCompleted
                                            addTodos(newTodos)
                                            axios.put(`https://632796839a053ff9aaa7bdc3.mockapi.io/todos/${todo.id}`, {
                                                formValues: newTodos[index]
                                            })
                                        }}
                                    />
                                    <label onDoubleClick={(e) => {
                                        setEditedInput(e.target.closest('.view').innerText);
                                        e.target.parentElement.parentElement.className = "editing";
                                        e.target.parentElement.parentElement.lastChild.focus();
                                    }}>
                                        {todo.input}
                                    </label>
                                    <button
                                        className='destroy'
                                        id={todo.id}
                                        onClick={() => {
                                            const newTodos = [...todos]
                                            newTodos.splice(index, 1)
                                            addTodos(newTodos)
                                            axios.delete(`https://632796839a053ff9aaa7bdc3.mockapi.io/todos/${todo.id}`)
                                        }}
                                    />
                                </div>
                                <input
                                    name="edit"
                                    className="edit"
                                    autoComplete="off"
                                    value={editedInput}
                                    onBlur={submitEditedInput}
                                    onChange={changeEditedInput}
                                />
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default List;