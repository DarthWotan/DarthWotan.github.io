import React, {useState} from "react";
import "./ToDoList.css";

export function ToDoList() {
    const [tasks, setTasks] = useState([{done: false, text: "example task"}]);

    const [activeMenu, setActiveMenu] = useState(false);

    const [inputValue, setInputValue] = useState("");

    const addTask = (event, task) => {
        event.preventDefault();
        setTasks((oldTasks) => [...oldTasks, {done: false, text: task}]);
        setInputValue("");


    }

    const handleInput = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue)
    }


    const deleteTask = (id) => {
        tasks.splice(id, 1);
        setTasks([...tasks]);

    }


    // (un)marks a bullet
    const check = (id) => {
        tasks[id].done = !tasks[id].done;
        tasks.sort((a, b) => Number(a.done) - Number(b.done))
        //--> to sort the tasks (first the unfinished tasks) --> maybe with smooth transition (zu hektisch)

        setTasks([...tasks])
    }


    return (<div className="app">
        <header>
            <h1>Tasks to do</h1>
        </header>
        <main id="list-main">
            <section id="input">
                <InputNewTask active={activeMenu} toggleMenu={() => {
                    setActiveMenu(!activeMenu);
                    setInputValue("");
                }}
                              handleSubmit={addTask}
                              handleChange={handleInput}
                              value={inputValue}
                />

            </section>
            <section id="list">
                <ul className="fa-ul">
                    <span className="list-item-span">{tasks.map((element, index) => {
                        return (<ListItem element={element}
                                          key={index}
                                          check={() => check(index)}
                            /* deleteTask={() => deleteTask(index)} */
                        />);
                    })}
                    </span>
                    <span className="delete-icon-span">
                        {tasks.map((element, index) => {
                            return <li><i className="fa-regular fa-trash-can" onClick={() => deleteTask(index)}></i>
                            </li>
                        })}
                    </span>
                </ul>

            </section>
        </main>

    </div>);

}

function ListItem(props) {
    let icon;
    if (props.element.done) {
        icon = <span className="fa-li"><i className="fa-regular fa-square-check list-bullet"></i></span>;
    } else {
        icon = <span className="fa-li"><i className="fa-regular fa-square list-bullet"></i></span>;
    }


    return (<div className="list-item-wrapper">
        <li onClick={props.check} className={props.element.done ? "list-item done" : "list-item"}>{icon}<span
            className="list-text">{props.element.text}</span>
        </li>
    </div>);
}

function InputNewTask(props) {


    return (<div className={props.active ? "white active" : " invisible"} id="input-menu">
        <div onClick={props.toggleMenu} className="white circle" id="toggle-circle">
            <span><i className="fa-solid fa-plus"></i></span>
        </div>
        <form id="new-task-form" onSubmit={(event => props.handleSubmit(event, props.value))}>
            <input className={props.active ? "" : "invisible"} type="text" value={props.value}
                   onChange={props.handleChange} id="text-input-form" required={true} placeholder="Feed the dogs"/>
            <button className={props.active ? "" : "invisible"} type="submit" id="form-button"><i
                className="fa-solid fa-check"></i></button>
        </form>
    </div>);
}

