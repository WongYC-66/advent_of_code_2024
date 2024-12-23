// https://adventofcode.com/2024/day/19
const { readFile } = require("../lib.js")

const { PriorityQueue } = require('@datastructures-js/priority-queue');

const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]]

const printGrid = (grid) => {
    grid.forEach(row => console.log(row))
}

const runDijstra = (r, c, grid) => {
    let M = grid.length
    let N = grid[0].length

    let visited = Array.from(Array(M), () => Array(N).fill(false))

    let minHeap = new PriorityQueue((a, b) => a.cost - b.cost)
    minHeap.enqueue({ r, c, cost: 0 })

    while (minHeap.size()) {
        let { r, c, cost } = minHeap.dequeue()
        if (grid[r][c] == 'E') return cost
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

}

const findStart = (grid) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 'S') return [r, c]
        }
    }
}

const solve = (grid) => {
    grid = grid.map(row => row.split(''))
    let M = grid.length
    let N = grid[0].length

    // printGrid(grid)

    let savedCount = {}

    let [sr, sc] = findStart(grid)
    console.log([sr, sc])

    let originalCost = runDijstra(sr, sc, grid)
    // brute force + Dijstra
    for (let r = 1; r < M - 1; r++) {
        for (let c = 1; c < N - 1; c++) {
            if (grid[r][c] != '#') continue
            // console.log({r,c})
            // is '#'
            grid[r][c] = '.'
            let minCost = runDijstra(sr, sc, grid)
            let saved = originalCost - minCost
            savedCount[saved] = (savedCount[saved] || 0) + 1
            grid[r][c] = '#'
        }
    }

    console.log(originalCost)
    console.log(savedCount)

    let res = 0
    for(let saved in savedCount){
        if(Number(saved) >= 100){
            res += savedCount[saved]
        }
    }

    return res
}

const main = async () => {
    console.time('runtime')
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let res = solve(rawFile)
    console.log(res)
    console.timeEnd('runtime')
    return res

    // expected sample.txt = ?? print 
    // expected input.txt = 1452
}

main()