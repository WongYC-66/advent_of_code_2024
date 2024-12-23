// https://adventofcode.com/2024/day/19
const { readFile } = require("../lib.js")

const sum = (arr) => arr.reduce((s, x) => s + x, 0n)

const solve = (rawFile) => {
    let nums = rawFile.map(Number)
    const LIMIT = 2000
    // const LIMIT = 10
    const MOD = 16777216
    let res = []

    const prune = (n) => n % BigInt(MOD)

    const mix = (n, secret) => n ^ secret

    for (let n of nums) {
        n = BigInt(n)
        for (let i = 0; i < LIMIT; i++) {
            n = mix(n * 64n, n)
            n = prune(n)
            //
            let numerator = BigInt(Math.floor(Number(n / 32n)))
            n = mix(numerator, n)
            n = prune(n)
            // 
            n = mix(n * 2048n, n)
            n = prune(n)
        }
        res.push(n)
    }

    console.log(res)
    return sum(res)
}

const main = async () => {
    console.time('runtime')
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let res = solve(rawFile)
    console.log(res)
    console.timeEnd('runtime')
    return res

    // expected sample.txt = 37327623 
    // expected input.txt = 20401393616
}

main()