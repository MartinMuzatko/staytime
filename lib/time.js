const os = require('os')
const uptime = require('./uptime')

function getHoursWorked() {
    return getDifference() / 60 / 60
}

function getDifference() {
    let stayed = uptime()
    let now = new Date()
    return now.getTime() - stayed.getTime()
}

module.exports = {
    getDifference,
    getHoursWorked
}