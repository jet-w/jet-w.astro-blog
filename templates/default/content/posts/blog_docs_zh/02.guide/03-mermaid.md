---
title: Mermaid 图表
description: 使用 Mermaid 创建流程图、时序图等
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - Mermaid
  - 图表
---

# Mermaid 图表

使用 [Mermaid](https://mermaid.js.org) 直接在 Markdown 中创建精美的图表。

## 基本语法

使用 `mermaid` 语言的代码块：

````markdown
```mermaid
graph TD
    A[开始] --> B[结束]
```
````

## 流程图

### 基本流程

```mermaid
graph TD
    A[开始] --> B{决策}
    B -->|是| C[执行操作]
    B -->|否| D[执行其他操作]
    C --> E[结束]
    D --> E
```

### 从左到右

```mermaid
graph LR
    A[输入] --> B[处理]
    B --> C[输出]
```

### 节点形状

```mermaid
graph TD
    A[矩形]
    B(圆角)
    C([体育场])
    D[[子程序]]
    E[(数据库)]
    F((圆形))
    G{菱形}
    H{{六边形}}
```

## 时序图

```mermaid
sequenceDiagram
    participant 用户
    participant 浏览器
    participant 服务器
    participant 数据库

    用户->>浏览器: 输入URL
    浏览器->>服务器: HTTP请求
    服务器->>数据库: 查询数据
    数据库-->>服务器: 返回数据
    服务器-->>浏览器: HTTP响应
    浏览器-->>用户: 显示页面
```

## 类图

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## 状态图

```mermaid
stateDiagram-v2
    [*] --> 草稿
    草稿 --> 审核中
    审核中 --> 草稿: 需要修改
    审核中 --> 已发布
    已发布 --> 已归档
    已归档 --> [*]
```

## 甘特图

```mermaid
gantt
    title 项目时间线
    dateFormat YYYY-MM-DD
    section 规划
        需求分析     :a1, 2025-01-01, 7d
        设计          :a2, after a1, 5d
    section 开发
        后端开发      :b1, after a2, 14d
        前端开发      :b2, after a2, 14d
    section 测试
        测试          :c1, after b1, 7d
        部署          :c2, after c1, 3d
```

## 饼图

```mermaid
pie title 语言使用分布
    "JavaScript" : 45
    "TypeScript" : 30
    "Python" : 15
    "其他" : 10
```

## 实体关系图

```mermaid
erDiagram
    USER ||--o{ POST : 写
    USER ||--o{ COMMENT : 写
    POST ||--o{ COMMENT : 有
    POST }|--|| CATEGORY : 属于
```

## Git 图

```mermaid
gitGraph
    commit id: "初始化"
    branch develop
    checkout develop
    commit id: "功能A"
    commit id: "功能B"
    checkout main
    merge develop
    commit id: "发布"
```

## 样式

### 自定义颜色

```mermaid
graph TD
    A[开始]:::green --> B{检查}:::yellow
    B -->|通过| C[成功]:::green
    B -->|失败| D[错误]:::red

    classDef green fill:#90EE90
    classDef yellow fill:#FFE4B5
    classDef red fill:#FFB6C1
```

## 提示

::: tip 最佳实践
1. **保持简单** - 复杂的图表会变得难以阅读
2. **使用有意义的标签** - 清晰的文字提高理解度
3. **选择正确的类型** - 根据内容匹配图表类型
4. **测试渲染** - 发布前预览效果
:::

::: info 了解更多
完整文档：[mermaid.js.org](https://mermaid.js.org/syntax/flowchart.html)
:::

---

下一步：[LaTeX 数学](./06-latex) 了解数学公式渲染。
