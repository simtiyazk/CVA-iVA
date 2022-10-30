'use strict';


// Helpers
//import helper from './helpers/helper';
import Utils from './helpers/utils';
import menu from './modules/menu';
import head from './modules/head';
import popup from './modules/popup';

$(() => {

   //private
   var self,
      el,
      slideLinks,
      touchclick =
         ('ontouchend' in document.documentElement) ?
         'touchend' :
         (window.navigator.pointerEnabled) ?
         'pointerup' :
         'click';
   let pi = $('.pi-open');

   class Main {

      constructor() {
         //set vars
         self = this;
         el = $('.slide');
         slideLinks = el.find('.isi-link, .next-slide');

         self.scaleWindow();
         head();
         menu();
         popup();

         //listeners
         FastClick.attach(document.body); //fastclick for mobile
         document.addEventListener('touchmove', e => e.preventDefault(), false); //prevent webview window from scrolling
         $('a[href="#"]').on(touchclick, e => e.preventDefault()); //prevent default behavior for anchor tags with hash
         // Init scroll on PI
         pi.on(touchclick, (e) => {
            iScroll = new IScroll('#isiScroll', {
               mouseWheel: true,
               scrollbars: true
            });
         });

         slideLinks.on(touchclick, (e) => {
            const target = $(e.target).data('target');
            veevaUtils.gotoSlide(target);
         });
      }

      //----- handlers ------//

      scaleWindow() {
         var initialWidth = 1024;
         $('body').css('zoom', window.innerWidth / initialWidth);
      }

      //----- utils ------//

   }

   let main = new Main();
   let utils = new Utils();


});
