---
title: '机场跑路怎么办？止损方法与 Clash 多订阅自动切换配置（2026）'
description: '机场跑路、节点全挂了怎么办？怎样降低损失、提前发现跑路迹象，以及用 Clash（mihomo）把两个机场订阅配置成自动切换，主力挂了自动换备用。'
lang: zh
hasAffiliateLinks: true
tags: [机场跑路, 机场推荐, Clash配置, 多订阅]
sources:
  - title: 'mihomo 文档：代理集合 proxy-providers'
    url: https://wiki.metacubex.one/config/proxy-providers/
  - title: 'mihomo 文档：策略组 proxy-groups'
    url: https://wiki.metacubex.one/config/proxy-groups/
  - title: 'mihomo 文档：自动回退 fallback'
    url: https://wiki.metacubex.one/config/proxy-groups/fallback/
  - title: 'mihomo 文档：自动选择 url-test'
    url: https://wiki.metacubex.one/config/proxy-groups/url-test/
  - title: 'Clash Verge Rev 文档：配置案例（多订阅合并）'
    url: https://clash-verge-rev.github.io/guide/config.html
pubDate: 2026-11-13
---

"机场跑路"几乎是每个用梯子的人都会碰上的事：昨天还好好的，今天节点全挂，官网打不开，客服也联系不上。

这篇文章分三部分：

1. **跑路之后**：能做什么、不能指望什么；
2. **跑路之前**：怎么把损失控制在最小；
3. **技术备份**：用 Clash（mihomo 内核）把两个机场订阅配置成**自动切换**，主力挂了自动用备用的，不用手忙脚乱。

## 机场跑路了，还能把钱要回来吗？

说实话：**基本要不回来**。机场通常没有正规的公司主体和售后渠道，跑路后能追回费用的情况很少。所以重点不在追回，而在于**提前把损失压小**，以及**让网络不断**。

跑路后能做的事：

- **截图保存**：订单、付款记录、最后的公告，留作记录。
- **马上换掉订阅**：把客户端里失效的订阅删掉或停用，免得一直报错。
- **检查有没有"复用密码"**：机场账号的密码如果在别的地方也用过，立刻改掉。
- **启用备用方案**：这就是第三部分要讲的。

## 跑路之前：怎么把损失降到最低？

下面几条是经验之谈，不能保证一定不踩坑，但能大大降低损失。

### 1. 月付，不要囤年付

这是最有效的一条。年付再便宜，跑路时损失的是一整年；月付最多损失一个月。**"年付打骨折""终身套餐"这类促销，越便宜越要小心。**

### 2. 留意这些常见的信号

以下情况不一定说明要跑路，但出现时值得警惕，最好暂停续费：

- 官网或后台频繁打不开，或者突然换域名；
- 节点大面积长时间不可用，公告却含糊其辞；
- 客服回复越来越慢，甚至不回；
- 突然推出远低于平常价格的长期套餐。

### 3. 永远准备一个备用

**两个机场同时用**，一个主力、一个备用，备用的可以买流量便宜的小套餐。哪一个出问题，另一个马上能顶上。

## Clash 多订阅自动切换配置（mihomo）

如果你用的是 mihomo 内核的客户端，比如 Clash Verge Rev、Clash Meta for Android 或 FlClash，可以用 **代理集合（proxy-providers）+ 自动回退（fallback）策略组**，把两个机场的订阅合并起来：

```yaml
proxy-providers:
  main:                          # 主力机场
    type: http
    url: "主力机场的订阅地址"
    path: ./proxy_providers/main.yaml
    interval: 3600               # 每小时更新一次订阅
    override:
      additional-prefix: "主力 | "
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300              # 每 5 分钟测一次节点
  backup:                        # 备用机场
    type: http
    url: "备用机场的订阅地址"
    path: ./proxy_providers/backup.yaml
    interval: 3600
    override:
      additional-prefix: "备用 | "
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300

proxy-groups:
  - name: 自动切换
    type: fallback
    use:
      - main
      - backup
    url: https://www.gstatic.com/generate_204
    interval: 300
```

### 这段配置是怎么工作的？

- **`proxy-providers`** 定义了两个订阅来源。`override.additional-prefix` 会给节点名加上"主力 |""备用 |"前缀，方便你在节点列表里分清来源（Clash Verge Rev 文档的"多订阅合并"案例也是这么写的）。
- **`fallback` 策略组**：按照官方文档，"当前节点超时时，则会按代理顺序选择第一个可用节点"。`use` 里 `main` 写在前面，所以**平时优先用主力机场，主力的节点都不可用时，才会切到备用机场**。
- **健康检查要写在 provider 里**：官方文档特别说明，策略组的 `url` 只检查 `proxies` 字段里的节点，**不会检查通过 `use` 引入的代理集合**。所以每个 provider 都要单独开启 `health-check`，上面的配置已经写好了。

### 想要"哪个快用哪个"？

把 `type: fallback` 换成 `type: url-test`，就会自动选择延迟最低的节点。还可以加上 `tolerance`（节点切换容差，单位毫秒），避免节点在延迟相近时来回跳。不过这样主力和备用会被一视同仁，备用套餐的流量可能会消耗得更快。

### 放到哪里？

不同客户端放自定义配置的位置不一样：Clash Verge Rev 可以在订阅的"扩展配置"或"合并"功能里添加，具体以客户端文档为准。修改后，在节点列表里能看到带"主力 |""备用 |"前缀的两组节点，就说明生效了。

## 备用机场怎么选？

挑备用机场和挑主力机场的标准一样：**能月付、有退款或试用、晚高峰实测稳定**。如果你正在找一个，本站推荐**枫叶 Maple Relay**，可以作为主力，也可以作为备用：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

同样建议先买最短的周期，在你自己的网络上测一测再决定。本站尚未发布它的实测数据，套餐与价格以官网为准。

## 常见问题

**机场跑路前一般会有通知吗？**
很少有。多数情况是突然失联，所以才强调月付和备用。

**两个订阅放在一起，会不会两边的流量都在用？**
用 `fallback` 时，正常情况下只用排在前面的主力机场，备用机场只有在主力全部不可用时才会用到。健康检查本身会产生极少量流量。

**我用的是 v2rayN，能这样配置吗？**
上面的 YAML 是 mihomo / Clash 系的写法。v2rayN 的"订阅分组"可以把多个订阅合并到一个分组里（填在"更多地址"中，用逗号隔开），但自动切换的方式不同，以 v2rayN 的文档为准。
