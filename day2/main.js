const fs = require('node:fs');

// Problem statement : https://adventofcode.com/2024/day/2

const isIncreasing = (n1, n2) => n1 < n2
const isDecreasing = (n1, n2) => n1 > n2

const isWithinRange = (n1, n2) => {
    let diff = Math.abs(n1 - n2)
    return 1 <= diff && diff <= 3
}

const isValidSeq = nums => {
    let isIncreasingSeq = isIncreasing(nums[0], nums[1])

    for (let i = 0; i < nums.length - 1; i++) {
        let left = nums[i]
        let right = nums[i + 1]
        if (!isWithinRange(left, right))
            return false

        if (isIncreasingSeq) {
            // must be increasing, n1 < n2
            if (!isIncreasing(left, right)) return false
        } else {
            //  decreasing sequence, n1 > n2
            if (!isDecreasing(left, right)) return false
        }
    }
    return true
}

const readFile = () => {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // console.log(data);
        return data
    });
}


const main = () => {
    let rawFile = readFile()
    console.log(rawFile)
}

main()


