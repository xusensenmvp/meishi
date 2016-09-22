

jQuery.fn.timelinr = function(options){
	// default plugin settings
	settings = jQuery.extend({
		orientation: 				'horizontal',		// value: horizontal | vertical, default to horizontal
		containerDiv: 				'#idx_mainjh',		// value: any HTML tag or #id, default to #idx_mainjh
		idx_jhnavDiv: 					'#idx_jhnav',			// value: any HTML tag or #id, default to #idx_jhnav
		idx_jhnavSelectedClass: 		'selected',			// value: any class, default to selected
		idx_jhnavSpeed: 				500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		idx_jhtitDiv: 					'#idx_jhtit',			// value: any HTML tag or #id, default to #idx_jhtit
		idx_jhtitSelectedClass: 		'selected',			// value: any class, default to selected
		idx_jhtitSpeed: 				200,				// value: integer between 100 and 1000 (recommended), default to 200 (fast)
		idx_jhtitTransparency: 		0.2,				// value: integer between 0 and 1 (recommended), default to 0.2
		idx_jhtitTransparencySpeed: 	500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		prevButton: 				'#idx_jhprev',			// value: any HTML tag or #id, default to #prev
		nextButton: 				'#idx_jhnext',			// value: any HTML tag or #id, default to #next
		arrowKeys: 					'false',			// value: true | false, default to false
		startAt: 					1,					// value: integer, default to 1 (first)
		autoPlay: 					'false',			// value: true | false, default to false
		autoPlayDirection: 			'forward',			// value: forward | backward, default to forward
		autoPlayPause: 				2000				// value: integer (1000 = 1 seg), default to 2000 (2segs)
		
	}, options);

	$(function(){
		// setting variables... many of them
		var howManyidx_jhnav = $(settings.idx_jhnavDiv+' li').length;
		var howManyidx_jhtit = $(settings.idx_jhtitDiv+' li').length;
		var currentDate = $(settings.idx_jhnavDiv).find('a.'+settings.idx_jhnavSelectedClass);
		var currentIssue = $(settings.idx_jhtitDiv).find('li.'+settings.idx_jhtitSelectedClass);
		var widthContainer = $(settings.containerDiv).width();
		var heightContainer = $(settings.containerDiv).height();
		var widthidx_jhtit = $(settings.idx_jhtitDiv).width();
		var heightidx_jhtit = $(settings.idx_jhtitDiv).height();
		var widthIssue = $(settings.idx_jhtitDiv+' li').width();
		var heightIssue = $(settings.idx_jhtitDiv+' li').height();
		var widthidx_jhnav = $(settings.idx_jhnavDiv).width();
		var heightidx_jhnav = $(settings.idx_jhnavDiv).height();
		var widthDate = $(settings.idx_jhnavDiv+' li').width();
		var heightDate = $(settings.idx_jhnavDiv+' li').height();
		
		// set positions!
		if(settings.orientation == 'horizontal') {	
			$(settings.idx_jhtitDiv).width(widthIssue*howManyidx_jhtit);
			$(settings.idx_jhnavDiv).width(widthDate*howManyidx_jhnav).css('marginLeft',widthContainer/2-widthDate/2);
			var defaultPositionidx_jhnav = parseInt($(settings.idx_jhnavDiv).css('marginLeft').substring(0,$(settings.idx_jhnavDiv).css('marginLeft').indexOf('px')));
		} else if(settings.orientation == 'vertical') {
			$(settings.idx_jhtitDiv).height(heightIssue*howManyidx_jhtit);
			$(settings.idx_jhnavDiv).height(heightDate*howManyidx_jhnav).css('marginTop',heightContainer/2-heightDate/2);
			var defaultPositionidx_jhnav = parseInt($(settings.idx_jhnavDiv).css('marginTop').substring(0,$(settings.idx_jhnavDiv).css('marginTop').indexOf('px')));
		}
		
		$(settings.idx_jhnavDiv+' a').click(function(event){
			event.preventDefault();
			// first vars
			var whichIssue = $(this).text();
			var currentIndex = $(this).parent().prevAll().length;

			// moving the elements
			if(settings.orientation == 'horizontal') {
				$(settings.idx_jhtitDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.idx_jhtitSpeed});
			} else if(settings.orientation == 'vertical') {
				$(settings.idx_jhtitDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false, duration:settings.idx_jhtitSpeed});
			}
			$(settings.idx_jhtitDiv+' li').animate({'opacity':settings.idx_jhtitTransparency},{queue:false, duration:settings.idx_jhtitSpeed}).removeClass(settings.idx_jhtitSelectedClass).eq(currentIndex).addClass(settings.idx_jhtitSelectedClass).fadeTo(settings.idx_jhtitTransparencySpeed,1);
			
			// now moving the idx_jhnav
			$(settings.idx_jhnavDiv+' a').removeClass(settings.idx_jhnavSelectedClass);
			$(this).addClass(settings.idx_jhnavSelectedClass);
			if(settings.orientation == 'horizontal') {
				$(settings.idx_jhnavDiv).animate({'marginLeft':defaultPositionidx_jhnav-(widthDate*currentIndex)},{queue:false, duration:settings.idx_jhnavSpeed});
			} else if(settings.orientation == 'vertical') {
				$(settings.idx_jhnavDiv).animate({'marginTop':defaultPositionidx_jhnav-(heightDate*currentIndex)},{queue:false, duration:settings.idx_jhnavSpeed});
			}
		});

		$(settings.nextButton).bind('click', function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionidx_jhtit = parseInt($(settings.idx_jhtitDiv).css('marginLeft').substring(0,$(settings.idx_jhtitDiv).css('marginLeft').indexOf('px')));
				var currentIssueIndex = currentPositionidx_jhtit/widthIssue;
				var currentPositionidx_jhnav = parseInt($(settings.idx_jhnavDiv).css('marginLeft').substring(0,$(settings.idx_jhnavDiv).css('marginLeft').indexOf('px')));
				var currentIssueDate = currentPositionidx_jhnav-widthDate;
				if(currentPositionidx_jhtit <= -(widthIssue*howManyidx_jhtit-(widthIssue))) {
					$(settings.idx_jhtitDiv).stop();
					$(settings.idx_jhnavDiv+' li:last-child a').click();
				} else {
					if (!$(settings.idx_jhtitDiv).is(':animated')) {
						$(settings.idx_jhtitDiv).animate({'marginLeft':currentPositionidx_jhtit-widthIssue},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li').animate({'opacity':settings.idx_jhtitTransparency},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li.'+settings.idx_jhtitSelectedClass).removeClass(settings.idx_jhtitSelectedClass).next().fadeTo(settings.idx_jhtitTransparencySpeed, 1).addClass(settings.idx_jhtitSelectedClass);
						$(settings.idx_jhnavDiv).animate({'marginLeft':currentIssueDate},{queue:false, duration:settings.idx_jhnavSpeed});
						$(settings.idx_jhnavDiv+' a.'+settings.idx_jhnavSelectedClass).removeClass(settings.idx_jhnavSelectedClass).parent().next().children().addClass(settings.idx_jhnavSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionidx_jhtit = parseInt($(settings.idx_jhtitDiv).css('marginTop').substring(0,$(settings.idx_jhtitDiv).css('marginTop').indexOf('px')));
				var currentIssueIndex = currentPositionidx_jhtit/heightIssue;
				var currentPositionidx_jhnav = parseInt($(settings.idx_jhnavDiv).css('marginTop').substring(0,$(settings.idx_jhnavDiv).css('marginTop').indexOf('px')));
				var currentIssueDate = currentPositionidx_jhnav-heightDate;
				if(currentPositionidx_jhtit <= -(heightIssue*howManyidx_jhtit-(heightIssue))) {
					$(settings.idx_jhtitDiv).stop();
					$(settings.idx_jhnavDiv+' li:last-child a').click();
				} else {
					if (!$(settings.idx_jhtitDiv).is(':animated')) {
						$(settings.idx_jhtitDiv).animate({'marginTop':currentPositionidx_jhtit-heightIssue},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li').animate({'opacity':settings.idx_jhtitTransparency},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li.'+settings.idx_jhtitSelectedClass).removeClass(settings.idx_jhtitSelectedClass).next().fadeTo(settings.idx_jhtitTransparencySpeed, 1).addClass(settings.idx_jhtitSelectedClass);
						$(settings.idx_jhnavDiv).animate({'marginTop':currentIssueDate},{queue:false, duration:settings.idx_jhnavSpeed});
						$(settings.idx_jhnavDiv+' a.'+settings.idx_jhnavSelectedClass).removeClass(settings.idx_jhnavSelectedClass).parent().next().children().addClass(settings.idx_jhnavSelectedClass);
					}
				}
			}
		});

		$(settings.prevButton).click(function(event){
			event.preventDefault();
			if(settings.orientation == 'horizontal') {
				var currentPositionidx_jhtit = parseInt($(settings.idx_jhtitDiv).css('marginLeft').substring(0,$(settings.idx_jhtitDiv).css('marginLeft').indexOf('px')));
				var currentIssueIndex = currentPositionidx_jhtit/widthIssue;
				var currentPositionidx_jhnav = parseInt($(settings.idx_jhnavDiv).css('marginLeft').substring(0,$(settings.idx_jhnavDiv).css('marginLeft').indexOf('px')));
				var currentIssueDate = currentPositionidx_jhnav+widthDate;
				if(currentPositionidx_jhtit >= 0) {
					$(settings.idx_jhtitDiv).stop();
					$(settings.idx_jhnavDiv+' li:first-child a').click();
				} else {
					if (!$(settings.idx_jhtitDiv).is(':animated')) {
						$(settings.idx_jhtitDiv).animate({'marginLeft':currentPositionidx_jhtit+widthIssue},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li').animate({'opacity':settings.idx_jhtitTransparency},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li.'+settings.idx_jhtitSelectedClass).removeClass(settings.idx_jhtitSelectedClass).prev().fadeTo(settings.idx_jhtitTransparencySpeed, 1).addClass(settings.idx_jhtitSelectedClass);
						$(settings.idx_jhnavDiv).animate({'marginLeft':currentIssueDate},{queue:false, duration:settings.idx_jhnavSpeed});
						$(settings.idx_jhnavDiv+' a.'+settings.idx_jhnavSelectedClass).removeClass(settings.idx_jhnavSelectedClass).parent().prev().children().addClass(settings.idx_jhnavSelectedClass);
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionidx_jhtit = parseInt($(settings.idx_jhtitDiv).css('marginTop').substring(0,$(settings.idx_jhtitDiv).css('marginTop').indexOf('px')));
				var currentIssueIndex = currentPositionidx_jhtit/heightIssue;
				var currentPositionidx_jhnav = parseInt($(settings.idx_jhnavDiv).css('marginTop').substring(0,$(settings.idx_jhnavDiv).css('marginTop').indexOf('px')));
				var currentIssueDate = currentPositionidx_jhnav+heightDate;
				if(currentPositionidx_jhtit >= 0) {
					$(settings.idx_jhtitDiv).stop();
					$(settings.idx_jhnavDiv+' li:first-child a').click();
				} else {
					if (!$(settings.idx_jhtitDiv).is(':animated')) {
						$(settings.idx_jhtitDiv).animate({'marginTop':currentPositionidx_jhtit+heightIssue},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li').animate({'opacity':settings.idx_jhtitTransparency},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhtitDiv+' li.'+settings.idx_jhtitSelectedClass).removeClass(settings.idx_jhtitSelectedClass).prev().fadeTo(settings.idx_jhtitTransparencySpeed, 1).addClass(settings.idx_jhtitSelectedClass);
						$(settings.idx_jhnavDiv).animate({'marginTop':currentIssueDate},{queue:false, duration:settings.idx_jhnavSpeed},{queue:false, duration:settings.idx_jhtitSpeed});
						$(settings.idx_jhnavDiv+' a.'+settings.idx_jhnavSelectedClass).removeClass(settings.idx_jhnavSelectedClass).parent().prev().children().addClass(settings.idx_jhnavSelectedClass);
					}
				}
			}
		});
		
		// keyboard navigation, added since 0.9.1
		if(settings.arrowKeys=='true') {
			if(settings.orientation=='horizontal') {
				$(document).keydown(function(event){
					if (event.keyCode == 39) { 
				       $(settings.nextButton).click();
				    }
					if (event.keyCode == 37) { 
				       $(settings.prevButton).click();
				    }
				});
			} else if(settings.orientation=='vertical') {
				$(document).keydown(function(event){
					if (event.keyCode == 40) { 
				       $(settings.nextButton).click();
				    }
					if (event.keyCode == 38) { 
				       $(settings.prevButton).click();
				    }
				});
			}
		}
		
		// default position startAt, added since 0.9.3
		$(settings.idx_jhnavDiv+' li').eq(settings.startAt-1).find('a').trigger('click');
		
		// autoPlay, added since 0.9.4
		if(settings.autoPlay == 'true') { 
			setInterval("autoPlay()", settings.autoPlayPause);
		}
	});

};

// autoPlay, added since 0.9.4
function autoPlay(){
	var currentDate = $(settings.idx_jhnavDiv).find('a.'+settings.idx_jhnavSelectedClass);
	if(settings.autoPlayDirection == 'forward') {
		if(currentDate.parent().is('li:last-child')) {
			$(settings.idx_jhnavDiv+' li:first-child').find('a').trigger('click');
		} else {
			currentDate.parent().next().find('a').trigger('click');
		}
	} else if(settings.autoPlayDirection == 'backward') {
		if(currentDate.parent().is('li:first-child')) {
			$(settings.idx_jhnavDiv+' li:last-child').find('a').trigger('click');
		} else {
			currentDate.parent().prev().find('a').trigger('click');
		}
	}
}