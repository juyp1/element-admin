import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setStorage, getStorage } from '@/utils/storage'
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getStorage(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  return setStorage(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */

export function isCheckTimeOut() {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
