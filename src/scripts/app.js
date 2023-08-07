import $ from "jquery";
import Swiper, { Navigation } from 'swiper';

$(() => {
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

	// File input styling
	$('.upload-file__input').each(function(index, el) {
		let $fileContainer = $(el).closest('.upload-file');
		let $fileBtn = $fileContainer.find('.upload-file__btn');

    $(el).on('change', function (e) {
      let countFiles = '';
      if (this.files && this.files.length >= 1)
        countFiles = this.files.length;

      if (countFiles)
        $fileBtn.text('Selected files: ' + countFiles);
      else
        $fileBtn.text('Upload Files');;
    });
	});

	const portfolioSliderMobile = new Swiper('.portfolio-slider--mobile', {
	  allowTouchMove: false,
	  modules: [Navigation],
	  slidesPerView: 1,
	  spaceBetween: 30,
	  loop: true
	});

	$('.client-accordion-panel__short').click(function(e) {
		let $accordionPanel = $(this).closest('.client-accordion-panel');
		let $accordionPanelsContainer = $accordionPanel.closest('.client-accordion-panels');
		let $prevAccordionPanels = $accordionPanel.prevAll(`.client-accordion-panel`);

		$prevAccordionPanels.removeClass('client-accordion-panel--opened');
		$accordionPanel.addClass('client-accordion-panel--opened');
		$accordionPanelsContainer.append($prevAccordionPanels);

		e.preventDefault();
	});

	$('.portfolio-slider-section__prev-btn--desktop').click(function(event) {
		let $currentPortfolioSection = $(this).closest('.portfolio-slider-section');
		let $accordionPanelsContainer = $currentPortfolioSection.find('.client-accordion-panels');
		let $activeVisiblePanelItem = $currentPortfolioSection.find('.client-accordion-panels .client-accordion-panels__item:first-child');
		let $prevPanelItem = $currentPortfolioSection.find('.client-accordion-panels .client-accordion-panels__item:last-child');

		$activeVisiblePanelItem.removeClass('client-accordion-panel--opened');
		$prevPanelItem.addClass('client-accordion-panel--opened');
		$accordionPanelsContainer.prepend($prevPanelItem);
	});

	$('.portfolio-slider-section__next-btn--desktop').click(function(event) {
		let $currentPortfolioSection = $(this).closest('.portfolio-slider-section');
		let $accordionPanelsContainer = $currentPortfolioSection.find('.client-accordion-panels');
		let $activeVisiblePanelItem = $currentPortfolioSection.find('.client-accordion-panels .client-accordion-panels__item:first-child');
		let $nextPanelItem = $activeVisiblePanelItem.next();

		$activeVisiblePanelItem.removeClass('client-accordion-panel--opened');
		$nextPanelItem.addClass('client-accordion-panel--opened');
		$accordionPanelsContainer.append($activeVisiblePanelItem);
	});

	$('.portfolio-slider-section__prev-btn--mobile').click(function(e) {
		portfolioSliderMobile.slidePrev();
	});

	$('.portfolio-slider-section__next-btn--mobile').click(function(e) {
		portfolioSliderMobile.slideNext();
	});
});