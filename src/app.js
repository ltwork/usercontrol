//导入express框架
const express = require('express')
//导入核心模块
const path = require('path')

//创建应用
const app = express()

//集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))

//假设http://127.0.0.1:3000/account/login
app.use("/account",accountRouter)


//开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err) console.log(err);
    console.log("start ok");
})