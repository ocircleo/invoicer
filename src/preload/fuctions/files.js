import { callbackify } from 'util'

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
export function ReadInvoiceFolder() {
  let dir
  try {
    dir = fs.readdirSync(filePath('invoices'), 'utf-8')
    return dir
  } catch (error) {
    try {
      let status = ReadFile('status.json')
      fs.mkdirSync(filePath('invoices'), { recursive: true })
      fs.writeFileSync(path.join(app.getPath('documents'), 'invoices', 'invoice0.json'), '[]')
      status.data.invoiceList.push('invoice0.json')
      WriteFile('status.json', status.data)
      return fs.readdirSync(filePath('invoices'), 'utf-8')
    } catch (error) {
      StatusMaintainer(ReadInvoiceFolder, null)
    }
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
    fs.writeFileSync(path.join(app.getPath('documents'), 'invoices', name), newItem, (err) => {})
  } catch (err) {
    status.error = true
    status.message = 'File ' + name + ' writing failed'
    console.log(err)
  } finally {
    return status
  }
}
export function StatusMaintainer(callBack, args) {
  let template = {
    invoiceList: [],
    date: Date.now(),
    soldToday: []
  }
  let currentStatus = ReadFile('status.json')
  if (currentStatus.error) {
    try {
      let files = ReadInvoiceFolder()
      if (files.length == 0) {
        //passed
        template.invoiceList.push('invoice0.json')
        WriteFile('status.json', template)
        fs.writeFileSync(path.join(app.getPath('documents'), 'invoices', 'invoice0.json'), '[]')
      } else {
        //passed
        files.forEach((ele) => template.invoiceList.push(ele))
        WriteFile('status.json', template)
      }
    } catch (error) {
      //passed
      fs.mkdirSync(filePath('invoices'), { recursive: true })
      fs.writeFileSync(path.join(app.getPath('documents'), 'invoices', 'invoice0.json'), '[]')
      template.invoiceList.push('invoice0.json')
      WriteFile('status.json', template)
    } finally {
      callBack(args)
    }
  } else {
    callBack(args)
  }
}
