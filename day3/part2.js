// https://adventofcode.com/2024/day/3

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

const getSum = (str) => {
    let regex = /(mul\((\d{1,3}),(\d{1,3})\))|do\(\)|don't\(\)/g
    let numRegex = /\d{1,3}/g
    let captures = [...str.match(regex)]

    console.log(captures)
    let stack = []
    let enabled = true
    for (let str of captures) {
        if (str == 'do()') {
            enabled = true
        } else if (str == "don't()") {
            enabled = false
        } else {
            // 
            if(!enabled) continue
            let [n1, n2] = str.match(numRegex)
            stack.push(Number(n1) * Number(n2))
        }
    }
    return stack.reduce((s, x) => s + x, 0)
}


const main = async () => {
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    console.log(rawFile)
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
        .join("")
    console.log(rawFile)

    let res = getSum(rawFile)
    console.log(res)
    return res

}


main()