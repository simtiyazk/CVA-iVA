window.veevaUtils = (function(veeva) {
   // Checking is the presentation is running in Veeva or in browser
   var isVeeva = navigator.userAgent.match(/iP(hone|ad)/i) != null;
   console.log('veeva presentation:', isVeeva);

   // https://developer.veevacrm.com/api/CLMLibrary/#gotoslide-key-presentation
   // TODO: For now it does not have to be used, we need to test it

   var trackEvent = function({ id, type, description }, callback) {
      var myObject = {};
      myObject.Track_Element_Id_vod__c = id; // eslint-disable-line
      myObject.Track_Element_Description_vod__c = description; // eslint-disable-line
      myObject.Usage_Duration_vod__c = 0; // eslint-disable-line
      myObject.Answer_vod__c = ""; // eslint-disable-line
      myObject.Usage_Start_Time_vod__c = new Date(); // eslint-disable-line
      myObject.Track_Element_Type_vod__c = type; // eslint-disable-line
      veeva.createRecord('Call_Clickstream_vod__c', myObject, callback);

      if (!isVeeva) {
         console.log('TRACKING', { id, type, description });
      }
   };

   var gotoSlide = function(keymessage, tracking) {
      if (isVeeva) {
         if (!tracking) {
            if (keymessage !== '') {
               veeva.gotoSlide(`${keymessage}.zip`, '');
            }
         } else {
            trackEvent(tracking, function(result) {
               if (keymessage !== '') {
                  veeva.gotoSlide(`${keymessage}.zip`, '');
               }
            });
         }
      } else {
         if (tracking) {
            console.log('TRACKING', tracking);
         }
         window.location.href = '/' + keymessage + '/index.html';
      }
   };
   return {
      gotoSlide: gotoSlide,
      isVeeva: isVeeva,
      trackEvent: trackEvent
   };
})(com.veeva.clm);
