---
title: Cookie
order: 1
toc: content
group:
  title: WEB
---

## 概述

HTTP Cookie (也叫 Web Cookie 或浏览器 Cookie) 是**服务器发送到用户浏览器并保存在本地的一小块数据**。服务器在第一次收到 HTTP 请求后，会在响应标头里面添加一个或多个 `Set-Cookie` 选项。收到响应后，浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器 —— 如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- **会话状态管理**：如用户登录状态、购物车、游戏分数或其他需要记录的信息
- **个性化设置**：如用户自定义设置、主题和其他设置
- **浏览器行为跟踪**：如跟踪分析用户行为等

Cookie 曾一度用于客户端数据的存储，因当时并没有其他合适的存储办法而作为唯一的存储手段，但现在推荐使用现代存储 API。由于服务器指定 Cookie 后，浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销 (尤其是在移动环境下)。

## 创建 Cookie

服务器使用 `Set-Cookie` 响应头部向用户代理 (一般是浏览器) 发送 Cookie 信息。一个简单的 Cookie 可能像这样：

```sh
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[页面内容]
```

现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的 Cookie 信息通过 Cookie 请求头部再发送给服务器。

```sh
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

## 限制访问 Cookie

使用 Secure 和 HttpOnly 属性可以增强 Cookie 的安全性。Secure 属性确保 Cookie 仅通过 HTTPS 发送，而 HttpOnly 属性限制了 JavaScript 的访问，减少了跨站脚本 (XSS) 攻击的风险。

## Cookie 的 SameSite 属性

SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击 (CSRF)。

```sh
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```

SameSite 可以有下面三种值：

- `strict`：仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
- `lax`：允许部分第三方请求携带 Cookie
- `none`：无论是否跨站都会发送 Cookie，`SameSite=None` 的 cookie 还必须指定 Secure 属性 (它们需要安全上下文)。

之前默认是 `none` 的，Chrome80 后默认是 `lax`。

cookie 使用不同的方案 (http：或 https：) 发送来自同一域的 cookie，则不再视为来自同一站点。

> 跨站和跨域是不同的。同站 (same-site)/ 跨站 (cross-site) 和第一方 (first-party)/ 第三方 (third-party) 是等价的。但是与浏览器同源策略 (SOP) 中的同源 (same-origin)/ 跨域 (cross-origin) 是完全不同的概念。

## Domain

Domain 指定了 Cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址 (URL) 中的主机 (host) 部分 (但是不包含子域名)。

像淘宝首页设置的 Domain 就是 `.taobao.com`，这样无论是 `a.taobao.com` 还是 `b.taobao.com` 都可以使用 Cookie。

在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：

```sh
Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT
```

- 前面带点和不带点的区别
  - 带点：任何 `subdomain` 都可以访问，包括父 `domain`
  - 不带点：只有完全一样的域名才能访问，`subdomain` 不能 (但在 IE 下比较特殊，它支持 `subdomain` 访问)

## expires，max-age

默认情况下，如果一个 `cookie` 没有设置这两个参数中的任何一个，那么在关闭浏览器之后，它就会消失。此类 `cookie` 被称为 “session cookie”。

为了让 `cookie` 在浏览器关闭后仍然存在，我们可以设置 `expires` 或 `max-age` 选项中的一个。

```js
expires=Tue, 19 Jan 2038 03:14:07 GMT
```

`cookie` 的到期日期，那时浏览器会自动删除它。

如果我们将 `expires` 设置为过去的时间，则 `cookie` 会被删除。

```js
max-age=3600
```

`expires` 的替代选项，具指明 `cookie` 的过期时间距离当前时间的**秒**数。

如果为 `0` 或负数，则 `cookie` 会被删除：

```js
// cookie 会在一小时后失效
document.cookie = 'user=John; max-age=3600'

// 删除 cookie（让它立即过期）
document.cookie = 'user=John; max-age=0'
```
