import React, {useState} from "react";
import "./ToDoList.css";

export function ToDoList() {
    const [tasks, setTasks] = useState([{done: false, text: "test bullet"}, {
        done: false, text: "test bullet2"
    }, {done: false, text: "test bullet332432423"}]);

    const [activeMenu, setActiveMenu] = useState(false)

    const addTask = (task) => {
        setTasks((oldTasks) => [...oldTasks, {done: false, text: task}]);

    }

    const example = () => {
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
        //todo: tasks.sort((a, b) => Number(a.done) - Number(b.done))
        //--> to sort the tasks (first the unfinished tasks) --> maybe with smooth transition (zu hektisch)

        setTasks([...tasks])
    }


    return (<div className="app">
        <header>
            <h1>Tasks to do</h1>
        </header>
        <main>
            <section id="input">
                <InputNewTask active={activeMenu} toggleMenu={() => setActiveMenu(!activeMenu)}/>

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


    return (<div className={props.active ? "white active" : " invisible"} id="input-menu">
        <div onClick={props.toggleMenu} className="white circle" id="toggle-circle">
            <i className="fa-solid fa-plus"></i>
        </div>
        { /*<form>
        <input type="text" value={props.value} onChange={props.handleChange}/>
            <button type="submit"><i className="fa-solid fa-check"></i></button>
        </form>*/}
    </div>);
}

