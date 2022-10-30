'use strict';

$(() => {
   //private
   var el, page3, page5, page12, touchclick;

   class Slide {
      constructor() {
         //set vars
         el = $('#projectable_core_visual_aid_clean');
         page3 = el.find('a.page3-link');
         page5 = el.find('a.page5-link');
         page12 = el.find('a.page12-link');

         touchclick =
            'ontouchend' in document.documentElement
               ? 'touchend'
               : window.navigator.pointerEnabled
               ? 'pointerup'
               : 'click';

         //initial setup
         page3.on(touchclick, (e) => {
            // const tracking = {
            //    id: 'button',
            //    type: 'Rheum home DM/PM button (purple)',
            //    description: 'rheum_scheduled_relief>slide_home>dm/pm section',
            // };
            //veevaUtils.gotoSlide($(e.target).data('target'), tracking);
            veevaUtils.gotoSlide($(e.target).data('target'));
         });

         page5.on(touchclick, (e) => {
            veevaUtils.gotoSlide($(e.target).data('target'));
         });

         page12.on(touchclick, (e) => {
            veevaUtils.gotoSlide($(e.target).data('target'));
         });
         //listeners
      }

      //----- handlers ------//

      //----- utils ------//
   }

   var slide = new Slide();
});
