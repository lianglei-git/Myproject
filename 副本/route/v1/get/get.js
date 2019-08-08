const Router = require('koa-router');

const router = new Router();

router.get('/',async (ctx,next) => {
   if(!ctx.cookies.get('userid')){
     ctx.redirect('login');
   }
   await ctx.render('index');
})

router.get('/chan',async (ctx,next) => {
    await ctx.render('chan');
 })
 router.get('/five',async (ctx,next) => {
    await ctx.render('five');
 })
 router.get('/login',async (ctx,next) => {
    await ctx.render('login');
 })
 router.get('/personal',async (ctx,next) => {
   if(!ctx.cookies.get('userid')){
    ctx.redirect('login');
   }
    await ctx.render('personal');
 })

module.exports = router;
