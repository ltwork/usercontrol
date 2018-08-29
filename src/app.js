const express = require('express')
const path = require('path')

//session中间件 导入
const session = require('express-session')

//获取post请求参数中间件
const bodyParser = require('body-parser')


//创建app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Use the session middleware 5minute
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3000000 }}))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))
// resave:false,saveUninitialized: true,
//设置内置中间件，对我们的静态资源进行处理
app.use(express.static(path.join(__dirname,"statics")))

//集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
//当页面是account时使用这个路由
app.use('/account',accountRouter)

const studentmanagerRouter = require(path.join(__dirname,"./routers/studentmanagerRouter.js"))
app.use('/studentmanager',studentmanagerRouter)


//启用app
app.listen(3000,'127.0.0.1',err=>{
    if(err) console.log(err);
    console.log("OK");
})