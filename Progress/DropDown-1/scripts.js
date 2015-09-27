$(document).ready(function () {
    var $menu = $('#dropDown').hide();
    var $dropdownBtn =  $('#dropDownBtn').addClass('unclickedBtn');

    $dropdownBtn.click(function (){
        if($menu.is(":visible")){
            $menu.slideUp(100);
            $dropdownBtn
                .removeClass('clickedBtn')
                .addClass('unclickedBtn');
        }else{
            $menu.slideDown(100);
            $dropdownBtn
                .removeClass('unclickedBtn')
                .addClass('clickedBtn');
        }
    });
});
