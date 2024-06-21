const { app } = require('electron')
const path = require('path')
const fs = require('fs')
export function filePath(name) {
  return path.join(app.getPath('documents'), name)
}
export function ReadFile(name) {
  let status = { error: false, message: 'File ready', data: [] }
  try {
    let data = fs.readFileSync(filePath(name), 'utf-8')
    if (data) status.data = JSON.parse(data)
  } catch (error) {
    status.error = true
    status.message = 'The file ' + name + ' was not found'
  } finally {
    return status
  }
}
export function WriteFile(name, data) {
  let status = { error: false, message: 'File ' + name + ' writing successful', data: data }
  try {
    let newItem = JSON.stringify(data)
    fs.writeFileSync(filePath(name), newItem, (err) => {})
  } catch (err) {
    status.error = true
    status.message = 'File ' + name + ' writing failed'
    console.log(err)
  } finally {
    return status
  }
}
export function WriteFolder(name) {
  let status = { error: false, message: 'Folder ready' }
  try {
    fs.mkdirSync(filePath(name), { recursive: true })
  } catch (error) {
    status.error = true
    status.message = 'failed to create folder'
    console.log(error)
  } finally {
    return status
  }
}
export function ReadFolder(name) {
  try {
    return fs.readdirSync(filePath(name), 'utf-8')
  } catch (error) {
    console.log(error)
    return []
  } 
}
export function ReadSingleInvoiceFile(name) {
  let status = { error: false, message: 'File ready', data: [] }
  try {
    let data = fs.readFileSync(path.join(app.getPath('documents'), 'invoices', name), 'utf-8')
    if (data) status.data = JSON.parse(data)
  } catch (error) {
    status.error = true
    status.message = 'The file ' + name + ' was not found'
  } finally {
    return status
  }
}
export function WriteInvoiceFile(name, data) {
  let status = { error: false, message: 'File ' + name + ' writing successful', data: data }
  try {
    let newItem = JSON.stringify(data)
    fs.writeFileSync(path.join(app.getPath('documents'), 'invoices', name), newItem, 'utf-8')
  } catch (err) {
    status.error = true
    status.message = 'File ' + name + ' writing failed'
    console.log(err)
  } finally {
    return status
  }
}
