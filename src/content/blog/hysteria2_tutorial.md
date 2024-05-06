---
author: xiaochai
pubDatetime: 2024-04-13T14:12:20.000+08:00
modDatetime:
title: Hysteria2 教程
slug: hysteria2_tutorial
featured: false
draft: false
tags:
  - hysteria2
description: 记录一下我本人部署hysteria2过程，以备将来之用。
---

## 什么是Hysteria2

Hysteria 是一个强大、快速、抗审查的代理工具。以显著提成网络连接速度而闻名，可以做到油管4K视频秒开。[hysteria官网](https://v2.hysteria.network/zh/)

## 前期准备

- 一台可以连接公网的vps 【[推荐搬瓦工，老牌，可靠](https://bandwagonhost.com/aff.php?aff=74572)】
- 一个可以解析到上面vps的域名

## 安装

```shell
ssh -p [port] root@xx.xx.xx.xx
```

先用上面命令连接你的vps，例如：`ssh -p 7896 root@12.34.56.78`， 输入密码， 👌。

### 1.一键安装Hysteria2

```shell
bash <(curl -fsSL https://get.hy2.sh/)
```

### 2.修改配置文件

```shell
cat << EOF > /etc/hysteria/config.yaml
listen: :443 #监听端口

acme:
  domains:
    - a.com #你的域名，需要先解析到服务器ip
  email: test@sharklasers.com # 你的email地址

auth:
  type: password
  password: 123456 #设置认证密码

masquerade:
  type: proxy
  proxy:
    url: https://bing.com #伪装网址
    rewriteHost: true
EOF
```

修改上面脚本，把注释的字段换成你自己的，然后执行上述脚本。

### 查看hysteria状态一键启动服务

```shell
# 查看hysteria2状态
systemctl status hysteria-server.service
#启动Hysteria2
systemctl start hysteria-server.service
#重启Hysteria2
systemctl restart hysteria-server.service
#停止Hysteria2
systemctl stop hysteria-server.service
#设置开机自启
systemctl enable hysteria-server.service
```

看到下图，显示绿色字（active）以及日志打印server up and running即表示成功。
![](/assets/hysteria2_tutorial_pic_1.png)

## 客户端配置

### 1.下载Clash Verge客户端

[下载地址](https://github.com/clash-verge-rev/clash-verge-rev)

### 2.准备客户端配置文件

规则集可以直接用[clash rules](https://github.com/Loyalsoldier/clash-rules)
完整配置可以参考：

```yaml
# HTTP 端口
port: 7890

# SOCKS5 端口
socks-port: 1080

allow-lan: true
unified-delay: false
tcp-concurrent: true
external-controller: 127.0.0.1:9090
global-client-fingerprint: chrome
mode: Rule
log-level: info
tun:
  enable: true
  stack: mixed
  auto-route: true

proxies:
  - name: 'hysteria'
    type: hysteria2
    server: xx.xx # 你的vps地址或者绑定该vps IP地址的域名
    port: 443
    up: 50 # 自己测试一下，上传带宽 默认单位mbps
    down: 240 # 下载带宽
    password: xx # 你的密码
    sni: xx # 你的服务端配置的acm域名
    skip-cert-verify: true

# 代理组策略
# 策略组示例请查阅 Clash 项目 README 以使用最新格式：https://github.com/Dreamacro/clash/blob/master/README.md
proxy-groups:
  - name: 'PROXY'
    type: select
    proxies:
      - 'hysteria'

rule-providers:
  reject:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt'
    path: ./ruleset/reject.yaml
    interval: 86400

  icloud:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt'
    path: ./ruleset/icloud.yaml
    interval: 86400

  apple:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt'
    path: ./ruleset/apple.yaml
    interval: 86400

  google:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt'
    path: ./ruleset/google.yaml
    interval: 86400

  proxy:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt'
    path: ./ruleset/proxy.yaml
    interval: 86400

  direct:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt'
    path: ./ruleset/direct.yaml
    interval: 86400

  private:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt'
    path: ./ruleset/private.yaml
    interval: 86400

  gfw:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt'
    path: ./ruleset/gfw.yaml
    interval: 86400

  tld-not-cn:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt'
    path: ./ruleset/tld-not-cn.yaml
    interval: 86400

  telegramcidr:
    type: http
    behavior: ipcidr
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt'
    path: ./ruleset/telegramcidr.yaml
    interval: 86400

  cncidr:
    type: http
    behavior: ipcidr
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt'
    path: ./ruleset/cncidr.yaml
    interval: 86400

  lancidr:
    type: http
    behavior: ipcidr
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt'
    path: ./ruleset/lancidr.yaml
    interval: 86400

  applications:
    type: http
    behavior: classical
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt'
    path: ./ruleset/applications.yaml
    interval: 86400

rules:
  - RULE-SET,applications,DIRECT
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  - RULE-SET,private,DIRECT
  - RULE-SET,reject,REJECT
  - RULE-SET,icloud,DIRECT
  - RULE-SET,apple,DIRECT
  - RULE-SET,google,PROXY
  - RULE-SET,proxy,PROXY
  - RULE-SET,direct,DIRECT
  - RULE-SET,lancidr,DIRECT
  - RULE-SET,cncidr,DIRECT
  - RULE-SET,telegramcidr,PROXY
  - GEOIP,LAN,DIRECT,no-resolve
  - GEOIP,CN,DIRECT,no-resolve
  - MATCH,PROXY
```

### 3.填写规则

打开verge,订阅->新建， 类型local，选择文件。然后右键点击使用即可。
![](/assets/hysteria2_tutorial_pic_2.png)
