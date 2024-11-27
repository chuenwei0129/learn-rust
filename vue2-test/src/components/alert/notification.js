import Alert from './alert.vue'
// 虽然 alert.vue 包含了 template、script、style 三个标签，并不是一个 JS 对象，那怎么能够给它扩展一个方法 `newInstance` 呢？事实上，alert.vue 会被 Webpack 的 vue-loader 编译，把 template 编译为 Render 函数，最终就会成为一个 JS 对象，自然可以对它进行扩展。
import Vue from 'vue'

Alert.newInstance = (properties) => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Alert, {
        props,
      })
    },
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  const alert = Instance.$children[0]

  return {
    add(noticeProps) {
      alert.add(noticeProps)
    },
    remove(name) {
      alert.remove(name)
    },
  }
}

export default Alert
