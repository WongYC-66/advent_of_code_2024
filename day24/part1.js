// https://adventofcode.com/2024/day/24
const { readFile } = require("../lib.js")

const { Deque } = require('@datastructures-js/deque');

const extractData = (rawFile) => {
    let wires = {}
    let gates = []
    let isWire = true
    for (let str of rawFile) {
        if (str == '') {
            isWire = false
        } else if (isWire) {
            let [name, output] = str.split(": ")
            wires[name] = Number(output)
        } else {
            // gate
            let [left, gateName] = str.split(" -> ")
            gateName = gateName.trim()
            let [input1, type, input2] = left.split(" ")
            gates.push([gateName, input1, type, input2])
        }
    }
    let regex = /^[xy]/
    let regex2 = /^[^z]/
    gates.sort((a, b) => {
        let aPrimitiveCount = regex.test(a[1]) + regex.test(a[3])
        let bPrimitiveCount = regex.test(b[1]) + regex.test(b[3])
        let bothNonZ = regex2.test(a[0]) && regex2.test(b[0])
        if (bothNonZ) return bPrimitiveCount - aPrimitiveCount
        return a[0].localeCompare(b[0])
    })
    return { wires, gates }
}

const gateOP = (wire1, type, wire2, wires) => {
    let output = null
    switch (type) {
        case 'AND':
            output = wires[wire1] & wires[wire2]
            break
        case 'XOR':
            output = wires[wire1] ^ wires[wire2]
            break
        case 'OR':
            output = wires[wire1] | wires[wire2]
            break
    }
    return output
}

const solve = (wires, gates) => {

    let zGates = gates.filter(([name]) => name.startsWith('z'))
    let nonZGates = gates.filter(([name]) => !name.startsWith('z'))

    const deque = new Deque(nonZGates);

    while (deque.size()) {
        let [name, wire1, type, wire2] = deque.popFront()
        if (!(wire1 in wires) || !(wire2 in wires)) {
            deque.pushBack([name, wire1, type, wire2])
            // console.log("dont have data ", { name, wire1, type, wire2 })
            continue
        }
        let output = gateOP(wire1, type, wire2, wires)
        wires[name] = output
    }

    for (let [name, wire1, type, wire2] of zGates) {
        let output = gateOP(wire1, type, wire2, wires)
        wires[name] = output
    }

    // console.log(gates.filter(a => a[0].startsWith('z')).length)
    let pairs = Object.entries(wires).sort((a, b) => a[0].localeCompare(b[0]))


    let res = pairs.filter(p => p[0].startsWith('z')).map(p => p[1])
    res.reverse()
    // console.log(res)

    return parseInt(res.join(''), 2)
}

const main = async () => {
    console.time('runtime')
    // let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let { wires, gates } = extractData(rawFile)
    // console.log(wires)
    // gates.forEach(arr => console.log(arr))

    let res = solve(wires, gates)
    console.log(res)
    console.timeEnd('runtime')
    return res

    // expected sample.txt = 4
    // expected sample2.txt = 2024
    // expected input.txt = 66055249060558
}

main()