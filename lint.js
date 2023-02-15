/* eslint-env node */
const { spawn } = require('child_process')
const dotenv = require('dotenv')

function lint_check() {
    dotenv.config();
    if (process.platform === 'win32') {
        const windows_child = spawn(process.env.WINDOWS_LINT_COMMAND, ['run', 'lint'])
        // It looks like this function will execute after the spawn method has run the lint script (on exit) and if an object returns with no errors, the call back will console.log('No errors') message below.
        windows_child.on('exit', (code) => {
            if (code === 0) {
                console.log('ESlint found no errors. Great Job!')
            } else {
                console.error('ESlint found ' + code + ' errors with exit code.')
            }
        });
    } else if(process.platform === 'darwin') {
        const mac_child = spawn('npm', ['run', 'lint'])

        mac_child.on('exit', (code) => {
            if(code === 0) {
                console.log('ESlint found no errors. Great Job!')
            } else {
                console.error('ESlint found ' + code + ' errors with exit code.')
            }
        });
    }
};

module.exports = lint_check;