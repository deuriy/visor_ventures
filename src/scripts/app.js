import $ from "jquery";
import Swiper, { Navigation } from 'swiper';

// console.log($);

$(() => {
	// $('.main-menu__link').each(function(index, link) {
	// 	let linkHref = $(link).attr('href');

	// 	if (window.location.pathname == linkHref) {
	// 		$(link).addClass('main-menu__link--active');
	// 	}
	// });

	$('[data-toggle-side-popup]').click(function(e) {
		e.preventDefault();

		let sidePopupID = $(this).attr('href');
		let $sidePopup = $(`${sidePopupID}`);

		if (!$sidePopup.length) return;

		$sidePopup.toggleClass('side-popup--opened');
		$(document.body).css('overflow', 'hidden');
	});

	$('.side-popup__close-btn, .side-popup__overlay').click(function(e) {
		$(this).closest('.side-popup').removeClass('side-popup--opened');

		$(document.body).css('overflow', '');

		e.preventDefault();
	});

	const portfolioSlider = new Swiper('.portfolio-slider', {
	  // configure Swiper to use modules
	  modules: [Navigation],
	  slidesPerView: 1,

	  breakpoints: {
      768: {
        slidesPerView: 'auto',
	  		spaceBetween: 30,
      }
    }
	});

	portfolioSlider.on('slideChange', function () {
	  console.log('slide changed');
	});

	// portfolioSlider.slideNext();

	$('.client-accordion-panel__short').click(function(e) {
		let $accordionPanel = $(this).closest('.client-accordion-panel');
		let $portfolioSlider = $accordionPanel.closest('.portfolio-slider');
		let slideIndex = $accordionPanel.data('slide-index');
		let $otherAccordionPanels = $portfolioSlider.find(`.client-accordion-panel`).not(`[data-slide-index="${slideIndex}"]`);

		console.log($accordionPanel);
		console.log($otherAccordionPanels);

		// $accordionPanel.siblings('.client-accordion-panel').removeClass('client-accordion-panel--opened');
		$otherAccordionPanels.removeClass('client-accordion-panel--opened');
		$accordionPanel.addClass('client-accordion-panel--opened');
		portfolioSlider.slideTo(slideIndex);

		e.preventDefault();
	});

	$('.portfolio-slider-section__prev-btn').click(function(event) {
		portfolioSlider.slidePrev();

		// setTimeout(() => {
		// 	console.log(portfolioSlider.activeIndex);
		// 	console.log(portfolioSlider.previousIndex);
		// })
	});

	$('.portfolio-slider-section__next-btn').click(function(event) {
		portfolioSlider.slideNext();

		// setTimeout(() => {
		// 	console.log(portfolioSlider.activeIndex);
		// 	console.log(portfolioSlider.previousIndex);
		// })
	});
});