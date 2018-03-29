$(function () {
    // var url=new URLSearchParams(location.search);
    // var newUrl=url.get('url');
    // console.log(newUrl);
    // $('.login').attr("href",newUrl);
    $('.login').on('tap', function () {
        var formData = $('#form').serialize();
        console.log(formData);
        $.ajax({
            url: "/user/login",
            data: formData,
            type: "POST",
            beforeSend: function () {
                if (!$('.mui-input-loginName').val()) {
                    mui.toast('请输入用户名');
                    return false;
                }
                if (!$('.mui-input-password').val()) {
                    mui.toast('请输入用户名');
                    return false;
                }

                // console.log(formData);
            },
            success: function (result) {
                console.log(result)
                if (result.error == 403) {
                    mui.toast('result.message');
                }
                if (result.success == true) {

                    var url = new URLSearchParams(location.search);
                    var newUrl = url.get('newURL');
                    if (!newUrl) {
                        location.href = "index.html";
                    } else {
                        location.href = newUrl;
                    }

                }
            }
        })
    })



})