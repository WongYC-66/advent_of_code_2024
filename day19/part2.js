// https://adventofcode.com/2024/day/19
const { readFile } = require("../lib.js")


const extractData = (rawFile) => {
    let towels = []
    let targets = []

    let isTowel = true
    for (let line of rawFile) {
        if (line == '') {
            isTowel = false
        } else if (isTowel) {
            towels = (line.split(',').map(s => s.trim()))
        } else {
            targets.push(line)
        }
    }

    towels.sort()
    targets.sort()

    return { towels, targets }
}

const canForm = (str, towels) => {
    let memo = {}
    const dfs = (i) => {
        if (i == str.length) return true

        if (i in memo) return memo[i]

        let res = 0

        for (let word of towels) {
            let remain = str.slice(i,)
            if (remain.startsWith(word)) {
                res += dfs(i + word.length)
            }
        }
        return memo[i] = res
    }
    return dfs(0)
}

const solve = (towels, targets) => {

    let res = 0

    for (let str of targets) {
        res += canForm(str, towels)
    }

    return res
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    const { towels, targets } = extractData(rawFile)
    console.log(towels, targets)

    let res = solve(towels, targets)
    console.log(res)
    return res

    // expected sample.txt = 16
    // expected input.txt = 662726441391898
}

main()