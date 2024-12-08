// https://adventofcode.com/2024/day/8
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

    const coordsToStr = (r, c) => `${r}-${c}`

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
                let anti1_r = r + dr
                let anti1_c = c + dc
                if (isValidCoords(anti1_r, anti1_c)) {
                    uniqueLocAntenna.add(coordsToStr(anti1_r, anti1_c))
                    if (canDraw(anti1_r, anti1_c))
                        grid[anti1_r][anti1_c] = '#'
                }

                // add antinode at prevLoc
                let anti2_r = r2 - dr
                let anti2_c = c2 - dc
                if (isValidCoords(anti2_r, anti2_c)) {
                    uniqueLocAntenna.add(coordsToStr(anti2_r, anti2_c))
                    if (canDraw(anti2_r, anti2_c))
                        grid[anti2_r][anti2_c] = '#'
                }
            })


            // add curr coords to hashmap
            if (!antennaCoords[cell]) antennaCoords[cell] = []
            antennaCoords[cell].push([r, c])
        }
    }

    grid = grid.map(arr => arr.join(''))
    console.log(grid)

    return uniqueLocAntenna.size
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")

    console.log(rawFile)
    let res = drawAndReturnCount(rawFile)
    console.log(res)

    return res
}


main()