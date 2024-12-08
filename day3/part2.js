// https://adventofcode.com/2024/day/3

const { readFile } = require("../lib.js")

const getSum = (str) => {
    let regex = /(mul\((\d{1,3}),(\d{1,3})\))|do\(\)|don't\(\)/g
    let captures = [...str.match(regex)]

    console.log(captures)
    let products = []
    let enabled = true
    for (let str of captures) {
        if (str == 'do()') {
            enabled = true
        } else if (str == "don't()") {
            enabled = false
        } else {
            if(!enabled) continue
            products.push(getProduct(str))
        }
    }
    return sum(products)
}

const getProduct = (str) => {
    let numRegex = /\d{1,3}/g
    let [n1, n2] = str.match(numRegex).map(Number)
    return n1 * n2
}

const sum = arr => {
    return arr.reduce((s, x) => s + x, 0)
}

const main = async () => {
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        // .split("\n")

    // console.log(rawFile)

    let res = getSum(rawFile)
    console.log(res)
    return res
    // expected sample.txt = 48
    // expected input.txt = 98729041
}


main()