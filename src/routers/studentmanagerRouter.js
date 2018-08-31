//学生管理列表
const express = require('express')
const path = require('path')

const studentmanagerRouter = express.Router()
const studentmanagerCTRL = require(path.join(__dirname,'../controllers/studentmanagerController.js'))


studentmanagerRouter.get('/list',studentmanagerCTRL.getStudentListPage)


//获得新增学生的页面
studentmanagerRouter.get('/add',studentmanagerCTRL.addStudentPage)

//完成新增操作
studentmanagerRouter.post('/add',studentmanagerCTRL.addStudent)


//完成编辑操作
// :动态params url
//返回编辑页面
studentmanagerRouter.get('/edit/:studentId',studentmanagerCTRL.getEditStudentPage)


//修改之后的操作
studentmanagerRouter.post('/edit/:studentId',studentmanagerCTRL.editStudent)

//删除之后的操作
studentmanagerRouter.get('/delete/:studentId',studentmanagerCTRL.deleteStudent)





module.exports = studentmanagerRouter