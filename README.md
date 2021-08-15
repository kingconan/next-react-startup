# upgrade node
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```


# create next project
```
yarn create next-app
```

# run next
```
npm run dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5
event - compiled successfully
event - build page: /
wait  - compiling...
event - compiled successfully

```

# add antd
```
yarn add antd
import 'antd/dist/antd.css'; //in _app.js
```


# koa server
```
yarn add koa koa-bodyparser koa-compress koa-router
create server/server.js
modify scripts in package.json

```

# nodemon for server
```angular2html
yarn add nodemon
create nodemon.json
change the scrips in package.json

```