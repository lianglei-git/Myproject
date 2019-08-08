const mysql = require('mysql');
let {database} = require('../config')
let coninr = mysql.createConnection({
    ...database // es6 结构
});

coninr.connect((err) => {
    console.log('数据启动成功')
});


// 查询
async function find(opt){
    var sql = 'SELECT * FROM `ueil` WHERE ' + Object.keys(opt).map(item => {
        return `${item} LIKE '${opt[item]}'`
    }).join(' AND ');
    console.log(sql);
    return new Promise((success,error) => {
        coninr.query(sql,(err,result) => {
            if(err){
                error(err)
            }else{
                success(result)
            };
        });
    });
}
// 增加
async function inneruser(opt) {
    var sql = 'INSERT INTO `ueil` ( username, password) VALUES (?,?)'
    return new Promise((success,error) => {
        coninr.query(sql,[opt.username,opt.password],(err,result) => {
            if(err){
                error(1)
            }else{
                success(0)
            };
        });
    });
};
//改 增加图片进去
async function undata(opt) {
    return new Promise((success,error) => {
        // UPDATE `ueil` SET `userpic`='123' WHERE (`id`='64')
        coninr.query(`UPDATE ueil SET userpic='${opt.picurl}' WHERE (id='${opt.userid}')`,(err,result)=>{
            if(err){
                error(1)
            }else{
                success(0)
            };
        });
    });
};
// 通过id查找图片路径
async function findPIC(opt){
    return new Promise((success,error) => {
        coninr.query(`SELECT * FROM ueil WHERE id=${opt.userid}`,(err,result) => {
            if(err){
                error(err)
            }else{
                success(result)
            };
        });
    });
}

// 更新数据 
async function gengxin(opt) {
    return new Promise((success,error) => {
        // UPDATE `ueil` SET `userpic`='123' WHERE (`id`='64')
        coninr.query(`UPDATE ueil SET phone='${opt.phoneValue}',email='${opt.emailValue}',password='${opt.onePasswordValue}' WHERE (id='${opt.userid}')`,(err,result)=>{
            if(err){
                error(1)
            }else{
                success(0)
            };
        });
    });
};


async function shanchu(opt) {

    return new Promise((success,error) => {
        // DELETE FROM `ueil` WHERE (`id`='63')
        // UPDATE `ueil` SET `userpic`='123' WHERE (`id`='64')
        coninr.query(`DELETE FROM ueil WHERE (id='${opt.ida}')`,(err,result)=>{
            if(err){
                error(1)
            }else{
                success(0)
            };
        });
    });
};

// 产品页面的功能

// 增加 产品页面
async function countProdout(opt) {
    var sql = 'INSERT INTO `product` ( name, detalied, ndate, util, picurl) VALUES (?,?,?,?,?)'
    var {productNameValue,detaliedValue,newdateValue,utilValue,picUrl} = opt
    return new Promise((success,error) => {
        // console.log(productNameValue,detaliedValue,newdateValue,utilValue,picUrl)
        coninr.query(sql,[productNameValue,detaliedValue,newdateValue,utilValue,picUrl],(err,result) => {
            console.log(err)
            if(err){
                error('asdasd')
            }else{
                success(0)
            };
        });
    });
};

//查询产品页面的

async function  findProdout(opt) {
    var sql = 'SELECT * FROM `product` WHERE ' + Object.keys(opt).map(item => {
        return `${item} LIKE '${opt[item]}'`
    }).join(' AND ');
    // console.log(sql + "find:sql");
    return new Promise((success,error) => {
        coninr.query(sql,(err,result) => {
            if(err){
                error(err)
            }else{
                success(result)
            };
        });
    });
};
// 用id查询每一个的
async function  findData(opt) {
    // DELETE FROM `product` WHERE (`id`='70')
    // `DELETE FROM ueil WHERE (id='${ida}')`
    var sql =` DELETE FROM product WHERE (id=${opt.findID})`;
    // console.log(sql + "find:sql");
    return new Promise((success,error) => {
        coninr.query(sql,(err,result) => {
            if(err){
                error(1)
            }else{
                success(0)
            };
        });
    });
};

// 查询所有的数据
async function  findDataAll() {
    var sql = `SELECT * FROM product `;
    return new Promise((success,error) => {
        coninr.query(sql,(err,result) => {
            if(err){
                error(err)
            }else{
                success(result)
            };
        });
    });
};
module.exports = {
    find, // 首页sql查询语句
    inneruser, // 首页增加sql语句
    undata, // 更改图片sql语句
    findPIC, // 查询图片sql语句
    gengxin, // 更新sql语句  更改用户信息的
    shanchu, // 删除用户信息的
    countProdout, // 产品也添加语句
    findProdout, // 产品也sql语句查询
    findData,
    findDataAll
}
