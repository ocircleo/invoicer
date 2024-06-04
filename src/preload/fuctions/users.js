import { ReadFile, WriteFile } from './files'

export function GetUser(args) {
  let status = ReadFile('users.json')
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

export function AddUser(args) {
  const status = ReadFile('users.json')
  let data = status.data || []
  args.id = data.length
  data.push(args)
  return WriteFile('users.json', data)
}
export function updateUser(args) {
  const status = ReadFile('users.json')
  let data = status.data || []
  data.map((ele) => {
    if (ele.id == args.id) {
      ele.name = args.name
      ele.phone = args.phone
      ele.address = args.address
      ele.email = args.email
      ele.role = args.role
      ele.password = args.password
    }
  })
  return WriteFile('users.json', data)
}
export function DeleteUser(args) {
  const status = ReadFile('users.json')
  let data = status.data || []
  let newData = data.filter((ele) => ele.id != args.id)
  newData.map((ele, index) => (ele.id = index))
  return WriteFile('users.json', newData)
}
export function Login(args) {
  const status = ReadFile('users.json')
  let data = status.data || []
  let user = data.find((ele) => ele.phone == args.phone && ele.password == args.password)
  return { found: Boolean(user), user }
}
