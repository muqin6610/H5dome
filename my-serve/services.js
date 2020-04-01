let url = require('url');

const db = require('./db.js')
exports.start = (req, res)=>{
}
// 登录注册处理
exports.login = (req, res)=>{
    let params = url.parse(req.url, true).query
    console.log(params)
    if(params.username === 'admin' && params.password === '123456') {
        res.send({
            success: true,
            message: '登录成功!',
            token: 'asfafsa16a51f6a51fa'
        })
    }else {
        res.send({
            success: false,
            message: '账户或密码错误!请重新输入!'
        })
    }
}
exports.register = (req, res)=>{
    console.log(req.body)
    res.send('测试')
}

exports.index = (req, res)=>{
    setTimeout(() => {
        // res.send({
        //     uid: '3',
        //     arrData:[
        //         {
        //             date: '2020-04-01 09:15:22',
        //             name: '王超',
        //             tiwen: '36.3',
        //         },
        //         {
        //             date: '2020-04-01 09:15:22',
        //             name: '王小超',
        //             tiwen: '38.3',
        //         },
        //     ]
        // })
        res.send({
            uid: '0',
            charts1: [
                {value: 100, name: '已上报'},
                {value: 25, name: '未上报'},
            ],
            charts2: [
                {value: 75, name: '正常'},
                {value: 25, name: '异常'},
            ],
        })
    }, 500);
}

exports.detail = (req, res)=>{
    let params = url.parse(req.url, true).query
    console.log(params)
    if(params === '0') {
        console.log('222222222222222222222222')
    }
    setTimeout(() => {
        res.send('detail')
    }, 500);
}