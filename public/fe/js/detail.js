$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    var url = new URLSearchParams(location.search);
    id = url.get('productId');
    console.log(id);
    getNum(id);

    $('.product-cart').on('tap', function () {
        var productId = id;
        // console.log(id);
        var size = $('.product-size span.active').text();
        var num = $('.mui-numbox-input').val();
        // console.log(size);
        // console.log(num);
        addCart(id, num, size);
        // console.log(addCart);
        
    })


});
var getNum = function (productId) {
    $.ajax({
        data: { id: productId },
        type: "GET",
        url: " /product/queryProductDetail",

        success: function (result) {
            console.log(result);
            var templateResult = template('temp', result);
            $('.mui-scroll').html(templateResult);
            var size = result.size;
            console.log(size);
            var sizeArr = size.split('-')
            console.log(sizeArr);
            var sizeResult = template('size', {
                startNum: sizeArr[0],
                endNum: sizeArr[1]
            })
            $('.product-size').html(sizeResult);
            mui(".mui-numbox").numbox();
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })
}
$('.mui-scroll').on('tap', '.product-size span', function () {
    $(" .product-size span").removeClass('active');
    $(this).addClass('active');
})

function addCart(productId, num, size) {
    $.ajax({
        url: '/cart/addCart',
        type: 'POST',
        data: {
            productId: productId,
            num: num,
            size: size
        },
        beforeSend: function () {
            if (!productId) {
                mui.toast('产品不存在');
                return false;
            }
            if (!size) {
                mui.toast('请选择尺码');
                return false;
            }
            if (!num) {
                mui.toast('请选择数量');
                return false;
            }
            console.log(12313123123)
        },
        success: function (result) {
            if (result.error== 400) {
           var url=location.href;
           console.log(url);
           location.href="../login.html?url="+url;
        }
        },
        // error:function(){
        //     console.log(123)
        // }
    })
}