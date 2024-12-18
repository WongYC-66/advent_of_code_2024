// https://adventofcode.com/2024/day/14
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

const after100secs = (point, wide, height) => {
    const time = 100
    let { r, c, dr, dc } = point
    r = (r + dr * time) % height
    c = (c + dc * time) % wide
    if (r < 0) r = height + r
    if (c < 0) c = wide + c
    return { r, c, dr, dc }
}

const solve = (points, wide, height) => {
    let q1 = 0
    let q2 = 0
    let q3 = 0
    let q4 = 0

    let midH = Math.floor(height / 2)
    let midW = Math.floor(wide / 2)
    let midRow = (height % 2 === 1) ? [midH] : [midH - 1, midH]
    let midCol = (wide % 2 === 1) ? [midW] : [midW - 1, midW]

    points.forEach(({r,c}) => {
        if(midRow.includes(r) || midCol.includes(c)) return
        let isLowerQuad = r >= midRow.at(-1)
        let isRightQuad = c >= midCol.at(-1)

        if(!isLowerQuad){
            if(!isRightQuad){
                q1 += 1         // top left
            } else {
                q2 += 1         // top right
            }
        } else {
            // lower quad
            if(!isRightQuad){
                q3 += 1         // btm left
            } else {
                q4 += 1         // btm right
            }
        }
        console.log({r,c, isLowerQuad, isRightQuad})
    })


    return [q1, q2, q3, q4]
}

const product = (arr) => {
    return arr.reduce((p, x) => p * x, 1)
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let points = extractData(rawFile)
    console.log(points)
    // console.log(points.length)

    // const [wide, height] = [11, 7]      // sample
    const [wide, height] = [101, 103]    // input

    let newPoints = points.map(p => after100secs(p, wide, height))
    console.log(newPoints)

    let quadrantCounts = solve(newPoints, wide, height)
    console.log(quadrantCounts)


    let res = product(quadrantCounts)
    console.log(res)
    return res
    // expected sample.txt = 12
    // expected input.txt = 214400550
}


main()