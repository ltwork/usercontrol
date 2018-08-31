//模板
const xtpl = require('xtpl')
//路径
const path = require('path')

const databasetool = require(path.join(__dirname, "../tools/databasetool.js"))

/**
 * 最终处理，返回获取到的学生列表页面
 */
exports.getStudentListPage = (req, res) => {

    const keywords = req.query.keyword || ''
    /**
     * 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
     * 参数2：渲染页面所需要的数据
     * 参数3：渲染完毕之后的回调
     */
    databasetool.findList('studentInfo', {
        name: {
            $regex: keywords
        }
    }, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
            students: docs,
            //传给搜索框里面的value值
            keywords,
            loginedName: req.session.loginedName
        }, function (error, content) {
            res.send(content)
        });
    })
}


//----------------------------------------------------------------


//新增学生页面
exports.addStudentPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../statics/views/add.html"), { 
        loginedName: req.session.loginedName
        },
        function (error, content) {
            res.send(content)
        });
}


//新增学生信息
//1.拿到表单厘米的数据
//2.浏览器发请求
//1-成功--->列表页
//2.-不成功---->alert新增失败
//3.服务器返回一段js代码给浏览器操作
exports.addStudent = (req, res) => {
    databasetool.insertOne("studentInfo", req.body, (err, result) => {
        if (result == null) {
            res.send(`<script>alert("新增失败")</script>`)
        } else {
            res.send(`<script>window.location.href = "/studentmanager/list"</script>`)
        }
    })
}

//返回编辑学生信息的页面
//点击的哪一个学生的信息
exports.getEditStudentPage = (req, res) => {
    databasetool.findOne("studentInfo", {
        _id: databasetool.ObjectId(req.params.studentId)
    }, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/edit.html"), {
                student: doc,
                loginedName: req.session.loginedName
            },
            function (error, content) {
                res.send(content)
            });
    })
}


//返回编辑学生页面的结果
exports.editStudent = (req, res) => {
    databasetool.updateOne(
      "studentInfo",
      { _id: databasetool.ObjectId(req.params.studentId) },
      req.body,
      (err, result) => {
        if (result == null) {
          // 修改失败
          res.send(`<script>alert("修改失败!");</script>`);
        } else {
          //修改成功
          res.send(
            `<script>window.location.href="/studentmanager/list"</script>`
          );
        }
      }
    );
  };


//返回删除之后的结果

// exports.deleteStudent = (req,res)=>{
//     databasetool.deleteOne("studentInfo",{_id:databasetool.ObjectId(req.params.studentId)},(err, result) => {
//         if(result == null) {
//             res.send(`<script>alert("删除失败")</script>`)
//         }else {
//             res.send(`<script>window.location.href="/studentmanager/list"</script>`) 
//         }
//     })
// }

exports.deleteStudent = (req, res) => {
    databasetool.deleteOne(
        "studentInfo", {
            _id: databasetool.ObjectId(req.params.studentId)
        },
        (err, result) => {
            if (result == null) {
                // 删除失败
                res.send(`<script>alert("删除失败!");</script>`);
            } else {
                //删除成功
                res.send(
                    `<script>window.location.href="/studentmanager/list"</script>`
                );
            }
        }
    );
};
