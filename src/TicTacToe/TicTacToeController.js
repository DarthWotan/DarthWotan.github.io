import {useEffect, useState, useRef} from "react";
import React from "react";
import "./TicTacToeController.css";
import {checkWin} from "./checkWinner";
import {useContainerDimensions} from "../UseContainerDimensions";
import {FormEvent} from "react";

export function TicTacToeController() {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [player1, setPlayer1] = useState({symbol: "X", wins: 0})
    const [winner, setWinner] = useState(null)
    const [gameGoing, setGameGoing] = useState(true);
    const [grid, setGrid] = useState([null, null, null, null, null, null, null, null, null])
    const [moves, setMoves] = useState(0);
    const [winType, setWinType] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const cellReferences = [useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)];
    const [currenRef, setCurrentRef] = useState(cellReferences[4]);
    const dimensions = useContainerDimensions(currenRef);
    /*
    useEffect(() => {
        // console.log("Current reference has changed!")
    }, [currenRef])*/



    const updateGrid = (event, position, player) => {
        // console.log(dimensions)
        let newGrid = grid;
        if (grid[position] == null) {
            newGrid = newGrid.map((element, index) => {
                if (index === position) {
                    return player === 0 ? 0 : 1
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

        if (checkTie(moves) && !gameGoing) {
            setGameGoing(false);
            setWinType("TIE")

        }
        // [0, 3, 6]console.log(middleRef.current.offsetWidth)

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

    const checkForWin = (array: array, player: player, moves: number) => {
        const [win, type, newCoordinate] = checkWin(array, player, moves);
        // coordinate: for rows: 0, 3, 6 || for columns: 0, 1, 2
        // win: boolean, type: String ("ROW", "COLUMN", "DIAGONAL_LEFT", "DIAGONAL_RIGHT", "NONE")
        if (win) {
            const lineCoordinate = delogCoordinate(newCoordinate, type)
            setWinner(currentPlayer);
            setGameGoing(false);
            setWinType(type);
            setCurrentRef(cellReferences[lineCoordinate]);
        }


    }
    // returns array of the ids from the winning line cells
    const delogCoordinate = (cords: number, type: string): [] | null => {
        switch (type) {
            case "ROW": {
                switch (cords) {
                    case 0:
                        return 1;
                    case 3:
                        return 4;
                    case 6:
                        return 7;
                    default:
                        return null;
                }
                break;
            }
            case "COLUMN": {
                switch (cords) {
                    case 0:
                        return 3;
                    case 1:
                        return 4;
                    case 2:
                        return 5;
                    default:
                        return null;
                }
                break;
            }
            case "DIAGONAL_LEFT": {
                return 4;
            }
            case "DIAGONAL_RIGHT": {
                return 4;
            }
            default: {
                return null;
            }
        }
    }


    const changePlayer = (player) => {
        if (player == 1) {
            setCurrentPlayer(0);
        } else {
            setCurrentPlayer(1);
        }
    }

    const createGridSection = () => {
        const grids = [];


        for (let i = 0; i < 9; i++) {
            grids.push(<Grid key={i} value={i} onClick={updateGrid} player={currentPlayer}
                             grid={grid}
                             className={gameGoing ? "" : "blurred"}
                             winningLine={winningLine} ref={cellReferences[i]}/>);
        }
        return grids;
    }

    return (<main id="TicTacToe">
        <section id="grid-section">
            {createGridSection()}
            {gameGoing ? null :
                <Line line={winType} x={dimensions.posx} y={dimensions.posy} width={dimensions.width}
                      height={dimensions.height}/>}

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
    const x = props.x;
    const y = props.y;
    const width = props.width;
    const height = props.height;
    let [multiplicator, setMultiplicator] = useState(3);
    const lineType = props.line;
    const lineRef = useRef(null)

    const checkLine = () => {
        switch (lineType) {
            case "COLUMN": {
                return "";
            }
            case "ROW": {
                return "rotate(90deg)";
            }
            case "DIAGONAL_RIGHT": {
                setMultiplicator(4)
                return "rotate(45deg)"
            }
            case "DIAGONAL_LEFT": {
                setMultiplicator(4)
                return "rotate(-45deg)"
            }
            case "TIE": {
                setMultiplicator(0);
                return "";
            }
            default: {
                return ""
            }
                ;
        }
    };

    const transform = () => {
        document.getElementById("line").style.left = x + width / 2 + "px";
        document.getElementById("line").style.top = y + height / 2 + "px";
        document.getElementById("line").style.height = height * multiplicator + "px";
        document.getElementById("line").style.transform = `translate(-${document.getElementById("line").offsetWidth / 1.4}px, -${document.getElementById("line").offsetHeight / 1.95}px) ${checkLine()} `
    }
    useEffect(() => {
        transform();
    })
    return (<div id="line" ref={lineRef}>

    </div>);
}

// updates the cell --> class 'blurred' will be deleted if present
function updateCell(ref: React.RefObject<HTMLDivElement>): null {
    const cell = ref.current;
    cell.classList.add("test")
    console.log(cell.classList);
}