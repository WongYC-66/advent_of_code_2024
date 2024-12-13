// https://adventofcode.com/2024/day/13
const { readFile } = require("../lib.js")

const { PriorityQueue } = require('@datastructures-js/priority-queue')

const extractData = (rawFile) => {
    let games = []

    let priceRegex = /X=(\d+), Y=(\d+)/
    let buttonRegex = /X\+(\d+), Y\+(\d+)/
    let game = {}

    for (let str of rawFile) {
        if (str == "") {
            games.push(game)
            game = {}
        } else {
            let [left, right] = str.split(":")
            if (left == "Prize") {
                let [_, x, y] = right.match(priceRegex)
                game["P"] = { x: Number(x), y: Number(y) }
            } else {
                let [_, x, y] = right.match(buttonRegex)
                let btn = left.at(-1)
                game[btn] = { x: Number(x), y: Number(y) }
            }
        }
    }
    games.push(game)


    return games
}

const playGame = (game) => {
    console.log(game)
    let A = game['A']
    let B = game['B']
    let P = game['P']


    let visited = new Set()

    // djistra
    let minHeap = new PriorityQueue((a, b) => a.token - b.token)
    minHeap.enqueue({ x: 0, y: 0, countA: 0, countB: 0, token: 0 })

    while (minHeap.size()) {
        let { x, y, countA, countB, token } = minHeap.dequeue()
        if (countA > 100 || countB > 100 || x > P.x || y > P.y) continue
        if (x == P.x && y == P.y) return token

        let key = `${x}-${y}`
        if (visited.has(key)) continue
        visited.add(key)

        // press buttonA
        minHeap.enqueue({
            x: x + A.x,
            y: y + A.y,
            countA: countA + 1,
            countB,
            token: token + 3
        })

        // press buttonB
        minHeap.enqueue({
            x: x + B.x,
            y: y + B.y,
            countA,
            countB: countB + 1,
            token: token + 1
        })

    }

    return 0    // unable to reach
}

const sum = (arr) => {
    return arr.reduce((s, x) => s + x, 0)
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let games = extractData(rawFile)
    console.log(games)

    let tokens = games.map(playGame)
    console.log(tokens)

    let res = sum(tokens)
    console.log(res)
    return res
    // expected sample.txt = 480
    // expected input.txt = 35997
}


main()