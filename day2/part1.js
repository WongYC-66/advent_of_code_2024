// Problem statement : https://adventofcode.com/2024/day/2

const { readFile } = require("../lib.js")

const isIncreasing = (n1, n2) => n1 < n2
const isDecreasing = (n1, n2) => n1 > n2

const isWithinRange = (n1, n2) => {
    let diff = Math.abs(n1 - n2)
    return 1 <= diff && diff <= 3
}

const isValidReport = nums => {
    let isIncreasingSeq = isIncreasing(nums[0], nums[1])

    for (let i = 0; i < nums.length - 1; i++) {
        let left = nums[i]
        let right = nums[i + 1]

        if (!isWithinRange(left, right)) {
            // console.log("invalid, not within range")
            return false
        }

        if (isIncreasingSeq) {
            // must be increasing, n1 < n2
            if (!isIncreasing(left, right)) {
                // console.log("invalid, should be increasing")
                return false
            }

        } else {
            //  decreasing sequence, n1 > n2
            if (!isDecreasing(left, right)) {
                // console.log("invalid, should be decreasing")
                return false
            }
        }
    }
    // console.log(nums, "is valid report")
    return true
}



const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let reportArr = rawFile.map(str => str.split(' ').map(Number))
    // console.log(reportArr)

    let res = reportArr.filter(isValidReport).length
    console.log(res)
    return res
    // expected sample.txt = 2
    // expected input.txt = 502
}

main()



