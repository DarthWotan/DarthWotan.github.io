// returns an int or array:

export function checkWin(grid, player, moves) {


    const win = (array) => {
        return checkRows(array) ? 0 : checkColumns(array) ? 1 : checkDiagonals(array) ? 2 : null;
    }
    const checkRows = (array) => {

        for (let row = 0; row < array.length; row = row + 3) {

            for (let cell = 0; cell < 3; cell++) {
                //console.table({"Reihe": row, "Zelle": cell, ID: row + cell, Symbol: array[row + cell], Spieler: player});
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

    }
    const checkDiagonals = (array) => {

    }

    return checkRows(grid)

}
