---
title: 'VMess vs VLESS: What Actually Differs Between the Two'
description: 'VMess and VLESS both authenticate with a UUID, but they handle encryption and clock sync very differently. Here is what that means in practice.'
tags: [vmess, vless, v2ray, xray]
sources:
  - title: 'V2Fly developer docs: VMess protocol'
    url: https://www.v2fly.org/en_US/developer/protocols/vmess.html
  - title: 'Project X docs: VMess outbound'
    url: https://xtls.github.io/en/config/outbounds/vmess.html
  - title: 'Project X docs: VLESS outbound'
    url: https://xtls.github.io/en/config/outbounds/vless.html
---

If you have looked at a V2Ray or Xray config, you have probably seen both `vmess` and `vless` and wondered which one to pick. They share a lot. Both use a UUID as the user's credential, and both run on the same cores. Where they differ is in **who is responsible for encryption** and **what they expect from your system clock**.

## VMess: encryption built into the protocol

VMess is the original encrypted protocol of V2Ray. The protocol encrypts its own request header and payload, so it doesn't rely on an outer TLS layer to keep the content private.

Two details matter in practice.

**The header format has changed.** The V2Fly developer docs describe two ways of authenticating the header:

- **AEAD authentication**, which protects the integrity of the header and is the current format.
- **MD5 authentication**, the older format, which uses MD5 + AES-128-CFB and *cannot* guarantee the header's integrity. The docs mark it as deprecated.

If you are copying an old config that sets a non-zero `alterId`, you are looking at the legacy format. Current guides use AEAD.

**VMess depends on the system clock.** Timestamps are part of the authentication. The Xray documentation warns that the UTC time on the machine running Xray must be within **120 seconds** of the real time; the time zone doesn't matter. A server with a drifting clock is one of the most common reasons a VMess connection fails "for no reason". Running an NTP service fixes it.

## VLESS: a lighter protocol that leaves encryption to the transport

The Xray docs describe VLESS as "a stateless lightweight transport protocol". Compared with VMess:

- **It doesn't depend on system time.** Clock drift won't break authentication.
- **It still authenticates with a UUID.**
- **Security normally comes from the layer underneath.** The docs say VLESS **must** be used with an outer transport-security layer, such as TLS or REALITY. The only exceptions are a trusted private network, or when the newer *VLESS Encryption* option is turned on.

That last point is the one people get wrong. A VLESS config with `"encryption": "none"` and `"security": "none"` sends your traffic in a form that anyone on the path can read. VLESS is designed to sit inside TLS or REALITY, not to replace them.

Because VLESS doesn't encrypt everything a second time inside TLS, it avoids double encryption. That is a big part of why it is considered lighter. Xray also adds features on top of VLESS-over-TLS, such as the `xtls-rprx-vision` flow.

## Side-by-side

| | VMess | VLESS |
|---|---|---|
| Credential | UUID | UUID |
| Encryption | Built into the protocol | Provided by TLS / REALITY (or the optional VLESS Encryption) |
| Clock sync required | Yes (within 120 s for Xray) | No |
| Legacy baggage | MD5 header format (deprecated), `alterId` | None comparable |
| Safe without TLS? | Content is encrypted, but traffic is easier to fingerprint | No, unless VLESS Encryption is enabled or the network is trusted |

## Which one should you use?

- **Setting up something new on Xray:** VLESS over TLS or REALITY is what the Xray docs are built around.
- **Your client only supports VMess,** or you can't use TLS: use VMess with AEAD (`alterId` 0) and make sure both ends sync their clocks.
- **Debugging a VMess setup that suddenly stopped working:** check the server clock before anything else.

## FAQ

**Is VLESS "more secure" than VMess?**
Not by itself. The security of VLESS depends almost entirely on the TLS or REALITY layer around it. A correctly configured VMess (AEAD) and a correctly configured VLESS+TLS are both reasonable choices. The difference is mostly overhead and the clock dependency.

**Why does my VMess connection work on my laptop but not on my phone?**
A clock that is out of sync on either end will break VMess authentication. Check that both devices sync their time automatically.
