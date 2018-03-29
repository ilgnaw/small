$(function(){
    mui('.mui-scroll-wrapper').scroll({
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});
    var url=new URLSearchParams(location.search);
    var key=url.get("key");
    console.log(key);
    getNun(1,key);



var priceFlag=true;
$('.sort li:nth-child(2) a').on('tap',function(){
    $(".sort li").removeClass('active');
    $(this).parents('li').addClass('active');
   if(priceFlag==true){
       priceFlag=false;
       getNun(1,null,2);
       $(this).find('i').removeClass('fa-angle-up');
       $(this).find('i').addClass('fa-angle-down');
   }else{
       priceFlag=true;
        getNun(1,null,1);
       $(this).find('i').removeClass('fa-angle-down');
       $(this).find('i').addClass('fa-angle-up');
   }
})


// 库存
var numFlag=true;
$('.sort li:nth-child(3) a').on('tap',function(){
    $(".sort li").removeClass('avtive');
    $(this).parents('li').addClass('active');
   if(priceFlag==true){
       priceFlag=false;
       getNun(1,null,null,2);
       $(this).find('i').removeClass('fa-angle-up');
       $(this).find('i').addClass('fa-angle-down');
   }else{
       priceFlag=true;
        getNun(1,null,null,1);
       $(this).find('i').removeClass('fa-angle-down');
       $(this).find('i').addClass('fa-angle-up');
   }
})

    mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback : function(){
         
          // 关闭下拉刷新
          setTimeout(function(){
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            // console.log(1);
            // getSearchResult(1, key);
            getNun(1,key);
          },1000);
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:true,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function(){
            // console.log(2);
            // true表示没有更多数据了： false代表的是可以继续加载
            this.endPullupToRefresh(true);
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });


//   5 把id的值传递过去
$('.lt-sports-content').on('tap','button',function(){
    var id=$(this).data('id');
    location.href="detail.html?productId="+id;
})
});

// 

// 获取数据
function getNun(page,proName,price,num){
    $.ajax({
        url:'/product/queryProduct',
        data:{
            page:page || 1,
            pageSize:10,
            proName:proName || '',
            num:    num || null,
            price:price || null
        },
        type:"GET",
        success:function(result){
            console.log(result);
            var templateResult=template("temp",result);
            $(".lt-sports-content").html(templateResult);
        }
    })
}