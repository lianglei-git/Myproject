const Router = require('koa-router');

const router = new Router();

const path = require('path');

// 首页sql查询语句
const {
    find,
    inneruser
} = require(path.join(process.cwd(), './mysql/db.js'))

router.post('/api/v1/login', async (ctx, next) => {
    // 得到前端发送过来的数据
    const {
        zhanghao,
        mima
    } = ctx.request.body; 

    // 查询数据库
    var resultFind = await find({ // 查询数据库返回的是数组
        username: zhanghao,
        password: mima
    });

    // 获取数据库中的id
    var mysqlId = resultFind[0].id;

    // 判断登陆结果
    if (resultFind.length >= 1) {

        ctx.cookies.set('userid', mysqlId, {
            maxAge: 100 * 1000,
            expires: new Date('2019/8/17'),
            path: '/',
            domain: 'localhost',
        })

        ctx.body = {
            title: "账号登陆成功",
            status: 0,
            userid: mysqlId,
            redirect:'/personal'
        }
    } else {
        ctx.body = {
            title: "登录失败",
            status: 1
        }
    }
})


module.exports = router;