---
author: Changlin
pubDatetime: 2024-03-31T09:03:50.000+08:00
modDatetime:
title: App开发小技巧
slug: app-develop-trick
featured: false
draft: false
tags:
  - App SwiftUI
description: 一些有用的App开发小技巧，记录一下
---

## 1. 打开debug菜单栏

在运行某个App时，带上`-_NS_4445425547 YES` 参数，会在菜单栏中多一个🐞菜单，这样你就可以查看到这种各样的debug信息。<br>
eg: 八爷的Opencat App可以这样打开

```shell
~/Applications/OpenCat.app/Contents/MacOS/OpenCat -_NS_4445425547 YES
```

![](https://cdn.jsdelivr.net/gh/CarberryChai/oss@master/uPic/snapshot_opencat.png)
