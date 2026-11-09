---
title: 'How the Trojan Protocol Works (and Why It Looks Like HTTPS)'
description: 'Trojan hides proxy traffic inside a real TLS connection and hands anything it does not recognise to a normal web server. A walk through the protocol.'
tags: [trojan, tls]
sources:
  - title: 'Trojan documentation: The Trojan Protocol'
    url: https://trojan-gfw.github.io/trojan/protocol
  - title: 'Trojan documentation: Config'
    url: https://trojan-gfw.github.io/trojan/config
---

Most proxy protocols try to make their traffic look random. Trojan does the opposite: **it uses a real TLS connection and aims to be indistinguishable from an ordinary HTTPS server.** To understand why that works, follow a single connection from start to finish.

## Step 1: a real TLS handshake

According to the Trojan protocol documentation, a Trojan client starts every connection by performing **a real TLS handshake** with the server. Nothing is simulated. The server holds a genuine certificate for its domain, just like any website. Once the handshake succeeds, everything that follows is protected by TLS.

To someone watching the network, this first stage looks just like a browser opening an HTTPS site.

## Step 2: the Trojan request inside TLS

Inside the encrypted tunnel, the client sends this structure:

```
+-----------------------+---------+----------------+---------+----------+
| hex(SHA224(password)) |  CRLF   | Trojan Request |  CRLF   | Payload  |
+-----------------------+---------+----------------+---------+----------+
|          56           | X'0D0A' |    Variable    | X'0D0A' | Variable |
+-----------------------+---------+----------------+---------+----------+
```

- The first 56 bytes are the **hex-encoded SHA-224 hash of the password**.
- The **Trojan Request** is modelled on a SOCKS5 request. It holds the command, plus the destination address and port.
- The first piece of **payload** is attached to this same packet. The docs note that this helps avoid length-pattern detection and can reduce the number of packets sent.

If the hash and the request are both valid, the server connects to the destination and relays data in both directions.

## Step 3: what happens to everything else

This is the clever part. Since a Trojan server is meant to look like an HTTPS server, its listening socket is always a TLS socket. When the decrypted traffic **doesn't** match the Trojan format, the server treats it as "other protocols". That covers a wrong password, a malformed request, or an ordinary browser request.

The docs explain that the server then opens a tunnel to a preset endpoint, **by default `127.0.0.1:80`, a local HTTP server**, and lets that endpoint handle the connection.

The result is that anyone probing the server without the right password gets an ordinary website back. In the words of the documentation, the trojan server "behaves exactly the same as that endpoint".

## Why this design resists detection

- **There is no unusual handshake to fingerprint.** It is standard TLS with a real certificate.
- **Active probes get a real website** instead of an error or a dropped connection.
- **The password check happens inside TLS,** so an observer never sees it.

## What it means for your setup

1. **You need a domain and a valid certificate.** A self-signed certificate defeats the point.
2. **Run a real website on the fallback endpoint.** If port 80 is empty or returns something odd, probes will notice. Even a simple static page is better than nothing.
3. **Choose a strong password.** It is your only credential, and the server only ever sees its SHA-224 hash.

## FAQ

**Is Trojan the same as a VPN?**
No. Trojan is a proxy protocol. Apps or the system send traffic to a local client, which tunnels it to the server. It doesn't create a virtual network interface the way WireGuard or OpenVPN do, although some client apps add that on top.

**Does Trojan encrypt traffic itself?**
No. All the confidentiality comes from TLS. Trojan's job is authentication, request framing and fallback.
