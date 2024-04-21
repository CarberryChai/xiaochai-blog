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

![](/assets/snapshot_opencat.png)

## 2. 读取macOS Applications的应用列表

```swift
let resourceKeys: [URLResourceKey] = [.isApplicationKey]

func enumerateAppsFolder() -> [(String, NSImage)] {
    let fm = FileManager.default
    guard let appsURL = fm.urls(for: .applicationDirectory, in: .localDomainMask).first,
          let enumerator = fm.enumerator(at: appsURL, includingPropertiesForKeys: resourceKeys, options: .skipsSubdirectoryDescendants)
    else { return [] }

    return enumerator.reduce(into: []) { apps, fileURL in
        guard case let fileURL as URL = fileURL, let resourceValues = try? fileURL.resourceValues(forKeys: Set(resourceKeys)), let isApp = resourceValues.isApplication else { return }
        if isApp {
            let name = fileURL.deletingPathExtension().lastPathComponent
            let icon = NSWorkspace.shared.icon(forFile: fileURL.path)
            apps.append((name, icon))
        }
    }
}
```
