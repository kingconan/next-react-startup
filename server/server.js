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

    router.get('/fake_api/latest_runs', async (ctx, next) => {
        ctx.status = 200
        ctx.body = {
            code: 0,
            message: 'ok',
            obj: [
                {
                    simulation: 'simulation_001',
                    rt_99: '1.2s',
                    rt_95: '1.0s',
                    tps: 1000,
                    env: 'stage',
                    created_at: '2021-08-08 23:00:00',
                    key:'1'
                },
                {
                    simulation: 'simulation_002',
                    rt_99: '1.2s',
                    rt_95: '1.0s',
                    tps: 1000,
                    env: 'stage',
                    created_at: '2021-08-08 23:00:00',
                    key:'2'
                },
                {
                    simulation: 'simulation_003',
                    rt_99: '1.2s',
                    rt_95: '1.0s',
                    tps: 1000,
                    env: 'stage',
                    created_at: '2021-08-08 23:00:00',
                    key:'3'
                }
            ]
        }
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
