---
title: 'Clash 订阅和 v2ray 订阅有什么区别？订阅链接导入失败怎么办'
description: '机场后台为什么有 Clash 订阅、通用订阅好几个按钮？两种订阅的内容有什么不同、各自对应哪些客户端、导入失败怎么排查，以及订阅转换工具的隐私风险。'
lang: zh
hasAffiliateLinks: true
tags: [Clash订阅, v2ray订阅, 订阅链接, 订阅转换]
sources:
  - title: 'mihomo 文档：代理节点 proxies'
    url: https://wiki.metacubex.one/config/proxies/
  - title: 'mihomo 文档：路由规则 rules'
    url: https://wiki.metacubex.one/config/rules/
  - title: 'mihomo 文档：代理集合 proxy-providers'
    url: https://wiki.metacubex.one/config/proxy-providers/
  - title: 'v2rayN Wiki：订阅功能说明'
    url: https://github.com/2dust/v2rayN/wiki/Description-of-subscription
  - title: 'subconverter（订阅转换工具）'
    url: https://github.com/tindy2013/subconverter
---

买了机场之后，后台往往有好几个"复制订阅"按钮：**Clash 订阅**、**通用订阅**、**v2ray 订阅**、**Shadowrocket 订阅**……很多人随便复制一个，结果客户端提示"导入失败"或"配置格式错误"。

其实区别很简单：**它们是同一批节点，只是写成了不同客户端能读懂的格式**。

## 订阅链接是什么？

订阅链接就是一个网址。客户端定期访问这个网址，拿到最新的节点列表。所以：

- **机场换了节点，你不用重新导入**，客户端更新订阅时会自动拿到新的；
- **订阅链接里带着你的账号凭证**，别人拿到就能直接用你的流量，**不要发给别人，也不要截图发到群里**。万一泄露了，到机场后台点"重置订阅链接"。

## 两种订阅的内容有什么不同？

### v2ray 订阅（通用订阅）：一串分享链接

v2ray 订阅的内容是**一行一个节点的分享链接**，比如：

```text
vless://…@example.com:443?security=tls&type=tcp#香港 01
trojan://…@example.com:443#日本 01
```

很多机场还会把整段内容再做一次 **Base64 编码**，所以在浏览器里打开订阅链接，看到的可能是一大串乱码，这是正常的。

v2rayN 的官方 Wiki 说明，它的订阅支持 VMess、Shadowsocks、SOCKS、VLESS、Trojan、Hysteria2、TUIC、WireGuard、AnyTLS 等协议，格式是各协议的**标准分享链接**。

**特点**：只有节点，**没有分流规则**。哪些网站走代理、哪些直连，由客户端自己决定。

### Clash 订阅：一份完整的配置文件

Clash 订阅的内容是一份 **YAML 配置文件**，不只有节点，还包括：

| 部分 | 作用 |
|---|---|
| `proxies` | 节点列表 |
| `proxy-groups` | 策略组，比如"自动选择""故障转移""流媒体" |
| `rules` | 分流规则，比如国内网站直连、国外网站走代理 |

规则大概长这样（摘自 mihomo 官方文档的示例）：

```yaml
rules:
  - DOMAIN-SUFFIX,google.com,auto
  - GEOSITE,youtube,PROXY
  - GEOIP,CN,DIRECT
```

**特点**：机场已经帮你写好了分流规则，**导入就能用**，不用自己配置。

## 哪个客户端用哪种订阅？

| 客户端 | 用哪种订阅 |
|---|---|
| Clash Verge Rev、Clash Meta for Android、FlClash（电脑/安卓） | **Clash 订阅** |
| Stash（iPhone） | **Clash 订阅** |
| v2rayN（电脑）、v2rayNG（安卓） | **v2ray / 通用订阅** |
| Shadowrocket（iPhone） | **通用订阅**，或机场专门的 Shadowrocket 订阅 |

**记住一句话：名字里带 Clash 的客户端用 Clash 订阅，名字里带 v2ray 的用 v2ray 订阅。**

## 订阅导入失败怎么排查？

按下面的顺序检查：

1. **格式选错了**：最常见的原因。把 v2ray 订阅导入 Clash 客户端，会提示配置格式错误；反过来也一样。回机场后台换一个按钮复制。
2. **链接没复制全**：订阅链接通常很长，确认末尾没有被截断，前后没有多余的空格。
3. **账号过期或流量用完**：很多机场在账号过期后，订阅会返回空内容或者一个"已过期"的假节点。登录机场官网看一下账号状态。
4. **订阅地址本身被墙了**：部分机场的订阅域名在国内打不开。可以先连上任意一个能用的节点，再更新订阅；v2rayN 更新订阅时就会先尝试通过代理获取。
5. **客户端太旧**：机场用了新协议（比如 Hysteria2、AnyTLS），老版本客户端不认识，会解析失败。更新到最新版再试。

## 订阅转换工具安全吗？

网上有很多"订阅转换"网站，可以把 v2ray 订阅转成 Clash 订阅。它们大多基于开源项目 **subconverter**，自己部署是没问题的。

但**使用别人搭的在线转换网站时要注意**：你需要把订阅链接交给对方的服务器，**对方就能看到你的订阅地址**，相当于拿到了你的账号。除非是你信任的服务，否则：

- **优先用机场后台自带的 Clash 订阅**，大多数机场都有，根本不需要转换；
- 实在需要转换，**自己本地部署 subconverter**；
- 用过不信任的转换网站后，到机场后台**重置一次订阅链接**。

## 小结

- **Clash 订阅** = 节点 + 策略组 + 分流规则，导入即用，给 Clash 系客户端用。
- **v2ray 订阅** = 只有节点，给 v2rayN、v2rayNG、Shadowrocket 等用。
- 导入失败先看**格式选没选对**，再看**账号状态**。
- 订阅链接就是账号，**别给别人，别乱交给在线转换网站**。

## 还没有订阅？

本站推荐**枫叶 Maple Relay**，注册后可以在后台看到它提供的订阅格式：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

建议先买最短的周期，在晚高峰实际用一用，满意再续费。本站尚未发布它的实测数据，套餐与价格以官网为准。
