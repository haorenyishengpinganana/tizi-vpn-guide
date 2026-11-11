---
title: 'v2rayN 使用教程（2026）：下载哪个文件、导入订阅与系统代理设置'
description: 'v2rayN 7.x 该下载哪个压缩包、Mac 提示已损坏怎么办、怎么导入节点和订阅、系统代理三个选项分别是什么意思，以及如何用 GPG 校验安装包真伪。'
lang: zh
hasAffiliateLinks: true
tags: [v2rayN, v2ray教程, 梯子客户端]
sources:
  - title: 'v2rayN GitHub 仓库'
    url: https://github.com/2dust/v2rayN
  - title: 'v2rayN Wiki：发布文件介绍'
    url: https://github.com/2dust/v2rayN/wiki/Release-files-introduction
  - title: 'v2rayN Wiki：部分界面说明'
    url: https://github.com/2dust/v2rayN/wiki/Description-of-some-ui
  - title: 'v2rayN Wiki：订阅功能说明'
    url: https://github.com/2dust/v2rayN/wiki/Description-of-subscription
  - title: 'v2rayN Wiki：系统代理和路由'
    url: https://github.com/2dust/v2rayN/wiki/Description-of-system-proxy-routing
  - title: 'v2rayN Wiki：常见问题'
    url: https://github.com/2dust/v2rayN/wiki/Faq
pubDate: 2026-11-11
---

**v2rayN** 是最老牌的 v2ray 电脑客户端之一，现在的 7.x 版本已经不只支持 Windows，还支持 Linux 和 macOS。这篇教程以官方 Wiki 为准，讲清楚：

- v2rayN 该下载哪个文件（Windows 有两个版本，很多人会选错）；
- Mac 打开时提示"已损坏"怎么办；
- 怎么导入节点和订阅；
- 系统代理的三个选项分别是什么意思；
- 怎么校验下载的安装包是不是官方原版。

> 本文信息截至 2026 年 11 月 9 日：最新版本是 **7.25.6**（2026-10-11 发布），GitHub 星标约 12 万。

## v2rayN 是什么？

官方的介绍是："一个 Windows、Linux 和 macOS 上的图形界面客户端，支持 Xray、sing-box 等核心。"

- **v2rayN 本身只是界面**，真正处理流量的是"核心"。发布包里已经自带了 **Xray、sing-box、mihomo** 三个核心，其他核心需要自己下载。
- **订阅支持的协议**：VMess、Shadowsocks、SOCKS、VLESS、Trojan、Hysteria2、TUIC、WireGuard、AnyTLS。
- **手机版**叫 **v2rayNG**（仅安卓），是同一位作者的另一个项目。

## v2rayN 下载哪个文件？

只从 GitHub 的官方发布页下载。按照官方的"发布文件介绍"：

### Windows（要求 Windows 10 及以上）

| 文件 | 区别 |
|---|---|
| `v2rayN-windows-64.zip` | 用 **WPF** 实现的界面，也就是传统的 Windows 版 |
| `v2rayN-windows-64-desktop.zip` | 用 **Avalonia UI** 实现的界面，跟 Linux / Mac 版的界面一致 |

两个都能用，**习惯老版 v2rayN 界面的选第一个**。

`zip` 是**便携版**：解压到一个文件夹就能运行，配置也存在这个文件夹里。复制多份互不影响，所以可以同时运行多个实例。

### macOS（要求 macOS 13.6 及以上）

| 芯片 | 文件 |
|---|---|
| Apple 芯片（M 系列） | `v2rayN-macos-arm64.dmg` |
| Intel 芯片 | `v2rayN-macos-64.dmg` |

**Mac 提示"应用已损坏，无法打开"？** 官方说明这是因为安装包没有签名，安装后在"终端"里运行下面这条命令就能打开：

```bash
xattr -cr /Applications/v2rayN.app
```

### Linux

| 发行版 | 文件与安装命令 |
|---|---|
| Debian 12+ / Ubuntu 22.04+ | `sudo apt install -y ./v2rayN-linux-64.deb` |
| Fedora 36+ / RHEL 9+ | `sudo dnf install -y ./v2rayN-linux-rhel-x64.rpm` |
| 免安装 | 解压 `v2rayN-linux-64.zip` 后执行 `chmod +x v2rayN`，再用普通用户运行 `./v2rayN` |

ARM 机器把文件名里的 `64` 换成 `arm64` 即可。

## 怎么确认下载的是官方原版？（GPG 校验）

官方的发布文件都用 GPG 签过名，用来防止镜像站、运营商或 CDN 篡改。每个文件旁边的 `.sig` 就是签名，发布页里也提供了公钥 `v2rayN-public-key.asc`。

装好 GPG 后，在下载目录里运行：

```bash
gpg --import v2rayN-public-key.asc
gpg --verify v2rayN-windows-64.zip.sig v2rayN-windows-64.zip
```

看到 "Good signature" 后，**再核对公钥指纹**，要和官方 README 公布的完全一致：

```text
7694 5E9F 3E9A 168F 8070 F195 805D 661C
134D FAF6 8903 C199 463C 31E5 AE90 3AE0
```

从第三方网站下载的"汉化版""破解版"不建议用：**客户端能看到你的全部代理流量和订阅地址**。

## v2rayN 怎么导入节点和订阅？

### 导入单个节点：从剪贴板导入（Ctrl+V）

复制节点的分享链接（`vmess://`、`vless://`、`trojan://` 等开头），回到 v2rayN 主界面，在非输入框的地方按 **Ctrl+V** 就会导入。

官方说明：剪贴板里的内容支持明文和 BASE64 编码；**如果内容以 `https` 开头，会按"新增订阅"处理**。所以直接粘贴订阅链接也可以。

### 添加订阅：订阅分组

在"订阅分组"里新增一个分组，填入订阅地址。官方说明了两个实用的细节：

- **每个订阅单独一个分组**：只填"可选地址"即可。
- **多个订阅合并成一个分组**：第一个填"可选地址"，其余的用英文逗号隔开填进"更多地址"。注意这些订阅的类型要一致。

### 更新订阅

更新订阅时，v2rayN 会**先通过代理、再直连**去获取订阅内容。有些机场后台会根据 User Agent 返回不同格式的订阅，v2rayN 默认发送的是 `v2rayN/版本号`。

## v2rayN 系统代理怎么设置？

系统代理的作用是把浏览器等软件的流量转发给核心。官方说明了三个选项：

| 选项 | 作用 |
|---|---|
| **自动配置系统代理** | 每次启动或重启服务时，自动设置系统代理，**日常用这个** |
| 清除系统代理 | 每次启动或重启服务时，强制清除系统代理 |
| 不改变系统代理 | 什么都不做，保留其他软件设置的代理 |

**为什么 Windows 系统代理里只有 HTTP 没有 SOCKS？** 官方解释：Windows 的系统代理本来就只能配置 HTTP 代理，不支持 SOCKS5，这是正常现象。

**游戏、命令行不走代理？** 这类程序不读系统代理，需要用 **Tun 模式**。官方说明，Tun 模式需要**以管理员权限**运行 v2rayN。

## v2rayN 常见问题

**Windows 7 能用吗？**
官方说"理论上可以"，但 v2rayN 依赖 .NET 8，而且新版 Go 已经不支持 Win7，各个核心都要手动换成 Win7 专用版本。不建议普通用户折腾。

**出问题了，日志在哪？**
界面相关的问题（设置、测速、检查更新）日志在 `guiLogs` 文件夹；核心相关的问题，日志显示在主界面的信息栏里，可以直接复制。发给别人之前，记得把订阅地址和 UUID 打码。

**导入后节点全部超时？**
先确认订阅本身有效：机场账号没过期、流量没用完。如果用的是免费节点，失效是常态，换一批再试。

## 没有节点？

v2rayN 只是客户端，节点需要自己准备。想要稳定的订阅，本站推荐**枫叶 Maple Relay**：

[👉 注册枫叶 Maple Relay](sponsor:maple-button)

建议先买最短的周期，在晚高峰实际测试后再决定是否续费。本站尚未发布它的实测数据，套餐与价格以官网为准。
