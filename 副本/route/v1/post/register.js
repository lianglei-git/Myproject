const Router = require('koa-router');

const router = new Router();

const path = require('path');

 // 首页sql查询语句
const {find,inneruser} = require(path.join(process.cwd(),'./mysql/db.js'))

router.post('/api/v1/register',async (ctx,next) => {
    const {zhanghao,mima} = ctx.request.body; // 得到前端发送过来的数据

    var resultFind = await find({ // 查询数据库返回的是数组
        username:zhanghao,
        // password:mima
    });

    if(resultFind.length <= 0) {
        await inneruser({ // 台南佳到数据库
        username:zhanghao,
        password:mima
        });
        ctx.body = {
            title:"账号注册成功",
            status : 0
        }
    }else{
        ctx.body = {
            title:"账号已经存在",
            status : 1
        }
    }
   
})


module.exports = router;