$(function(){
     $('[data-menu]').on('click',function(){
        $('.ad_aside').toggle();
        $('.ad_section').toggleClass('menu');
    });

$('.tap').on('click',function(){
    $(this).siblings('.child').slideToggle();
});


$('[data-logout]').on('click',function(){
    var html=`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
      </div>
      <div class="modal-body">
        您确认退出吗
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary sure">确认</button>
      </div>
    </div>
  </div>
</div>`;
$('body').append(html);
$('#myModal').modal('show');
})
$('body').on('click','.sure',function(){
    $.ajax({
        url:"/employee/employeeLogout",
        type:"GET",
        data:null,
        success:function(result){
            location.href="ligin.html";
        }
    })
})


})