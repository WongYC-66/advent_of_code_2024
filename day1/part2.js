// https://adventofcode.com/2024/day/1#part2

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

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    console.log(rawFile)
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
        .map(str => str.split("   ").map(Number))

    let arr1 = []
    let arr2 = []
    rawFile.forEach(([n1, n2]) => arr1.push(n1) && arr2.push(n2))

    console.log(rawFile)
    console.log(arr1, arr2)

    let count = {}
    for (let n of arr2) {
        count[n] = (count[n] || 0) + 1
    }
    let sum = 0
    for (let n of arr1) {
        sum += n * (count[n] || 0)
    }
    console.log(sum)
    return sum
}


main()