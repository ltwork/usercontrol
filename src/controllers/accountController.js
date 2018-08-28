const  path = require('path')


//返回注册页面
exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/login.html"))
}

//返回注册页面给浏览器
exports.register = (req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/register.html"))
}