---
title: Mermaid Diagrams
description: Create flowcharts, sequence diagrams, and more with Mermaid
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Mermaid
  - Diagrams
---

# Mermaid Diagrams

Create beautiful diagrams directly in Markdown using [Mermaid](https://mermaid.js.org).

## Basic Syntax

Use a code block with `mermaid` language:

````markdown
```mermaid
graph TD
    A[Start] --> B[End]
```
````

## Flowchart

### Basic Flow

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Do Something]
    B -->|No| D[Do Something Else]
    C --> E[End]
    D --> E
```

### Left to Right

```mermaid
graph LR
    A[Input] --> B[Process]
    B --> C[Output]
```

### Node Shapes

```mermaid
graph TD
    A[Rectangle]
    B(Rounded)
    C([Stadium])
    D[[Subroutine]]
    E[(Database)]
    F((Circle))
    G{Diamond}
    H{{Hexagon}}
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database

    User->>Browser: Enter URL
    Browser->>Server: HTTP Request
    Server->>Database: Query Data
    Database-->>Server: Return Data
    Server-->>Browser: HTTP Response
    Browser-->>User: Display Page
```

## Class Diagram

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

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Review
    Review --> Draft: Changes needed
    Review --> Published
    Published --> Archived
    Archived --> [*]
```

## Gantt Chart

```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Planning
        Requirements     :a1, 2025-01-01, 7d
        Design          :a2, after a1, 5d
    section Development
        Backend         :b1, after a2, 14d
        Frontend        :b2, after a2, 14d
    section Testing
        Testing         :c1, after b1, 7d
        Deployment      :c2, after c1, 3d
```

## Pie Chart

```mermaid
pie title Language Usage
    "JavaScript" : 45
    "TypeScript" : 30
    "Python" : 15
    "Other" : 10
```

## Entity Relationship

```mermaid
erDiagram
    USER ||--o{ POST : writes
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST }|--|| CATEGORY : belongs_to
```

## Git Graph

```mermaid
gitGraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Feature A"
    commit id: "Feature B"
    checkout main
    merge develop
    commit id: "Release"
```

## Styling

### Custom Colors

```mermaid
graph TD
    A[Start]:::green --> B{Check}:::yellow
    B -->|Pass| C[Success]:::green
    B -->|Fail| D[Error]:::red

    classDef green fill:#90EE90
    classDef yellow fill:#FFE4B5
    classDef red fill:#FFB6C1
```

## Tips

::: tip Best Practices
1. **Keep it simple** - Complex diagrams become hard to read
2. **Use meaningful labels** - Clear text improves understanding
3. **Choose the right type** - Match diagram to your content
4. **Test rendering** - Preview before publishing
:::

::: info Learn More
Full documentation: [mermaid.js.org](https://mermaid.js.org/syntax/flowchart.html)
:::

---

Next: [LaTeX Math](./02-latex) for mathematical formulas.
