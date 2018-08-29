const path = require('path')
//导入验证码包
const captchapng = require('captchapng');
//导入工具文件
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))


//最终处理,返回登录页给浏览器 返回页面HTML结构
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/login.html"))
}

//追踪处理返回注册页给浏览器 返回页面html结构
exports.registerPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"))
}

//最终处理注册结果页面给浏览器
exports.register = (req, res) => {
    //console.log(req.body);
    const result = {
        "status": 0,
        "message": "注册成功"
    }
    //链接数据库查询 如果数据库里面有这个用户名就提示用户名已存在'
    //如果没有就 把数据插入到数据库 提示 注册成功
    // Use connect method to connect to the server
    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {
    //     //拿到数据库的操作对象 
    //     const db = client.db(dbName);
    //     //拿到集合 表名
    //     const collection = db.collection('accountInfo');
    //     //查询 判断存不存在
    //     collection.findOne({
    //         username: req.body.username
    //     }, (err, doc) => {
    //         if (doc) { //用户名存在
    //             //一查到就要关闭数据库
    //             client.close()
    //             result.status = 1,
    //                 result.message = "用户名已存在"
    //             res.json(result);
    //         } else { //用户名不存在
    //             // client.close()
    //             collection.insertOne(req.body, (err, result2) => {
    //                 if (result2 == null) {
    //                     result.status = 1,
    //                         result.message = "注册失败"
    //                 }
    //                 client.close()
    //                 res.json(result);
    //             })
    //         }
    //     })
    // })\

    //参数: 数据集合(表名),参数,回调函数
    databasetool.findOne("accountInfo",{username:req.body.username},(err,doc)=>{
        if (doc) { //用户名存在
            result.status = 1,
            result.message = "用户名已存在", 
            res.json(result)   
        }else {//用户名不存在
            databasetool.insertOne("accountInfo",{username:req.body.username,password:req.body.password},(err,result2)=>{
                if(result == null) {//失败
                    result.status = 2,
                    result.message = "注册失败"
                    res.jsaon(result)
                }else {
                    res.json(result)
                }
            })
        }
    })
}

//处理图片验证码
exports.getVcodeImg = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000)

    //把生成的随机眼怎样存储起来 将来和用户输入的验证码相比较
    req.session.vcode = vcode


    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}


//处理登录
exports.login = (req, res) => {
    //console.log(req.body.vcode);
    //console.log(req.session.vcode);
    const result = {
        "status": 0,
        "message": "登录成功"
    }
    if (req.body.vcode != req.session.vcode) {
        //如果请求的验证码不是系统生成的验证码 
        result.status = 1
        result.message = "验证码不正确"
        res.json(result)
        return
    }

    //参数: 数据集合(表名),参数,回调函数
    databasetool.findOne("accountInfo",{username:req.body.username,password:req.body.password},(err,doc)=>{
        if (doc == null) { //用户名存在
            result.status = 2,
            result.message = "用户名或密码错误"
            
        } //用户名密码数据库中有
        res.json(result);
    })
    //链接数据库查询 用户名和密码
    // MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    //     //拿到数据库的操作对象 
    //         const db = client.db(dbName);
    //         //拿到集合 表名
    //         const collection = db.collection('accountInfo');
    //         //查询 判断存不存在
    //         collection.findOne({username: req.body.username,password: req.body.password}, (err, doc) => {
    //             //关闭数据库
    //             client.close()
    //             if (doc == null) { //用户名存在
    //                 result.status = 2,
    //                 result.message = "用户名或密码错误"
                    
    //             } //用户名密码数据库中有
    //             res.json(result);
                
    //         }
    //     )

    // })
            
}