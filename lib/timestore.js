const promisify = require('promisify-node')
const fs = promisify(require('fs'))
const path = require('path')
const storetemplate = require('../storetemplate')

function getStorePath() {
    return path.resolve(__dirname, '../store.json')
}

async function read() {
    let filepath = getStorePath()
    let json = await fs.readFile(filepath)
    return JSON.parse(json.toString())
}

async function addDay(date) {
    let json = await read()
}

async function write(json) {
    if (typeof json != 'string') json = JSON.stringify(json)
    let filepath = getStorePath()
    return fs.writeFile(filepath, json)
}

async function reset() {
    
}


module.exports = {
    read,
    write
}