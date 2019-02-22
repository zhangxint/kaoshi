jQuery(function ($) {
    //内容上拉菜单
    jQuery('.main').on('mouseenter', 'li', function () {
        jQuery(this).find('.introduce').stop().slideDown(150);
    }).on('mouseleave', 'li', function () {
        jQuery(this).find('.introduce').stop().slideUp(150);
    })
}())