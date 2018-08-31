const express = require('express')
const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入控制器
const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))


//处理具体请求
//登录页的请求
accountRouter.get('/login',accountCTRL.getLoginPage)

//注册页面的处理
accountRouter.get('/register',accountCTRL.registerPage)


//注册的处理
accountRouter.post('/register',accountCTRL.register)

//生成验证码
accountRouter.get('/vcode',accountCTRL.getVcodeImg)

//处理登录发送的请求
accountRouter.post('/login',accountCTRL.login)

// 处理登出
accountRouter.get('/logout',accountCTRL.logout)


//暴露出去外部 才能用
module.exports = accountRouter