const Router = require('koa-router');

const router = new Router();

const path = require('path');

// 首页sql查询语句
const {
    undata
} = require(path.join(process.cwd(), './mysql/db.js'))


router.post('/api/v1/appPic',async (ctx,next) => {
    ctx.body =  "success"
})




module.exports = router;