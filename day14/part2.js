// https://adventofcode.com/2024/day/13
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let points = []
    let regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/
    for (let str of rawFile) {
        let [_, c, r, dc, dr] = str.match(regex)
        points.push({
            r: Number(r),
            c: Number(c),
            dr: Number(dr),
            dc: Number(dc)
        })
    }
    return points
}

const after1sec = (point, wide, height) => {
    const time = 1
    let { r, c, dr, dc } = point
    r = (r + dr * time) % height
    c = (c + dc * time) % wide
    if (r < 0) r = height + r
    if (c < 0) c = wide + c
    return { r, c, dr, dc }
}

const mean = (arr) => {
    let total = sum(arr)
    return total / arr.length
}

const sum = (arr) => {
    return arr.reduce((s, x) => s + x, 0)
}

const findVariance = (points, key) => {
    let vals = points.map(p => p[key])
    // console.log(vals)
    let N = points.length
    let variance = 0
    let u = mean(vals)
    vals.forEach(x => [
        variance += (x - u) ** 2
    ])
    return variance / N
}

const printGrid = (newPoints, wide, height) => {
    let arr = Array.from(Array(height), () => Array(wide).fill('.'))
    for (let { r, c } of newPoints) {
        arr[r][c] = '#'
    }
    console.log(arr.map(r => r.join('')))
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let points = extractData(rawFile)
    // console.log(points)
    // console.log(points.length)

    // const [wide, height] = [11, 7]      // sample
    const [wide, height] = [101, 103]    // input

    let varsR = []
    let varsC = []

    for (let i = 1; i <= 50000; i++) {
        let newPoints = points.map(p => after1sec(p, wide, height))
        let varianceR = findVariance(newPoints, 'r')
        let varianceC = findVariance(newPoints, 'c')
        varsR.push([varianceR, i])
        varsC.push([varianceC, i])
        points = newPoints


        if (i == 8149) {    // once we found solution, i double check here.
            printGrid(newPoints, wide, height)
        }
    }

    let meanVarsR = mean(varsR.map(v => v[0]))
    let meanVarsC = mean(varsC.map(v => v[0]))

    console.log({ meanVarsR, meanVarsC })

    let outliersR = varsR.filter(v => v[0] <= meanVarsR - 100)
    let outliersC = varsC.filter(v => v[0] <= meanVarsC - 100)

    console.log(outliersR, outliersC)
    

    // [
    //     [ 338.79440000000034, 12 ],
    //     [ 338.79440000000034, 115 ],
    //     [ 338.79440000000034, 218 ],
    //     [ 338.79440000000034, 321 ],
    //     [ 338.79440000000034, 424 ],
    //   ] [
    //     [ 372.09188400000033, 69 ],
    //     [ 372.09188400000033, 170 ],
    //     [ 372.09188400000033, 271 ],
    //     [ 372.09188400000033, 372 ],
    //     [ 372.09188400000033, 473 ],
    //   ]

    // when both variance are low, tree maybe?

    // find idx where both are low

    // arithmetic sequence
    // a_m = a_0 + (m - 1)d_a
    // b_n = b_0 + (n - 1)d_b

    // a_m == b_n
    // a_0 + (m - 1)d_a == b_0 + (n - 1)d_b
    // 
    

    // let a_0 = outliersR[0][1]
    // let d_a = outliersR.at(-1)[1] - outliersR.at(-2)[1]

    // let b_0 = outliersC[0][1]
    // let d_b = outliersC.at(-1)[1] - outliersC.at(-2)[1]

    // let n = (b_0 - a_0 + d_a - d_b) / (d_a - d_b)
    // let a_n = a_0 + (n - 1) * d_a 
    // let res = a_n

    // screw this, just use hashset compare
    let nums1 = new Set(outliersR.map(v => v[1]))
    let nums2 = new Set(outliersC.map(v => v[1]))

    for(let n1 of nums1){
        if(nums2.has(n1)){
            console.log("found, res : ", n1)    // the first idx that both sequences has Low Variance , == christmas tree
            return
        }
    }
    // else
    return console.log("not found, widen the range plz")
    // expected sample.txt = ??
    // expected input.txt = 8149
}


main()