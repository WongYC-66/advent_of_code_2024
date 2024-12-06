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
    let regex = /mul\((\d{1,3}),(\d{1,3})\)/g
    let captures = [...str.matchAll(regex)]
    return captures
        .map(capture => Number(capture[1] * capture[2]))
        .reduce((s, x) => s + x, 0)
}


const main = async () => {
    // let rawFile = await readFile("sample1.txt")
    let rawFile = await readFile("input.txt")
    console.log(rawFile)
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)    

    let res = rawFile.reduce((sum, str) => getSum(str) + sum, 0)
    console.log(res)
    return res

}


main()