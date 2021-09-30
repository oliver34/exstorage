const PREFIX = 'ls.'

/** 给key添加统一的前缀 */
export const getStoreKey = (key: string) => {
  if (!key) {
    return ''
  }

  if (key.indexOf(PREFIX) === 0) {
    return key
  }

  return `${PREFIX}${key}`
}

// 序列化
export const serialize = (value: any) => {
  return JSON.stringify(value)
}

// 解序列化
export const deSerialize = (value: string | null) => {
  if (!value) {
    return value
  }

  let deSerializeValue = ''
  try {
    deSerializeValue = JSON.parse(value)
  } catch (error) {
    deSerializeValue = value
  }

  return deSerializeValue
}
