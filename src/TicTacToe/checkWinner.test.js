import "@testing-library/jest-dom"

const getWinningLine = require("./checkWinner");

test("Grid empty", () => {
    const grid = [null, null, null, null, null, null, null, null, null]
    const player = 0;
    expect(getWinningLine.checkWin([grid, player, 0])).toStrictEqual([false, "NONE", null])
})

test("First row is winning line", () => {
    const grid = [0, 0, 0, 1, 1, null, null, null, null];
    const player = 0;
    expect(getWinningLine.checkWin(grid, player, 5)).toStrictEqual([true, "ROW", 0])
})
test("Second row is winning line", () => {
    const grid = [1, 1, null, 0, 0, 0, null, null, null];
    const player = 0;
    expect(getWinningLine.checkWin(grid, player, 5)).toStrictEqual([true, "ROW", 3])
})
test("Third row is winning line", () => {
    const grid = [1, 1, null, null, null, null, 0, 0, 0];
    const player = 0;
    expect(getWinningLine.checkWin(grid, player, 5)).toStrictEqual([true, "ROW", 6])
})

test("Grid is full, but one row is the winning line", () => {
    const grid = [1, 1, 0, 1, 1, 1, 0, 0, 0];
    const player = 0;
    expect(getWinningLine.checkWin(grid, player, 9)).toStrictEqual([true, "ROW", 6])
})

test("Column as winning line", () => {
    const grid = [0, null, null, 0, 1, 1, 0, null, null];
    const player = 0;
    expect(getWinningLine.checkWin(grid, player, 5)).toStrictEqual([true, "COLUMN", 0])
})

test("tie", () => {
    const grid = [0, 1, 0, 0, 1, 1, 1, 0, 1];
    const player = 1;
    expect(getWinningLine.checkWin(grid, player, 9)).toStrictEqual([false, "NONE", null]);
})