import test from 'ava'
import { getDifference } from './time'


test('test', t => {
    let diff = getDifference()
    diff = diff / 1000 / 60
    console.log(diff)
    t.pass()
})