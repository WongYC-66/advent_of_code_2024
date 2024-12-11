// https://adventofcode.com/2024/day/11
const { readFile } = require("../lib.js")

const sum = (arr) => {
    return arr.reduce((s, x) => s + x, 0)
}

const blink = (nums) => {
    let newNums = []

    const pushStr = (str) => {
        newNums.push(Number(str).toString())
    }

    for (let s of nums) {
        if (s == '0') {
            newNums.push('1')
        } else if (s.length % 2 === 0) {
            let mid = s.length / 2
            let left = s.slice(0, mid)
            let right = s.slice(mid)
            pushStr(left)
            pushStr(right)
        } else {
            newNums.push(`${s * 2024}`)
        }
    }
    return newNums
}

const findNext = (s) => {
    let newNums = []

    const pushStr = (str) => {
        newNums.push(Number(str).toString())
    }

    if (s == '0') {
        newNums.push('1')
    } else if (s.length % 2 === 0) {
        let mid = s.length / 2
        let left = s.slice(0, mid)
        let right = s.slice(mid)
        pushStr(left)
        pushStr(right)
    } else {
        newNums.push(`${s * 2024}`)
    }

    return newNums
}

const solve = (nums) => {
    // hashmap ftw
    const blinkCycle = 75

    let numToNextMap = {}

    let count = {}
    for (let n of nums) {
        count[n] = (count[n] || 0) + 1
    }
    // console.log(count)

    for (let i = 0; i < blinkCycle; i++) {
        let nextCount = {}
        for (let num in count) {
            let nextNums = []
            if (numToNextMap[num]) {
                nextNums = numToNextMap[num]
            } else {
                nextNums = findNext(num)
            }
            nextNums.forEach(n => nextCount[n] = (nextCount[n] || 0) + count[num])
        }
        count = nextCount
        // console.log(count)
    }

    return sum(Object.values(count))
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let nums = rawFile[0].split(' ')

    let res = solve(nums)
    console.log(res)
    return res
    // expected sample.txt = 55312
    // expected input.txt = 219838428124832
}


main()