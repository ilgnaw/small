$(function(){
$('.btn').on('tap',function(){
    // console.log(1);
    if($(this).hasClass('active1')){
        return false;
    }
    var _this=$(this);
    // if(_this.hasClass)
    $.ajax({
        url:" /user/vCode",
        type:"GET",
        data:"null",
        success:function(result){
            console.log(result);
            var sunTime=60;
            var timer=setInterval(function(){
                sunTime--;
                _this.html(sunTime+"秒后再发送");
                _this.addClass('active1');
                if(sunTime<=0){
                    clearInterval(timer);
                     _this.html("获取验证码");
                _this.removeClass('active1');
                }
            },1000)
        }
    })
})



$('.confirm').on('tap',function(){
    var username=$('.phone').val();
var password=$('.oldPassword').val();
var mobile=$('.phone').val();
var vCode=$('.ma').val();
// console.log(username);
// console.log(password);
// console.log(mobile);
// console.log(vCode);
    $.ajax({
        url:'/user/register',
        type:"POST",
        data:{
            username:username,
            password:password,
            mobile:mobile,
            vCode:vCode

        },
        beforeSend:function(){
            if(!$(".phone").val()){
                mui.toast('请填入手机号');
                return false;
            }
             if(!$(".oldPassword").val()){
                mui.toast('请输入密码');
                return false;
            }
             if($(".oldPassword").val()!=$('.newPassword').val()){
                mui.toast('两次密码不一样');
                return false;
            }
             if(!$(".ma").val()){
                mui.toast('请点击获取验证码');
                return false;
            }
        },
        success:function(result){
            // console.log(result);
            if(result.error==401){
                mui.toast('验证码错误');
            }
            if(result.success==true){
               location.href="login.html";
            }
        }
    })
})

})
