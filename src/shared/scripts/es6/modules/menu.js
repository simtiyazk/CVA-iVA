'use strict';

const menuItems = $('.menu a');
const touchclick =
'ontouchend' in document.documentElement
   ? 'touchend'
   : window.navigator.pointerEnabled
   ? 'pointerup'
   : 'click';

export default function menu() {
   menuItems.on(touchclick, (e) => {
      const target = $(e.target).data('target');
      veevaUtils.gotoSlide(target);
   });
}
