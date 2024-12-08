// https://adventofcode.com/2024/day/6
const { readFile } = require("../lib.js")

const findDistinctPos = (r, c, dir, grid) => {
    let M = grid.length
    let N = grid[0].length

    let visited = Array(M).fill().map(_ => Array(N).fill(false))

    const isAtEdge = (r, c) => {
        return (r == 0) || (r == M - 1) || (c == 0) || (c == N - 1)
    }

    const dirs = [
        [-1, 0],     // 0 = up
        [0, +1],     // 1 = right
        [+1, 0],     // 2 = down
        [0, -1],     // 3 = left
    ]

    //  DFS failed maximum call stack size exceed chatgpt Sugggested in v8 nodejs, is about 10k-16k
    //  M = 130, N = 130, 16900 stack. LMAO
    //  use while loop then .ahhaa

    // const dfs = (r, c, dirIdx) => {
    //     visited[r][c] = true
    //     if (isAtEdge(r, c)) return  // base case

    //     let [dr, dc] = dirs[dirIdx]
    //     let nR = r + dr
    //     let nC = c + dc

    //     // if block, switch direction,
    //     if (grid[nR][nC] == '#') {
    //         let rotatedDir = (dirIdx + 1) % 4
    //         dfs(r, c, rotatedDir)
    //     } else {
    //         // no block keep moving to that block
    //         dfs(nR, nC, dirIdx)
    //     }

    // }

    // dfs(r, c, 0)    // go up bcoz "^"

    while (!isAtEdge(r, c)) {
        visited[r][c] = true
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
            visited[r][c] = true
        }
    }

    return visited.flat().filter(Boolean).length
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let grid = rawFile
    let M = grid.length
    let N = grid[0].length
    console.log(M, N)

    let res = 0

    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (grid[r][c] == '^') {
                res = findDistinctPos(r, c, 0, grid)
            }
        }
    }
    console.log(res)
    return res
    // expected sample.txt = 41
    // expected input.txt = 5030
}


main()