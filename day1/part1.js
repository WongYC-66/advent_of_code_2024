// https://adventofcode.com/2024/day/1
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

    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)

    console.log(rawFile)
    console.log(arr1, arr2)
    let sum = 0
    for(let i = 0 ; i < arr1.length ; i++){
        sum += Math.abs(arr2[i] - arr1[i])
        console.log(arr1[i], arr2[i], sum)
    }
    console.log(sum)
    return sum

}


main()