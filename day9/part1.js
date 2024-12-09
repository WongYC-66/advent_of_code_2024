// https://adventofcode.com/2024/day/8
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

const swapFragment = (arr) => {
    // two pointers

    let l = 0
    let r = arr.length - 1

    const swap = (l, r) => {
        let tmp = arr[l]
        arr[l] = arr[r]
        arr[r] = tmp
    }

    while (l < r) {
        if (arr[l] != '.') {
            l += 1
        } else if (arr[r] == '.') {
            r -= 1
        } else {
            swap(l, r)
            l += 1
            r -= 1
        }
    }
}

const checkSum = (arr) => {
    arr = arr.filter(v => v != '.')
    return arr.reduce((s, x, i) => s + (x * i), 0)
}

const main = async () => {
    let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let fragments = buildFragment(rawFile[0])
    console.log(fragments)
    console.log(fragments.length)

    swapFragment(fragments)
    console.log(fragments)


    let res = checkSum(fragments)
    console.log(res)
    return res
    // expected sample.txt = 1928
    // expected input.txt = 6398608069280
}


main()