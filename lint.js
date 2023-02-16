/* eslint-env node */
const { spawn } = require('child_process')
const dotenv = require('dotenv');

function lint_check() {
    dotenv.config();
    if (process.platform === 'win32') {
        const windows_child = spawn(process.env.WINDOWS_LINT_COMMAND, ['run', 'lint'])
        let output = ''
        windows_child.stdout.on('data', (data) => {
            output += data.toString()
        })
        windows_child.stderr.on('data', (data) => {
            output += data.toString()
        })
        windows_child.on('exit', (code) => {
            console.log(output)
            if (code === 0) {
                console.log('ESlint found no errors. Great Job!')
            } else {
                console.error('ESlint found ' + code + ' errors with exit code.')
            }
        });
    } else if(process.platform === 'darwin') {
        const mac_child = spawn('npm', ['run', 'lint'])
        let output = ''
        mac_child.stdout.on('data', (data) => {
            output += data.toString()
        })
        mac_child.stderr.on('data', (data) => {
            output += data.toString()
        })
        mac_child.on('exit', (code) => {
            if(code === 0) {
                console.log('ESlint found no errors. Great Job!')
            } else {
                console.log(output)
            }
        });
    }
}
module.exports = lint_check