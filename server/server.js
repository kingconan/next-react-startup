const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const compress = require('koa-compress')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('koa-bodyparser');


app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    server.use(bodyParser());
    const options = {
        threshold: 2048
    }
    server.use(compress(options))

    router.get('/ping', async (ctx, next) => {
        ctx.status = 200
        ctx.body = 'ping test'
    });

    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())

    server.listen(process.env.PORT || 3000, '0.0.0.0',  () => {
        console.log(`server is running at http://localhost:${process.env.PORT || 3000}`)
    })
})
