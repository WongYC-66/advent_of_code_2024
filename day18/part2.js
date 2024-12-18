// https://adventofcode.com/2024/day/18
const { readFile } = require("../lib.js")

const { PriorityQueue } = require('@datastructures-js/priority-queue');

const printGrid = (grid) => {
    console.log(grid.map(arr => arr.join('')))
}

const bfs = (grid) => {
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
            if (grid[nR][nC] == '#') continue
            minHeap.enqueue({ r: nR, c: nC, cost: cost + 1 })
        }
    }

    return -1 // not found
}

const solve = (rawFile, size) => {
    const MAX_ROW = size
    const MAX_COL = size

    let grid = Array.from(Array(MAX_ROW), () => Array(MAX_COL).fill('.'))

    for (let i = 0; i < rawFile.length; i++) {
        let str = rawFile[i]
        let [c, r] = str.split(',').map(Number)
        // console.log({ i, r, c })

        grid[r][c] = '#'
        // printGrid(grid)

        let cost = bfs(grid)
        if (cost == -1) return [c, r]
    }
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    // let res = solve(rawFile, 7)  // sample.txt
    let res = solve(rawFile, 71)    // input.txt
    console.log(res)
    return res

    // expected sample.txt = 6,1
    // expected input.txt = 20,44
}

main()