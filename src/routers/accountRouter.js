//导入express
const express = require('express')
const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入控制器
const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))

//假设http://127.0.0.1:3000/account/login
//用控制器服处理具体的请求

//处理的登录页面的请求
accountRouter.get('/login',accountCTRL.getLoginPage)

//处理注册页面的请求
accountRouter.get('/register',accountCTRL.register)




module.exports = accountRouter