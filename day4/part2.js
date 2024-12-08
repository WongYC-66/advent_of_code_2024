// https://adventofcode.com/2024/day/4
const { readFile } = require("../lib.js")

const searchXMAS = (r, c, grid) => {
    // return Boolean
    let M = grid.length
    let N = grid[0].length
    let count = {}

    const dirs = [
        [-1, -1], [-1, 1],
        [1, 1], [1, -1]
    ]

    if (r == 0 || r == M - 1 || c == 0 || c == N - 1) return false

    for (let [dr, dc] of dirs) {
        let nR = r + dr
        let nC = c + dc
        if (nR < 0 || nR >= M || nC < 0 || nC >= N) continue
        let char = grid[nR][nC]
        count[char] = (count[char] || 0) + 1
    }

    const isDiagonalDiff = grid[r - 1][c - 1] != grid[r + 1][c + 1]
    return (count['M'] == 2 && count['S'] == 2) && isDiagonalDiff
}


const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input2.txt")
    let grid = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)
    // console.log(grid)

    let M = grid.length
    let N = grid[0].length
    let res = 0
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            let char = grid[r][c]
            if (char != 'A') continue

            res += searchXMAS(r, c, grid)
        }
    }

    console.log(res)
    return res
    // expected sample.txt = 9
    // expected input.txt = 1998
}


main()