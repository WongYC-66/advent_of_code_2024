// Problem statement : https://adventofcode.com/2024/day/2

/*
7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
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



const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input_part1.txt")
    console.log(rawFile)
    let reportArr = rawFile
        .replaceAll("\r", "")
        .split("\n")
        .map(report => report.split(' ').map(Number))
    // console.log(reportArr)


    let res = reportArr.filter(isValidReport).length
    console.log(res)
    return res
}

main()



