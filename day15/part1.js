// https://adventofcode.com/2024/day/13
const { readFile } = require("../lib.js")

const dirs = {
    '<': [0, -1],
    '>': [0, +1],
    '^': [-1, 0],
    'v': [+1, 0],
}

const extractData = (rawFile) => {
    let grid = []
    let moves = []
    let isMove = false
    for (let str of rawFile) {
        if (str == "") {
            isMove = true
            continue
        }
        if (!isMove) {
            grid.push(str.split(''))
        } else {
            moves.push(...str.split(''))
        }
    }

    return [grid, moves]
}


const printGrid = (grid) => {
    console.log(grid.map(arr => arr.join('')))
}

const findRobot = (grid) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '@') return [r, c]
        }
    }
}

const getNextCoords = (r, c, dr, dc) => {
    return [r + dr, c + dc]
}

const swap = (r1, c1, r2, c2, grid) => {
    let tmp = grid[r1][c1]
    grid[r1][c1] = grid[r2][c2]
    grid[r2][c2] = tmp
}

const moveGrid = (grid, r, c, dr, dc) => {
    let [nR, nC] = getNextCoords(r, c, dr, dc)
    let nextPiece = grid[nR][nC]
    let [newRobotR, newRobotC] = [r, c] // default, if hits wall, no change
    if (nextPiece == '.') {
        // robot moves 1 cell
        swap(r, c, nR, nC, grid)
        newRobotR = nR
        newRobotC = nC
    } else if (nextPiece == 'O') {
        // robot push stone and moves 1 cell
        for (let i = 1; i < Infinity; i++) {
            console.log(r, c, dr, dc, nR, nC)

            let [r2, c2] = getNextCoords(nR, nC, i * dr, i * dc)

            if (grid[r2][c2] == '.') {
                // swap stone to here
                swap(r2, c2, nR, nC, grid)
                // move robot to original stone's pos
                swap(r, c, nR, nC, grid)
                newRobotR = nR
                newRobotC = nC
                break
            } else if (grid[r2][c2] == '#') {
                break
            }
        }
    }
    return [newRobotR, newRobotC]
}

const countGPS = (grid) => {
    let sum = 0
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 'O') {
                sum += r * 100 + c
            }
        }
    }
    return sum
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let [grid, moves] = extractData(rawFile)
    printGrid(grid)
    console.log(moves)
    console.log(moves.length)

    let [r, c] = findRobot(grid)

    moves.forEach(dir => {
        let [dr, dc] = dirs[dir]
        let [robotR, robotC] = moveGrid(grid, r, c, dr, dc)
        r = robotR
        c = robotC
    })

    printGrid(grid)

    let res = countGPS(grid)
    console.log(res)
    return res

    // expected sample.txt = 2028
    // expected sample2.txt = 10092
    // expected input.txt = 1568399
}


main()