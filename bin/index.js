const chalk = require('chalk')
const meow = require('meow')

const cli = meow(
    `
        meow!
    `,
    {
        flags: {
            bla: {
                type: 'boolean',
                alias: '',
            }
        },
    }
)