// https://adventofcode.com/2024/day/10
const { readFile } = require("../lib.js")

const sum = (arr) => {
    return arr.reduce((s, x) => s + x, 0)
}

const findZero = grid => {
    let M = grid.length
    let N = grid[0].length
    let zeros = []
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (grid[r][c] == 0)
                zeros.push([r, c])
        }
    }
    return zeros
}

const findScore = ([r, c], grid) => {
    let M = grid.length
    let N = grid[0].length

    // bfs
    let visited = Array.from(Array(M), _ => Array(N).fill(false))
    let nine_count = 0
    let q = [[r, c, 0]]

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, +1]]

    while (q.length) {
        let [r, c, val] = q.shift()

        if (visited[r][c]) continue
        visited[r][c] = true

        if (val == 9) {
            nine_count += 1
            continue
        }

        for (let [dr, dc] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if (grid[nR][nC] === val + 1)
                q.push([nR, nC, val + 1])
        }
    }

    return nine_count
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    const grid = rawFile.map(r => r.split('').map(c => isNaN(c) ? c : Number(c)))
    // console.log(grid)

    const getZeroCoords = findZero(grid)
    console.log(getZeroCoords)

    const scores = getZeroCoords.map(coord => findScore(coord, grid))
    console.log(scores)

    let res = sum(scores)
    console.log(res)
    return res
    // expected sample.txt = 36
    // expected input.txt = 482
}


main()