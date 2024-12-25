// https://adventofcode.com/2024/day/25
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let keys = []
    let locks = []

    let stack = []
    for (let s of rawFile) {
        if (s == '') {
            if (stack[0] == '#####') {
                locks.push(stack.slice())
            } else {
                keys.push(stack.slice())
            }
            stack = []
        } else {
            stack.push(s)
        }
    }
    if (stack[0] == '#####') {
        locks.push(stack.slice())
    } else {
        keys.push(stack.slice())
    }


    return { keys, locks }
}

const toPin = (arr) => {
    return arr.map(strs => {
        let M = strs.length
        let N = strs[0].length
        let count = Array(N).fill(-1)
        for (let c = 0; c < N; c++) {
            for (let r = 0; r < M; r++) {
                if (strs[r][c] == '#')
                    count[c] += 1
            }
        }
        return count
    })
}

const solve = (keys, locks) => {
    keys = toPin(keys)
    locks = toPin(locks)
    console.log(keys)
    console.log(locks)

    const canMatch = (nums1, nums2) => {
        let LIMIT = 6
        for (let i = 0; i < nums1.length; i++) {
            let sum = nums1[i] + nums2[i]
            if (sum >= LIMIT) return false
        }
        return true
    }

    let matched = 0
    for (let key of keys) {
        for (let lock of locks) {
            if (canMatch(key, lock)) matched += 1
        }
    }
    return matched
}

const main = async () => {
    console.time('runtime')
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    const { keys, locks } = extractData(rawFile)
    console.log(keys)
    console.log(locks)

    let res = solve(keys, locks)
    console.log(res)
    console.timeEnd('runtime')
    return res

    // expected sample.txt = 3
    // expected input.txt = 3196
}

main()