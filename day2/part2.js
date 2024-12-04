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
        // console.log(data);
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

const isTolerableReport = nums => {
    // brute-force
    let possibleReport = []
    for(let i = 0 ; i < nums.length ;i++){
        // remove each index
        let seq = nums.slice()
        seq.splice(i, 1)
        possibleReport.push(seq)
    }
    let res = possibleReport.some(isValidReport)
    console.log(nums, res)
    return res
}


const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    console.log(rawFile)
    let reportArr = rawFile
        .replaceAll("\r", "")
        .split("\n")
        .map(report => report.split(' ').map(Number))
    // console.log(reportArr)


    let res = reportArr.filter(isTolerableReport).length
    console.log(res)
    return res
}

main()



