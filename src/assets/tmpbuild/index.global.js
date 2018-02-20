/*! Built with http://stenciljs.com */
(function(appNamespace,publicPath){"use strict";
(function(publicPath){var __assign=Object.assign||function(n){for(var t,r=1,e=arguments.length;r<e;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n};Context.activeRouter=function(){var n={},t=[];return{set:function(r){n=__assign({},n,r),function(){for(var n=t,r=0;r<n.length;r++){var e=n[r];e()}}()},get:function(t){return t?n[t]:n},subscribe:function(n){if("function"!=typeof n)throw new Error("Expected listener to be a function.");var r=!0;return t.push(n),function(){if(r){r=!1;var e=t.indexOf(n);t.splice(e,1)}}}}}();
})(publicPath);
})("index","/build/index/");