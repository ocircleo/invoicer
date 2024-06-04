import {
  ReadFile,
  ReadInvoiceFolder,
  ReadSingleInvoiceFile,
  StatusMaintainer,
  WriteInvoiceFile
} from './files'

export function GetInvoice(args) {
  let status = ReadFile('status.json')
  let result = {}
  if (status.error) {
    return StatusMaintainer(GetInvoice, args)
  } else {
    let pageX = args.page * 25
    let num = Math.floor(pageX / 1000)
    let name = 'invoice' + num + '.json'
    let allInvoiceFiles = ReadInvoiceFolder()
    let invoiceData = ReadSingleInvoiceFile(name)
    if (allInvoiceFiles.length == 1) {
      result.length = invoiceData.length()
    } else if (allInvoiceFiles.length > 1) {
      for (let i = 0; i < allInvoiceFiles.length - 1; i++) {
        result.length += 1000
      }
      result.length += invoiceData.length()
    } else {
      result.length = 0
    }
    result.data = invoiceData.data.slice(pageX, pageX + 25)
    return result
  }
}
export function AddInvoice(args) {
  let invoiceFileList = ReadInvoiceFolder()
  //if already have files more than 1
  if (invoiceFileList.length > 1) {
    let invoiceData = ReadSingleInvoiceFile(invoiceFileList[invoiceFileList.length - 1])
    if (invoiceData.length == 1000) {
      let newInvoiceFile = 'invoice' + invoiceFileList.length + '.json'
      return WriteInvoiceFile(newInvoiceFile, args.data)
    } else {
      invoiceData.push(args.data)
      WriteInvoiceFile(invoiceFileList[invoiceFileList.length - 1], invoiceData)
    }
  } else if (invoiceFileList.length == 1) {
    let invoiceData = ReadSingleInvoiceFile(invoiceFileList[0])
    if (invoiceData.length == 1000) {
      console.log('invoice is 10000')
      let newInvoiceFile = 'invoice' + invoiceFileList.length + '.json'
      return WriteInvoiceFile(newInvoiceFile, args)
    } else {
      let { data } = ReadSingleInvoiceFile('invoice0.json')
      console.log('Entered :', 'INvoice data: ', data)
      data.push(args)

      console.log('after push :', 'INvoice data: ', data)
      return WriteInvoiceFile(invoiceFileList[0], data)
    }
  } else {
    let newInvoiceFile = 'invoice0.json'
    return WriteInvoiceFile(newInvoiceFile, args.data)
  }
}
export function DeleteInvoice(para) {
  console.log('delete Invoice')
}
