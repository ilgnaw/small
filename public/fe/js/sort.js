$(function(){
        var getFirstTemeplate = function () {
            $.ajax({
                url: "  /category/queryTopCategory",
                type: "GET",
                dataType: null,
                beforeSend:function(){
              $('.box').show();
                },
                success: function (result) {
                    console.log(result);
                    var first = template("first", result);
                    // console.log(first);
                    $(".first-tempete").html(first);
                    getTwoTemeplent(result.rows[0].id);
                },
                complete:function(){
                    $('.box').hide();
                }
            })
        }
       

        var getTwoTemeplent=function(id){
            $.ajax({
                url:"/category/querySecondCategory",
                type:"GET",
                data:{
                    "id":id
                },
                success:function(result){
                    var two=template("two",result);
                    console.log(two);
                    $('.two').html(two);
                }
            })
        }
         getFirstTemeplate();
    $('.first-tempete').on('tap','a',function(){
    $(".first-tempete li").removeClass('active');
    $(this).parents('li').addClass('active');
    var id=$(this).attr('data-id');
     getTwoTemeplent(id);
})
       mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  }); 
})