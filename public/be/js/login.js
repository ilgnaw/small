$(function(){/* 文档加载，执行一个函数*/
     $('#form')
     .bootstrapValidator({
         message: 'This value is not valid',
         feedbackIcons: {/*input状态样式图片*/
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields: {/*验证：规则*/
             username: {//验证input项：验证规则
                 message: 'The username is not valid',
                
                 validators: {
                     notEmpty: {//非空验证：提示消息
                         message: '用户名不能为空'
                     },
                     stringLength: {
                         min: 4,
                         max: 30,
                         message: '用户名长度必须在6到30之间'
                     },
                     regexp: {
                         regexp: /^[a-zA-Z0-9_\.]+$/,
                         message: '用户名由数字字母下划线和.组成'
                     },
                     callback:{
                         message:"用户名不存在"
                     }
                 }
             },
             password: {
                 message:'密码无效',
                 validators: {
                     notEmpty: {
                         message: '密码不能为空'
                     },
                     stringLength: {
                         min: 6,
                         max: 30,
                         message: '用户名长度必须在6到30之间'
                     },
                     identical: {//相同
                         field: 'password', //需要进行比较的input name值
                         message: '两次密码不一致'
                     },
                     different: {//不能和用户名相同
                         field: 'username',//需要进行比较的input name值
                         message: '不能和用户名相同'
                     },
                     regexp: {
                         regexp: /^[a-zA-Z0-9_\.]+$/,
                         message: 'The username can only consist of alphabetical, number, dot and underscore'
                     },
                     callback:{
                         message:"密码错误"
                     }
                 }
             },
            
         
         }
     })
     .on('success.form.bv', function(e) {//点击提交之后
         // Prevent form submission
         e.preventDefault();

         // Get the form instance
         var $form = $(e.target);
         // Get the BootstrapValidator instance
         var bv = $form.data('bootstrapValidator');

         // Use Ajax to submit form data 提交至form标签中的action，result自定义
//          $.post($form.attr('action'), $form.serialize(), function(result) {
// //do something...
// });

        $.ajax({
            url:"/employee/employeeLogin",
            type:"POST",
            data:$form.serialize(),
            success:function(result){
                console.log(result);
                if(result.error==1000){
                     bv.updateStatus('username','INVALID','callback');
                }
                if(result.error==1001){
                      bv.updateStatus('password','INVALID','callback');
                }
                if(result.success==true){
                    location.href="index.html";
                }
            }
        })
     });
});