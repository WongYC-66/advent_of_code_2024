// https://adventofcode.com/2024/day/23
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    return rawFile.map(s => s.split('-'))
}

const solve = (connections) => {
    let neighbors = {}

    for (let [n1, n2] of connections) {
        if (!neighbors[n1]) neighbors[n1] = new Set()
        neighbors[n1].add(n2)
        if (!neighbors[n2]) neighbors[n2] = new Set()
        neighbors[n2].add(n1)
    }

    // console.log(neighbors)

    const res = new Set()

    for (let centre in neighbors) {
        if (!centre.startsWith('t')) continue
        for (let left of neighbors[centre]) {
            for (let right of neighbors[centre]) {
                if (left == right) continue  // cant be self
                if (neighbors[left].has(right) && neighbors[right].has(left)) {
                    let key = [centre, left, right].sort().join(',')
                    res.add(key)
                }
            }
        }
    }
    console.log(res)
    return res.size
}

const main = async () => {
    console.time('runtime')
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    const connections = extractData(rawFile)
    // console.log(connections)

    let res = solve(connections)
    console.log(res)
    console.timeEnd('runtime')
    return res

    // expected sample.txt = 7 
    // expected input.txt = 1240
}

main()