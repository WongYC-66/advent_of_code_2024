// https://adventofcode.com/2024/day/1#part2

const { readFile } = require("../lib.js")

const extractData = (nums) => {
    let arr1 = []
    let arr2 = []
    nums.forEach(([n1, n2]) => arr1.push(n1) && arr2.push(n2))
    return [arr1, arr2]
}

const solve = (arr1, arr2) => {
    let count = {}
    arr2.forEach(n => count[n] = (count[n] || 0) + 1)
    return sum(arr1.map(n => n * (count[n] || 0)))
}

const sum = arr => {
    return arr.reduce((s, x) => s + x, 0)
}

const main = async () => {
    let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    const nums = rawFile.map(str => str.split("   ").map(Number))
    let [arr1, arr2] = extractData(nums)

    let res = solve(arr1, arr2)
    console.log(res)
    return res
    // expected sample.txt = 31
    // expected input.txt = 22545250
}


main()