// https://adventofcode.com/2024/day/4
const { readFile } = require("../lib.js")

const search = (r, c, grid) => {
    let M = grid.length
    let N = grid[0].length
    let count = {}

    const dirs = [
        [0, -1], [-1, -1], [-1, 0], [-1, 1],
        [0, 1], [1, 1], [1, 0], [1, -1]
    ]

    for (let [dr, dc] of dirs) {
        let str = ''
        for (let i = 1; i <= 3; i++) {
            let nR = r + (dr * i)
            let nC = c + (dc * i)
            if (nR < 0 || nR >= M || nC < 0 || nC >= N) continue
            str += grid[nR][nC]
        }
        count[str] = (count[str] || 0) + 1
    }

    return count['MAS'] || 0
}


const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
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
            if (char != 'X') continue
            res += search(r, c, grid)
        }
    }
    console.log(res)
    return res
    // expected sample.txt = 18
    // expected input.txt = 2569
}


main()