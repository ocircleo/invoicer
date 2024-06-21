import { AddItem, DeleteItem, GetItem, updateItem } from './Items'
import { AddInvoice, DeleteInvoice, GetInvoice, GetTotalPages } from './invoices'
import {
  ReadStatistics,
  ReadStatisticsItems,
  readStatsAll,
  updateStatisticsAll
} from './statistics'
import { AddUser, DeleteUser, GetUser, Login, updateUser } from './users'
let index = 0
export function apiRoutes(event, data, mainWindow) {
  index++
  let { path, args } = data
  let res
  switch (path?.to) {
    case 'getItem':
      res = GetItem(args)
      break
    case 'addItem':
      res = AddItem(args)
      break
    case 'updateItem':
      res = updateItem(args)
      break
    case 'deleteItem':
      res = DeleteItem(args)
      break
    case 'getUser':
      res = GetUser(args)
      break
    case 'addUser':
      res = AddUser(args)
      break
    case 'updateUser':
      res = updateUser(args)
      break
    case 'deleteUser':
      res = DeleteUser(args)
      break
    case 'getInvoice':
      res = GetInvoice(args)
      break
    case 'getTotalPages':
      res = GetTotalPages()
      break
    case 'addInvoice':
      res = AddInvoice(args)
      break
    case 'deleteInvoice':
      res = DeleteInvoice(args)
      break
    case 'updateStats':
      res = updateStatisticsAll(args)
      break
    case 'readStatsAll':
      res = readStatsAll(args)
      break
    case 'login':
      res = Login(args)
      break
  }
  console.log(index + ' : ', path)
  res.resId = index
  if (path.replyTo) {
    mainWindow.webContents.send(path.replyTo, res)
  }
}
