// https://adventofcode.com/2024/day/5
const { readFile } = require("../lib.js")

const findValidSeq = (pairs, updates) => {
    let beforeMap = {}
    for (let [n1, n2] of pairs) {
        if (!beforeMap[n1]) beforeMap[n1] = new Set()
        beforeMap[n1].add(n2)
    }
    console.log(beforeMap)
    let validSeq = []

    updates.forEach(arr => {
        console.log(arr)
        for (let i = 0; i < arr.length - 1; i++) {
            let n1 = arr[i]
            let numBehind = arr.slice(i + 1,)
            for (let n2 of numBehind) {
                if (!beforeMap[n2]) continue
                if (beforeMap[n2].has(n1))
                    return false
            }
        }
        //valid
        validSeq.push(arr)
    })

    return validSeq
}

const getMiddle = (arr) => {
    return arr[Math.floor(arr.length / 2)]
}

const sum = arr => {
    return arr.reduce((s, x) => s + x, 0)
}

const extracData = rawFile => {
    let pairs = []  // [[1,2], [2,4]]
    let updates = []

    let isPair = true
    for (let i = 0; i < rawFile.length; i++) {
        let str = rawFile[i]
        if (str == '') {
            isPair = false
        } else if (isPair) {
            let pair = str.split('|').map(Number)
            pairs.push(pair)
        } else {
            updates.push(str.split(',').map(Number))
        }
    }

    return [pairs, updates]
}

const main = async () => {
    let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let [pairs, updates] = extracData(rawFile)

    let validSequences = findValidSeq(pairs, updates)
    console.log(validSequences)

    let sumOfMiddle = sum(validSequences.map(getMiddle))
    console.log(sumOfMiddle)
    return sumOfMiddle
    // expected sample.txt = 143
    // expected input.txt = 4281
}


main()