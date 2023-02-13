/* eslint-env node */

function lint_check() {
    // requiring the spawn method (an event method) from the 'child_process' module (similar to requiring the 'path' or 'fs' module)
    const { spawn } = require('child_process')
    // first parameter is the listener?
    const child = spawn('npm', ['run', 'lint'])

    // It looks like this function will execute after the spawn method has run the lint script (on exit) and if an object returns with no errors, the call back will console.log('No errors') message below.
    child.on('exit', (code) => {
        if (code === 0) {
            console.log('ESlint found no errors. Great Job!')
        } else {
            console.error('ESlint found the following errors with exit code: ' + code)
        }
    });
}

module.exports = lint_check;