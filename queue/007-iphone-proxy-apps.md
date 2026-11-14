---
title: 'iPhone 梯子怎么用？Shadowrocket、Stash、Quantumult X 对比（2026）'
description: 'iPhone 翻墙用哪个 App？为什么国区 App Store 搜不到小火箭？对比 Shadowrocket、Stash、Quantumult X、Surge 的价格和适合人群，并讲清外区 Apple ID 的正确用法和风险。'
lang: zh
hasAffiliateLinks: true
tags: [iPhone梯子, Shadowrocket, 小火箭, Stash, 外区Apple ID]
sources:
  - title: 'App Store：Shadowrocket'
    url: https://apps.apple.com/us/app/shadowrocket/id932747118
  - title: 'App Store：Stash - Rule Based Proxy'
    url: https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349
  - title: 'App Store：Quantumult X'
    url: https://apps.apple.com/us/app/quantumult-x/id1443988620
  - title: 'App Store：Surge 5'
    url: https://apps.apple.com/us/app/surge-5/id1442620678
  - title: 'Apple 支持：更改 Apple 账户国家或地区'
    url: https://support.apple.com/zh-cn/118283
---

安卓手机可以直接从 GitHub 下载 APK，iPhone 不行：**iPhone 只能从 App Store 安装 App**，而常用的梯子客户端在中国区 App Store 都搜不到。

这篇文章讲清楚三件事：

1. iPhone 上常用的四个梯子 App，分别多少钱、适合谁；
2. 为什么国区搜不到，外区 Apple ID 该怎么用；
3. 下载之后怎么导入订阅。

> 本文的价格和版本数据截至 2026 年 11 月 14 日，取自 Apple 官方的 App Store 查询接口。价格会随汇率和地区调整，购买时以 App Store 页面为准。

## 为什么国区 App Store 搜不到小火箭？

我们用 Apple 官方的 App Store 查询接口分别查了中国区和美区：**Shadowrocket、Stash、Quantumult X、Surge 在中国区都查不到**，在美区、香港区、日本区都能查到。

所以想在 iPhone 上用梯子，第一步是**用一个外区 Apple ID 登录 App Store** 下载。

## 四个 iPhone 梯子 App 对比

| App | 美区价格 | 港区价格 | 最低系统 | 适合谁 |
|---|---|---|---|---|
| **Shadowrocket**（小火箭） | $2.99 | HK$22 | iOS 13.0 | 大多数人，**最便宜、最常用** |
| **Stash** | $5.99 | HK$48 | iOS 16.0 | 机场给的是 **Clash 订阅**的人 |
| **Quantumult X** | $9.99 | HK$88 | iOS 15.0 | 喜欢折腾规则、重写的进阶用户 |
| **Surge 5** | 免费下载 | 免费下载 | iOS 17.0 | 开发者、需要调试网络的人 |

四个都是**一次买断**的付费 App（Surge 免费下载，具体功能和收费以 App Store 页面为准），不是订阅制。

### 怎么选？

- **不知道选哪个**：选 **Shadowrocket**。价格最低，用的人最多，遇到问题容易搜到答案。它的 App Store 介绍是"基于规则的 iPhone/iPad 代理工具"，支持按域名、IP 段、GeoIP 分流。
- **机场只给 Clash 订阅**：选 **Stash**。它的介绍写着"完整适配 Clash Premium 配置"，也就是可以直接用 Clash 格式的订阅和规则，电脑上用 Clash Verge Rev 的人切换过来最顺手。
- **想自己写规则、做 HTTP 重写**：Quantumult X 或 Surge。功能强，但上手门槛也高，普通翻墙用不到。

不确定机场给的是哪种订阅，可以问一下客服。现在大多数机场的后台同时提供 Clash 订阅和通用订阅。

## 外区 Apple ID 怎么用？

### 推荐做法：只在 App Store 登录外区账号

iPhone 的 **iCloud 账号**和 **App Store 账号**是可以分开的：

- **iCloud 继续用你自己的国区账号**，照片、通讯录、备份都不受影响；
- 只在 **设置 → 你的名字 → 媒体与购买项目** 里退出，换成外区账号登录，下载完再换回来也行。

这样即使外区账号出问题，也不会影响手机里的数据。

### 绝对不要用网上"共享的 Apple ID"

网上有不少免费或很便宜的"共享账号"，让你直接登录下载已购 App。**千万不要在"设置"最上方的 iCloud 位置登录别人的账号**：对方可以开启"查找"功能，远程锁定你的手机。即使只在 App Store 登录，账号也随时可能被改密码或封禁。

最稳妥的方式是**自己注册一个外区 Apple ID**。

### 把已有账号改成外区要注意什么？

按照 Apple 官方说明，更改 Apple 账户的国家或地区之前，需要：

- **用完账户里的余额**；
- **取消会阻止更改地区的订阅**，并等订阅期结束；
- 如果在"家人共享"群组里，可能无法更改；
- **准备好新地区的有效付款方式**。

国区账号里有余额、有订阅的话，改区会很麻烦，所以更推荐**单独注册一个新的外区账号**，专门用来下载 App。

## 下载之后怎么导入订阅？

以 Shadowrocket 为例，流程和电脑端差不多：

1. **复制订阅链接**：在机场后台点"复制订阅"。用 Shadowrocket 选通用订阅，用 Stash 选 Clash 订阅。
2. **在 App 里添加订阅**：粘贴链接后保存，App 会下载节点列表。很多机场后台还有"一键导入到 Shadowrocket"之类的按钮，点一下就能自动添加。
3. **选择节点，打开开关**：第一次连接时，iPhone 会提示"添加 VPN 配置"，点"允许"并输入锁屏密码。这是 iOS 的正常提示，这类 App 都是通过系统的 VPN 接口工作的。

连上后，状态栏会出现 **VPN** 图标。

## 常见问题

**买了 App 但不想一直登录外区账号？**
买过的 App 会留在手机上，之后可以换回国区账号。只是**更新 App 时**需要重新登录购买时用的外区账号。

**iPad 和 Mac 能用吗？**
Shadowrocket 在 App Store 上同时支持 iPhone 和 iPad，带 Apple 芯片的 Mac 也能安装。同一个 Apple ID 买一次，这些设备都能下载。

**连上了但打不开网页？**
先换一个节点。所有节点都不通时，到机场官网确认账号没过期、流量没用完。

## 还没有订阅？

App 只是客户端，节点要靠机场订阅。本站推荐**枫叶 Maple Relay**，注册后先在后台看看提供哪些订阅格式，再选对应的 App：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

建议先买最短的周期，在 iPhone 上实际用几天，满意再续费。本站尚未发布它的实测数据，套餐与价格以官网为准。
