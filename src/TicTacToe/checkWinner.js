// returns an int or array:

export function checkWin(grid, player, moves) {


    const win = (array) => {
        return checkRows(array) ? 0 : checkColumns(array) ? 1 : checkDiagonals(array) ? 2 : null;
    }
    const checkRows = (array) => {
        let counter = 0;
        for(let row=0; row<array.length; row+3) {
            for(let cell=0; cell < 3; cell++){
                if(grid[row*cell]==player.symbol) {
                    counter++;
                }

            }}

    }
    const checkColumns = (array) => {

    }
    const checkDiagonals = (array) => {

    }

}
