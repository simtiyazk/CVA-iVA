'use strict';

//Use this file for any data, helpers or partial strings you want to use in your slide .hbs files

exports.data = {
   references: [
      '<li>example</li>'
   ]
};

exports.partials = {
   // footer: '<footer>the end</footer>'
};

exports.helpers = {
   // capitals: function(str) {
   //    return str.toUpperCase();
   // }
   ifCond :function(v1, v2, options) {
      if(v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
};
