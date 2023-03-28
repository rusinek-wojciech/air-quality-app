import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const port = 5000

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.gios.gov.pl',
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },
  })
)

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
