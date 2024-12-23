// https://adventofcode.com/2024/day/19
const { readFile } = require("../lib.js")

const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]]

const printGrid = (grid) => {
    grid.forEach(row => console.log(row.join('')))
}

const findStart = (grid) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 'S') return [r, c]
        }
    }
}

const findEnd = (grid) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 'E') return [r, c]
        }
    }
}

const runDFS = (r, c, grid, reachableFromEnd) => {
    let M = grid.length
    let N = grid[0].length

    let visited = Array.from(Array(M), () => Array(N).fill(false))

    let stack = [{ r, c, cost: 0 }]

    let stepCount = {}

    while (stack.length) {
        let { r, c, cost } = stack.pop()

        if (grid[r][c] == 'E') {
            // End
            stepCount[cost] = (stepCount[cost] || 0) + 1
            break
        }

        // check if this spot can use cheat to reach END
        if (grid[r][c] != '#') {
            let coord = [r, c].join(',')
            if (coord in reachableFromEnd) {
                let totalCost = cost + reachableFromEnd[coord]
                stepCount[totalCost] = (stepCount[totalCost] || 0) + 1
            }
        }

        if (visited[r][c]) continue
        visited[r][c] = true

        for (let [dr, dc] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if (grid[nR][nC] == '#') continue
            stack.push({ r: nR, c: nC, cost: cost + 1 })
        }
    }

    return stepCount
}

const runBFS = (r, c, grid, MAX_STEPS) => {

    let M = grid.length
    let N = grid[0].length

    let coordToStep = {}
    let visited = Array.from(Array(M), () => Array(N).fill(false))

    // bfs - spread from End center,  outwards 20 steps
    let q = [{ r, c, step: 0 }]
    visited[r][c] = true

    while (q.length) {
        let { r, c, step } = q.shift()

        if (grid[r][c] == '.' || grid[r][c] == 'S' && step <= MAX_STEPS) {
            let key = [r, c].join()
            coordToStep[key] = step
        }

        for (let [dr, dc] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if (visited[nR][nC]) continue
            visited[nR][nC] = true
            q.push({ r: nR, c: nC, step: step + 1 })
        }
    }

    return coordToStep
}

const solve = (grid) => {
    grid = grid.map(row => row.split(''))
    let M = grid.length
    let N = grid[0].length

    printGrid(grid)

    let [sr, sc] = findStart(grid)
    let [er, ec] = findEnd(grid)

    console.log({ sr, sc })
    console.log({ er, ec })


    let reachableFromEnd = runBFS(er, ec, grid, 20)
    console.log({ reachableFromEnd })
    console.log(Object.keys(reachableFromEnd).length)

    let originalStep = runDFS(sr, sc, grid, {})
    console.log({ originalStep })

    let stepCount = runDFS(sr, sc, grid, reachableFromEnd)
    console.log({ stepCount })

    let filteredSteps = {}
    for(let step in stepCount){
        let oriStep = Number(Object.keys(originalStep)[0])
        step = Number(step)
        let saved = oriStep - step
        if(saved < 50) continue
        filteredSteps[saved] = stepCount[step]
    }

    console.log(filteredSteps)

    return 0
}

const main = async () => {
    console.time('runtime')
    let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("input.txt")
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