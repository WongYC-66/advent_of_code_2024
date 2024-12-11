// https://adventofcode.com/2024/day/11
const { readFile } = require("../lib.js")

const sum = (arr) => {
    return arr.reduce((s, x) => s + x, 0)
}

const blink = (nums) => {
    let newNums = []

    for (let s of nums) {
        if (s == '0') {
            newNums.push(1)
        } else if (s.length % 2 === 0) {
            let mid = s.length / 2
            let left = s.slice(0, mid)
            let right = s.slice(mid)
            newNums.push(left)
            newNums.push(right)
        } else {
            newNums.push(s * 2024)
        }
    }
    return newNums.map(Number).map(String)
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let nums = rawFile[0].split(' ')
    const blinkCycle = 25

    for (let i = 0; i < blinkCycle; i++) {
        nums = blink(nums)
    }

    let res = nums.length
    console.log(res)
    return res
    // expected sample.txt = 55312
    // expected input.txt = 186424
}


main()