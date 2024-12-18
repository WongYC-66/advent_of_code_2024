// https://adventofcode.com/2024/day/16
const { readFile } = require("../lib.js")

const { PriorityQueue } = require('@datastructures-js/priority-queue');


const solve = (grid) => {
    let M = grid.length
    let N = grid[0].length

    const findS = () => {
        for (let r = 0; r < M; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] == 'S') return [r, c]
            }
        }
    }


    // dirCode = [0,1,2,3]
    //            E S W N

    const dirs = [
        [0, +1, 0],     // [dr,dc, dirCode] e.g. 0,1,E
        [+1, 0, 1],     // S
        [0, -1, 2],     // W
        [-1, 0, 3],     // N
    ]

    const rotationCost = (dir, nextDir) => {
        let cost = Math.abs(nextDir - dir) * 1000
        return Math.min(cost, 1000)
    }

    const [r, c] = findS()
    let minHeap = new PriorityQueue((a, b) => a.cost - b.cost)
    minHeap.enqueue({ r, c, dir: 0, cost: 0, path: [[r, c]] })

    let visited = Array.from(Array(M), () => Array(N).fill(Infinity))

    let completedPath = []

    while (minHeap.size()) {
        // let {r:endR, c:endC} = minHeap.front()
        // if (grid[endR][endC] == 'E') break

        let { r, c, dir, cost, path } = minHeap.dequeue()

        // let key = `${r}-${c}-${cost}`
        // if (seen.has(key)) continue
        // seen.add(key)

        if (cost > visited[r][c]) continue
        visited[r][c] = Math.min(visited[r][c], cost)

        if (grid[r][c] == 'E') {
            completedPath.push({ cost, path })
            continue
        }

        console.log({ r, c, dir, cost })

        for (let [dr, dc, nextDir] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            if (grid[nR][nC] == '#') continue
            let nextCost = cost + 1 + rotationCost(dir, nextDir)
            minHeap.enqueue({ r: nR, c: nC, dir: nextDir, cost: nextCost, path: [...path, [nR, nC]] })
        }

    }

    // preprocess
    console.log(completedPath)
    console.log(visited)
}

const main = async () => {
    let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("sample2.txt")
    // let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)


    let res = solve(rawFile)
    console.log(res)
    return res

    // expected sample.txt = 45
    // expected sample2.txt = 64
    // expected input.txt = ???
}

main()