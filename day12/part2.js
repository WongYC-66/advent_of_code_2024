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


    const dirs = [[-1, 0, "N"], [+1, 0, "S"], [0, -1, "W"], [0, +1, "E"]]
    const oppositeDir = {
        "N" : "S",
        "S" : "N",
        "E" : "W",
        "W" : "E",
    }

    const dfs = (r, c, dir = null, edge = 4) => {
        if (visited[r][c]) return [0, 0]
        visited[r][c] = true
        let area = 0

        let curr = grid[r][c]
        let nextCoords = []
        for (let [dr, dc, nextDir] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if (grid[nR][nC] != curr) continue  // diff symbol skip
            nextCoords.push([nR, nC, nextDir])
        }
        console.log({r, c})
        let visitedNeighbor = nextCoords.filter(([r, c, nextDir]) => visited[r][c])
        // console.log(visitedNeighbor)
        // visitedNeighbor = visitedNeighbor.filter(([r,c,nextDir]) => nextDir != oppositeDir[dir])
        // console.log(visitedNeighbor)


        let unvisited = nextCoords.filter(([r, c]) => !visited[r][c])
        // self
        area += 1
        edge -= (2 * visitedNeighbor.length)

        // dfs unvisited
        unvisited.forEach(([nR, nC, nextDir]) => {
            let turnBonus = (nextDir != dir && dir != null) ? 2 : 0
            let [nextEdge, nextArea] = dfs(nR, nC, nextDir, turnBonus)
            area += nextArea
            edge += nextEdge
        })
        console.log(r,c,curr,edge,area)
        return [edge, area]
    }

    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (visited[r][c]) continue
            let [edge, area] = dfs(r, c)
            let price = edge * area
            totalPrice += price
            console.log(grid[r][c], edge, area, price, totalPrice)
        }
    }


    return totalPrice
}

const main = async () => {
    let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("sample2.txt")
    // let rawFile = await readFile("sample4.txt")
    // let rawFile = await readFile("sample5.txt")
    // let rawFile = await readFile("sample3.txt")
    // let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let res = solve(rawFile)
    console.log(res)
    return res
    // expected sample.txt = 80
    // expected sample2.txt = 436
    // expected sample4.txt = 236
    // expected sample5.txt = 368
    // expected sample5.txt = 1206
    // expected input.txt = 1533644
}


main()