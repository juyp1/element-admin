/**
 * 写入缓存
 */
export const setStorage = (key, value) => {
  if (typeof key === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 读取缓存
 */
export const getStorage = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除指定缓存
 */
export const removeStorage = (key) => {
  window.localStorage.removeItem(key)
}
/**
 * 删除全部缓存
 */

export const removeStorageAll = () => {
  window.localStorage.clear()
}
