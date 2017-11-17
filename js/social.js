$(function(){
	$(".social").children("a").mouseover(function () {
	    $(this).css("opacity",1).siblings("a").css("opacity",0.4);
	})
	//需求2:鼠标移开wrap这个盒子,所有的li透明度变为1
	$(".social").children("a").mouseleave(function () {
	    $(this).css("opacity",0.4);
	})
})

