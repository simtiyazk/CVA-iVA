'use strict';

const body = $('body'),
   popUpsContainer = body.find('.popups-container'),
   interactiveModule = body.find('.interactive-module'),
   popUpOpen = $('.popup-open'),
   popUpClose = $('.popup-btn.close'),
   popUpOverlay = $('.popup-overlay'),
   content = $('.content'),
   video = document.querySelector('.popups-container video'),
   referencesContent = $('.references-content'),
   subMenu = $('.sub-menu'),
   touchclick =
      'ontouchend' in document.documentElement
         ? 'touchend'
         : window.navigator.pointerEnabled
         ? 'pointerup'
         : 'click';

const togglePopUps = function(e) {
   let ctarget = $(e.currentTarget);
   //first close other popups
   if (ctarget.hasClass('open')) {
      let target =
         ctarget.data('target') !== undefined
            ? $('#' + ctarget.data('target'))
            : null;
      if (target !== null) {
         popUpsContainer.addClass('visible');
         target.addClass('visible');
         content.addClass('show-blur');
         subMenu.addClass('show-blur');
      }
   } else {
      popUpsContainer.removeClass('visible');
      content.removeClass('show-blur');
      subMenu.removeClass('show-blur');
      popUpsContainer.find('.popup').removeClass('visible');
      referencesContent.removeClass('pharmacodynamic-opened');
      if (video && !video.paused) {
         video.pause();
      }
   }
};

export default function popup() {
   popUpOpen.on(touchclick, function(e) {
      let pop = $(`#${$(e.target).data('target')}`);
      content.toggleClass('show-blur');
      subMenu.toggleClass('show-blur');
      popUpsContainer.addClass('visible');
      pop.addClass('visible');
   });
   popUpClose.on(touchclick, togglePopUps);
   popUpOverlay.on(touchclick, togglePopUps);
}

export function closePopUps() {
   if ($('.popup').hasClass('visible')) {
      popUpsContainer.removeClass('visible');
      content.removeClass('show-blur');
      subMenu.removeClass('show-blur');
      popUpsContainer.find('.popup').removeClass('visible');
      if (video && !video.paused) {
         video.pause();
      }
   }
   if (interactiveModule.hasClass('open')) {
      interactiveModule.removeClass('open');
      content.removeClass('show-blur');
      subMenu.removeClass('show-blur');
   }
}
