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
                //请求错误，请重新登录
            }
        }
    })
})
//add a activity
$('.add-acti').click(function() {
    $('.edit').css('display', 'block');
})