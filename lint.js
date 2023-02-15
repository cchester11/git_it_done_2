/* eslint-env node */

function lint_check() {
    // requiring the spawn method (an event method) from the 'child_process' module (similar to requiring the 'path' or 'fs' module)
    const { spawn } = require('child_process')
    // first parameter is the listener?
    const child = spawn('C://Users//Charles//scoop//apps//nodejs//current//node_modules//npm//bin//npm.cmd', ['run', 'lint'])

    // It looks like this function will execute after the spawn method has run the lint script (on exit) and if an object returns with no errors, the call back will console.log('No errors') message below.
    child.on('exit', (code) => {
        if (code === 0) {
            console.log('ESlint found no errors. Great Job!')
        } else {
            console.error('ESlint found ' + code +  ' errors with exit code.')
        }
    });
}

module.exports = lint_check;