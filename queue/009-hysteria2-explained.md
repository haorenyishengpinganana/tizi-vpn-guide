---
title: 'Hysteria2 是什么？速度为什么快、晚高峰稳不稳、哪些客户端支持'
description: 'Hysteria2（hy2）节点是什么协议？基于 QUIC 和 UDP 为什么快、运营商限速 UDP 时怎么办、端口跳跃是什么，以及 Clash、v2rayN 等哪些客户端支持 Hysteria2。'
lang: zh
hasAffiliateLinks: true
tags: [Hysteria2, hy2节点, 代理协议, QUIC]
sources:
  - title: 'Hysteria 2 官方文档'
    url: https://v2.hysteria.network/zh/
  - title: 'Hysteria 2 协议规范'
    url: https://v2.hysteria.network/zh/docs/developers/Protocol/
  - title: 'Hysteria 2 文档：端口跳跃'
    url: https://v2.hysteria.network/zh/docs/advanced/Port-Hopping/
  - title: 'Hysteria 2 文档：完整客户端配置（带宽）'
    url: https://v2.hysteria.network/zh/docs/advanced/Full-Client-Config/
  - title: 'mihomo 文档：Hysteria2'
    url: https://wiki.metacubex.one/config/proxies/hysteria2/
  - title: 'Hysteria GitHub 仓库'
    url: https://github.com/HyNetworks/hysteria
---

机场的节点列表里，经常能看到名字带 **Hysteria2** 或 **hy2** 的节点，很多人说它"速度特别快"。这篇文章用官方文档讲清楚：

- Hysteria2 是什么，跟 VLESS、Trojan 有什么不同；
- 它为什么快，什么情况下反而不好用；
- 哪些客户端支持。

> 本文信息截至 2026 年 11 月 14 日：Hysteria 最新版本是 **v2.13.0**（2026-10-05 发布），开源许可证 MIT，GitHub 星标约 2.3 万。

## Hysteria2 是什么？

官方的介绍是："Hysteria 是一个强大、快速、抗审查的代理工具。"按照协议规范，Hysteria2 是一个**基于 QUIC 的 TCP 和 UDP 代理**，目标是"速度、安全和抗审查"。

和常见协议对比：

| | Hysteria2 | VLESS / Trojan / VMess |
|---|---|---|
| 底层传输 | **QUIC（走 UDP）** | TCP |
| 伪装成 | **HTTP/3** 网站 | HTTPS 网站 |
| 网络差时 | 丢包多也能保持速度 | 丢包时速度明显下降 |
| 怕什么 | **运营商限速或封锁 UDP** | 线路拥堵 |

## 它为什么快？

### 1. 基于 QUIC，不怕丢包

官方文档说，Hysteria 基于**魔改的 QUIC 协议**，"即使在最不稳定和容易丢包的网络环境中也能提供无与伦比的性能"。

普通 TCP 协议遇到丢包会主动降速，晚高峰国际线路拥堵、丢包多的时候，速度就会掉得很厉害。Hysteria2 的思路不一样。

### 2. Brutal 拥塞控制：按设定的带宽发送

Hysteria2 有一种叫 **Brutal** 的拥塞控制方式。客户端填写自己的上传和下载带宽（配置里的 `up` / `down`），它就会**尽量按这个速度发送**；出现丢包时，还会根据丢包率略微多发一些，尽量维持目标速度。

不填带宽的话，会改用 BBR 等普通拥塞控制。

**注意**：官方特别警告，**带宽值不是越大越好**，"请务必不要超过你当前网络环境所能达到的最大带宽"，否则只会导致网络拥塞、连接不稳定。机场给的订阅一般已经填好了，不需要自己改。

### 3. 伪装成 HTTP/3 网站

按照协议规范，对于没有正确凭证的第三方（不管是中间人还是主动探测），Hysteria2 服务器**表现得就像一个普通的 HTTP/3 网站**，加密流量看起来也和正常的 HTTP/3 流量没有区别。

## 什么情况下 Hysteria2 不好用？

因为走的是 UDP，**最大的问题是运营商对 UDP 的限制**。官方文档也提到："中国用户有时报告运营商会阻断或限速 UDP 连接。"

表现通常是：白天很快，到了晚上或者过一段时间就突然连不上、速度很慢；或者家里宽带能用，换到公司网络就不行。

### 端口跳跃：应对单端口限速

官方的说法是，这些限制**往往只针对单个端口**，所以 Hysteria2 提供了**端口跳跃**：

- 服务器在一段端口范围上监听，比如 `20000-50000`；
- 客户端随机选一个端口连接，**每隔一段时间（默认 30 秒）换到另一个端口**；
- 跳跃过程对上层应用是透明的，不会导致断线。

在 Clash（mihomo）的配置里，对应 `ports`（端口范围）和 `hop-interval`（跳跃间隔）两个字段。机场的 hy2 节点如果支持端口跳跃，订阅里一般已经写好了。

不过官方也说了：**如果限制针对的是 UDP 本身，而不是某个端口，端口跳跃就没用了。**这时只能换回 VLESS、Trojan 这类走 TCP 的节点。

## 哪些客户端支持 Hysteria2？

| 客户端 | 平台 | 支持情况 |
|---|---|---|
| Clash Verge Rev | Windows / Mac / Linux | 支持（mihomo 内核） |
| FlClash、Clash Meta for Android | 安卓等 | 支持（mihomo 内核） |
| v2rayN | Windows / Mac / Linux | 支持，订阅协议列表里有 Hysteria2 |
| 原版 Clash、Clash for Windows | — | **不支持**，而且早已停止更新 |

**还在用 Clash for Windows 的话，节点列表里的 hy2 节点是用不了的**，换成 Clash Verge Rev 就行。

## 什么时候选 hy2 节点？

- **晚高峰速度慢、丢包多**：优先试 hy2 节点，往往有明显改善。
- **hy2 节点时好时坏、经常断**：很可能是你的网络在限制 UDP，换回 VLESS / Trojan 节点。
- **公司、学校网络**：这类网络常常限制 UDP，直接用 TCP 类节点更省心。

最实用的做法是：**同一个机场里 hy2 和 TCP 类节点各留几个**，哪个快用哪个。

## 想找有 Hysteria2 节点的机场？

本站推荐**枫叶 Maple Relay**，注册后可以在节点列表里看看有哪些协议：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

建议先买最短的周期，在你自己的网络上分别测一测 hy2 和普通节点。本站尚未发布它的实测数据，套餐与价格以官网为准。
