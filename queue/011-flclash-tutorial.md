---
title: 'FlClash 下载与使用教程（2026）：安卓、Windows、Mac 通用'
description: 'FlClash 是什么、和 Clash Verge Rev 有什么区别？各平台该下载哪个安装包、怎么导入 Clash 订阅、Linux 托盘图标不显示怎么办，基于官方 README 和 GitHub 发布页整理。'
lang: zh
hasAffiliateLinks: true
tags: [FlClash, Clash教程, 安卓梯子, 梯子客户端]
sources:
  - title: 'FlClash GitHub 仓库（中文 README）'
    url: https://github.com/chen08209/FlClash/blob/main/README_zh_CN.md
  - title: 'FlClash 发布页（Releases）'
    url: https://github.com/chen08209/FlClash/releases
  - title: 'mihomo（Clash.Meta）文档'
    url: https://wiki.metacubex.one/
---

**FlClash** 是近两年很火的 Clash 系客户端，最大的特点是**一个 App 覆盖安卓、Windows、macOS 和 Linux**，手机和电脑用同一套界面。

这篇教程讲清楚：

1. FlClash 是什么，跟 Clash Verge Rev 怎么选；
2. 各平台该下载哪个安装包；
3. 怎么导入订阅、开始使用；
4. 几个实用的小功能和常见问题。

> 本文信息截至 2026 年 11 月 14 日：最新版本是 **v0.9.3**（2026-11-04 发布），GitHub 星标约 6.3 万，许可证 GPL-3.0。

## FlClash 是什么？

官方 README 的介绍是："基于 ClashMeta 的多平台代理客户端，简单易用，开源无广告。"

- **内核**是 mihomo（Clash.Meta），支持规则分流、代理组、延迟测试、系统代理和 TUN 模式；
- **用 Clash 订阅**，机场后台复制"Clash 订阅"即可；
- **界面**是 Material You 风格，支持浅色、深色主题，手机和电脑布局自适应；
- **开源、无广告**，代码在 GitHub 上公开。

### FlClash 和 Clash Verge Rev 怎么选？

两个都是 mihomo 内核，节点和规则的效果一样，区别在平台和侧重点：

| | FlClash | Clash Verge Rev |
|---|---|---|
| 平台 | **安卓**、Windows、macOS、Linux | Windows、macOS、Linux（**没有安卓版**） |
| 适合 | 想让**手机和电脑用同一个客户端** | 只在电脑上用、功能更全的桌面客户端 |

**只在电脑上用**，两个都可以；**手机也要用**，FlClash 更省事，学一次两边都会。

## FlClash 下载哪个版本？

只从官方 GitHub 发布页下载。官方 README 列出的安装包如下：

| 平台 | 安装包 | 怎么选 |
|---|---|---|
| **安卓** | `arm64-v8a`、`armeabi-v7a`、`x86_64` 三种 APK | **绝大多数手机选 `arm64-v8a`** |
| **Windows 10 及以上** | 安装版（`.exe`）或便携版（`.zip`），分 x64 和 ARM64 | 普通电脑选 x64；骁龙等 ARM 笔记本选 ARM64 |
| **macOS 12 及以上** | Apple Silicon 和 Intel 两种 DMG | M 系列芯片选 Apple Silicon |
| **Linux** | `.deb`、`.rpm` 和 AppImage，分 x64 和 ARM64 | Ubuntu / Debian 选 `.deb` |

官方还提到两个更省事的方法：

- 打开 FlClash **官网的下载区**，它会自动为你的设备选好安装包；
- Mac 用户可以用 **Homebrew** 安装：

```bash
brew tap chen08209/tap
brew install --cask flclash
```

安卓也可以通过官方的 F-Droid 仓库安装，方便以后自动更新。

**不要从第三方网站下载"汉化版""破解版"**：FlClash 本身完全免费，而且客户端能看到你的全部代理流量和订阅地址。

## FlClash 怎么用？

### 第一步：导入订阅

在机场后台复制 **Clash 订阅**链接，在 FlClash 的配置页面添加订阅，粘贴链接后保存。

官方 README 还提供了一种**一键导入**的链接格式：

```text
clash://install-config?url=<经过 URL 编码的订阅链接>
```

很多机场后台的"一键导入 Clash"按钮用的就是这种链接，点一下就能自动导入 FlClash。`clashmeta://` 和 `flclash://` 开头的链接也能用。

### 第二步：选择节点

在代理页面选择一个节点，可以先测一下延迟，选延迟低、地区合适的。

### 第三步：启动

- **安卓**：点启动后，系统会弹出"连接请求"，询问是否允许创建 VPN 连接，点"确定"。
- **电脑**：打开**系统代理**，浏览器就能正常访问了。游戏、命令行不走代理时，再开 **TUN 模式**。

## 几个实用功能

- **备份与恢复**：可以通过 WebDAV 或本地文件备份配置，换手机、换电脑时直接恢复。
- **分应用代理（安卓）**：只让指定的 App 走代理，其他 App 直连，省电也省流量。
- **快捷设置磁贴（安卓）**：把 FlClash 加到下拉通知栏的快捷开关里，一下就能开关。
- **实时查看**：能看到当前的连接、请求、DNS 查询和日志，排查问题很方便。
- **安卓自动化**：Tasker、MacroDroid 等 App 可以用 `com.follow.clash.action.TOGGLE` 等动作自动开关代理，比如连上家里 Wi-Fi 时自动关闭。

## 常见问题

**Linux 上托盘图标不显示？**
官方说明：`.deb` 安装包会自动安装依赖；用 AppImage 或 `.rpm` 时，需要先安装 AyatanaAppIndicator 库：

```bash
sudo apt-get install libayatana-appindicator3-1   # Debian / Ubuntu
sudo dnf install libayatana-appindicator-gtk3     # Fedora
```

**第一次打开没反应、连不上？**
FlClash 要在**接受免责声明**之后才会启动内核。第一次打开时注意看有没有弹出声明，同意后再导入订阅。

**导入订阅提示格式错误？**
FlClash 要用 **Clash 订阅**，不能直接用 v2ray 订阅。回机场后台换"Clash 订阅"按钮复制。

**iPhone 能用吗？**
不能，FlClash 没有 iOS 版。

## 还没有订阅？

FlClash 只是客户端，节点要靠机场订阅。本站推荐**枫叶 Maple Relay**：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

建议先买最短的周期，在手机和电脑上都试几天，满意再续费。本站尚未发布它的实测数据，套餐与价格以官网为准。
