import {
  ReadFile,
  ReadInvoiceFolder,
  ReadSingleInvoiceFile,
  StatusMaintainer,
  WriteInvoiceFile,
  WriteInvoiceFolder
} from './files'
//tested
export function GetInvoice(args) {
  let result = []
  let pageX = args.page * 25
  let num = Math.floor(pageX / 1000)
  let name = 'invoice' + num + '.json'
  console.log(name, num)
  let { data } = ReadSingleInvoiceFile(name)
  result = data.slice(pageX, 25)
  return { invoices: result }
}
//tested for possible errors
export function AddInvoice(args) {
  let invoiceFileList = ReadInvoiceFolder()
  if (invoiceFileList.length > 1) {
    //tested
    let { data } = ReadSingleInvoiceFile(invoiceFileList[invoiceFileList.length - 1])
    // tested
    if (data.length == 1000) {
      let newInvoiceFile = 'invoice' + invoiceFileList.length + '.json'
      args.id = 0
      return WriteInvoiceFile(newInvoiceFile, [args])
    } else {
      //Tested
      args.id = data.length
      data.push(args)
      return WriteInvoiceFile(invoiceFileList[invoiceFileList.length - 1], data)
    }
  } else if (invoiceFileList.length == 1) {
    //tested
    let { data } = ReadSingleInvoiceFile(invoiceFileList[0])
    if (data.length == 1000) {
      // tested
      let newInvoiceFile = 'invoice' + invoiceFileList.length + '.json'
      args.id = 0
      return WriteInvoiceFile(newInvoiceFile, [args])
    } else {
      //tested
      args.id = data.length
      data.push(args)
      return WriteInvoiceFile(invoiceFileList[0], data)
    }
  } else {
    //tested
    let { error } = WriteInvoiceFolder('invoices')
    if (!error) {
      args.id = 0
      return WriteInvoiceFile('invoice0.json', [args])
    }
  }
}
export function DeleteInvoice(para) {
  console.log('delete Invoice')
}
