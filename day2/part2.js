// Problem statement : https://adventofcode.com/2024/day/2#part2

const { readFile } = require("../lib.js")

const isIncreasing = (n1, n2) => n1 < n2
const isDecreasing = (n1, n2) => n1 > n2

const isWithinRange = (n1, n2) => {
    let diff = Math.abs(n1 - n2)
    return 1 <= diff && diff <= 3
}

const isValidReport = nums => {
    let shouldIncrease = isIncreasing(nums[0], nums[1])

    for (let i = 0; i < nums.length - 1; i++) {
        let left = nums[i]
        let right = nums[i + 1]

        if (!isWithinRange(left, right)) {
            return false         // "invalid, not within range"
        }

        if (shouldIncrease) {
            // must be increasing then, n1 < n2
            if (!isIncreasing(left, right)) {
                return false    // "invalid, should be increasing"
            }
        } else {
            //  decreasing sequence, n1 > n2
            if (!isDecreasing(left, right)) {
                return false    // "invalid, should be decreasing"
            }
        }
    }
    return true
}

const isTolerableReport = nums => {
    // brute-force
    let possibleReport = []
    for (let i = 0; i < nums.length; i++) {
        // create remove each index and create a new copy
        let seq = nums.slice()
        seq.splice(i, 1)
        possibleReport.push(seq)
    }
    return possibleReport.some(isValidReport)
}


const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)
    
    let reportArr = rawFile.map(str => str.split(' ').map(Number))

    let res = reportArr.filter(isTolerableReport).length
    console.log(res)
    return res
    // expected sample.txt = 4
    // expected input.txt = 544
}

main()



