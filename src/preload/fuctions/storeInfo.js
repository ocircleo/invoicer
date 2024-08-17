import { ReadFile, WriteFile } from './files'

export function storeInfo(args) {
  return WriteFile('store.json', args)
}
export function getStoreInfo() {
  return ReadFile('store.json')
}
