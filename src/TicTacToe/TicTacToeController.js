import {useEffect, useState, useRef} from "react";
import React from "react";
import "./TicTacToeController.css";
import {checkWin} from "./checkWinner";
import {useContainerDimensions} from "../UseContainerDimensions";

export function TicTacToeController() {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [player1, setPlayer1] = useState({symbol: "X", wins: 0})
    const [winner, setWinner] = useState(null)
    const [gameGoing, setGameGoing] = useState(true);
    const [grid, setGrid] = useState([null, null, null, null, null, null, null, null, null])
    const [moves, setMoves] = useState(0);
    const [winType, setWinType] = useState("NONE");
    // todo: https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
    const middleRef = useRef(null);

    const dimensions = useContainerDimensions(middleRef);


    const updateGrid = (event, position, player) => {
        let newGrid = grid;
        if (grid[position] == null) {
            newGrid = newGrid.map((element, index) => {
                if (index == position) {
                    return player == 0 ? 0 : 1
                } else {
                    return grid[index];
                }
            });
            setGrid(newGrid);
            setMoves(moves + 1);
            checkForWin(newGrid, currentPlayer, moves + 1);
            // console.log(checkWin(newGrid, currentPlayer, moves), winner)
            changePlayer(player);
        }
        if (checkTie(moves)) {
            setGameGoing(false);
        }
        console.log(middleRef.current.offsetWidth)

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

    const checkTie = (count) => count === 8;

    const checkForWin = (array, player, moves) => {
        const [win, type] = checkWin(array, player, moves);
        // win: boolean, type: String ("ROW", "COLUMN", "DIAGONAL_LEFT", "DIAGONAL_RIGHT", "NONE")
        if (win) {
            setWinner(currentPlayer);
            setGameGoing(false);
            setWinType(type);
        }


    }


    const changePlayer = (player) => {
        if (player == 1) {
            setCurrentPlayer(0);
        } else {
            setCurrentPlayer(1);
        }
    }

    const gridSection = () => {
        const grids = [];
        for (let i = 0; i < 9; i++) {
            grids.push(<Grid key={i} value={i} onClick={updateGrid} player={currentPlayer} grid={grid}
                             className={gameGoing ? "" : "blurred"} ref={i === 4 ? middleRef : null}/>);
        }
        return grids;
    }

    return (<main id="TicTacToe">
        <section id="grid-section">
            {gridSection()}
            {gameGoing ? null : <Line line={winType} x={dimensions.posx} y={dimensions.posy} width={dimensions.width} height={dimensions.height}/>}
        </section>
        <section>
            {!gameGoing ? <Subtitle winner={winner}
                                    restart={restart}/> : null} {/*if the game is over, the subtitle shows up*/}
        </section>

    </main>);
}


const Grid = React.forwardRef((props, ref) => {
    return (<div onClick={(event) => props.onClick(event, props.value, props.player)} id={"grid-element" + props.value}
                 className={`grid-element ${props.className}`}
                 value={props.value} ref={ref}>
        {props.grid[props.value] == 0 ? <i className="fa-solid fa-x"></i> : props.grid[props.value] == 1 ? <i
            className="fa-solid fa-o"></i> : ""}</div>);
})

function Subtitle(props) {
    return (<section id="grid-text-section" className="grid-text">
        <h1 className="text">
            {props.winner == null ? "Kein Gewinner! Unentschieden!" : `${props.winner} hat gewonnen!`}
        </h1>
        <h2 className="text">
            Möchtest du nocheinmal spielen?
        </h2>
        <button className="btn" onClick={props.restart}>
            New Round
        </button>

    </section>)
}

function Line(props) {
    const x = props.x ;
    const y = props.y;
    const width = props.width;
    const height = props.height;
    const lineType = props.line;

    const lineRef = useRef(null)

    const checkLine = () => {
        switch(lineType) {
            case "COLUMN": return "";
            case "ROW": return "rotate(90deg)";
            case "DIAGONAL_RIGHT": return "rotate(45deg)"
            case "DIAGONAL_LEFT": return "rotate(-45deg)"
            default: return "";
        }
    }
    const transform = () => {
        document.getElementById("line").style.left = x + width / 2 + "px";
        document.getElementById("line").style.top = y + height / 2 + "px";
        document.getElementById("line").style.transform = `translate(-${document.getElementById("line").offsetWidth / 1.4}px, -${document.getElementById("line").offsetHeight / 1.9}px) ${checkLine()} `
        document.getElementById("line").style.height = height * 4 + "px";
    }
    useEffect(() => {
        transform();
    })
    //console.log(checkLine(), lineType)
    return (<div id="line" ref={lineRef} >

    </div>);
}

