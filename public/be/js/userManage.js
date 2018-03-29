// 功能:用户的分页展示
// 1.获取用户
// 2.分页展示


$(function () {
  getNum();
});
function getNum(page, pageSize) {
  $.ajax({
    url: "/user/queryUser",
    type: "GET",
    data: {
      page: page || 1,
      pageSize: pageSize || 10

    },
    success: function (result) {
      console.log(result);
      var temp = template('temp', result);
      $('tbody').html(temp);
      $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: result.page,//当前页面  
          // numberOfPages: ,//一页显示几个按钮（在ul里面生成5个li）  
          totalPages: Math.ceil(result.total/result.size), //总页数 
          onPageChanged: function (event, originalEvent, typePage, currentPage) {
            //事件：typePage是被点击的页码
   page=currentPage;
              getNum(page);
          }

          })
    }
  })
}
// $('.btn').on('click',function(){
//   $.ajax({
//     url:"",

//   })
// });

$('tbody').on('click', '.btn', function () {

  var id = $(this).data('id');
  // $('.text-danger strong').html($(this).data(username));
  // var isDelete=$(this).data(isDelete);
  var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    $('#optionModal').find('strong').text($(this).text() + $(this).data('username'));
  // console.log(id);
  // console.log(isDelete);
  $('.yes').on('click', function () {
    $.ajax({
      url: " /user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      type: "POST",
      success: function (result) {
        // console.log(result);
        getNum();
        $('#optionModal').modal('hide');
        
      }
    })
  })


})




//  var options = {
//           bootstrapMajorVersion: 3,
//           currentPage: result.page,//当前页面  
//           // numberOfPages: ,//一页显示几个按钮（在ul里面生成5个li）  
//           totalPages: Math.ceil(result.total/result.size), //总页数 
//           onPageChanged: function (event, originalEvent, typePage, currentPage) {
//             //事件：typePage是被点击的页码

//           }

//         }

//         element.bootstrapPaginator(options);