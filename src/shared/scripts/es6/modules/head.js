'use strict';

const headerLinks = $('.headlinks a');
const touchclick =
'ontouchend' in document.documentElement
   ? 'touchend'
   : window.navigator.pointerEnabled
   ? 'pointerup'
   : 'click';

export default function head() {
   headerLinks.on(touchclick, (e) => {
      const target = $(e.target).data('target');
      veevaUtils.gotoSlide(target);
   });
}
