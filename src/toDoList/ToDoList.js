import React, {useState} from "react";
import "./ToDoList.css";

export function ToDoList() {
    const [tasks, setTasks] = useState([{done: false, text: "test bullet"}]);

    const addTask = (task) => {
        setTasks((oldTasks) => [...oldTasks, {done: false, text: task}]);

    }
    const deleteTask = (id) => {
        tasks.splice(id, 1);
        setTasks([...tasks]);

    }

    const handleClick = (event) => {
    }


    // (un)marks a bullet
    const check = (id) => {
        tasks[id].done = !tasks[id].done;
        setTasks([...tasks])
    }


    return (<div className="app">
        <header>
            <h1>Tasks to do</h1>
        </header>
        <main>
            <section id="input">
                <InputNewTask />

            </section>
            <section id="list">
                <ul className="fa-ul">
                    {tasks.map((element, index) => {
                        return (<ListItem element={element}
                                          key={index}
                                          check={() => check(index)}
                                          deleteTask={() => deleteTask(index)}/>);
                    })}
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
        <i className="fa-regular fa-trash-can" onClick={props.deleteTask}></i>
    </div>);
}

function InputNewTask(props) {
    return (<div className="circle white" id="input-circle">
        <i className="fa-solid fa-plus"></i>
    </div>);
}

