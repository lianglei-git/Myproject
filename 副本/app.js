const Koa = require('koa');  // 引入koa

const koaStatic = require('koa-static'); // 读取静态文件

const koaViews = require('koa-views'); // 视图层

const koaBodyPar = require('koa-bodyparser'); // 用来读取post请求发送过来的数据

const Router = require('koa-router');   // 路由 

const path = require('path');

const requireDir = require('require-directory');  //

var app = new Koa();

var i = 1;
var j = 2;

const {
    port
} = require('./config')

app.use(koaBodyPar());

app.use(koaStatic(path.join(process.cwd(), './pulic'))); // 读取静态文件

app.use(koaViews(path.join(process.cwd(), './pulic/html'), {
    extension: "ejs"
}))

requireDir(module, './route', {
    visit: function (modules) {
        if (modules instanceof Router) {
            app.use(modules.routes())
        }
    }
})


console.log("我要冲突")


console.log("我想有点冲突")

app.listen(port, () => {
    console.log("服务启动成功:" + port)
})