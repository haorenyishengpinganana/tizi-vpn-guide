---
title: 'Clash Verge Rev 下载安装与使用教程（2026）：Windows、Mac、Linux'
description: 'Clash Verge Rev 该下载哪个安装包、怎么导入订阅、系统代理和 Tun 模式有什么区别，以及 Windows 常见问题怎么解决。基于官方文档与 GitHub 发布页整理。'
lang: zh
hasAffiliateLinks: true
tags: [Clash Verge Rev, Clash教程, 梯子客户端]
sources:
  - title: 'Clash Verge Rev GitHub 仓库'
    url: https://github.com/clash-verge-rev/clash-verge-rev
  - title: 'Clash Verge Rev 发布页（Releases）'
    url: https://github.com/clash-verge-rev/clash-verge-rev/releases
  - title: 'Clash Verge Rev 文档：快速入门'
    url: https://clash-verge-rev.github.io/guide/quickstart.html
  - title: 'Clash Verge Rev 文档：Windows 常见问题'
    url: https://clash-verge-rev.github.io/faq/windows.html
  - title: 'mihomo（Clash.Meta）文档'
    url: https://wiki.metacubex.one/
---

想在电脑上用 Clash 系的梯子客户端，**Clash Verge Rev** 是目前最常被推荐的一款。这篇教程会讲清楚四件事：

1. Clash Verge Rev 是什么，跟 Clash、Clash Verge 是什么关系；
2. Windows、Mac、Linux 分别该下载哪个安装包；
3. 从导入订阅到开始使用的四个步骤；
4. 系统代理和 Tun 模式的区别，以及常见问题怎么解决。

> 本文信息截至 2026 年 11 月 9 日：最新稳定版是 **v2.5.10**（2026-11-03 发布），GitHub 星标约 15.7 万。

## Clash Verge Rev 是什么？

按照官方仓库的说明，Clash Verge Rev 是 **Clash Verge 的延续版**（原版 Clash Verge 的仓库已在 2023 年归档，不再更新），是一个基于 Tauri 开发的 **Clash Meta 图形客户端**。

- **内核**用的是 mihomo（也就是 Clash.Meta），支持 VLESS、Trojan、Shadowsocks 等常见协议。
- **开源**，许可证是 GPL-3.0，可以在 GitHub 上看到全部源码。
- **支持的平台**：官方写的是 Windows（x64/x86）、Linux（x64/arm64）和 macOS 11 及以上（Intel 和 Apple 芯片都支持）。

简单说：**Clash Verge Rev 只是一个"壳"，真正翻墙用的节点来自你导入的订阅**，比如机场提供的订阅链接。

## Clash Verge Rev 下载哪个版本？

**只从官方 GitHub 发布页（Releases）下载**，不要用来路不明的网盘或"汉化版"。官方仓库提供三类版本：

| 版本 | 特点 | 适合谁 |
|---|---|---|
| Stable（正式版） | 高可靠性 | 日常使用，**大多数人选这个** |
| AutoBuild（滚动更新版） | 更新最快，可能有缺陷 | 想尝鲜、帮忙测试的人 |
| Alpha | 官方已标注为废弃 | 不要用 |

### 安装包怎么选？

以 v2.5.10 为例，发布页里的文件名规律如下：

| 系统 | 选这个文件 | 说明 |
|---|---|---|
| Windows（大多数电脑） | `Clash.Verge_版本号_x64-setup.exe` | 普通 Intel / AMD 处理器 |
| Windows（ARM 电脑） | `Clash.Verge_版本号_arm64-setup.exe` | 骁龙等 ARM 处理器的笔记本 |
| Windows（WebView2 有问题时） | 文件名带 `fixed_webview2` 的安装包 | 自带固定版本的 WebView2 运行时 |
| Mac（M1/M2/M3/M4 等 Apple 芯片） | `Clash.Verge_版本号_aarch64.dmg` | |
| Mac（Intel 芯片） | `Clash.Verge_版本号_x64.dmg` | |
| Ubuntu / Debian | `Clash.Verge_版本号_amd64.deb` 或 `arm64.deb` | 按 CPU 架构选 |
| Fedora / RHEL 等 | `Clash.Verge-版本号-1.x86_64.rpm` 或 `aarch64.rpm` | |

**不确定 Mac 是什么芯片？** 点左上角苹果图标 → "关于本机"，"芯片"一栏写 Apple M 开头的就选 `aarch64`，写 Intel 的就选 `x64`。

文件名以 `.sig` 结尾的是签名文件，供自动更新校验用，**不需要下载**。

## Clash Verge Rev 怎么用？四步上手

官方"快速入门"把使用流程分成了四步：

### 第一步：下载并安装

按上面的表格下载对应安装包，正常安装即可。

### 第二步：导入订阅

在"订阅"页面粘贴你的**订阅链接**（机场后台通常有"复制订阅"或"Clash 订阅"按钮），导入后客户端会下载节点和配置。

订阅链接相当于你账号的钥匙，**不要发给别人，也不要贴到公开的地方**。

### 第三步：选择节点和模式

在"代理"页面选择一个节点。常见的三种模式：

- **规则模式**：按配置文件里的规则分流，国内网站直连、国外网站走代理，**日常用这个**。
- **全局模式**：所有流量都走代理。
- **直连模式**：所有流量都不走代理，相当于暂时关掉。

### 第四步：打开系统代理（或开启 Tun 模式）

在"设置"里打开**系统代理**，浏览器就可以正常访问了。

## 系统代理和 Tun 模式有什么区别？

官方文档是这样解释的：

- **系统代理**：自动修改操作系统的代理设置，能满足大部分**浏览器**上网的需求。
- **Tun 模式**：在系统里安装一个**虚拟网卡**，用来接管不支持"系统代理"的程序，例如**游戏和命令行**。

**怎么选？** 只用浏览器，开系统代理就够了。游戏、命令行工具或某些桌面软件不走代理时，再开 Tun 模式。官方提醒：开启 Tun 模式之前，先读一遍相关教程。

## Clash Verge Rev 常见问题

以下问题都来自官方文档的 Windows 常见问题页。

**Windows 7 能用吗？**
官方常见问题里专门列了"Windows 7 无法使用"这一条。还在用 Windows 7 的话，建议换其他客户端，或者升级系统。

**微软商店等 UWP 应用不走代理？**
官方的解释是：UWP 应用有沙盒机制，默认不能访问本机回环地址（localhost），而代理程序正是在本机端口上监听请求。解决方法是打开 Clash Verge Rev 的"设置 → UWP 工具"，勾选需要解除限制的应用，然后点击顶部的 Save Changes 保存。

**打开 Tun 模式后网络异常？**
官方给出的原因是：系统里可能有**多个网卡**，或者网段和配置中的规则冲突。解决办法是打开网络设置，删除多余的网卡。

**代理菜单是空白的？**
原因是内核通信失败。官方建议检查 Windows 防火墙设置。

**订阅更新失败、节点全部超时？**
先在浏览器里打开机场官网，确认账号没有过期、流量没有用完。订阅本身失效时，客户端怎么设置都没用。

## 还没有订阅？

Clash Verge Rev 只是客户端，**节点要靠订阅**。免费节点通常寿命很短，一般只能临时救急。想长期稳定使用，可以考虑付费机场，本站推荐**枫叶 Maple Relay**：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

注册后建议先选最短的周期，在晚上高峰期实际试一试，满意再续费。本站尚未发布它的实测数据，套餐与价格以官网为准。

## 小结

- **下载**：只用 GitHub 官方发布页，Windows 大多选 `x64-setup.exe`，Mac 按芯片选 `aarch64` 或 `x64`。
- **使用**：导入订阅 → 选节点和规则模式 → 打开系统代理。
- **进阶**：游戏、命令行不走代理时再开 Tun 模式。
- **排错**：先确认订阅有效，再查网卡、防火墙。
