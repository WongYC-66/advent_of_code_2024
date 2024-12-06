// https://adventofcode.com/2024/day/4
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

const buildMap = (pairs) => {
    let beforeMap = {}
    for (let [n1, n2] of pairs) {
        if (!beforeMap[n1]) beforeMap[n1] = new Set()
        beforeMap[n1].add(n2)
    }
    // console.log(beforeMap)
    for (let k in beforeMap) {
        // console.log(k, beforeMap[k].size)
    }
    return beforeMap
}

const findInvalidSeq = (updates, beforeMap) => {

    let invalidSeq = []

    updates.forEach(arr => {
        // console.log(arr)
        for (let i = 0; i < arr.length - 1; i++) {
            let n1 = arr[i]
            let numBehind = arr.slice(i + 1,)
            for (let n2 of numBehind) {
                if (!beforeMap[n2]) continue
                if (beforeMap[n2].has(n1)) {
                    // invalid
                    invalidSeq.push(arr)
                    return
                }
            }
        }
        //valid
    })

    return invalidSeq
}

const resolve = (invalidSequences, pairs) => {
    console.log(pairs)

    let res = []

    invalidSequences.forEach(arr => {
        // rebuild map, but only pairs,  that has involve the sequence number
        let copiedArr = arr.slice()
        let numSet = new Set(arr)
        let filteredPairs = pairs.filter(([n1, n2]) => numSet.has(n1) && numSet.has(n2))

        let beforeMap = buildMap(filteredPairs)

        copiedArr.sort((a, b) => {
            // size of set, larget means infront
            return (beforeMap[b]?.size || 0) - (beforeMap[a]?.size || 0)
        })
        res.push(copiedArr)
    })
    return res
}

const getMiddle = (arr) => {
    return arr[Math.floor(arr.length / 2)]
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

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

    let beforeMap = buildMap(pairs)
    let invalidSequences = findInvalidSeq(updates, beforeMap)
    let sortedValidSeq = resolve(invalidSequences, pairs)
    let sumOfMiddle = sortedValidSeq
        .map(getMiddle)
        .reduce((s, x) => s + x, 0)

    console.log(invalidSequences)
    console.log(sortedValidSeq)
    console.log(sumOfMiddle)
    return sumOfMiddle
}


main()