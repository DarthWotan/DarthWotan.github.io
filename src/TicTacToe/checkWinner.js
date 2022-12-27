// returns an int or board:

export function checkWin(grid, player, moves) {


    /*const win = (board) => {
        return checkRows(board) ? 0 : checkColumns(board) ? 1 : checkDiagonals(board) ? 2 : null;
    }*/
    const checkRows = (board) => {


        for (let row = 0; row < board.length; row = row + 3) {

            for (let cell = 0; cell < 3; cell++) {
                // console.table({"Reihe": row, "Zelle": cell, ID: row + cell, Symbol: board[row + cell], Spieler: player});
                if (board[cell + row] != player) {
                    // console.log("kein Treffer")
                    break;
                } else if (cell == 2) {
                    // console.log("Treffer")
                    return true;
                }
            }

        }
        return false;


    }
    const checkColumns = (board) => {
        // checked: 0 3 6 && 1 4 6 && 2 5 8
        for (let col = 0; col < 3; col++) {

            for (let row = 0; row <= 6; row += 3) {
                // console.table({"Spalte": col, "Reihe": row, ID: col + row, Symbol: board[col + row], Spieler: player});
                // console.table({ID: row + col, Reihe: row, Spalte: col})
                if (board[row + col] != player) {
                    // console.log("kein Treffer")
                    break;
                } else if (row == 6) {
                    // console.log("Treffer")
                    return true;
                }
            }

        }
        return false;

    }
    const checkDiagonalsLeft = (board, size = 3) => {
        // Prüfe die linke obere bis rechte untere Diagonale
        for (let i = 0; i < size; i++) {
            if (board[i * (size + 1)] !== player) {
                break;
            }
            if (i === size - 1) {
                return true;
            }
        }

    }

    const checkDiagonalsRight = (board, size = 3) => {
        // Prüfe die rechte obere bis linke untere Diagonale
        for (let i = 0; i < size; i++) {
            if (board[(i + 1) * (size - 1)] !== player) {
                break;
            }
            if (i === size - 1) {
                return true;
            }
        }
        // Keine Diagonale hat das angegebene Symbol
        return false;
    }


    const reducer = () => {
        if (checkRows(grid)) {
            return [true, "ROW"];
        } else if (checkColumns(grid)) {
            return [true, "COLUMN"];
        } else if (checkDiagonalsLeft(grid)) {
            return [true, "DIAGONAL_LEFT"];
        } else if (checkDiagonalsRight(grid)) {
            return [true, "DIAGONAL_RIGHT"]
        } else {
            return [false, "NONE"]
        }
    }

    return reducer();


}
