'use strict';

$(() => {
   //private
   var el, touchclick;

   class Slide {
      constructor() {
         //set vars
         el = $('#projectable_core_visual_aid_clean');
         touchclick =
            'ontouchend' in document.documentElement
               ? 'touchend'
               : window.navigator.pointerEnabled
               ? 'pointerup'
               : 'click';

         //initial setup

         //listeners
      }

      //----- handlers ------//

      //----- utils ------//
   }

   var slide = new Slide();
});
