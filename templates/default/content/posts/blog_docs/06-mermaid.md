---
title: Mermaid 图表
description: 使用 Mermaid 绘制流程图、时序图、甘特图等
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - Mermaid
  - 图表
  - 可视化
---

# Mermaid 图表

Mermaid 是一个基于文本的图表绘制工具，本博客内置支持，让你可以用简单的语法创建各种图表。

## 基本语法

在代码块中使用 `mermaid` 作为语言标识：

````markdown
```mermaid
graph LR
    A[开始] --> B[结束]
```
````

```mermaid
graph LR
    A[开始] --> B[结束]
```

## 流程图 (Flowchart)

### 基本流程图

```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
```

**语法说明**：

````markdown
```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
```
````

### 方向控制

| 方向 | 说明 |
|:---|:---|
| `TB` 或 `TD` | 从上到下 |
| `BT` | 从下到上 |
| `LR` | 从左到右 |
| `RL` | 从右到左 |

```mermaid
graph LR
    A[左边] --> B[中间] --> C[右边]
```

### 节点形状

```mermaid
graph TD
    A[矩形] --> B(圆角矩形)
    B --> C{菱形}
    C --> D([体育场形])
    D --> E[[子程序]]
    E --> F[(数据库)]
    F --> G((圆形))
```

### 连线样式

```mermaid
graph LR
    A --> B
    A --- C
    A -.- D
    A -.-> E
    A ==> F
    A --文字--> G
    A -.文字.-> H
```

## 时序图 (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as 用户
    participant C as 客户端
    participant S as 服务器
    participant D as 数据库

    U->>C: 点击登录
    C->>S: 发送登录请求
    S->>D: 查询用户信息
    D-->>S: 返回用户数据
    S-->>C: 返回登录结果
    C-->>U: 显示登录成功
```

**语法说明**：

````markdown
```mermaid
sequenceDiagram
    participant U as 用户
    participant C as 客户端

    U->>C: 实线箭头
    C-->>U: 虚线箭头
    U-)C: 异步消息
```
````

### 高级特性

```mermaid
sequenceDiagram
    participant A as 客户端
    participant B as 服务器

    A->>B: 请求数据

    alt 成功
        B-->>A: 返回数据
    else 失败
        B-->>A: 返回错误
    end

    opt 可选操作
        A->>B: 发送日志
    end

    loop 重试3次
        A->>B: 重新请求
    end
```

## 类图 (Class Diagram)

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
        +fetch()
    }

    class Cat {
        +String color
        +meow()
        +scratch()
    }

    Animal <|-- Dog
    Animal <|-- Cat
```

### 关系类型

```mermaid
classDiagram
    classA --|> classB : 继承
    classC --* classD : 组合
    classE --o classF : 聚合
    classG --> classH : 关联
    classI ..> classJ : 依赖
    classK ..|> classL : 实现
```

## 状态图 (State Diagram)

```mermaid
stateDiagram-v2
    [*] --> 待机
    待机 --> 运行中: 启动
    运行中 --> 暂停: 暂停
    暂停 --> 运行中: 继续
    运行中 --> 停止: 完成
    停止 --> [*]
```

### 复合状态

```mermaid
stateDiagram-v2
    [*] --> 活跃

    state 活跃 {
        [*] --> 空闲
        空闲 --> 处理中: 收到请求
        处理中 --> 空闲: 处理完成
    }

    活跃 --> 休眠: 超时
    休眠 --> 活跃: 唤醒
```

## 甘特图 (Gantt Chart)

```mermaid
gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD

    section 需求阶段
    需求分析     :a1, 2024-01-01, 7d
    需求评审     :a2, after a1, 3d

    section 设计阶段
    系统设计     :b1, after a2, 10d
    UI设计       :b2, after a2, 7d

    section 开发阶段
    后端开发     :c1, after b1, 20d
    前端开发     :c2, after b2, 15d

    section 测试阶段
    集成测试     :d1, after c1, 10d
    用户测试     :d2, after d1, 5d
```

## 饼图 (Pie Chart)

```mermaid
pie title 技术栈使用占比
    "JavaScript" : 35
    "Python" : 25
    "Go" : 20
    "Rust" : 12
    "其他" : 8
```

## 实体关系图 (ER Diagram)

```mermaid
erDiagram
    USER ||--o{ POST : writes
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST }o--|| CATEGORY : belongs_to

    USER {
        int id PK
        string username
        string email
        datetime created_at
    }

    POST {
        int id PK
        string title
        text content
        int author_id FK
    }
```

## Git 图 (Git Graph)

```mermaid
gitGraph
    commit id: "初始化"
    branch develop
    checkout develop
    commit id: "功能A"
    commit id: "功能B"
    checkout main
    merge develop id: "合并develop"
    commit id: "修复bug"
    branch feature
    commit id: "新功能"
    checkout main
    merge feature id: "合并feature"
```

## 用户旅程图 (User Journey)

```mermaid
journey
    title 用户购物旅程
    section 浏览商品
      访问首页: 5: 用户
      搜索商品: 4: 用户
      查看详情: 4: 用户
    section 购买流程
      添加购物车: 5: 用户
      填写地址: 3: 用户
      支付订单: 4: 用户
    section 售后
      收到商品: 5: 用户
      评价商品: 3: 用户
```

## 实用示例

### API 调用流程

```mermaid
sequenceDiagram
    participant App as 前端应用
    participant API as API网关
    participant Auth as 认证服务
    participant BL as 业务服务
    participant DB as 数据库

    App->>API: 请求 + Token
    API->>Auth: 验证Token
    Auth-->>API: Token有效
    API->>BL: 转发请求
    BL->>DB: 查询数据
    DB-->>BL: 返回数据
    BL-->>API: 业务响应
    API-->>App: 返回结果
```

### 系统架构图

```mermaid
graph TB
    subgraph 客户端
        Web[Web应用]
        Mobile[移动应用]
    end

    subgraph 网关层
        LB[负载均衡]
        GW[API网关]
    end

    subgraph 服务层
        US[用户服务]
        OS[订单服务]
        PS[商品服务]
    end

    subgraph 数据层
        MySQL[(MySQL)]
        Redis[(Redis)]
        ES[(Elasticsearch)]
    end

    Web --> LB
    Mobile --> LB
    LB --> GW
    GW --> US
    GW --> OS
    GW --> PS
    US --> MySQL
    US --> Redis
    OS --> MySQL
    PS --> MySQL
    PS --> ES
```

## 全屏预览

对于复杂的图表，元素可能会显示得较小，难以看清细节。本博客提供了全屏预览功能：

### 使用方法

1. **鼠标悬停**：将鼠标移到图表上，右上角会出现全屏按钮
2. **点击按钮**：点击全屏图标进入全屏预览模式
3. **缩放操作**：
   - 使用工具栏的 `+` / `-` 按钮缩放
   - 使用键盘 `+` / `-` / `0`（重置）快捷键
   - 使用鼠标滚轮缩放
4. **拖动平移**：
   - 按住鼠标左键拖动可平移查看图表不同部分
   - 移动端支持触摸拖动
5. **退出全屏**：点击关闭按钮或按 `Esc` 键

::: tip 快捷键与操作
| 操作 | 功能 |
|:---|:---|
| `+` 或 `=` | 放大图表 |
| `-` | 缩小图表 |
| `0` | 重置为 100% |
| `Esc` | 关闭全屏 |
| 鼠标滚轮 | 快速缩放 |
| 左键拖动 | 平移图表 |
| 适配按钮 | 自动适配屏幕大小 |

**注意**：打开全屏时会自动适配屏幕，让图表完整显示在可视区域内。
:::

### 适用场景

全屏预览特别适合以下场景：
- 复杂的系统架构图
- 多参与者的时序图
- 详细的甘特图计划
- 包含大量节点的流程图
- 复杂的实体关系图

## 注意事项

::: warning 渲染提示
- 图表会在页面加载后渲染
- 复杂图表可能需要几秒钟
- 语法错误会导致渲染失败
:::

::: tip 调试技巧
可以使用 [Mermaid Live Editor](https://mermaid.live/) 在线调试图表语法。
:::

## 下一步

- [视频嵌入](./07-video) - 在文章中嵌入视频
- [LaTeX 数学公式](./08-latex) - 学习数学公式排版
