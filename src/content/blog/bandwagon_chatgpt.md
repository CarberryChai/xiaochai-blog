---
author: Chai
pubDatetime: 2024-05-16T12:48:32.000+08:00
modDatetime:
title: 搬瓦工 VPS 解锁 ChatGPT
slug: bandwagon_chatgpt
featured: false
draft: false
tags:
  - vps chatgpt
description: 搬瓦工 vps 修改 DNS 快速解锁 ChatGPT
---

ChatGPT 对搬瓦工的 VPS 进行了限制，除了可以用 Cloudflare WARP 进行服务转发外，现在发现了一个最简单的方法。

## 1.修改hosts

登录服务器，`vim /etc/hosts`, 把`172.31.255.2 chat.openai.com`这行文本添加到 hosts 外面，保存，退出。

## 2.修改DNS Server 命令

```shell
echo -e "nameserver 172.31.255.2" > /etc/resolv.conf
```

总之，确保resolv.conf中是172.31.255.2，或者openai的相关域名解析结果是172.31.255.2都可以，172.31.255.2是一个反向代理，瓦工提供的。
