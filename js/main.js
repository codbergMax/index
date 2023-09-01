(function($){
	/**
	 * Common:ScrollMagic Controller
	 */
	var controller = new ScrollMagic.Controller();
	
	//==================================================*
	//	Document:Ready
	//==================================================*
	$(document).ready(function(){
		  // 문서(document) 전체에서 마우스 오버 이벤트 핸들러 등록
			var controller = new ScrollMagic.Controller();
  
			// Rest of your existing code...
		
			// Check if the target of the mouseover event is not inside the MainProductSlideThumb-wrapper
			$(document).on('mouseover', function(event) {
				var target = event.target;
				
				if (!target.closest('.MainProductSlideThumb-wrapper')) {
					MainProductSliderThumb.autoplay.start()
				}else {
					MainProductSliderThumb.autoplay.stop()
				}
			});
		
			
	

		//
		//Main Height
		if($('.MainBanner').length > 0){
			function KeyVisualHeight() {
				var windowHeight = $(window).height();
				var adminHeight = $('#wpadminbar').height();
				$('.MainBanner').css('height', windowHeight);
				
				if($('#wpadminbar').length > 0){
					$('.MainBanner').css('height', windowHeight - adminHeight);
				}
			}
			KeyVisualHeight();
			$(window).on('resize', KeyVisualHeight);
		}
		
		//
		// Main Scroll Button
		 function KeyVisualScroll() {
			 var offset = $('.MainCampain').offset();
			 var adminHeight = $('#wpadminbar').height();
			 var heightHeader = $('.site-header').outerHeight();
			 var offsetheightHeader = heightHeader/3
			
			if($('#wpadminbar').length > 0){
				$('html, body').animate({scrollTop : offset.top - adminHeight - offsetheightHeader }, 400);
			}else{
				$('html, body').animate({scrollTop : offset.top - offsetheightHeader}, 400);
			}
		 }
		 
		 $(document).on('click', '.MainBannerScroll', KeyVisualScroll);
		
		//
		//Campain Slide
		if($('.MainCampainSlide').length > 0){
			var MainCampainSlide = new Swiper(".MainCampainSlide-container", {
				observer: true,
				observeParents: true,
				watchOverflow: true,
				slidesPerView: 1,
				spaceBetween: 40,
				speed:700,
				navigation: {
				  nextEl: ".MainCampainSlide-next",
				  prevEl: ".MainCampainSlide-prev",
				},
				breakpoints: {
					1023: {
						spaceBetween: 25,
					},
					767: {
						spaceBetween: 20,
					},
				}
			});
		}
		
		//
		//View animaiton
		if($('.a-View').length > 0){
			$('.a-View').each(function(){
				var CenterOpacity = new ScrollMagic.Scene({
					triggerElement: this.children[0],
					triggerHook:0.9
				})
				.reverse(false)
				.setClassToggle(this, 'is-View')
				.addTo(controller);
			});
		}
		
		//MainProductSlider
		var MainProductSliderThumb = new Swiper(".MainProductSlideThumb-container", {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 5,
			centeredSlides: true,
			speed:500,
			loop: true,
      autoplay: {
        delay: 3000,
      },
			navigation: {
			  nextEl: ".MainProductSlideThumb-next",
			  prevEl: ".MainProductSlideThumb-prev",
			},
			on: {
			  init: function init() {
				var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
				var title = slide.data("title");
				var link = slide.data("link");
				$('.MainProductSlideTextTitle-text').text(title);
				$('.MainProductSlideTextTitle-btn .BasicRountBtn').attr('href',link);
				$('.MainProductSlideText').addClass('is-SlideView');
			  },
			  
			  slideChangeTransitionStart:function(){
				$('.MainProductSlideText').removeClass('is-SlideView');
				var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
				var title = slide.data("title");
				var link = slide.data("link");
				$('.MainProductSlideTextTitle-text').text(title);
				$('.MainProductSlideTextTitle-btn .BasicRountBtn').attr('href',link);
				setTimeout(function(){
					$('.MainProductSlideText').addClass('is-SlideView');
				},10);
			  }
			},
			breakpoints: {
				1700: {
					slidesPerView: 3,
			},
        780: {
            slidesPerView: 3,
        }
			}
		});
		
		//MainNewsSlider
		var MainNewsSlider = new Swiper(".MainNewsSlideThumb-container", {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 1,
			centeredSlides: true,
			speed:500,
			navigation: {
			  nextEl: ".MainNewsSlideMeta-next",
			  prevEl: ".MainNewsSlideMeta-prev",
			},
			on: {
			  init: function init() {
				var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
				var date = slide.data("date");
				var title = slide.data("title");
				var link = slide.data("link");
				$('.MainNewsSlideText-date').text(date);
				$('.MainNewsSlideTextTitle-text').text(title);
				$('.MainNewsSlideTextTitle-btn .BasicRountBtn').attr('href',link);
				$('.MainNewsSlideText').addClass('is-SlideView');
			  },
			  
			  slideChangeTransitionStart:function(){
				$('.MainNewsSlideText').removeClass('is-SlideView');
				var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
				var date = slide.data("date");
				var title = slide.data("title");
				var link = slide.data("link");
				$('.MainNewsSlideText-date').text(date);
				$('.MainNewsSlideTextTitle-text').text(title);
				$('.MainNewsSlideTextTitle-btn .BasicRountBtn').attr('href',link);
				setTimeout(function(){
					$('.MainNewsSlideText').addClass('is-SlideView');
				},10);
			  }
			}
		});
	});
})(jQuery);
