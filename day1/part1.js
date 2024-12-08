// https://adventofcode.com/2024/day/1
const { readFile } = require("../lib.js")

const extractData = (nums) => {
    let arr1 = []
    let arr2 = []
    nums.forEach(([n1, n2]) => arr1.push(n1) && arr2.push(n2))
    return [arr1, arr2]
}

const findArrDiff = (arr1, arr2) => {
    let sum = 0
    for (let i = 0; i < arr1.length; i++) {
        sum += Math.abs(arr2[i] - arr1[i])
    }
    return sum
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

    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)

    let res = findArrDiff(arr1, arr2)
    console.log(res)
    return res
    // expected sample.txt = 11
    // expected input.txt = 1222801
}


main()