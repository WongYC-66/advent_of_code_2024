// https://adventofcode.com/2024/day/23
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    return rawFile.map(s => s.split('-'))
}

const generatePassword = (centre, neighbors) => {
    let candidates = []
    for (let left of neighbors[centre]) {
        let count = 0
        for (let right of neighbors[centre]) {
            if (left == right) continue
            if (neighbors[left].has(right)) {
                count += 1
            }
        }
        if (count > 0) candidates.push([left, count])
    }
    let min = Math.min(...candidates.map(pair => pair[1]))
    candidates = candidates.filter(pair => pair[1] === min)

    let passwordNode = [centre]
    for (let [left, _] of candidates) {
        if (candidates.every(([right, _]) => {
            if (left == right) return true
            return neighbors[right].has(left)
        })) {
            passwordNode.push(left)
        }
    }
    return passwordNode.sort().join(',')
}


const solve = (connections) => {
    let neighbors = {}

    for (let [n1, n2] of connections) {
        if (!neighbors[n1]) neighbors[n1] = new Set()
        neighbors[n1].add(n2)
        if (!neighbors[n2]) neighbors[n2] = new Set()
        neighbors[n2].add(n1)
    }

    const getMode = (arr) => {
        // the lowest common by excluding zero
        arr = arr.filter(Boolean)
        return Math.min(...arr)
    }

    console.log(neighbors)

    let maxCount = -Infinity
    let password = null

    for (let centre in neighbors) {
        if (neighbors[centre].size <= maxCount) continue
        // for this centre, find how many others are interconnected
        let arr = []
        for (let left of neighbors[centre]) {
            let count = 0
            for (let right of neighbors[centre]) {
                if (left == right) continue
                if (neighbors[left].has(right)) {
                    count += 1
                }
            }
            arr.push(count)
        }
        let interconnectedCount = getMode(arr) + 1  // + self
        if (interconnectedCount > maxCount) {
            maxCount = interconnectedCount
            password = generatePassword(centre, neighbors)
        }
        // becoz i somehow found 'rw' has everything 11!
        if (centre == 'rw') console.log(centre, arr, interconnectedCount)
        // console.log(centre, interconnectedCount)
    }

    console.log(maxCount)
    console.log(password)
    return password
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

    // expected sample.txt = 3
    // expected input.txt = am,aq,by,ge,gf,ie,mr,mt,rw,sn,te,yi,zb
}

main()