$(function() {

	$('.main-header__list').flexMenu({
		linkText: 'Еще..'
	});
	
	$('.intro-carousel').owlCarousel({
		loop: true,
		dots: true,
		slideSpeed: 1000,
		paginationSpeed: 1000,
		// rewindSpeed: 1000,
		items: 1,
		autoplay: false,
		// autoplayTimeout: 3000,
		// autoplayHoverPause: true,
		animateIn: 'fadeInLeft',
		nav: false,
		navText: [
				'<i class=\'fa fa-caret-left\'></i>',
				'<i class=\'fa fa-caret-right\'></i>'
		]
	});
});
