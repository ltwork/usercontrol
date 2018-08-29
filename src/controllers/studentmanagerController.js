//模板
const xtpl = require('xtpl')
//路径
const path = require('path')

const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))

/**
 * 最终处理，返回获取到的学生列表页面
 */
exports.getStudentListPage = (req,res) => {
    const keywords = req.query.keywords || ""
    //console.log(req.query.keyword);
    //res.sendFile(path.join(__dirname,'../statics/views/list.html'))
    //databasetool.findList = ("studentInfo", {name:{$regex: keyword} }, (err, docs) => {

        /**
         * 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
         * 参数2：渲染页面所需要的数据
         * 参数3：渲染完毕之后的回调
         */
        databasetool.findList('studentInfo',{name:{$regex:keywords}}, (err,docs) => {
            xtpl.renderFile(path.join(__dirname,"../statics/views/list.html"),{
                students:docs,
            //传给搜索框里面的value值
                keywords
            },function(error,content){
                res.send(content)
            });
    })
}

   

