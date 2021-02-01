# 公共组件

公共组件需要项目成员共同维护，一个完整的组件说明文档应该包含 `props`，`slot`，`event`等。

## Scroll

基于 `better-scroll` 封装的模拟滚动组件，它是一个全局组件无需引入直接使用。

### props

| 参数         | 说明                     | 类型    | 默认值 |
| ------------ | ------------------------ | ------- | ------ |
| probeType    | 滚动类型                 | Number  | 1      |
| click        | 是否派发点击事件         | Boolean | true   |
| listenScroll | 是否派发滚动事件         | Boolean | true   |
| pullup       | 是否派发滚动到底部的事件 | Boolean | false  |
| pulldown     | 是否派发顶部下拉的事件   | Boolean | false  |

### slot

| 参数    | 说明             |
| ------- | ---------------- |
| default | 用于放置滚动内容 |

### event

| 参数        | 说明               |
| ----------- | ------------------ |
| scrollToEnd | 监听是否滚动到底部 |
| pulldown    | 是否出发下拉操作   |

## Header

顶部操作栏是 appShell 级别组件，被放置在根布局组件中，可以在当前页面组件根据业务需求设置相关的参数。

### 自定义 Header

```js
// 被缓存的页面中在 activated 钩子中初始化header，没有缓存的页面在 created 钩子中初始化
    activated() {
        this.setHeader({
            title: '首页',  // 标题
            showBack: false, // 是否设置返回按钮
            leftIcon: 'mdi-home', // 左侧图标，不能与返回按钮共同存在
            route: [ // 右侧操作按钮
                {
                    icon: 'mdi-pencil', // 右侧操作按钮图标
                    path: '/about'  // 右侧操作按钮对应路由
                }
            ]
        })
    }
```

### 自定义右侧操作按钮处理函数

```js
import eventHub from '@/eventHub'

activated(){
    eventHub.$on(`topbar-action-${btnIndex}`,handler)  // btnIndex 对应右侧按钮索引，handler为对应的处理函数
}
```

## BottomAction

底部操作栏是 appShell 级别组件，被放置在跟组件，可以在当前页面组件根据业务需求设置相关的参数。

### 自定义 BottomAction

```js
    activated() {
        this.setBottomAction({
            isShow: true,  // 控制底部操作栏显示隐藏
            activeItem: 0  // 被激活项的索引
        })
    }
```
