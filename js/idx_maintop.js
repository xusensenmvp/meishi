// JavaScript Document
$(document).ready(function(e) {
	time = window.setInterval(function(){
		$('.og_next').click();	
	},5000);
	linum = $('.idx_zslist li').length;
	w = linum *250;
	$('.idx_mainzspic').css('width', w + 'px');
	$('.idx_swaplist').html($('.idx_zslist').html());
	$(".idx_zslist li").hover(
		  function () {
			$(this).addClass("hover");
		  },
		  function () {
			$(this).removeClass("hover");
		  }
		);
	$('.og_next').click(function(){
		
		if($('.idx_swaplist,.idx_zslist').is(':animated')){
			$('.idx_swaplist,.idx_zslist').stop(true,true);
		}
		
		if($('.idx_zslist li').length>4){
			ml = parseInt($('.idx_zslist').css('left'));
			sl = parseInt($('.idx_swaplist').css('left'));
			if(ml<=0 && ml>w*-1){
				$('.idx_swaplist').css({left: '1000px'});
				$('.idx_zslist').animate({left: ml - 1000 + 'px'},'slow');				
				if(ml==(w-1000)*-1){
					$('.idx_swaplist').animate({left: '0px'},'slow');
				}
			}else{
				$('.idx_zslist').css({left: '1000px'})
				$('.idx_swaplist').animate({left: sl - 1000 + 'px'},'slow');
				if(sl==(w-1000)*-1){
					$('.idx_zslist').animate({left: '0px'},'slow');
				}
			}
		}
	})
	$('.og_prev').click(function(){
		
		if($('.idx_swaplist,.idx_zslist').is(':animated')){
			$('.idx_swaplist,.idx_zslist').stop(true,true);
		}
		
		if($('.idx_zslist li').length>4){
			ml = parseInt($('.idx_zslist').css('left'));
			sl = parseInt($('.idx_swaplist').css('left'));
			if(ml<=0 && ml>w*-1){
				$('.idx_swaplist').css({left: w * -1 + 'px'});
				$('.idx_zslist').animate({left: ml + 1000 + 'px'},'slow');				
				if(ml==0){
					$('.idx_swaplist').animate({left: (w - 1000) * -1 + 'px'},'slow');
				}
			}else{
				$('.idx_zslist').css({left: (w - 1000) * -1 + 'px'});
				$('.idx_swaplist').animate({left: sl + 1000 + 'px'},'slow');
				if(sl==0){
					$('.idx_zslist').animate({left: '0px'},'slow');
				}
			}
		}
	})    
});

$(document).ready(function(){
	$('.og_prev,.og_next').hover(function(){
			$(this).fadeTo('fast',1);
		},function(){
			$(this).fadeTo('fast',0.7);
	})

})

