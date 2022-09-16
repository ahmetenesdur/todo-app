import { useEffect, useState } from 'react'

function List({ addTodos, todos, filtering }) {

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [editedInput, setEditedInput] = useState("");
    var toggle;

    useEffect(() => {
        if (todos.filter((todo) => todo.completed === false).length > 0) {
            setIsSubscribed(false)
        } else setIsSubscribed(true)
    }, [todos])

    const handleChange = () => {
        if (isSubscribed === true) {
            addTodos(todos.map(todo => {
                return { ...todo, completed: true }
            }))
        } else {
            addTodos(todos.map(todo => {
                return { ...todo, completed: false }
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
        let newArr = [...todos];
        newArr[e.target.parentElement.id].input = editedInput;
        addTodos(newArr.filter((e) => e.input !== ""));

        newArr[e.target.parentElement.id].isCompleted === true ?
            e.target.parentElement.className = "completed" :
            e.target.parentElement.className = "";
    }

    return (
        <div>
            {toggle}
            <ul className='todo-list'>
                {
                    (filtering === 0
                        ? todos
                        : (filtering === 1
                            ? (todos.filter(e => e.completed === false))
                            : (todos.filter(e => e.completed === true))
                        )).map((todo, index) => (
                            <li
                                key={index}
                                id={index}
                                className={todo.completed ? 'completed' : ''}>
                                <div className='view'>
                                    <input
                                        className='toggle'
                                        type='checkbox'
                                        id={todo.id}
                                        checked={todo.completed}
                                        onChange={() => {
                                            const newTodos = [...todos]
                                            newTodos[index].completed = !newTodos[index].completed
                                            addTodos(newTodos)
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