# note

> 本示例算是一个 MVP（最小化可行方案），要开发一个完善的全局通知组件，还需要更多可维护性和功能性的设计，但离不开本例的设计思路。以下几点是同类组件中值得注意的：

1. Alert.vue 的最外层是有一个 .alert 节点的，它会在第一次调用 `$Alert` 时，在 body 下创建，因为不在 `<router-view>` 内，它不受路由的影响，也就是说一经创建，除非刷新页面，这个节点是不会消失的，所以在 alert.vue 的设计中，并没有主动销毁这个组件，而是维护了一个子节点数组 `notices`。
2. .alert 节点是 `position: fixed` 固定的，因此要合理设计它的 `z-index`，否则可能被其它节点遮挡。
3. notification.js 和 alert.vue 是可以复用的，如果还要开发其它同类的组件，比如二次确认组件 `$Confirm`, 只需要再写一个入口 `confirm.js`，并将 `alert.vue` 进一步封装，将 `notices` 数组的循环体写为一个新的组件，通过配置来决定是渲染 Alert 还是 Confirm，这在可维护性上是友好的。
4. 在 notification.js 的 new Vue 时，使用了 Render 函数来渲染 alert.vue，这是因为使用 template 在 runtime 的 Vue.js 版本下是会报错的。
5. 本例的 content 只能是字符串，如果要显示自定义的内容，除了用 `v-html` 指令，也能用 Functional Render。
