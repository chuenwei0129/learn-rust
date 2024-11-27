<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>
<script>
import uniqid from 'uniqid'
export default {
  name: 'v-alert',
  data() {
    return {
      // 通知可以是多个，我们用一个数组 `notices` 来管理每条通知
      notices: [],
    }
  },
  methods: {
    // Alert 组件可以无限扩展，只要在 add 方法中传递更多的参数，就能支持更复杂的组件，比如是否显示手动关闭按钮、确定 / 取消按钮，甚至传入一个 Render 函数都可以。
    add(notice) {
      const name = uniqid('notice-')

      this.notices.push({ ...notice, ...{ name } })

      // 定时移除，单位：秒
      const duration = notice.duration
      setTimeout(() => {
        this.remove(name)
      }, duration * 1000)
    },
    remove(name) {
      const notices = this.notices

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1)
          break
        }
      }
    },
  },
}
</script>
<style>
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
}
.alert-content {
  display: inline-block;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}
</style>
