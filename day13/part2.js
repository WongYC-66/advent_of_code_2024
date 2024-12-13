// https://adventofcode.com/2024/day/13
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let games = []

    let priceRegex = /X=(\d+), Y=(\d+)/
    let buttonRegex = /X\+(\d+), Y\+(\d+)/
    let game = {}

    const offset = 10000000000000
    // const offset = 0

    for (let str of rawFile) {
        if (str == "") {
            games.push(game)
            game = {}
        } else {
            let [left, right] = str.split(":")
            if (left == "Prize") {
                let [_, x, y] = right.match(priceRegex)
                game["P"] = { x: Number(x) + offset, y: Number(y) + offset }
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
    // console.log(game)
    let A = game['A']
    let B = game['B']
    let P = game['P']

    // algebra if theres is solution
    // ACount(A.x, A.y) + BCount(B.x, B.y) = (P.x, P.y)
    // if can found
    // eq1 => ACount(A.x) + BCount(B.x) = P.x
    // eq2 => ACount(A.y) + BCount(B.y) = P.y

    // build my own BigInt equation
    // eq1 => ACount(A.x) + BCount(B.x) = P.x
    // eq2 => ACount(A.y) + BCount(B.y) = P.y

    // A = (P.x - (B * B.x)  ) / A.x
    // A = (P.y - (B * B.y)  ) / A.y

    // (P.x - (B * B.x)  ) / A.x ==  (P.y - (B * B.y)  ) / A.y
    // (A.y)(P.x) - (A.y)(B * B.x) = (A.x)(P.y) - (A.x)(B * B.y)

    // + (A.x)(B * B.y) - (A.y)(B * B.x) = (A.x)(P.y) - (A.y)(P.x)
    // B  ((A.x)(B.y) - (A.y)(B.x)) = (A.x)(P.y) - (A.y)(P.x)

    // B  = (A.x)(P.y) - (A.y)(P.x)  / ((A.x)(B.y) - (A.y)(B.x))
    
    // then derive A similarly...


    let BCount = ((A.x * P.y) - (A.y * P.x)) / ((A.x * B.y) - (A.y * B.x))
    let ACount = (P.x - BCount * B.x) / A.x
    // let ACount = ((B.x * P.y) - (B.y * P.x)) / ((B.x * A.y) - (B.y * A.x))

    // console.log({ ACount, BCount })
    
    // if(Number.isInteger(BCount) && !Number.isInteger(ACount)){
    //     console.log("diff", ACount, ACounttest)
    // }

    if (!Number.isInteger(ACount) || !Number.isInteger(BCount)) {
        return 0
    }
    

    return ACount * 3 + BCount * 1
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
    // console.log(rawFile)

    let games = extractData(rawFile)
    console.log(games)
    console.log(games.length)

    let tokens = games.map(playGame).filter(Boolean)
    console.log(tokens)
    console.log(tokens.length)

    let res = sum(tokens)
    console.log(res)
    return res
    // expected sample.txt = 875318608908
    // expected input.txt = 82510994362072
}


main()