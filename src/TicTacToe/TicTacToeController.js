import {useState} from "react";
import React from "react";
import "./TicTacToeController.css";
import {checkWin} from "./checkWinner";

export function TicTacToeController() {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [player1, setPlayer1] = useState({symbol: "X", wins: 0})
    const [winner, setWinner] = useState(null)
    const [gameGoing, setGameGoing] = useState(true);
    const [grid, setGrid] = useState([null, null, null, null, null, null, null, null, null])
    const [moves, setMoves] = useState(0);

    const updateGrid = (event, position, player) => {
        let newGrid = grid;
        if (grid[position] == null) {
            newGrid = newGrid.map((element, index) => {
                if (index == position) {
                    return player == 0 ? 0 : 1
                } else {
                    return grid[index];
                }
            })

            setGrid(newGrid);
            setMoves(moves + 1);
            checkForWin(newGrid, currentPlayer,moves+1);
            // console.log(checkWin(newGrid, currentPlayer, moves), winner)

            changePlayer(player);
        }

        if (!newGrid.includes(null)) {
            // todo: check if there is one winner

            if (checkTie(moves)) {
                setGameGoing(false);
            }
        }

    }

    const restart = () => {
        clearGrid();
        setCurrentPlayer(0);
        setGameGoing(true);
        setWinner(null);
    }

    const clearGrid = () => {
        setGrid(grid.map(() => null))
        setMoves(0)

    }

    const checkTie = (count) => count <= 8;

    const checkForWin = (array, player, moves) => {
        const [win, type] = checkWin(array, player, moves);
        // win: boolean, type: String ("ROW", "COLUMN", "DIAGONAL", "NONE")
        if(win) {
            setWinner(currentPlayer);
            setGameGoing(false);
            console.log("hallo")
        }
        console.log(win);

    }


    const changePlayer = (player) => {
        if (player == 1) {
            setCurrentPlayer(0);
        }
        else {
            setCurrentPlayer(1);
        }
    }

    const gridSection = () => {
        const grids = [];
        for (let i = 0; i < 9; i++) {
            grids.push(<Grid value={i} onClick={updateGrid} player={currentPlayer} grid={grid}
                             className={gameGoing ? "" : "blurred"}/>);
        }
        return grids;
    }

    return (<main id="TicTacToe">
        <section id="grid-section">
            {gridSection()}
        </section>
        {!gameGoing ? <Subtitle winner={winner} restart={restart} />: null } {/*if the game is over, the subtitle shows up*/}

    </main>);
}


function Grid(props) {
    return (<div onClick={(event) => props.onClick(event, props.value, props.player)} id={"grid-element" + props.value}
                 className={`grid-element ${props.className}`}
                 value={props.value}>
        {props.grid[props.value] == 0 ? <i className="fa-solid fa-x"></i> : props.grid[props.value] == 1 ? <i
            className="fa-solid fa-o"></i> : ""}</div>);
}

function Subtitle(props) {
    return (
        <section id="grid-text-section" className="grid-text">
            <h1 className="text">
                {props.winner == null ? "Kein Gewinner! Unentschieden!" : `${props.winner} hat gewonnen!`}
            </h1>
            <h2 className="text">
                Möchtest du nocheinmal spielen?
            </h2>
            <button className="btn" onClick={props.restart}>
                New Round
            </button>

        </section>
    )
}