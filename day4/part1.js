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


const search = (r, c, grid) => {
    let M = grid.length
    let N = grid[0].length
    let count = {}

    const dirs = [
        [0, -1], [-1, -1], [-1, 0], [-1, 1],
        [0, 1], [1, 1], [1, 0], [1, -1]
    ]

    for (let [dr, dc] of dirs) {
        let str = ''
        for (let i = 1; i <= 3; i++) {
            let nR = r + (dr * i)
            let nC = c + (dc * i)
            if (nR < 0 || nR >= M || nC < 0 || nC >= N) continue
            str += grid[nR][nC]
        }
        count[str] = (count[str] || 0) + 1
    }


    console.log(r, c, count)
    return count['MAS'] || 0
}


const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    // console.log(rawFile)
    let grid = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(grid)

    let M = grid.length
    let N = grid[0].length
    let res = 0
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            let char = grid[r][c]
            if (char != 'X') continue

            // console.log(char)
            let MAS_count = search(r, c, grid)
            console.log(MAS_count)
            res += MAS_count
        }
    }
    console.log(res)
    return res
}


main()