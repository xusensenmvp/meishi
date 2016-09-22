$(document).scroll(function(){
							
	var baseheight=$(document).scrollTop();
	
	if(baseheight>860&&$(".cp_mainhead1").position().top-baseheight>0&&$(".cp_mainhead2").position().top-baseheight>0){
		$(".cp_mainhead").addClass("list-header-fixed");
		$(".cp_mainhead1").removeClass("list-header-fixed");	
		$(".cp_mainhead2").removeClass("list-header-fixed");	
	}
		
	if(baseheight<860){
		$(".cp_mainhead").removeClass("list-header-fixed");	
		$(".cp_mainhead1").removeClass("list-header-fixed");
		$(".cp_mainhead2").removeClass("list-header-fixed");	
	}
			
	if(baseheight>860&&$(".cp_mainhead1").position().top-baseheight<0&&$(".cp_mainhead2").position().top-baseheight>0){
		$(".cp_mainhead1").addClass("list-header-fixed");
		$(".cp_mainhead").removeClass("list-header-fixed");	
		$(".cp_mainhead2").removeClass("list-header-fixed");	
	}
		
	if(baseheight>860&&$(".cp_mainhead1").position().top-baseheight>0&&$(".cp_mainhead2").position().top-baseheight<0){
		$(".cp_mainhead2").addClass("list-header-fixed");
		$(".cp_mainhead1").removeClass("list-header-fixed");	
		$(".cp_mainhead").removeClass("list-header-fixed");		
	}
	
})
