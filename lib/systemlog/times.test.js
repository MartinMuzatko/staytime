import test from 'ava'
import times from './times'


test('get shutdown times', t => {
    var end = times.getShutdownTimes()
    var start = times.getStartTimes()
    console.log(start)
    console.log(end)
})

test('get sorted times', t => {
    console.log(times.getTimeseries())
})

test('get sorted times', t => {
    console.log(times.getTotalTimeForDay(new Date('2018-04-14')))
})