// https://adventofcode.com/2024/day/9
const { readFile } = require("../lib.js")

const buildFragment = str => {
    let nums = str.split('').map(Number)
    let id = 0
    let arr = []
    let isFrag = false

    for (let n of nums) {
        let subArr = Array(n).fill(0)
        if (isFrag) {
            arr.push(...subArr.map(_ => '.'))
        } else {
            arr.push(...subArr.map(_ => id))
            id += 1
        }
        isFrag = !isFrag
    }
    return arr
}

const swapBlockFragment = (arr) => {
    // two pointers

    let r = arr.length - 1

    const swap = (l, r) => {
        let tmp = arr[l]
        arr[l] = arr[r]
        arr[r] = tmp
    }

    const countSpace = (i, val, vector) => {
        let sum = 0
        for (let j = i; j < arr.length; j += 1 * vector) {
            if (arr[j] != val) break
            sum += 1
        }
        return sum
    }

    const findLeftMostDotSpace = (targetSpace, r) => {
        let l = 0
        while (l < r) {
            if (arr[l] != '.') {
                l += 1
            } else {
                let dotSpace = countSpace(l, '.', +1)
                if (dotSpace >= targetSpace) {
                    return l
                }
                l += dotSpace
            }
        }
        return -1
    }

    while (r > 0) {
        if (arr[r] == '.') {
            r -= 1
            continue
        }
        let valSpace = countSpace(r, arr[r], - 1)
        let idxOfDotSpace = findLeftMostDotSpace(valSpace, r)
        // console.log(r, valSpace, idxOfDotSpace)
        if (idxOfDotSpace != -1) {
            // swap block
            for (let i = 0; i < valSpace; i++) {
                swap(idxOfDotSpace + i, r - i)
            }
        }
        r -= valSpace
    }
}

const checkSum = (arr) => {
    let sum = 0
    arr.forEach((val, i) => {
        if (val == '.') return
        sum += val * i
    })
    return sum
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let fragments = buildFragment(rawFile[0])
    // console.log(fragments)
    // console.log(fragments.length)

    swapBlockFragment(fragments)
    // console.log(fragments)

    let res = checkSum(fragments)
    console.log(res)
    return res
    // expected sample.txt = 2858
    // expected input.txt = 6427437134372  about 12 secs :)
}


main()