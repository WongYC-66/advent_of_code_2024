// https://adventofcode.com/2024/day/21
const { readFile } = require("../lib.js")

const numPads = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [null, 0, 'A'],
]

const dirPads = [
    [null, '^', 'A'],
    ['<', 'v', '>'],
]

const dirs = [
    [-1, 0, '^'],
    [+1, 0, 'v'],
    [0, -1, '<'],
    [0, +1, '>']
]

const findPos = (target, pads) => {
    let M = pads.length
    let N = pads[0].length
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (pads[r][c] === target) return [r, c]
        }
    }
}

const bfs = (start, end, pads) => {
    // find all possibles paths, shortest
    // e.g. from 2 -> 9: [ '^^>A', '^>^A', '>^^A' ], there are 3 shortest options
    let M = pads.length
    let N = pads[0].length

    let paths = []

    let [sr, sc] = findPos(start, pads)
    let q = [[sr, sc, '']]
    while (q.length) {
        let len = q.length
        let isLastCycle = false
        for (let i = 0; i < len; i++) {
            let [r, c, path] = q.shift()
            if (pads[r][c] === end) {             // reached end
                isLastCycle = true
                paths.push(path + 'A')
                continue
            }
            for (let [dr, dc, char] of dirs) {
                let nR = r + dr
                let nC = c + dc
                if (nR < 0 || nR == M || nC < 0 || nC == N) continue
                if (pads[nR][nC] == null) continue
                q.push([nR, nC, path + char])
            }
        }
        if (isLastCycle) break  // stop at last round of BFS when either 1 reach end, guarantee shortest path
    }
    return paths
}

const buildShortcuts = (cells, pads) => {
    let graph = {}
    for (let start of cells) {
        for (let end of cells) {
            let paths = bfs(start, end, pads)
            if (!graph[start]) graph[start] = {}
            graph[start][end] = paths
        }
    }
    return graph

    // build these 2 

    // DIR -> DIR

    // {
    //     '<': {
    //       '<': [ 'A' ],
    //       '^': [ '>^A' ],
    //       '>': [ '>>A' ],
    //       v: [ '>A' ],
    //       A: [ '>^>A', '>>^A' ]
    //     },
    //     '^': {
    //       '<': [ 'v<A' ],
    //       '^': [ 'A' ],
    //       '>': [ 'v>A', '>vA' ],
    //       v: [ 'vA' ],
    //       A: [ '>A' ]
    //     },
    //     '>': {
    //       '<': [ '<<A' ],
    //       '^': [ '^<A', '<^A' ],
    //       '>': [ 'A' ],
    //       v: [ '<A' ],
    //       A: [ '^A' ]
    //     },
    //     v: {
    //       '<': [ '<A' ],
    //       '^': [ '^A' ],
    //       '>': [ '>A' ],
    //       v: [ 'A' ],
    //       A: [ '^>A', '>^A' ]
    //     },
    //     A: {
    //       '<': [ 'v<<A', '<v<A' ],
    //       '^': [ '<A' ],
    //       '>': [ 'vA' ],
    //       v: [ 'v<A', '<vA' ],
    //       A: [ 'A' ]
    //     }
    //   }

    // NUMPAD -> NUMPAD

    // {
    //     '0': {
    //       '0': [ 'A' ],
    //       '1': [ '^<A' ],
    //       '2': [ '^A' ],
    //       '3': [ '^>A', '>^A' ],
    //       '4': [ '^^<A', '^<^A' ],
    //       '5': [ '^^A' ],
    //       '6': [ '^^>A', '^>^A', '>^^A' ],
    //       '7': [ '^^^<A', '^^<^A', '^<^^A' ],
    //       '8': [ '^^^A' ],
    //       '9': [ '^^^>A', '^^>^A', '^>^^A', '>^^^A' ],
    //       A: [ '>A' ]
    //     },
    //     '1': {
    //       '0': [ '>vA' ],
    //       '1': [ 'A' ],
    //       '2': [ '>A' ],
    //       '3': [ '>>A' ],
    //       '4': [ '^A' ],
    //       '5': [ '^>A', '>^A' ],
    //       '6': [ '^>>A', '>^>A', '>>^A' ],
    //       '7': [ '^^A' ],
    //       '8': [ '^^>A', '^>^A', '>^^A' ],
    //       '9': [ '^^>>A', '^>^>A', '^>>^A', '>^^>A', '>^>^A', '>>^^A' ],
    //       A: [ '>v>A', '>>vA' ]
    //     },
    //     '2': {
    //       '0': [ 'vA' ],
    //       '1': [ '<A' ],
    //       '2': [ 'A' ],
    //       '3': [ '>A' ],
    //       '4': [ '^<A', '<^A' ],
    //       '5': [ '^A' ],
    //       '6': [ '^>A', '>^A' ],
    //       '7': [ '^^<A', '^<^A', '<^^A' ],
    //       '8': [ '^^A' ],
    //       '9': [ '^^>A', '^>^A', '>^^A' ],
    //       A: [ 'v>A', '>vA' ]
    //     },
    //     '3': {
    //       '0': [ 'v<A', '<vA' ],
    //       '1': [ '<<A' ],
    //       '2': [ '<A' ],
    //       '3': [ 'A' ],
    //       '4': [ '^<<A', '<^<A', '<<^A' ],
    //       '5': [ '^<A', '<^A' ],
    //       '6': [ '^A' ],
    //       '7': [ '^^<<A', '^<^<A', '^<<^A', '<^^<A', '<^<^A', '<<^^A' ],
    //       '8': [ '^^<A', '^<^A', '<^^A' ],
    //       '9': [ '^^A' ],
    //       A: [ 'vA' ]
    //     },
    //     '4': {
    //       '0': [ 'v>vA', '>vvA' ],
    //       '1': [ 'vA' ],
    //       '2': [ 'v>A', '>vA' ],
    //       '3': [ 'v>>A', '>v>A', '>>vA' ],
    //       '4': [ 'A' ],
    //       '5': [ '>A' ],
    //       '6': [ '>>A' ],
    //       '7': [ '^A' ],
    //       '8': [ '^>A', '>^A' ],
    //       '9': [ '^>>A', '>^>A', '>>^A' ],
    //       A: [ 'v>v>A', 'v>>vA', '>vv>A', '>v>vA', '>>vvA' ]
    //     },
    //     '5': {
    //       '0': [ 'vvA' ],
    //       '1': [ 'v<A', '<vA' ],
    //       '2': [ 'vA' ],
    //       '3': [ 'v>A', '>vA' ],
    //       '4': [ '<A' ],
    //       '5': [ 'A' ],
    //       '6': [ '>A' ],
    //       '7': [ '^<A', '<^A' ],
    //       '8': [ '^A' ],
    //       '9': [ '^>A', '>^A' ],
    //       A: [ 'vv>A', 'v>vA', '>vvA' ]
    //     },
    //     '6': {
    //       '0': [ 'vv<A', 'v<vA', '<vvA' ],
    //       '1': [ 'v<<A', '<v<A', '<<vA' ],
    //       '2': [ 'v<A', '<vA' ],
    //       '3': [ 'vA' ],
    //       '4': [ '<<A' ],
    //       '5': [ '<A' ],
    //       '6': [ 'A' ],
    //       '7': [ '^<<A', '<^<A', '<<^A' ],
    //       '8': [ '^<A', '<^A' ],
    //       '9': [ '^A' ],
    //       A: [ 'vvA' ]
    //     },
    //     '7': {
    //       '0': [ 'vv>vA', 'v>vvA', '>vvvA' ],
    //       '1': [ 'vvA' ],
    //       '2': [ 'vv>A', 'v>vA', '>vvA' ],
    //       '3': [ 'vv>>A', 'v>v>A', 'v>>vA', '>vv>A', '>v>vA', '>>vvA' ],
    //       '4': [ 'vA' ],
    //       '5': [ 'v>A', '>vA' ],
    //       '6': [ 'v>>A', '>v>A', '>>vA' ],
    //       '7': [ 'A' ],
    //       '8': [ '>A' ],
    //       '9': [ '>>A' ],
    //       A: [
    //         'vv>v>A', 'vv>>vA',
    //         'v>vv>A', 'v>v>vA',
    //         'v>>vvA', '>vvv>A',
    //         '>vv>vA', '>v>vvA',
    //         '>>vvvA'
    //       ]
    //     },
    //     '8': {
    //       '0': [ 'vvvA' ],
    //       '1': [ 'vv<A', 'v<vA', '<vvA' ],
    //       '2': [ 'vvA' ],
    //       '3': [ 'vv>A', 'v>vA', '>vvA' ],
    //       '4': [ 'v<A', '<vA' ],
    //       '5': [ 'vA' ],
    //       '6': [ 'v>A', '>vA' ],
    //       '7': [ '<A' ],
    //       '8': [ 'A' ],
    //       '9': [ '>A' ],
    //       A: [ 'vvv>A', 'vv>vA', 'v>vvA', '>vvvA' ]
    //     },
    //     '9': {
    //       '0': [ 'vvv<A', 'vv<vA', 'v<vvA', '<vvvA' ],
    //       '1': [ 'vv<<A', 'v<v<A', 'v<<vA', '<vv<A', '<v<vA', '<<vvA' ],
    //       '2': [ 'vv<A', 'v<vA', '<vvA' ],
    //       '3': [ 'vvA' ],
    //       '4': [ 'v<<A', '<v<A', '<<vA' ],
    //       '5': [ 'v<A', '<vA' ],
    //       '6': [ 'vA' ],
    //       '7': [ '<<A' ],
    //       '8': [ '<A' ],
    //       '9': [ 'A' ],
    //       A: [ 'vvvA' ]
    //     },
    //     A: {
    //       '0': [ '<A' ],
    //       '1': [ '^<<A', '<^<A' ],
    //       '2': [ '^<A', '<^A' ],
    //       '3': [ '^A' ],
    //       '4': [ '^^<<A', '^<^<A', '^<<^A', '<^^<A', '<^<^A' ],
    //       '5': [ '^^<A', '^<^A', '<^^A' ],
    //       '6': [ '^^A' ],
    //       '7': [
    //         '^^^<<A', '^^<^<A',
    //         '^^<<^A', '^<^^<A',
    //         '^<^<^A', '^<<^^A',
    //         '<^^^<A', '<^^<^A',
    //         '<^<^^A'
    //       ],
    //       '8': [ '^^^<A', '^^<^A', '^<^^A', '<^^^A' ],
    //       '9': [ '^^^A' ],
    //       A: [ 'A' ]
    //     }
}

const moves = (str, shorcutGraph) => {
    console.log(str)
    str = 'A' + str // robot always starting from 'A'

    let paths = ['']

    for (let i = 1; i < str.length; i++) {
        // iterate thru 'A029A', all previous path is appended with new path combo 
        // A->0, 0->2, 2->9, 9->A
        let from = str[i - 1]
        let to = str[i]
        let combinedPaths = []
        let nextPaths = shorcutGraph[from][to]
        for (let next of nextPaths) {
            for (let oriPath of paths) {
                combinedPaths.push(oriPath + next)
            }
        }
        paths = combinedPaths
    }
    return paths
}

const getMinLen = (paths) => {
    let minLen = Infinity
    for (let path of paths) {
        minLen = Math.min(minLen, path.length)
    }
    return minLen
}

const filterLongPaths = (paths) => {
    let minLen = getMinLen(paths)
    return paths.filter(path => path.length === minLen)
}

const solve = (strs) => {
    const shortestNumPads = buildShortcuts([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A'], numPads)
    const shortestDirPads = buildShortcuts(['<', '^', '>', 'v', 'A'], dirPads)

    let res = []

    for (let str of strs) {
        let newPaths = []
        let paths = moves(str, shortestNumPads)
        paths = filterLongPaths(paths)

        for (let i = 0; i < 2; i++) {
            console.log({i})
            paths.forEach(path => newPaths.push(...moves(path, shortestDirPads)))
            console.log(paths.length)
            paths = filterLongPaths(newPaths)
            newPaths = []
            console.log(paths)
        }

        let strNum = str.slice(0, 3)
        res.push([Number(strNum), getMinLen(paths)])
    }
    console.log(res)

    return res
        .map(pair => pair[0] * pair[1])
        .reduce((s, x) => s + x, 0)

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

    // expected sample.txt = 126384 
    // expected input.txt = 206798
}

main()