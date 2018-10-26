const execSync = require('child_process').execSync

if (process.platform === 'darwin') {
    module.exports = darwin;
} else if (process.platform === 'linux') {
    module.exports = linux;
} else if (process.platform === 'win32') {
    module.exports = win32;
} else {
    throw new Error('Only linux, darwin and win32 are supported, you have: ' + process.platform);
}

function darwin() {
    const output = execSync('sysctl -n kern.boottime').toString()
    const date = output.replace(/{[ ,=\w]+} /g, '').trim()
    return new Date(date)
}

function win32() {
    const output = execSync('net statistics workstation').toString()
    const date = /since (.+)$/gmi.exec(output).slice(1)
    return new Date(date)
}

function linux() {
    const output = execSync('uptime -s').toString()
    return new Date(output)
}