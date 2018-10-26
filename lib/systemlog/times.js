const execSync = require('child_process').execSync

function getEventsByID(id) {
    return execSync(`wevtutil.exe qe system /rd:true /f:text /q:"*[System/EventID=${id}]"`).toString()
}

function getStartTimes() {
    let events = getEventsByID(6005)
    return extractDates(events)
}

function getHibernationTimes() {
    let events = getEventsByID(42)
    return extractDates(events)
}

function getWakeupTimes() {
    let events = getEventsByID(107)
    return extractDates(events)
}

function getShutdownTimes() {
    let events = getEventsByID(6006)
    return extractDates(events)
}

function extractDates(events) {
    let dates = events.match(/Date: .*$/gm)
    if (!dates) return []
    return dates
        .map(date => date.match(/Date: (.*)/)[1])
        .map(date => new Date(`${date}Z`))
}

class Timepoint {
    constructor(date, type) {
        this.date = date
        this.type = type
    }
}

function getTimeseries() {
    let dates = [
        ...getStartTimes().map(time => new Timepoint(time, 'Start')),
        ...getShutdownTimes().map(time => new Timepoint(time, 'Shutdown')),
        ...getHibernationTimes().map(time => new Timepoint(time, 'Hibernation')),
        ...getWakeupTimes().map(time => new Timepoint(time, 'Wakeup')),
    ]
    return dates.sort((a, b) => a.date - b.date).reverse()
}

function getTotalTimeForDay(day) {
    let times = getTimeseries()
    times.find(time => time.date.getTime() > day.getTime() && time.date.getTime() < day.getTime() + 1000 * 60 * 60 * 24)
}

module.exports = {
    getShutdownTimes,
    getStartTimes,
    getHibernationTimes,
    getWakeupTimes,
    getTimeseries,
    getTotalTimeForDay,
}

// ' '
    // 'wevtutil qe system /rd:true /f:text /q:"*[System/EventID=6005]" '
    // 'wevtutil qe system /rd:true /f:text /q:"*[System/EventID=6006]" '
    // 107 - sleep resume