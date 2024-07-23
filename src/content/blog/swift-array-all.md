---
author: carberry
pubDatetime: 2024-07-20T13:59:38.000+08:00
modDatetime:
title: swift 语言中 Array 的使用指南
slug: siwft-array-all
featured: false
draft: false
tags:
  - swift array ios
description: 这是一篇关于 swift 语言中的 Array 使用方法的总结。
---

Array 在 swift 中是**按顺序**存储**相同类型**的集合。作为一个前端，深知数组在 JavaScript 中的应用范围之广，所以特意总结一下 swift 中的数组。

## 数组的创建

### 1.创建一个空数组

```swift
  // 空数组
  var nums1 = Array<Int>()
  var nums2: [Int] = []
  var nums3 = [Int]()

  // 带初始值的数组
  var nums4 = [1, 2, 3, 4, 5]
  var fruits = ["apple", "banana", "orange"]
```

### 从符合`Sequence`协议的集合创建数组

`init<S>(_ s: S) where Element == S.Element, S : Sequence`

```swift
  var nums = Array(1...7) // [1, 2, 3, 4, 5, 6, 7]

  let namedHues: [String: Int] = ["Vermillion": 18, "Magenta": 302,
        "Gold": 50, "Cerise": 320]
  let colorNames = Array(namedHues.keys) // ["Vermillion", "Magenta", "Gold", "Cerise"]
```

### 2.创建具有相同默认值的数组

```swift
  var threeDoubles = Array(repeating: 3.2, 3) // [3.2, 3.2, 3.2]
  var fiveZs = Array(repeating: "Z", 5) // ["Z", "Z", "Z", "Z", "Z"]
```

### 3.高级构造方法，主要用于高性能初始化大型数组的场景

`init(unsafeUninitializedCapacity capacity: Int, 
     initializingWith initializer: (UnsafeMutableBufferPointer<Element>, inout Int) throws -> Void) rethrows`

参数说明：

- `capacity`：要创建数组的容量
- `initializer`: 一个闭包，用于初始化数组元素。

```swift
  let nums = Array(unsafeUninitializedCapacity: 5) {buffer, initializedCount in
    for i in 0..< 5 {
      buffer[i] = i * 2
    }
    initializedCount = 5
  }
  print(nums) // [0, 2, 4, 6, 8]
```

这个构造方法在需要高效创建大型数组或者直接从底层数据源读取数据到数组中时特别有用。它允许你避免多次内存分配和拷贝操作，从而提高性能。

## 数组的访问和修改

```swift
var fruits = ["apple", "banana", "orange"]
let firstFruit = fruits[0] // "apple"; 通过索引访问
// 修改元素
fruits[1] = "pear"
// 添加元素
fruits.append("mango")
fruits += ["grape", "kiwi"]
// 插入元素
fruits.insert('cherry', at: 2) // ["apple", "banana", "cherry", "orange", "pear", "grape", "kiwi"]
// 删除元素
let removedFruit = fruits.remove(at: 1)
fruits.removeLast()
fruits.removeAll()
```

## 数组的常用属性

```swift
  let count = fruits.count // 数组长度
  let isEmpty = fruits.isEmpty // 是否为空
  let first = fruits.first // 第一个元素
  let last = fruits.last // 最后一个元素
```

## 数组遍历

```swift
// for-in 循环
for item in fruits {
  print(item)
}
// enumerated() 方法可以获取索引和值
for (index, item) in fruits.enumerated() {
  print("Item \(index): \(item)")
}
```

## 常用方法

### 1.排序

```swift
  let sortedFruits = fruits.sorted() // 返回排序后的新数组
  fruits.sort() // 原地排序
```

### 2.过滤

```swift
  let longFruits = fruits.filter { $0.count > 5 } // ["banana", "orange"]
```

### 3.映射

```swift
  let uppercasedFruits = fruits.map { $0.uppercased() }
```

### 4.查找

```swift
  let index = fruits.firstIndex(of: "Apple")
  let containsBanana = fruits.contains("Banana")
```

### 5.切片

```swift
  let slice = fruits[1...3] // 返回的是一个 ArraySlice, 它是 Array 的一个 view，与 Array 具有相同的属性和方法
```

### 6.reduce

```swift
  let totalLength = fruits.reduce(0) { $0 + $0.count }
```
