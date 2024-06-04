import { ReadFile, WriteFile } from './files'

export function GetItem(args) {
  let status = ReadFile('items.json')
  let id = args.id
  if (id == null) {
    return status
  } else {
    let singleData = status.data.find((ele) => ele.id == id)
    return {
      error: false,
      message: 'data found',
      data: singleData
    }
  }
}
export function AddItem(args) {
  const status = ReadFile('items.json')
  let data = status.data || []
  args.id = data.length
  data.push(args)
  return WriteFile('items.json', data)
}
export function updateItem(args) {
  const status = ReadFile('items.json')
  let data = status.data || []
  data.map((ele) => {
    if (ele.id == args.id) {
      ele.name = args.name
      ele.price = args.price
    }
  })
  return WriteFile('items.json', data)
}
export function DeleteItem(args) {
  const status = ReadFile('items.json')
  let data = status.data || []
  let newData = data.filter((ele) => ele.id != args.id)
  newData.map((ele, index) => (ele.id = index))
  return WriteFile('items.json', newData)
}
