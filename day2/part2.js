// Problem statement : https://adventofcode.com/2024/day/2#part2

/*
7 6 4 2 1: Safe without removing any level.
1 2 7 8 9: Unsafe regardless of which level is removed.
9 7 6 2 1: Unsafe regardless of which level is removed.
1 3 2 4 5: Safe by removing the second level, 3.
8 6 4 4 1: Safe by removing the third level, 4.
1 3 6 7 9: Safe without removing any level.
*/

const fs = require('node:fs/promises');

const readFile = async (fileName) => {
    try {
        const data = await fs.readFile(`./${fileName}`, { encoding: 'utf8' });
        return data
    } catch (err) {
        console.log(err);
    }
}


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
    let reportArr = rawFile
        .replaceAll("\r", "")
        .split("\n")
        .map(report => report.split(' ').map(Number))   // [ [1,3,4,5,6] , [2,2,3,4,5], ...]

    let res = reportArr.filter(isTolerableReport).length
    console.log(res)
    return res
}

main()



