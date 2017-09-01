var user = $('#user');
var pwd = $('#pwd');
var loginUrl = 'http://hongyan.cqupt.edu.cn/activity/api/auth/';
var remUrl = 'http://hongyan.cqupt.edu.cn/activity/api/auth/checkremember';
var cancelRemUrl = 'http://hongyan.cqupt.edu.cn/activity/api/auth/cancelremember';

$(document).ready(function() {
    $.get(remUrl, function(res) {
        console.log(res);
        if(res.status == 1) {
            window.location.replace('./manage.html');
        } else if (res.status == 0 && res.data) {
            user.val(res.data.account);
            pwd[0].focus();
        }
    }) 
    // if ($.cookie('remUser') == 'true') {
    //     console.log($.cookie('token'));  
    // }  
});

$('#login').click(function() {

    checkBlank(user, '请填写用户名');
    checkBlank(pwd, '请填写密码');
    if (checkBlank(user, '请填写用户名') && checkBlank(pwd, '请填写密码')) {
        //remember me
        if ($('#rem').prop('checked')) {
            $.get(remUrl, function(res) {
                console.log(res);
            })
        } 
        //else {
        //     console.log(0);
        //     var data = {
        //         account: user,
        //     };
        //     $.get(cancelRemUrl, data, function(res) {
        //         console.log(res);
        //     })
        // }
        $.ajax({
            type: 'post',
            async: true,
            url: loginUrl,
            data: {
                account: user.val(),
                password: pwd.val(),
                remember_me: 1  
            },
            success: function(res) {
                console.log(res.data.token);
                //window.location.replace('./manage.html');
                //Chrome doesn't support cookies for local files.
                $.cookie('rmbUser', 'true', { expires: 14});
                $.cookie('token', 'res.data.token', { expires: 14});
            },
            error: function(err) {
                if (err.status == 401) {
                    user.next('span').text('未授权，请重新登录');
                    user.css('borderColor', '#ff5400');
                    pwd.next('span').text('未授权，请重新登录');
                    pwd.css('borderColor', '#ff5400');
                }
            }
        })
    };
})

function checkBlank(ele, str) {
    if (!ele.val()) {
        ele.next('span').text(str);
        ele.css('borderColor', '#ff5400');        
    } else {
        return true;
    }
    ele.blur(function() {
        var curValue = $(this).val();
        if(curValue.length == 0) {
            ele.next('span').text(str);
            ele.css('borderColor', '#ff5400');
            ele[0].focus();
        }
    })
    ele.keydown(function() {
        ele.next('span').text('');
        ele.css('borderColor', '#fff');
    })

}