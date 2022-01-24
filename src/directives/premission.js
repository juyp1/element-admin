import store from '@/store'
function checkPermission(el, binding) {
  const { value } = binding
  const points = store.getters.userInfos.permission.points
  if (value && value instanceof Array) {
    const hasPermis = points.some((point) => {
      return value.includes(point)
    })
    if (!hasPermis) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(
      'v-permission value is Array but is ["admin","edit","list"]'
    )
  }
}
export default {
  // 权限处理

  // 绑定元素的父组件被挂在之后调用
  // el 组件dom
  // binding 传入的值
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
