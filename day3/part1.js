// https://adventofcode.com/2024/day/3
const { readFile } = require("../lib.js")

const getLineSum = (str) => {
    let regex = /mul\((\d{1,3}),(\d{1,3})\)/g
    let captures = [...str.matchAll(regex)]
    let productArr = captures.map(capture => Number(capture[1] * capture[2]))
    return sum(productArr)
}

const sum = arr => {
    return arr.reduce((s, x) => s + x, 0)
}

const main = async () => {
    // let rawFile = await readFile("sample1.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)    

    // let res = rawFile.reduce((sum, str) => getSum(str) + sum, 0)
    let res = sum(rawFile.map(getLineSum))
    console.log(res)
    return res
    // expected sample.txt = 161
    // expected input.txt = 181345830
}


main()