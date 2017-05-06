$(function() {

    var username, password

    //首页点击登录
    $("div.login .btn-primary").click(function() {
        username = $(".username").val()
        password = $(".password").val()

        $.ajax({
            url: "http://www.b.com:3000/login",
            type: "POST",
            data: {
                user: {
                    username: username,
                    password: password
                }
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)


                switch (data.type) {
                    case 'register':
                        console.log('register')
                        $(window).attr('location', '/register/' + data.type)
                        break
                    case 'success':
                        console.log('success')
                        $(window).attr('location', '/index/' + data.type)
                        break
                    case 'error':
                        console.log('error')
                        $(window).attr('location', '/index/' + data.type)
                        break
                    default:
                        $(window).attr('location', '/index')
                        break
                }

            }
        })
    })


    //注册页点击提交
    $("div.register .btn-primary").click(function() {
        username = $(".username").val()
        password = $(".password").val()
        $.ajax({
            url: "http://www.b.com:3000/register/new",
            type: "POST",
            data: {
                user: {
                    username: username,
                    password: password
                }
            },
            dataType: 'json',
            success: function(data) {
                switch (data.type) {
                    case 'user_exist':
                        $(window).attr('location', '/register/' + data.type)
                        break
                    case 'register_success':
                        $(window).attr('location', '/index/' + data.type)
                        break
                    case 'register_error':
                        $(window).attr('location', '/register/' + data.type)
                        break
                    case 'register_nul':
                        console.log(data.type)
                        $(window).attr('location', '/register/' + data.type)
                        break
                    default:
                        $(window).attr('location', '/register')
                        break
                }
            }
        })
    })


})