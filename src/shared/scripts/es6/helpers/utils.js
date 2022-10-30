'use strict';
const links = $('a.slide-redirect'),
  body = $('body'),
  toggleContent = $('.toggle-content:not(.sub-tab)'),
  toggleButtons = $('.tabs-toggle:not(.sub-tab) .slide-toggle'),
  subToggleContent = $('.toggle-content.sub-tab'),
  subToggleButtons = $('.tabs-toggle.sub-tab .slide-toggle'),
  slideContainer = $('body main section'),
  triggerToggleButtons = $('.trigger-toggle'),
  scrollContent = $('.iscroll-wrapper'),
  // popUpsContainer = $('.popups-container'),
  // popUpOpen = $('.popup-btn.open'),
  // popUpClose = $('.popup-btn.close'),
  // popUpOverlay = $('.popup-overlay'),
  visibleClass = 'visible',
  scrollContentInited = [],
  isiScrollVelocity = 15,
  touchclick = ('ontouchend' in document.documentElement) ? 'touchend' : (window.navigator.pointerEnabled) ? 'pointerup' : 'click',
  runningInVeeva = ((location.hostname === '' || location.hostname.indexOf('veevamobile') > -1)) && (navigator.userAgent.indexOf('Mobile') > 0 || (navigator.userAgent.indexOf('Touch') > 0));
let self, lastY, currentY, currentScroll;
export default class Utils {
  constructor() {
    self = this;
    self.attachListeners();
    self.init();
  }
  initScroll() {
    let container = $('.toggle-content'),
      cScrollContent = container.find('.iscroll-wrapper');
    $.each(cScrollContent, function(i, obj) {
      let ob = $(obj);
      if (scrollContentInited.indexOf(ob.attr('id')) === -1) {
        let referenceScroll = new IScroll('#' + ob.attr('id'), {
          scrollbars: 'custom',
          probeType: 3,
          bounce: false,
          mouseWheel: false
        });
        scrollContentInited.push(ob.attr('id'));
      }
    });
  }
  toggleClicked(e) {
    let index = toggleButtons.index(this),
      container = toggleContent.hide().eq(index),
      toggleTabs = $('.tabs-toggle:not(.sub-tab)');

    container.find('.toggle-content').removeClass('selected');
    $('.tabs-toggle.sub-tab').removeClass('selected');
    $('.tabs-toggle.sub-tab').removeClass('selected2');

    if ($(this).hasClass('tab1') || $(this).hasClass('tab3')) {
      toggleTabs.addClass('selected');
    } else {
      toggleTabs.removeClass('selected');
    }
    container.find('.sub-tab.content1').addClass('selected');
    container.css('display', 'flex');
  }
  subToggleClicked(e) {
    let index = subToggleButtons.index(this),
      container = subToggleContent.removeClass('selected').eq(index),
      toggleTabs = $(this).parent();

    if ($(this).hasClass('tab1')) {
      toggleTabs.removeClass('selected');
      toggleTabs.removeClass('selected2');
    } else {
      toggleTabs.addClass('selected');
      toggleTabs.removeClass('selected2');
    }

    if ($(this).hasClass('tab3')) {
      toggleTabs.removeClass('selected');
      toggleTabs.addClass('selected2');
    }

    container.addClass('selected');
  }
  triggerToggle(e) {
    let element = $(e.target);
    if (element.hasClass('arrow-toggle')) {
      element.addClass('active');
      setTimeout(function() {
        element.removeClass('active');
        toggleButtons.eq($(e.target).data('target') - 1).trigger(touchclick);
      }, 100);
    } else {
      toggleButtons.eq($(e.target).data('target') - 1).trigger(touchclick);
    }
  }
  checkSlide(el) {
    //data slide general
    if ($(el).is('[data-slide]')) {
      let tab = $(el).data('slide');
      localStorage.tab = tab;
    } else {
      localStorage.removeItem('tab');
    }
    //launchpad
    if ($(el).is('[data-pad]')) {
      let pad = $(el).data('pad');
      localStorage.pad = pad;
    } else {
      localStorage.removeItem('pad');
    }
  }
  goSlide() {
    let tab = localStorage.tab;
    $('.' + tab).trigger(touchclick);
    localStorage.removeItem('tab');
  }
  /*smartRedirect(e){
      e.preventDefault();

      checkSlide(e.target);

      let target = $(e.target),
          targetLink = target.attr('href'),
          delayTime = (!target.hasClass('redirect-delay'))? 0 : 100;

      setTimeout(function() {
          if (targetLink !== '#' && targetLink !== '') {
              if (runningInVeeva) {
                  window.open('veeva:gotoSlide('+targetLink+'.zip)');
              }else{
                  document.location.href = '/'+targetLink+'/'+targetLink+'.html';
              }
          }
      }, delayTime);
  }*/
  // togglePopUps(e) {
  //   let ctarget = $(e.currentTarget);
  //   //first close other popups
  //   if (ctarget.hasClass('open')) {
  //     let target = (ctarget.data('target') !== undefined) ? $('#' + ctarget.data('target')) : null;
  //     // popUpClose.trigger(touchclick);
  //     if (target !== null) {
  //       popUpsContainer.addClass(visibleClass);
  //       target.addClass(visibleClass);
  //     }
  //   } else {
  //     popUpsContainer.removeClass(visibleClass);
  //     popUpsContainer.find('.popup').removeClass(visibleClass);
  //   }
  //   if ($('.isi-wrapper').length < 0) {
  //     let isiScroll = new IScroll('.isi-wrapper', {
  //       scrollbars: 'custom',
  //       probeType: 3,
  //       bounce: false,
  //       mouseWheel: true
  //     });
  //   }
  // }
  attachListeners() {
    toggleButtons.on(touchclick, self.toggleClicked);
    subToggleButtons.on(touchclick, self.subToggleClicked);
    triggerToggleButtons.on(touchclick, self.triggerToggle);
    //links.on(touchclick, self.smartRedirect);
    // body.on(touchclick, '.popup-btn.open', self.togglePopUps);
    // popUpClose.on(touchclick, self.togglePopUps);
    // popUpOverlay.on(touchclick, self.togglePopUps);
    // JS Overlay functionality
    $('.open-ol .btn-plus').on('click', function() {
      let overlayClass = $(this).data('overlay');
      $(this).addClass('active');
      $('.overlay').attr('class', 'overlay ' + overlayClass);
      $('.btn-exit').removeClass('active');
      $('.overlay').show();
    });
    $('.overlay .btn-exit').on('click', function() {
      $(this).addClass('active');
      setTimeout(function() {
        $('.open-ol .btn-plus').removeClass('active');
        $('.overlay').hide();
      }, 100);
    });
    $('.custom-open-ol .custom-btn-plus').on('click', function() {
      let overlayClass = $(this).data('overlay');
      setTimeout(function() {
        $('.custom-open-ol').css('visibility', 'hidden');
        $('.custom-overlay').addClass(overlayClass);
        $('.btn-exit').removeClass('active');
      }, 100);
    });
    $('.open-tooltip .btn-plus').on('click', function() {
      const $this = $(this);
      if ($this.hasClass('active')) {
        $this.removeClass('active');
        $this.find('.nox').removeClass('active');
      } else {
        $('.open-tooltip .btn-plus').removeClass('active');
        $('.nox').removeClass('active');
        $this.addClass('active');
        $this.find('.nox').addClass('active');
      }
    });
    $('.continue-off').on('click', function() {
      $('.btn-continue').toggleClass('active');
      setTimeout(function() {
        $('.slide-toggle.tab2').trigger(touchclick);
      }, 300);
    });
  }
  init() {
    if (toggleButtons.length > 0) {
      toggleButtons.eq(0).trigger(touchclick);
    }
    if (subToggleButtons.length > 0) {
      subToggleButtons.eq(0).trigger(touchclick);
    }
    //Go to specific slide
    if (typeof localStorage.tab !== undefined) {
      self.goSlide();
    }
    if (scrollContent.length > 0) {
      self.initScroll();
    }
    FastClick.attach(document.body); //fastclick for mobile
  }
}