// https://adventofcode.com/2024/day/6
const fs = require('node:fs/promises');

const readFile = async (fileName) => {
    try {
        const data = await fs.readFile(`./${fileName}`, { encoding: 'utf8' });
        // console.log(data);
        return data
    } catch (err) {
        console.log(err);
    }
}

const canSolve = (r, c, dir, grid) => {
    let M = grid.length
    let N = grid[0].length

    let visited = new Set()

    const isAtEdge = (r, c) => {
        return (r == 0) || (r == M - 1) || (c == 0) || (c == N - 1)
    }

    const dirs = [
        [-1, 0],     // 0 = up
        [0, +1],     // 1 = right
        [+1, 0],     // 2 = down
        [0, -1],     // 3 = left
    ]

    while (!isAtEdge(r, c)) {
        let state = `${r}-${c}-${dir}`
        // console.log(state)
        if (visited.has(state))
            return false    // visited before, meaning a loop
        visited.add(state)

        let [dr, dc] = dirs[dir]
        let nR = r + dr
        let nC = c + dc

        // if block, switch direction,
        if (grid[nR][nC] == '#') {
            let rotatedDir = (dir + 1) % 4
            r = r
            c = c
            dir = rotatedDir
        } else {
            // no block keep moving to that block
            r = nR
            c = nC
            dir = dir
        }
    }

    return true
}

const findStartPos = (grid) => {
    let M = grid.length
    let N = grid[0].length
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (grid[r][c] == '^')
                return [r, c]
        }
    }
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let grid = rawFile
    grid = grid.map(r => r.split(''))

    let res = 0
    let [startR, startC] = findStartPos(grid)

    let M = grid.length
    let N = grid[0].length
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (grid[r][c] != '.') continue

            // BRUTE FORCE
            // is a '.' , try to replace with '#' and see if can solve
            grid[r][c] = '#'
            if (!canSolve(startR, startC, 0, grid)) {
                // console.log(r, c, "cant solve")
                res += 1
            }
            // undo, backtrack
            grid[r][c] = '.'
        }
    }
    console.log(startR, startC)
    console.log(res)
    return res

}


main()