const express = require('express')
const router = express.Router()
const services = require('./services.js')
router.get('/', services.start)
// 登录功能
router.get('/api/login', services.login)
// 注册功能
router.post('/api/register', services.register)
// 获取index数据
router.get('/api/index', services.index)
// 获取detail数据
router.get('/api/detail', services.detail)
// 获取部门数据
router.get('/api/depart', services.depart)

module.exports = router