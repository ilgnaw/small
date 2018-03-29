$(function () {

    // 1展示历史记录
    showHistory();
    // 2通过获取input里面的文字，动态的添加到页面中
    $('.search-btn').on('tap', function () {

        var keywords = $.trim($('.search-box input').val());
        // console.log(keywords);
        if(keywords==''){
            mui.toast('没有关键字');
        }else{
            setHistory(keywords);
          location.href="searchList.html?key="+keywords;
        }
       
        
    })
    // 通过点击x号，当前的一行没有
    $('.history').on('tap', '.history-list li i', function () {
        // console.log(1);
        var text = $(this).siblings('span').text();
        // console.log(text);
        delHistory(text);
        showHistory();

    })
    // 点击清空历史，所有的都没了
    $('.history').on('tap', '.history-title-manager span:nth-child(2)', function () {
        cleanHistory();
        showHistory();
    })
  $('.history').on('tap', '.history-list span:nth-child(1)', function () {
      var keywords=$(this).text();
     location.href="searchList.html?"+"key="+keywords;
    })


})
function getHistory() {
    return JSON.parse(window.localStorage.getItem("lthistory") || "[]");
}
function setHistory(key) {
    var arr = getHistory();
    $.each(arr, function (index, item) {
        if (item == key) {
            arr.splice(index, 1);
        }

    });
    arr.push(key);
    window.localStorage.setItem("lthistory", JSON.stringify(arr));
    // console.log(arr);
}
function delHistory(key) {
    var arr = getHistory();
    $.each(arr, function (index, item) {
        if (item == key) {
            arr.splice(index, 1);
        }

    });
    window.localStorage.setItem("lthistory", JSON.stringify(arr));
}
function showHistory() {

    var arrlist = getHistory();
    // console.log({arr:arrlist});
    var templateResult = template("temp", { arr: arrlist });
    $('.history').html(templateResult);
}
function cleanHistory() {
    window.localStorage.removeItem("lthistory");
}