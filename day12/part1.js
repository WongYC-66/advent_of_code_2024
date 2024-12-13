// https://adventofcode.com/2024/day/12
const { readFile } = require("../lib.js")

const sum = (arr) => {
    return arr.reduce((s, x) => s + x, 0)
}

const solve = (grid) => {
    let M = grid.length
    let N = grid[0].length

    let totalPrice = 0

    let visited = Array.from(Array(M), () => Array(N).fill(false))


    const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]]

    const dfs = (r, c) => {
        if (visited[r][c]) return [0, 0]
        visited[r][c] = true
        let area = 0
        let perimeter = 0

        let curr = grid[r][c]
        let nextCoords = []
        for (let [dr, dc] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if (grid[nR][nC] != curr) continue  // diff symbol skip
            nextCoords.push([nR, nC])
        }

        let visitedNeighbor = nextCoords.filter(([r, c]) => visited[r][c])
        let unvisited = nextCoords.filter(([r, c]) => !visited[r][c])
        // self
        area += 1
        perimeter += 4 - (2 * visitedNeighbor.length)

        // dfs unvisited
        unvisited.forEach(([nR, nC]) => {
            let [nextPerimeter, nextArea] = dfs(nR, nC)
            area += nextArea
            perimeter += nextPerimeter
        })

        return [perimeter, area]
    }

    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (visited[r][c]) continue
            let [perimeter, area] = dfs(r, c)
            let price = perimeter * area
            totalPrice += price
            console.log(grid[r][c], perimeter, area, price, totalPrice)
        }
    }


    return totalPrice
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("sample2.txt")
    // let rawFile = await readFile("sample3.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let res = solve(rawFile)
    console.log(res)
    return res
    // expected sample.txt = 140
    // expected sample2.txt = 772
    // expected sample3.txt = 1930
    // expected input.txt = 1533644
}


main()