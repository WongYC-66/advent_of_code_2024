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

    const getLastDigit = (n) => {
        return Number(n % 10n)
    }

    const get4ConsecutiveChange = (arr) => {
        let change = []
        for (let i = 1; i < arr.length; i++) {
            change.push(arr[i] - arr[i - 1])
        }
        return change.join(',')
    }

    const totalSeq = {}

    for (let n of nums) {
        n = BigInt(n)
        let seq = [getLastDigit(n)]
        let seen = new Set()
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
            //
            seq.push(getLastDigit(n))
            if (seq.length > 5) seq.shift()
            if (seq.length === 5) {
                let seqS = get4ConsecutiveChange(seq)
                // if (seqS == '-2,1,-1,3') {
                //     console.log("found", seq)
                // }
                if (seen.has(seqS)) continue
                seen.add(seqS)
                totalSeq[seqS] = (totalSeq[seqS] || 0) + seq.at(-1)
            }
            // console.log({ i, n, seq,seen })
        }
        res.push(n)
    }

    // console.log(res)
    // console.log(totalSeq)
    return Math.max(...Object.values(totalSeq))
}

const main = async () => {
    console.time('runtime')
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let res = solve(rawFile)
    console.log(res)
    console.timeEnd('runtime')
    return res

    // expected sample2.txt = 23 
    // expected input.txt = 2272
}

main()