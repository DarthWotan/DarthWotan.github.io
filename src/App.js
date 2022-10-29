import logo from './logo.svg';
import React from "react";
import './App.css';
import {Calculator} from "./calculator/Calculator"

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
    return (
        <div className="App">
          <header className="App-header">
              <section id="start">

              </section>
          </header>

            <main className="App-main">
               <section className="wrapper-calculator" id="calculator">
                   <Calculator />
               </section>
                <section id="weather-api">

                </section>
                <section id="toDoList">

                </section>



            </main>

            <footer>

            </footer>
        </div>
    );
  }
}

export default App;
