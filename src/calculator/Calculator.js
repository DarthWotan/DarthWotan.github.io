import React from "react";
import "./Calcucator.css"

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calc: "",
            result: "",
            res: false,
            historyShown: false,
            history: []
        }

        this.updateCalc = this.updateCalc.bind(this);
        this.calculate = this.calculate.bind(this);
        this.delete = this.delete.bind(this);
        this.toggleHistory = this.toggleHistory.bind(this);
        this.ops = ["-", "+", "*", "/", "."]

    }
    toggleHistory () {
        this.setState({
            historyShown: !this.state.historyShown
        })
    }
    updateCalc(value) {
        if((this.ops.includes(value) && this.state.calc === "" )||
            (this.ops.includes(value) && this.ops.includes(this.state.calc.slice(-1)))) {
            return;
        }

        this.setState({
            calc:  this.state.calc + value,
            res: false
        })
        if(!this.ops.includes(this.state.calc)){
            this.setState({
                result: eval(this.state.calc + value).toString()
            })
        }

    }

    calculate() {
        this.setState({
            result: eval(this.state.calc).toString(),
            history: [...this.state.history, this.state.calc],
            calc: "",
            res: true

        })

        console.log(this.state.history)
    }
    delete() {
        if(this.state.calc === "") {
            return;
        }
        const value = this.state.calc.slice(0, -1);
        this.setState({
            calc: value
        })
    }

    render() {
        const test = [];
        for(let i=9; i>=0;i--){
            test.push(<button className="btn" onClick={() => this.updateCalc(i.toString())} value={i}>{i}</button>)
        }
        return (
            <div className="wrapper-calc">
                <div className="calculator">
                    <div className="display">
                        <div className="wrapper-history">
                            <div className={this.state.historyShown ? "show-history toggle-history": "hide-history toggle-history"}>
                                <p>History:</p>
                                <p>{this.state.history.join(", ")}</p>

                            </div>
                            <i className="fa-solid fa-clock-rotate-left" onClick={this.toggleHistory}></i>
                        </div>
                        <p>{this.state.calc ? <span>({this.state.result})</span>: ""}{!this.state.res ? this.state.calc || 0: this.state.result} </p>
                    </div>
                    <div className="wrapper-keys">
                        <div className="operators">
                            <button className="btn" onClick={() => this.updateCalc("+")} value="+">+</button>
                            <button className="btn" onClick={() => this.updateCalc("-")} value="-">-</button>
                            <button className="btn" onClick={() => this.updateCalc("*")} value="x">x</button>
                            <button className="btn" onClick={() => this.updateCalc("/")} value="/">÷</button>

                            <button className="btn" onClick={this.delete} value="del">DEL</button>
                        </div>
                        <div className="numbers">
                            {test}
                            <button className="btn" onClick={() => this.updateCalc(".")} value=".">.</button>
                            <button className="btn" onClick={this.calculate} value="=">=</button>
                        </div>
                    </div>
                </div>
            </div>

            );
    }


}


