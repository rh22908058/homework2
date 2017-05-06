var Users = require('./models/users')
var mongoose = require('mongoose')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = 3000

var app = express()


mongoose.connect('mongodb://localhost/homework2')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)
console.log('homework started on port' + port)



app.get('/', function(req, res) {
    res.render('index')
})

//点击登录，返回查询结果
app.post('/login', function(req, res) {
    //允许post请求路由/login跨域
    res.header({ "Access-Control-Allow-Origin": "*" })
    var user = req.body.user
    Users.findOne({ 'username': user.username, 'password': user.password }, function(err, data) {
        //没查到用户
        if (!data) {
            console.log('no data')
            Users.findOne({ 'username': user.username }, function(err, data) {
                //用户未注册
                if (!data) {
                    console.log('no user_register')
                    return res.json({
                        type: 'register'
                    })

                }
                //密码错误
                else {
                    return res.json({
                        type: 'error'
                    })

                }
            })

        }
        //登录成功
        else {
            console.log('have data')

            return res.json({
                type: 'success'
            })
        }
    })
})

app.get('/index', function(req, res) {
    res.render('index')
})
app.get('/register', function(req, res) {
    res.render('register')
})


//index路径下的三种路由结果，分别渲染index页面，添加处理结果
app.get('/index/:type', function(req, res) {
    var type = req.params.type

    if (type == 'success') {
        res.render('index', {
            info: '登录成功'
        })

    }
    if (type == 'error') {
        res.render('index', {
            info: '密码错误'
        })

    }
    if (type == 'register_success') {
        res.render('index', {
            info: '注册成功'
        })

    }


})

//register路径下的三种路由结果，分别渲染register页面，添加处理结果
app.get('/register/:type', function(req, res) {


    var type = req.params.type

    console.log(type)
    if (type == 'register') {
        res.render('register', {
            info: '未注册，请先注册'
        })

    }
    if (type == 'user_exist') {
        res.render('register', {
            info: '用户已存在'
        })

    }
    if (type == 'register_error') {
        res.render('register', {
            info: '注册失败'
        })

    }


    if (type == 'register_nul') {
        console.log('null')

        res.render('register', {
            info: '用户名不能为空'
        })

    }
})




//提交注册数据
app.post('/register/new', function(req, res) {
    //允许post请求路由/register/new跨域
    res.header({ "Access-Control-Allow-Origin": "*" })
    var user = req.body.user


    //用户名不能为空
    if (!user.username) {
        return res.json({
            type: 'register_nul'
        })
    }


    //检测用户是否存在
    Users.findOne({ 'username': user.username }, function(err, data) {
        if (data) {
            //用户存在
            return res.json({
                type: 'user_exist'
            })
        } else {
            //是新用户，录入数据库
            _user = new Users({
                username: user.username,
                password: user.password
            })
            _user.save(function(err, data) {
                if (err) {
                    console.log(err)
                    return res.json({
                        type: 'register_error'
                    })
                }
                console.log('saved ' + data)
                return res.json({
                    type: 'register_success'
                })
            })

        }
    })

})