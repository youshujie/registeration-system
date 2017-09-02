var url = 'http://hongyan.cqupt.edu.cn/activity/api/';
// console.log($.cookie('token'));

$('.tabs').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
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
            var acti = new Vue({
                el: '.acti',
                data: {
                    activities: [
                        {name: res.data.data[0]}
                    ]
                }
            })
        },
        // error: function(err) {
        //     if (err.status == 401) {
        //         user.next('span').text('未授权，请重新登录');
        //         user.css('borderColor', '#ff5400');
        //         pwd.next('span').text('未授权，请重新登录');
        //         pwd.css('borderColor', '#ff5400');
        //     }
        // }
    })
})