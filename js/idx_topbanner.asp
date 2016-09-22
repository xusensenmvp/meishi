
var t = n =0, count;
$(document).ready(function(){ 
count=$("#index_topmid_list a").length;
$("#index_topmid_list a:not(:first-child)").hide();
$("#index_topmid_info").html($("#index_topmid_list a:first-child").find("img").attr('alt'));
$("#index_topmid_info").click(function(){window.open($("#index_topmid_list a:first-child").attr('href'), "_blank")});
$("#index_topmid li").click(function() {
var i = $(this).text() -1;//获取Li元素内的值，即1，2，3，4
n = i;
if (i >= count) return;
$("#index_topmid_info").html($("#index_topmid_list a").eq(i).find("img").attr('alt'));
$("#index_topmid_info").unbind().click(function(){window.open($("#index_topmid_list a").eq(i).attr('href'), "_blank")})
$("#index_topmid_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
document.getElementById("index_topmid").style.background="";
$(this).toggleClass("on");
$(this).siblings().removeAttr("class");
});
t = setInterval("showAuto()", 4000);
$("#index_topmid").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 4000);});
})

function showAuto()
{
n = n >=(count -1) ?0 : ++n;
$("#index_topmid li").eq(n).trigger('click');
}
