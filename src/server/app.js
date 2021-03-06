var path = require('path')
var koa = require('koa')
var serve = require('koa-static')
var koaLogger = require('koa-logger')
var onerror = require('koa-onerror')
var favicon = require('koa-favicon')
var log4js = require('log4js')
var bodyParser = require('koa-bodyparser')
var config = require('./config')
var AV = require('leanengine')
var PORT = config.port
var logger = log4js.getLogger()
var app = koa()

var adminRouter = require('./routers/admin')
var blogRouter = require('./routers/blog')

AV.init({
  appId: config.AV.appId,
  appKey: config.AV.appKey
})

app.context.userSession = {}

// error handle
onerror(app)
app.on('error', function (err, ctx) {
  console.error('app error')
  logger.error(err, ctx)
})

// logger
app.use(koaLogger())

// log4js
app.use(function *(next) {
  logger.debug(this.request.method, this.request.url)
  yield next
})

// body parser
app.use(bodyParser())

// server static files
config.staticPath.forEach(function (staticPath) {
    app.use(serve(staticPath))
})

// favicon
app.use(favicon(__dirname + './public/favicon.ico'))

// routes
app.use(adminRouter.routes())
app.use(blogRouter.routes())

app.listen(PORT, function () {
  logger.debug('server is running on port', PORT)
})
