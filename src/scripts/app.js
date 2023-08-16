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
        $fileBtn.text('Upload Files');
    });
	});

	const portfolioSliderMobile = new Swiper('.portfolio-slider--mobile', {
	  allowTouchMove: false,
	  modules: [Navigation],
	  slidesPerView: 1,
	  spaceBetween: 30,
	  loop: true
	});

	let accordionPanelTimer = null;

	$('.client-accordion-panel__short').click(function(e) {
		e.preventDefault();

		if (accordionPanelTimer) return;

		let $accordionPanel = $(this).closest('.client-accordion-panel');
		let $accordionPanelsContainer = $accordionPanel.closest('.client-accordion-panels');
		let $activeVisiblePanelItem = $accordionPanelsContainer.find('.client-accordion-panels__item:first-child');

		let $prevAccordionPanels = $accordionPanel.prevUntil(`.client-accordion-panel--opened`);
		$prevAccordionPanels = $prevAccordionPanels.add($activeVisiblePanelItem);

		$prevAccordionPanels.removeClass('client-accordion-panel--opened').addClass('client-accordion-panel--closed');
		$accordionPanel.addClass('client-accordion-panel--opened');
		$accordionPanelsContainer.find(`.client-accordion-panels__item:nth-child(-n+${$prevAccordionPanels.length + 4})`).removeClass('client-accordion-panel--invisible');

		accordionPanelTimer = setTimeout(() => {
			$accordionPanelsContainer.append($prevAccordionPanels);
			$prevAccordionPanels.removeClass('client-accordion-panel--closed').addClass('client-accordion-panel--invisible');

			accordionPanelTimer = null;
		}, 1000);
	});

	$('.portfolio-slider-section__prev-btn--desktop').click(function(event) {
		if (accordionPanelTimer) return;

		let $currentPortfolioSection = $(this).closest('.portfolio-slider-section');
		let $accordionPanelsContainer = $currentPortfolioSection.find('.client-accordion-panels');
		let $activeVisiblePanelItem = $currentPortfolioSection.find('.client-accordion-panels .client-accordion-panels__item:first-child');
		let $prevPanelItem = $currentPortfolioSection.find('.client-accordion-panels .client-accordion-panels__item:last-child');

		$activeVisiblePanelItem.removeClass('client-accordion-panel--opened');
		$prevPanelItem.addClass('client-accordion-panel--opened');
		// $prevPanelItem.addClass('client-accordion-panel--opened');
		$accordionPanelsContainer.prepend($prevPanelItem);

		$accordionPanelsContainer.find('.client-accordion-panels__item:first-child').removeClass('client-accordion-panel--invisible');
		$accordionPanelsContainer.find('.client-accordion-panels__item:nth-child(5)').addClass('client-accordion-panel--invisible');
	});

	$('.portfolio-slider-section__next-btn--desktop').click(function(event) {
		if (accordionPanelTimer) return;
		
		let $currentPortfolioSection = $(this).closest('.portfolio-slider-section');
		let $accordionPanelsContainer = $currentPortfolioSection.find('.client-accordion-panels');
		let $activeVisiblePanelItem = $currentPortfolioSection.find('.client-accordion-panels .client-accordion-panels__item:first-child');
		let $nextPanelItem = $activeVisiblePanelItem.next();

		// $accordionPanelsContainer.addClass('client-accordion-panels--loading');
		$activeVisiblePanelItem.removeClass('client-accordion-panel--opened').addClass('client-accordion-panel--closed');
		$nextPanelItem.addClass('client-accordion-panel--opened');
		$accordionPanelsContainer.find('.client-accordion-panels__item:nth-child(5)').removeClass('client-accordion-panel--invisible');
		// $nextPanelItem.next().removeClass('client-accordion-panel--invisible');
		// $accordionPanelsContainer.append($activeVisiblePanelItem.clone());

		accordionPanelTimer = setTimeout(() => {
			$activeVisiblePanelItem.addClass('client-accordion-panel--invisible');
			$accordionPanelsContainer.append($activeVisiblePanelItem);
			// $accordionPanelsContainer.find('.client-accordion-panels__item:last-child').removeCl;
			// $accordionPanelsContainer.removeClass('client-accordion-panels--loading');
			// $accordionPanelsContainer.find(`.client-accordion-panels:nth-child(n+5)`).addClass('hidden');
			$activeVisiblePanelItem.removeClass('client-accordion-panel--closed');
			accordionPanelTimer = null;
		}, 1000);
	});

	$('.portfolio-slider-section__prev-btn--mobile').click(function(e) {
		portfolioSliderMobile.slidePrev();
	});

	$('.portfolio-slider-section__next-btn--mobile').click(function(e) {
		portfolioSliderMobile.slideNext();
	});
});