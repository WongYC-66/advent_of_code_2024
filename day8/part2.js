// https://adventofcode.com/2024/day/8

const { readFile } = require("../lib.js")

const drawAndReturnCount = (arrOfStr) => {
    let grid = arrOfStr.map(str => str.split(''))
    let M = grid.length
    let N = grid[0].length

    const isValidCoords = (r, c) => {
        return r >= 0 && r < M && c >= 0 && c < N
    }

    const canDraw = (r, c) => {
        return grid[r][c] == '.'
    }

    const coordsToStr = (r, c) => {
        return `${r}-${c}`
    }

    const addAntiNode = (r, c, dr, dc) => {
        for (let i = 0; i < Infinity; i++) {
            let anti_r = r + dr * i
            let anti_c = c + dc * i
            if (isValidCoords(anti_r, anti_c)) {
                uniqueLocAntenna.add(coordsToStr(anti_r, anti_c))
                // if (canDraw(r, c)) grid[r][c] = '#'
            } else {
                break
            }
        }
    }

    const printGrid = () => {
        let tmpGrid = grid.map(arr => arr.join(''))
        console.log(tmpGrid)
    }

    let antennaCoords = {}  // { 'A' : [[0,1], ...] }

    let uniqueLocAntenna = new Set()

    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            let cell = grid[r][c]
            if (cell == '.' || cell == '#') continue

            // is digit/letter
            // mark prev
            antennaCoords[cell] && antennaCoords[cell].forEach(([r2, c2]) => {
                let dr = r - r2
                let dc = c - c2

                // add antinode at currLoc
                addAntiNode(r, c, +dr, +dc)

                // add antinode at prevLoc
                addAntiNode(r2, c2, -dr, -dc)
            })

            // add curr coords to hashmap as "processed previous"
            if (!antennaCoords[cell]) antennaCoords[cell] = []
            antennaCoords[cell].push([r, c])
        }
    }

    // printGrid()

    return uniqueLocAntenna.size
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let res = drawAndReturnCount(rawFile)
    console.log(res)
    return res
}


main()