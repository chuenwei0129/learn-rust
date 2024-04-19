const http = require('http')
const url = require('url')
const crypto = require('crypto')

// 简单的用户信息列表
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]

// 用于存储 session 信息
const sessions = {}

// 生成唯一的 sessionID
const createSessionId = () => {
  return crypto.randomBytes(16).toString('hex')
}

// 解析 Cookie
const parseCookies = (request) => {
  const list = {}
  const rc = request.headers.cookie

  rc &&
    rc.split(';').forEach((cookie) => {
      const parts = cookie.split('=')
      list[parts.shift().trim()] = decodeURI(parts.join('='))
    })

  return list
}

const server = http.createServer((req, res) => {
  // 允许跨域请求的 CORS 头部
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') // 在实际部署中，应严格地设置这个值
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true') // 允许携带证书

  // 预检请求的处理
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }
  const parsedUrl = url.parse(req.url, true)
  const cookies = parseCookies(req)
  let sessionId = cookies['session_id']

  if (parsedUrl.pathname === '/login' && parsedUrl.query.username) {
    // 模拟登录操作，创建新的 session
    sessionId = createSessionId()
    sessions[sessionId] = { username: parsedUrl.query.username }
    res.setHeader('Set-Cookie', `session_id=${sessionId}; HttpOnly`)

    res.end('Login successful')
  } else if (parsedUrl.pathname === '/userinfo') {
    if (sessionId && sessions[sessionId]) {
      // 用户已登录，返回用户信息列表
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(users))
    } else {
      // 用户未登录
      res.end('Please login first')
    }
  } else {
    res.end('Welcome to our simple server')
  }
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
