import test from 'ava'
import timestore from './timestore'


test('read from store', async t => {
    let json = await timestore.read()
    t.is(typeof json, 'object')
})

test('write to store', async t => {
    let json = await timestore.read()
    json.days.push("teststring")
    await timestore.write(json)
    let writtenJSON = await timestore.read()
    console.log(writtenJSON)
    t.is(typeof json, 'object')
})