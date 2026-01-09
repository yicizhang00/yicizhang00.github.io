---
title: React 类组件全局变量陷阱：深度解析实例隔离问题
date: 2026-01-09 09:59:24
tags:
  - React
  - JavaScript
  - 最佳实践
categories:
  - React
---

# 导言

在使用 React 类组件（Class Components）开发复杂表单或高复用性的业务页面时，开发者往往会为了方便定义一些辅助性的数据结构。然而，一个隐蔽且致命的错误是：**将本应属于组件实例的变量定义在类外部的模块作用域中**。

这种做法会破坏组件的封装性，导致多个组件实例意外共享同一份内存数据。在多 Tab 切换、路由缓存（如使用 `keep-alive` 或 `@withActivation`）以及“新建与编辑”共用组件的场景下，这往往是引发诡异 Bug 的根源。

# 现象

在实际业务中，该问题通常表现为以下几种令人困惑的现象：
- **数据串行**：在 A Tab 页输入的内容，切换到 B Tab 页后竟然奇迹般地同步出现了。
- **状态污染**：关闭并销毁了一个表单组件，再次打开时，旧的数据依然存在，没有被重置。
- **提交冲突**：明明只修改了当前页面的表单，结果提交时却带上了其他未打开页面的残留数据。

# 原因分析

在 JavaScript/TypeScript 的模块机制中，对象（Object）和数组（Array）是**引用类型**。

### 错误示范：模块级全局变量
如果在 Class 定义之外声明变量，该变量属于**模块作用域**。在整个应用生命周期内，该文件只会被加载一次，变量也只会在内存中初始化一次。

```ts
// 错误：模块级变量，全局唯一
const searchBox = {}; 
const attendee = [];

class MyForm extends React.Component {
    // 此时所有实例的 handler 都在操作同一个 searchBox
    handleInputChange = (val) => {
        searchBox.name = val; 
    }
    /* ... */
}   
```
当 MyForm 被实例化多次时（例如页面中同时渲染了两个 MyForm），它们通过闭包引用的都是同一个 searchBox 对象的内存地址。

正确示范：实例级成员变量
正确的做法是将变量定义在类内部，作为实例成员。这样每当 React 执行 new MyForm() 时，都会为该实例创建独立的内存空间。

``` ts
// 正确：每个实例拥有独立的副本
class MyForm extends React.Component {
    // 实例级属性，随组件创建而初始化，随组件销毁而回收
    searchBox = {};
    attendee = [];
    
    render() { /* ... */ }
}
```

# 最佳实践

为了规避此类问题并编写更健壮的 React 代码，建议遵循以下原则：

1. 严格限制作用域：所有与组件逻辑相关的可变数据，必须声明在 class 内部。
2. 优先使用 React State：对于需要驱动视图更新的数据，务必使用 this.state。即使是不需要触发重绘的辅助数据，也应挂载在 this 实例上（如 this.timer）。
3. 不可变数据处理：在修改对象或数组时，坚持使用浅拷贝（如 {...data}），避免直接修改引用，这在配合 shouldComponentUpdate 时尤为重要。
4. 默认值函数化：如果需要从外部引入复杂的默认配置，建议通过函数返回一个新的对象副本：
```ts
const getDefaultConfig = () => ({ filter: {}, pagination: { current: 1 } });
// 在组件中使用
this.state = { config: getDefaultConfig() };
```