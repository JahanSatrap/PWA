export interface NestedObject {
  [key: string]: any
}

export function extractKeysFromArray(arr: NestedObject[], keysArray: (string | string[])[]): NestedObject[] {
  const getValue = (obj: NestedObject, key: string) => key.split('.').reduce((acc, k) => acc?.[k], obj)

  const setValue = (obj: NestedObject, keys: string[], value: any) => {
    let currentObj = obj
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      currentObj[key] = currentObj[key] || {}
      currentObj = currentObj[key]
    }
    currentObj[keys[keys.length - 1]] = value
  }

  return arr.map((obj) => {
    const newObj: NestedObject = {}
    keysArray.forEach((key) => {
      if (Array.isArray(key)) {
        key.forEach((nestedKey) => {
          setValue(newObj, nestedKey.split('.'), getValue(obj, nestedKey))
        })
      } else {
        setValue(newObj, key.split('.'), getValue(obj, key))
      }
    })
    return newObj
  })
}
