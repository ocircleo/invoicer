const { app } = require('electron')
const path = require('path')
const fs = require('fs')
export function filePath(name) {
  return path.join(app.getPath('documents'), name)
}
const statusOfFile = (name) => {
  let status = { error: false, message: 'File ready' }
  try {
    let data = fs.readFileSync(filePath(name), 'utf-8')
    status.data = data
  } catch (error) {
    status.error = true
    status.message = 'The file ' + name + ' was not found'
  } finally {
    return status
  }
}
export function writeFile(name, data, mainWindow) {
  let status = { error: false, message: 'File ' + name + ' writing successful' }
  try {
    let newItem = JSON.stringify(data)
    fs.writeFileSync(filePath(name), newItem, (err) => {})
  } catch (err) {
    status.error = true
    status.message = 'File ' + name + ' writing failed'
    console.log(err)
  } finally {
    mainWindow.webContents.send('writeStatus', status)
  }
}

export default statusOfFile
