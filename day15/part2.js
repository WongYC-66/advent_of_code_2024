// https://adventofcode.com/2024/day/15
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

const expand = (grid) => {
    return grid.map(row => {
        let newRow = []
        row.forEach(cell => {
            switch (cell) {
                case '#':
                    newRow.push('#', '#')
                    break
                case 'O':
                    newRow.push('[', ']')
                    break
                case '.':
                    newRow.push('.', '.')
                    break
                case '@':
                    newRow.push('@', '.')
                    break
            }
        })
        return newRow
    })
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

const toString = (arr) => {
    return arr.join(',')
}

const toCoords = str => {
    return str.split(',').map(Number)
}

const moveGrid = (grid, r, c, dir) => {

    let [dr, dc] = dirs[dir]

    const verticalNextVector = {
        '[': +1,
        ']': -1
    }

    const bfs = () => {
        let q = [new Set()]
        q[0].add(toString([r, c]))

        while (q.length) {
            let nextSet = new Set()
            for (let str of q.at(-1)) {
                let [r, c] = toCoords(str)
                let [nR, nC] = getNextCoords(r, c, dr, dc)
                let nextPiece = grid[nR][nC]

                if (nextPiece == '#') return false      // hit wall, Invalid move
                if (nextPiece == '.') continue

                if (dir == '^' || dir == 'v') {
                    let offSet = verticalNextVector[nextPiece]
                    nextSet.add(toString([nR, nC]))
                    nextSet.add(toString([nR, nC + offSet]))
                } else if (dir == '<' || dir == '>') {
                    nextSet.add(toString([nR, nC]))
                }
            }
            if (nextSet.size) {
                q.push(nextSet)
            } else {
                break
            }
        }

        // valid, move unwind stack and swap line to next
        while (q.length) {
            let set = q.pop()
            for (let str of set) {
                let [r, c] = toCoords(str)
                let [nR, nC] = getNextCoords(r, c, dr, dc)
                swap(r, c, nR, nC,grid)
            }
        }
        return true
    }

    let [newRobotR, newRobotC] = getNextCoords(r, c, dr, dc)

    if (bfs(r, c, dir)) {
        // can swap/push
        return [newRobotR, newRobotC]
    } else {
        return [r, c]    // cant' swap/push, return original
    }

}

const countGPS = (grid) => {
    let sum = 0
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '[') {
                sum += r * 100 + c
            }
        }
    }
    return sum
}

const main = async () => {
    // let rawFile = await readFile("sample2.txt")
    // let rawFile = await readFile("sample3.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let [grid, moves] = extractData(rawFile)
    // printGrid(grid)
    grid = expand(grid)
    // printGrid(grid)

    // console.log(moves)
    // console.log(moves.length)

    let [r, c] = findRobot(grid)

    moves.forEach(dir => {
        let [robotR, robotC] = moveGrid(grid, r, c, dir)
        r = robotR
        c = robotC
    })

    // printGrid(grid)

    let res = countGPS(grid)
    console.log(res)
    return res

    // expected sample2.txt = 9021
    // expected input.txt = 1575877
}


main()