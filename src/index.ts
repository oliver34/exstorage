import { getStoreKey, serialize, deSerialize } from './utils'

export interface IExStorage {
  set(key: string, value: any, expire?: number): any
  get(key: string): any
  remove(key: string): void
}

export const localStore: IExStorage = {
  set: (key, value, expire = 0) => {
    const storeKey = getStoreKey(key)

    if (value === undefined) {
      return localStore.remove(storeKey)
    }

    try {
      localStorage.setItem(storeKey, serialize(value))
      if (expire > 0) {
        localStorage.setItem(`${storeKey}_expire`, serialize(new Date().getTime() + expire))
      } else if (localStorage.getItem(`${storeKey}_expire`)) {
        localStorage.removeItem(`${storeKey}_expire`)
      }
    } catch (error) {
      console.error(error)
    }
  },

  get: (key) => {
    let storeKey = getStoreKey(key)

    let storage = deSerialize(localStorage.getItem(storeKey))
    if (storage === null) {
      storeKey = key
      storage = deSerialize(localStorage.getItem(key))
    }

    if (storage !== null) {
      const expiredTime = deSerialize(localStorage.getItem(`${storeKey}_expire`)) as unknown as number
      // 缓存一直有效
      if (!expiredTime) {
        return storage
      }

      // 缓存过期 清除数据
      if (expiredTime && expiredTime < new Date().getTime()) {
        localStore.remove(storeKey)
        localStore.remove(`${storeKey}_expire`)
        return undefined
      }

      return storage
    }

    return undefined
  },

  remove: (key) => {
    localStorage.removeItem(key)
  },
}
