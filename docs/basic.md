---
sidebarDepth: 2
---

## 项目结构

```
.
├─docs
│  │
│  └─.vuepress
│         config.js  // Vuepress 配置文件
│
│
├─public
│      favicon.ico
│      index.html
│
├─src
│  │  App.vue   // 根组件
│  │  main.js   // 项目入口
│  │  router.js // 路由
│  │  store.js  // 应用状态管理
│  │
│  ├─assets
│  │
│  ├─components
│  │      Header.vue
│  │      Scroll.vue
│  │
│  ├─layouts
│  │      default.vue
│  │
│  ├─pages
│  │      index.vue
│  │
│  └─plugins
│          axios.js
│          fontawesome.js
│
├─tests
│  └─unit
│       .eslintrc.js
│       example.spec.js
│
│  .browserslistrc
│  .env.development
│  .env.production
│  .eslintrc.js
│  .gitignore
│  babel.config.js
│  package.json
│  postcss.config.js
│  README.md
│  vue.config.js
│  yarn-error.log
│  yarn.lock
```

## 文件说明

-   `docs` 存放项目说明文档，参考 [Vuepress](https://vuepress.vuejs.org/zh/guide/)。
-   `src/layouts` 存放布局文件。
-   `.env.development`，`.env.production`针对开发环境，生产环境的配置。
-   `src/plugin` 通过 vue-cli3 plugin 模式下载的包会包含一些最佳实践的配置，存放在 plugin 文件夹下。
-   `postcss.config.js` postcss 配置
-   `babel.config.js` babel 配置，默认添加 vue 的 presets
-   `src/components` 存放公共组件，公共组件需要在 Vuepress 中写明用法，方便其它团队成员使用。

## 路由

`router` 会根据 `page` 中的文件层级自动生成路由。

### 基础路由

假设 pages 的目录结构如下：

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，自动生成的路由配置如下：

```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

### 嵌套路由

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。

假设文件结构如：

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

自动生成的路由配置如下：

```js
router: {
    routes: [
        {
            path: '/users',
            component: 'pages/users.vue',
            children: [
                {
                    path: '',
                    component: 'pages/users/index.vue',
                    name: 'users'
                },
                {
                    path: ':id',
                    component: 'pages/users/_id.vue',
                    name: 'users-id'
                }
            ]
        }
    ]
}
```

### 动态路由

定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

生成对应的路由配置表为：

```js
router: {
    routes: [
        {
            name: 'index',
            path: '/',
            component: 'pages/index.vue'
        },
        {
            name: 'users-id',
            path: '/users/:id?',
            component: 'pages/users/_id.vue'
        },
        {
            name: 'slug',
            path: '/:slug',
            component: 'pages/_slug/index.vue'
        },
        {
            name: 'slug-comments',
            path: '/:slug/comments',
            component: 'pages/_slug/comments.vue'
        }
    ]
}
```

## 插件

插件的添加需要先调研大小和性能，随意添加插件可能会导致项目启动越来越慢。下面是除脚手架外的插件

### axios

axios 默认配置已经添加了全局的拦截器，你可以在里面做一些额外的操作，例如：

-   处理异常
-   防止重复提交
-   添加认证的 Header 等

此外，`axios` 已经挂载到了 `Vue` 的根实例，你可以通过 `this.aioxs` 或者 `this.$axios` 获取 `axios` 对象。不建议额外地封装 `axios` 相关的方法，但是请求的 url 单独提取到一个文件中是需要的。

### vuetify

UI 组件库，包含了部分字体图标，参考[vuetify 官网](https://vuetifyjs.com/zh-Hans)

### lodash

函数类库，提供了多种方便使用的工具函数。使用时请注意按需加载：

```js
// bad
import _ from 'lodash'

// good
import debounce from 'lodash/debounce'
```

### better-scroll

模拟滚动，通过封装 `better-scroll` 在 `src/components` 下有一个 Scroll 组件，使用它可以快速地添加滚动回弹，上拉加载，下拉刷新等效果。

### fastclick

解决移动端 300ms 点击延迟。

### normalize.css

css reset，抹平主流浏览器之间的差异。

### vue-auto-routing

根据文件结构，自动生成路由。

### vuepress

静态站点生成器，用于托管项目说明文档。

### nprogress

提供路由跳转时顶部进度条

## 多环境配置

下面针对于接口做多环境配置的说明。

### 开发环境

开发环境增加的了服务器反向代理，用于处理跨域的问题。下面是配置过程：

1. `src/plugin/axios` 中的 `baseUrl` 用于定义接口的域名，将 `baseUrl` 的值为 `process.env.VUE_APP_API`
2. `process.env.VUE_APP_API` 是项目根目录下 `.env.development` 中定义的变量，这个变量的值为 `/api`
3. 在 `vue.config.js` 中的 `devServer` 配置跨域，将带有 `/api` 的请求转发到真实的后端接口地址，也就是 target 中的值

在开发环境下，新增了一些正在处于 `stage-1` 阶段的语法，来提升编码效率：

```js
// old
let a = {}
console.log(a.b.c) // error

// now
let a = {}
console.log(a?.b?.c) // 当某个值个空时则会取消继续取值的操作
```

```js
// old
if (a) {
    a = b
}
// or
a && (a = b)

// now
a &&= b // 对于简单的逻辑控制，写法更加优雅简洁
```

:::tip
对于开发环境，你只需要将 `vue.config.js` 中 `devServer` 的 `target` 属性修改为接口地址就可以了。
:::

### 生产环境

当你运行 <pre><code>npm run build</code></pre> 时 `process.env` 将使用 `.env.production` 中定义的变量，你只需要将 `process.env.VUE_APP_API` 的值改为生产环境的接口地址就可以了。
