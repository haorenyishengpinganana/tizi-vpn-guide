---
title: 'WireGuard vs OpenVPN: How the Two Protocols Really Differ'
description: 'WireGuard uses a small fixed set of modern crypto over UDP; OpenVPN builds on TLS and runs over UDP or TCP. What that means for speed and setup.'
tags: [wireguard, openvpn]
sources:
  - title: 'WireGuard: official site'
    url: https://www.wireguard.com/
  - title: 'WireGuard: Protocol & Cryptography'
    url: https://www.wireguard.com/protocol/
  - title: 'OpenVPN 2.6 reference manual'
    url: https://openvpn.net/community-resources/reference-manual-for-openvpn-2-6/
---

WireGuard and OpenVPN are the two protocols you will see most often in VPN apps. Both are considered secure when configured properly, but they come from very different design philosophies, and that shows up in day-to-day use.

## WireGuard: a small, opinionated design

WireGuard's own site says it is designed to be "easily implemented in very few lines of code, and easily auditable". It contrasts this with "behemoths like *Swan/IPsec or OpenVPN/OpenSSL".

**Fixed cryptography.** WireGuard doesn't let you choose ciphers. According to its protocol page, it uses:

- the **Noise** protocol framework (the Noise_IK handshake) for key exchange
- **Curve25519** for ECDH
- **ChaCha20-Poly1305** for authenticated encryption
- **BLAKE2s** for hashing
- **SipHash24** for hashtable keys
- **HKDF** for key derivation

With no options to negotiate, there are no weak cipher combinations to misconfigure. The flip side is that if one of these primitives were ever broken, the fix would be a new protocol version rather than a config change.

**UDP only.** The protocol page states that "all packets are sent over UDP". This is efficient, but on networks that block or throttle UDP, WireGuard alone has no fallback.

## OpenVPN: TLS-based and highly configurable

OpenVPN builds its control channel on TLS, using a library such as OpenSSL. That brings decades of TLS tooling with it, and also the size and complexity WireGuard's authors point to.

**Negotiated ciphers.** In OpenVPN 2.6, the `--data-ciphers` option sets which data-channel ciphers can be negotiated. The default is `AES-256-GCM:AES-128-GCM:CHACHA20-POLY1305` when ChaCha20-Poly1305 is available, and `AES-256-GCM:AES-128-GCM` otherwise. The manual also marks the old pre-shared-key mode as deprecated and "strictly not recommended".

**UDP or TCP.** OpenVPN can run over either. Running over TCP, often on port 443, is slower because of TCP-over-TCP effects, but it can get through networks where UDP is blocked.

## Side-by-side

| | WireGuard | OpenVPN |
|---|---|---|
| Codebase | Deliberately minimal | Large (OpenVPN + TLS library) |
| Crypto | Fixed suite (Noise, Curve25519, ChaCha20-Poly1305, BLAKE2s) | Negotiated; defaults to AES-GCM / ChaCha20-Poly1305 |
| Transport | UDP only | UDP or TCP |
| Configuration | A few lines per peer | Many options; more room for error |
| Works where UDP is blocked | Not by itself | Yes, over TCP |

## Which should you pick?

- **On most networks:** WireGuard. It is simpler to configure and has less overhead.
- **On networks that block UDP** (some hotel, office or campus Wi-Fi): OpenVPN over TCP is the usual fallback.
- **When you need specific ciphers or existing TLS/PKI integration:** OpenVPN's configurability is the point.

## FAQ

**Is WireGuard more secure than OpenVPN?**
Both are secure when configured correctly. WireGuard's advantage is that there is much less to get wrong: no cipher choices and a far smaller codebase to audit.

**Why does my VPN app offer both?**
Because neither one works best everywhere. Apps usually default to WireGuard and keep OpenVPN as a fallback for restrictive networks.
