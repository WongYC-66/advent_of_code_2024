// https://adventofcode.com/2024/day/18
const { readFile } = require("../lib.js")

const { PriorityQueue } = require('@datastructures-js/priority-queue');

const makeGrid = (rawFile, MAX_ROW, MAX_COL) => {
    let grid = Array.from(Array(MAX_ROW), () => Array(MAX_COL).fill('.'))

    for (let i = 0; i < 1024; i++) {
        let str = rawFile[i]
        let [c, r] = str.split(',').map(Number)
        grid[r][c] = '#'
    }

    return grid
}

const printGrid = (grid) => {
    console.log(grid.map(arr => arr.join('')))
}

const solve = (grid) => {
    let M = grid.length
    let N = grid[0].length

    // bfs dijstra
    let minHeap = new PriorityQueue((a, b) => a.cost - b.cost)
    minHeap.enqueue({ r: 0, c: 0, cost: 0 })

    const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]]
    let visited = Array.from(Array(M), () => Array(N).fill(false))

    while (minHeap.size()) {
        let { r, c, cost } = minHeap.dequeue()
        if (r == M - 1 && c == N - 1) return cost

        if (visited[r][c]) continue
        visited[r][c] = true

        for (let [dr, dc] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if(grid[nR][nC] == '#') continue
            minHeap.enqueue({ r: nR, c: nC, cost: cost + 1 })
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

    // const MAX_ROW = 7
    // const MAX_COL = 7
    const MAX_ROW = 71
    const MAX_COL = 71

    const grid = makeGrid(rawFile, MAX_ROW, MAX_COL)
    printGrid(grid)

    let res = solve(grid)
    console.log(res)
    return res

    // expected sample.txt = 22
    // expected input.txt = 338
}

main()