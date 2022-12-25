// returns an int or array:

export function checkWin(grid, player, moves) {


    const win = (array) => {
        return checkRows(array) ? 0 : checkColumns(array) ? 1 : checkDiagonals(array) ? 2 : null;
    }
    const checkRows = (array) => {

        for (let row = 0; row < array.length; row = row + 3) {

            for (let cell = 0; cell < 3; cell++) {
                // console.table({"Reihe": row, "Zelle": cell, ID: row + cell, Symbol: array[row + cell], Spieler: player});
                if (array[cell + row] != player) {
                    // console.log("kein Treffer")
                    break;
                }
                else if (cell == 2) {
                    // console.log("Treffer")
                    return true;
                }
            }

        }
        return false;


    }
    const checkColumns = (array) => {

        for (let col = 0; col < 3; col++) {

            for (let row = 0; row < 3; row++) {
                // console.table({"Reihe": row, "Zelle": row, ID: row + row, Symbol: array[col + row], Spieler: player});
                if (array[row + col] != player) {
                    // console.log("kein Treffer")
                    break;
                }
                else if (row == 2) {
                    // console.log("Treffer")
                    return true;
                }
            }

        }
        return false;

    }
    const checkDiagonals = (array) => {

    }

    const reducer = () => {
        if(checkRows(grid)) {
            return [true, "ROW"];
        }
        else if(checkColumns(grid)) {
            return [true,"COLUMN"];
        }
        else if(checkDiagonals(grid)) {
            return [true,"DIAGONAL"];
        }
        else {
            return [false, "NONE"]
        }
    }

    return reducer();


}
