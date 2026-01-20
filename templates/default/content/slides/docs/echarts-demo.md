---
title: ECharts 图表演示
description: 展示 ECharts 图表在幻灯片中的使用
pubDate: 2025-01-05
theme: black
transition: slide
slideNumber: true
---

## ECharts 图表

在幻灯片中使用 ECharts 创建交互式图表

---

## 折线图

```echarts
{
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [{
    "data": [150, 230, 224, 218, 135, 147, 260],
    "type": "line",
    "smooth": true
  }]
}
```

---

## 柱状图

```echarts
{
  "xAxis": {
    "type": "category",
    "data": ["产品A", "产品B", "产品C", "产品D", "产品E"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [{
    "data": [120, 200, 150, 80, 70],
    "type": "bar",
    "itemStyle": {
      "color": "#5470c6"
    }
  }]
}
```

---

## 饼图

```echarts
{
  "series": [{
    "type": "pie",
    "radius": "60%",
    "data": [
      {"value": 1048, "name": "搜索引擎"},
      {"value": 735, "name": "直接访问"},
      {"value": 580, "name": "邮件营销"},
      {"value": 484, "name": "联盟广告"},
      {"value": 300, "name": "视频广告"}
    ]
  }]
}
```

---

## 雷达图

```echarts
{
  "radar": {
    "indicator": [
      {"name": "销售", "max": 6500},
      {"name": "管理", "max": 16000},
      {"name": "技术", "max": 30000},
      {"name": "客服", "max": 38000},
      {"name": "研发", "max": 52000},
      {"name": "市场", "max": 25000}
    ]
  },
  "series": [{
    "type": "radar",
    "data": [{
      "value": [4200, 3000, 20000, 35000, 50000, 18000],
      "name": "预算"
    }, {
      "value": [5000, 14000, 28000, 26000, 42000, 21000],
      "name": "实际"
    }]
  }]
}
```

---

## 散点图

```echarts
{
  "xAxis": {},
  "yAxis": {},
  "series": [{
    "symbolSize": 20,
    "data": [
      [10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81],
      [11, 8.33], [14, 9.96], [6, 7.24], [4, 4.26],
      [12, 10.84], [7, 4.82], [5, 5.68]
    ],
    "type": "scatter"
  }]
}
```

---

## 仪表盘

```echarts
{
  "series": [{
    "type": "gauge",
    "detail": {"formatter": "{value}%"},
    "data": [{"value": 75, "name": "完成率"}]
  }]
}
```
