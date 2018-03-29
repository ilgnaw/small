$(function () {
    getnum();
    $('.loginout').on('tap', function () {
        $.ajax({
            url: " /user/logout",
            type: 'GET',
            data: null,
         success:   function(result) {
                // console.log(result);
                if (result.success == true) {
                    var url = location.href;
                    location.href = "login.html?newURL=" + url;
                }
            }
        })
    })
})
function getnum() {
    $.ajax({
        url: "/user/queryUserMessage",
        type: "GET",
        data: null,
        success: function (result) {
            console.log(result);
            if (result.error == 400) {
                var url = location.href;
                location.href = "login.html?newURL=" + url;
            }
            var temp = template('temp', result);
            $(".add").html(temp);
        }
    })
}