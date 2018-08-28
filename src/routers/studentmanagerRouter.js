//学生管理列表
const express = require('express')
const path = require('path')

const studentmanagerRouter = express.Router()
const studentmanagerCTRL = require(path.join(__dirname,'../controllers/studentmanagerController.js'))


studentmanagerRouter.get('/list',studentmanagerCTRL.getIndex)






module.exports = studentmanagerRouter