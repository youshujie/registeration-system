var url = 'http://hongyan.cqupt.edu.cn/activity/api/';
// console.log($.cookie('token'));

$('.tabs').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
})
$('.icon-close').click(function() {
    $('.edit').css('display', 'none');
})
//activity manage
$('.acti-manage').click(function() {
    $('.acti').css('display', 'block').siblings().css('display', 'none');
    $.ajax({
        type: 'get',
        async: true,
        url: url + 'act',
        data: {
            token: $.cookie('token'),
            page: 1,
            per_page: 10,
            sortby: "created_at|updated_at|start_time|activity_name",
            sort: "asc|desc",
            act_key: 1000, //以下将进行模糊查询
            act_name: "招新"
        },
        success: function(res) {
            console.log(res.data.data);
            var s = [{name: '1'},{name: '2'},{name: '3'}]

            if (res.data.data[0]) {
                var acti = new Vue({
                    el: '.acti',
                    data: {
                        activities: s
                    }
                })
            } else {

            }
        },
        error: function(err) {
            if (err.status == 400) {
                console.log(1);
                alert('请求错误，请重新登录');
                //请求错误，请重新登录
                //window.location.replace('./login.html');
            }
        }
    })
})
//add a activity
$('.add-acti').click(function() {
    $('.edit').css('display', 'block');
})
$('#confirm-add-acti').click(function() {
    console.log(1);
    $.ajax({
        type: 'post',
        url: url + 'act',
        data: {
            token: $.cookie('token'),
            activity_name: $('.acti-name').val(),
            summary: $('.acti-summary').val(),
            max_num: parseInt($('.max-num').val()), //人数限制，若修改的值低于已报名的人数会返回错误
            location: $('.acti-location').val(),
            start_time: '2017-09-17 00:00:00',
            end_time: '2017-09-18 00:00:00',
            time_description: $('.time-des').val()
        },
        success: function(res) {
            console.log(res);
        }
    })
})
// function loginAgain() {
//     alert('请求错误，请重新登录')
// }