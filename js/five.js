// 视频层
$(function(){

        // 模块一遮罩层
        $(".play").on("mouseover",function(){
            $(".zhezhao1").css("opacity","0.2");
        }),$(".play").on("mouseout",function(){
            $(".zhezhao1").css("opacity","0.6");
        })
	    // 微信二维码
		$(".way img:eq(1)").mouseover(function(){
		    $(".erweima").css("display","block");
		}),$(".way img:eq(1)").mouseout(function(){
		    $(".erweima").css("display","none");
		})
        //下载的二维码
        $(".download a:eq(2)").mouseover(function(){
            $(".erweima2").css("display","block");
        }),$(".download a:eq(2)").mouseout(function(){
            $(".erweima2").css("display","none");
        })

    /*获取视频对象dom*/
    var video = document.querySelector('video');
    /*做操作*/
    var $switch = $('.switch');
    var $expand = $('.expand');

    var $line = $('.line');
    var $bar = $('.bar');

    var $current = $('.current');
    var $total = $('.total');

    var timeFormat = function(time){
        /*00:00:00*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        return (h>=10?h:'0'+h)+':'+(m>=10?m:'0'+m)+':'+(s>=10?s:'0'+s);
    };

    /*1.加载中*/
    video.oncanplay = function(){
        console.log('ok');
        video.style.display = 'block';
        /*显示总时长*/
        $total.html(timeFormat(video.duration));
    };


// --------视频触发按钮start
    $(".play").click(function(){
        $(".player").css("display","block");
        video.play();
        $switch.removeClass('fa-play').addClass('fa-pause');
    })
// -----------视频触发按钮end


    /*2.点击播放*/ /*3.点击暂停*/
    $switch.on('click',function(){
        if($switch.hasClass('fa-play')){
            /*2.点击播放**/
            video.play();
            $switch.removeClass('fa-play').addClass('fa-pause');
        }else{
            /*3.点击暂停*/
            video.pause();
            $switch.removeClass('fa-pause').addClass('fa-play');
        }
    });

    /*4.显示播放进度*/
    video.ontimeupdate = function(){
        /*获取当前播放的时间点*/
        $line.css('width',video.currentTime/video.duration*100+'%');
        /*5.显示当前的播放时间*/
        $current.html(timeFormat(video.currentTime));
    }

    /*6.视频跃进*/
    $bar.on('click',function(e){
        video.currentTime = e.offsetX/$bar.width()*video.duration;
    });

    /*7.全屏*/
    $expand.on('click',function(){
        video.webkitRequestFullScreen();
    });

    /*8.播放结束*/
    video.onended = function(){
        video.currentTime = 0;
        $line.css('width',0);
        $current.html('00:00:00');
        $switch.addClass('fa-play').removeClass('fa-pause');
    }

    $(".close").click(function(){
        $(".player").css("display","none");
        video.pause();
        $switch.removeClass('fa-pause').addClass('fa-play');
    })

});

window.onload = function () {
    var ul = document.getElementsByClassName("model")[0];
    var ol = document.getElementsByClassName("nav")[0];
    var ulLiArr = ul.getElementsByClassName("s-model");
    var olLiArr = ol.getElementsByTagName("li");
    var target=0,leader=0,timer=null;
    var arrColor = [1,2,3,4,5];
    for(var i=0;i<arrColor.length;i++){
        olLiArr[i].index = i;
        olLiArr[i].onclick = function () {
            // 删除线
            $(this).children('i').css("display","block").parent("li").siblings('li').children('i').css("display","none");
            $(this).css("color","#4FE3C3").siblings('li').css("color","#fff");
            target = ulLiArr[this.index].offsetTop;
            clearInterval(timer);
            timer = setInterval(function () {
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader += step;
                window.scrollTo(0,leader);
                if(leader === target){
                    clearInterval(timer);
                }
            },30);
        }
    }
    // window.onscroll = function () {
    //     leader = scroll().top;
    // }
    // 
    // 
    // 
    // 
    // 滚动事件    
    var m_st, m_po = 600; //滚动到600像素时显示
            $(window).scroll(
            function () {
                m_st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
                if (m_st > m_po) {
                    $('.nav').css("background-color","#000");
                    $('.nav').css("opacity",0.6);
                    $('.nav').css("transition","all 2s")
                    // $(".zhezhao").css("display","none");
                }else{
                    $('.nav').css("background-color","transparent");
                    $('.nav').css("opacity",1);
                }
            }) 
}

// background-color: #000;
//     opacity: 1;
//     background-color:transparent;