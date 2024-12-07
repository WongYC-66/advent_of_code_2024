// https://adventofcode.com/2024/day/6
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

const validating = ([target, nums]) => {

    let curr = nums.shift()
    let res = false

    const dfs = (i, curr) => {
        if(i == nums.length){
            if(curr == target) res = true
            return 
        }

        // do + 
        dfs(i + 1, curr + nums[i])
        // do *
        dfs(i + 1, curr * nums[i])
        // do || concat
        let str = String(curr) + String(nums[i])
        dfs(i + 1, Number(str))
    }

    dfs(0, curr)

    return res
}


const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")

    let eqs = []    // [ [190, [10,19]], ... ]
    rawFile.forEach(str => {
        let [total, remains] = str.split(":")
        let arr = remains.trim().split(" ").map(Number)
        eqs.push([Number(total), arr])
    })

    let validEqs = eqs.filter(validating)

    console.log(rawFile)
    console.log(eqs)
    console.log(validEqs)

    let res = validEqs.reduce((s, x) => s + x[0], 0)
    console.log(res)

    return res

}


main()