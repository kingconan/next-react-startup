const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const compress = require('koa-compress')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch')
const cheerio = require('cheerio');

function getLinks(ret){
    const $ = cheerio.load(ret);
    const links = []
    $('a').each( function () {
        let link = $(this).attr('href');
        if(link.length > 5){
            links.push(link);
        }
    });
    return links
}

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

    router.get('/lg/api/get', async (ctx, next) => {
        ctx.status = 200
        const baseUrl = 'http://34.92.57.93:10038/lighthouse_report/';
        const ret = await fetch(baseUrl);
        const body = await ret.text();
        let links = getLinks(body)
        let retLg = {}
        for (const link of links) {
            const url = `${baseUrl}${link}reports/`;
            const ret = await fetch(url);
            const retText = await ret.text();
            const report_links = getLinks(retText);
            for(const report_link of report_links){
                if(report_link.endsWith(".json")){
                    const jsonUrl = `${baseUrl}${link}reports/${report_link}`;
                    const ret = await fetch(jsonUrl);
                    const retText = await ret.text();
                    const jsonRet = JSON.parse(retText);
                    for(let i=0;i<jsonRet.length;i++){
                        const name = jsonRet[i]['name']
                        const date = jsonRet[i]['date']
                        if(!(name in retLg)){
                            retLg[name] = []
                        }
                        retLg[name].push({
                            'date': date,
                            'performance':Math.round(jsonRet[i]['result']['performance'] * 100),
                            'accessibility':Math.round(jsonRet[i]['result']['accessibility'] * 100),
                            'best-practices':Math.round(jsonRet[i]['result']['best-practices'] * 100)

                        })
                    }
                }
            }
        }
        ctx.body = retLg
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
