// https://adventofcode.com/2024/day/17
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let registers = Array(3).fill(0)
    let commands = null
    let isRegister = true

    for (let i = 0; i < rawFile.length; i++) {
        let str = rawFile[i]
        if (str == "") {
            isRegister = false
            continue
        } else if (isRegister) {
            let numStr = str.split(":")[1]
            registers[i] = Number(numStr.trim())
        } else {
            let nums = str.split(":")[1].trim()
            commands = nums.split(",").map(Number)
        }
    }

    return [registers, commands]
}

const runProgram = (registers, commands) => {
    // registers = [729, 0, 0]      // [register A,B,C]

    let outputs = []

    let i = 0
    while (i < commands.length) {
        let op = commands[i]
        let arg = commands[i + 1]

        let [reg_A, reg_B, reg_C] = registers

        switch (arg) {
            case 4:
                arg = reg_A
                break
            case 5:
                arg = reg_B
                break
            case 6:
                arg = reg_C
                break
        }

        switch (op) {
            case 0:
                registers[0] = Math.floor(reg_A / (2 ** arg))
                break
            case 1:
                registers[1] ^= arg // reg_B
                break
            case 2:
                registers[1] = arg % 8
                break
            case 3:
                if (reg_A !== 0) {    // reg_A = 0 ,. do nothing
                    i = arg
                    continue
                }
            case 4:
                registers[1] ^= reg_C   // B XOR C
                break
            case 5:
                let val = arg % 8
                val = String(val).split('').map(Number)
                outputs.push(...val)
                break
            case 6:
                registers[1] = Math.floor(reg_A / (2 ** arg))
                break
            case 7:
                registers[2] = Math.floor(reg_A / (2 ** arg))
                break
        }
        i += 2

        // console.log(i, op, arg, registers)
    }

    return outputs.join(',')
}

const solve = (registers, commands) => {
    let oriStr = commands.join(',')
    // console.log(oriStr)
    // return 

    for (let i = 0; i < Infinity; i += 1) {
        registers[0] = i
        let outputStr = runProgram([...registers], commands)
        if (outputStr == oriStr) {
            console.log("found : ", oriStr, outputStr)
            return i
        }
        console.log({ i, outputStr })
        // if(i == 117400) return
    }
}

const main = async () => {
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let [registers, commands] = extractData(rawFile)
    console.log(registers)
    console.log(commands)

    let res = solve(registers, commands)
    console.log(res)
    return res

    // expected sample.txt = 117440
    // expected input.txt = ???
}

main()