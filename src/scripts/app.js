// import { Example } from "./modules/example.js";

// new Example();

import $ from "jquery";
import Swiper, { Navigation } from 'swiper';

// console.log($);

$(() => {
	const portfolioSwiper = new Swiper('.portfolio-swiper', {
	  // configure Swiper to use modules
	  modules: [Navigation],
	  slidesPerView: 'auto',
	  spaceBetween: 30
	});

	portfolioSwiper.on('slideChange', function () {
	  console.log('slide changed');
	});

	// portfolioSwiper.slideNext();

	$('.client-accordion-panel__short').click(function(e) {
		let $accordionPanel = $(this).closest('.client-accordion-panel');
		let $portfolioSwiper = $accordionPanel.closest('.portfolio-swiper');
		let slideIndex = $accordionPanel.data('slide-index');
		let $otherAccordionPanels = $portfolioSwiper.find(`.client-accordion-panel`).not(`[data-slide-index="${slideIndex}"]`);

		console.log($accordionPanel);
		console.log($otherAccordionPanels);

		// $accordionPanel.siblings('.client-accordion-panel').removeClass('client-accordion-panel--opened');
		$otherAccordionPanels.removeClass('client-accordion-panel--opened');
		$accordionPanel.addClass('client-accordion-panel--opened');
		portfolioSwiper.slideTo(slideIndex);

		e.preventDefault();
	});

	$('.portfolio-slider-section__prev-btn').click(function(event) {
		portfolioSwiper.slidePrev();

		// setTimeout(() => {
		// 	console.log(portfolioSwiper.activeIndex);
		// 	console.log(portfolioSwiper.previousIndex);
		// })
	});

	$('.portfolio-slider-section__next-btn').click(function(event) {
		portfolioSwiper.slideNext();

		// setTimeout(() => {
		// 	console.log(portfolioSwiper.activeIndex);
		// 	console.log(portfolioSwiper.previousIndex);
		// })
	});
});