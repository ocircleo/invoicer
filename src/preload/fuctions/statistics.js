import { ReadFolder, WriteFolder } from './files'
const { app } = require('electron')
const fs = require('fs')
const path = require('path')
export function filePath(name) {
  return path.join(app.getPath('documents'), name)
}
let monthToTemplate = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
}

//main functions
//update functions
export function updateStatisticsAll(args) {
  let arr = args.xData
  for (let i = 0; i < arr.length; i++) {
    let { day, month, year } = arr[i]
    let infoData = {
      income: arr[i].income,
      discount: arr[i].discount,
      due: arr[i].due
    }
    UpdateStatistics({ day, month, year, infoData })
  }
  for (let i = 0; i < arr.length; i++) {
    let { day, month, year } = arr[i]
    let infoData = { itemName: arr[i].item }
    UpdateStatisticsItems({ day, month, year, infoData })
  }
  return { status: true }
}
export function UpdateStatistics(args) {
  let { day, month, year, infoData } = args
  let leap = Number(args.year) % 4 == 0 ? true : false
  let thisMonth = leap && month == 2 ? monthToTemplate[month] + 1 : monthToTemplate[month]
  let statsFolder = ReadFolder('statistics')
  let dataTemplate = {
    income: 0,
    discount: 0,
    due: 0
  }
  if (statsFolder.length > 0) {
    console.log('folder ok')
    let { data } = ReadSingleStatsFile(month + '-' + year + '.json')
    if (Array.isArray(data)) {
      console.log('no file ')
      let data = {}
      for (let i = 0; i < thisMonth; i++) {
        data[i + 1] = dataTemplate
      }
      WriteStatsFile(month + '-' + year + '.json', data)
      return UpdateStatistics(args)
    } else {
      data[day].income += Number(infoData.income)
      data[day].discount += Number(infoData.discount)
      data[day].due += Number(infoData.due)
      WriteStatsFile(month + '-' + year + '.json', data)
    }
  } else {
    console.log('no folder ')
    let data = {}
    for (let i = 0; i < thisMonth; i++) {
      data[i + 1] = dataTemplate
    }
    WriteFolder('statistics')
    WriteStatsFile(month + '-' + year + '.json', data)
    return UpdateStatistics(args)
  }

  return { args }
}
export function UpdateStatisticsItems(args) {
  let { day, month, year, infoData } = args
  let leap = Number(args.year) % 4 == 0 ? true : false
  let thisMonth = leap && month == 2 ? monthToTemplate[month] + 1 : monthToTemplate[month]
  let statsFolderItem = ReadFolder('statisticsItems')
  let fileName = month + '-' + year + '.json'
  if (statsFolderItem.length > 0) {
    console.log('folder ok')
    let { data } = ReadSingleStatsFileItem(fileName)
    if (Array.isArray(data)) {
      console.log('no file ')
      let newData = {}
      for (let i = 0; i < thisMonth; i++) {
        newData[i + 1] = {}
      }
      WriteStatsFileItem(fileName, newData)
      return UpdateStatistics(args)
    } else {
      let name = infoData.itemName
      data[day][name] ? (data[day][name] += 1) : (data[day][name] = 1)
      WriteStatsFileItem(fileName, data)
    }
  } else {
    console.log('no folder ')
    let newData = {}
    for (let i = 0; i < thisMonth; i++) {
      newData[i + 1] = {}
    }
    WriteFolder('statisticsItems')
    WriteStatsFileItem(fileName, newData)
    return UpdateStatisticsItems(args)
  }
  return { args }
}

//Read functions

export function readStatsAll(args) {
  let itemData = ReadStatisticsItems(args)
  let monthData = ReadStatistics(args)

  let data = {
    month: monthData.data,
    items: itemData.data
  }
  return data
}
export function ReadStatistics(args) {
  let { day, month, year } = args
  let { data } = ReadSingleStatsFile(month + '-' + year + '.json')
  if (day == null) {
    return Array.isArray(data) ? { data: {} } : { data }
  }
  let dayData = data[day] ? data[day] : {}
  return { data: dayData }
}
export function ReadStatisticsItems(args) {
  let { day, month, year } = args
  let { data } = ReadSingleStatsFileItem(month + '-' + year + '.json')
  if (day == null) {
    return Array.isArray(data) ? { data: {} } : { data }
  }

  let dayData = data[day] ? data[day] : {}
  return { data: dayData }
}

//file system
export function ReadSingleStatsFile(name) {
  let status = { error: false, message: 'File ready', data: [] }
  try {
    let data = fs.readFileSync(path.join(app.getPath('documents'), 'statistics', name), 'utf-8')
    if (data) status.data = JSON.parse(data)
  } catch (error) {
    status.error = true
    status.message = 'The file ' + name + ' was not found'
  } finally {
    return status
  }
}
export function WriteStatsFile(name, data) {
  let status = { error: false, message: 'File ' + name + ' writing successful', data: data }
  try {
    let newItem = JSON.stringify(data)
    fs.writeFileSync(path.join(app.getPath('documents'), 'statistics', name), newItem, 'utf-8')
  } catch (err) {
    status.error = true
    status.message = 'File ' + name + ' writing failed'
    console.log(err)
  } finally {
    return status
  }
}
//file system for item
export function WriteStatsFileItem(name, data) {
  let status = { error: false, message: 'File ' + name + ' writing successful', data: data }
  try {
    let newItem = JSON.stringify(data)
    fs.writeFileSync(path.join(app.getPath('documents'), 'statisticsItems', name), newItem, 'utf-8')
  } catch (err) {
    status.error = true
    status.message = 'File ' + name + ' writing failed'
    console.log(err)
  } finally {
    return status
  }
}
export function ReadSingleStatsFileItem(name) {
  let status = { error: false, message: 'File ready', data: [] }
  try {
    let data = fs.readFileSync(
      path.join(app.getPath('documents'), 'statisticsItems', name),
      'utf-8'
    )
    if (data) status.data = JSON.parse(data)
  } catch (error) {
    status.error = true
    status.message = 'The file ' + name + ' was not found'
  } finally {
    return status
  }
}
