// https://adventofcode.com/2024/day/7
const { readFile } = require("../lib.js")

const validating = ([target, nums]) => {

    let curr = nums.shift()
    let res = false

    const dfs = (i, curr) => {
        if (i == nums.length) {
            if (curr == target) res = true
            return
        }

        // do + 
        dfs(i + 1, curr + nums[i])
        // do *
        dfs(i + 1, curr * nums[i])
    }

    dfs(0, curr)

    return res
}

const extractData = (rawFile) => {
    let eqs = []    // [ [190, [10,19]], ... ]
    rawFile.forEach(str => {
        let [total, remains] = str.split(":")
        let arr = remains.trim().split(" ").map(Number)
        eqs.push([Number(total), arr])
    })
    return eqs
}

const sum = arr => {
    return arr.reduce((s, x) => s + x, 0)
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")

    let eqs = extractData(rawFile)    // [ [190, [10,19]], ... ]
    let validEqs = eqs.filter(validating)

    // console.log(rawFile)
    // console.log(eqs)
    // console.log(validEqs)

    let res = sum(validEqs.map(x => x[0]))
    console.log(res)
    return res
    // expected sample.txt = 3749
    // expected input.txt = 1298103531759
}


main()