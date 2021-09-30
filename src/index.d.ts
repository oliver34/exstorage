export interface IExStorage {
  set(key: string, value: any, expire?: number): any
  get(key: string): any
  remove(key: string): void
}
