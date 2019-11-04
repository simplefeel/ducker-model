!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lodash/mapValues"),require("lodash/set"),require("lodash/get"),require("lodash/isNumber"),require("lodash/isString"),require("lodash/isArray"),require("lodash/isDate"),require("lodash/isBoolean"),require("lodash/isPlainObject"),require("lodash/isFunction"),require("lodash/isNull"),require("manba")):"function"==typeof define&&define.amd?define(["exports","lodash/mapValues","lodash/set","lodash/get","lodash/isNumber","lodash/isString","lodash/isArray","lodash/isDate","lodash/isBoolean","lodash/isPlainObject","lodash/isFunction","lodash/isNull","manba"],t):(e=e||self,t(e.ducker={},e._mapValues,e._set,e._get2,e._isNumber,e._isString,e._isArray,e._isDate,e._isBoolean,e._isPlainObject,e._isFunction,e._isNull,e._manba))}(this,function(e,t,r,a,o,u,n,i,l,s,c,y,p){"use strict";function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function h(e,t,r){return t&&d(e.prototype,t),r&&d(e,r),e}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(r,!0).forEach(function(t){v(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}t=t&&t.hasOwnProperty("default")?t.default:t,r=r&&r.hasOwnProperty("default")?r.default:r,a=a&&a.hasOwnProperty("default")?a.default:a,o=o&&o.hasOwnProperty("default")?o.default:o,u=u&&u.hasOwnProperty("default")?u.default:u,n=n&&n.hasOwnProperty("default")?n.default:n,i=i&&i.hasOwnProperty("default")?i.default:i,l=l&&l.hasOwnProperty("default")?l.default:l,s=s&&s.hasOwnProperty("default")?s.default:s,c=c&&c.hasOwnProperty("default")?c.default:c,y=y&&y.hasOwnProperty("default")?y.default:y,p=p&&p.hasOwnProperty("default")?p.default:p;var O={S:10,B:100,Q:1e3,w:1e4},w=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,e),this._attributes=m({},t),this.replacedKeyFromPropertyName=m({},r)}return h(e,[{key:"objectWithKeyValues",value:function(e){return s(e)||this.error("objectWithKeyValues: array dataSource type error"),this.parse(e)}},{key:"objectArrayWithKeyValuesArray",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(n(t))return t.map(function(t){return e.objectWithKeyValues(t)});this.error("objectArrayWithKeyValuesArray: array dataSource type error")}},{key:"parse",value:function(){var r=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(this._attributes,function(t,o){var i,l,y,p,f,d,h=r.replacedKeyFromPropertyName[o];if(s(t)){var v=t._modelTypeKey;if(!v)return new e(t,h).objectWithKeyValues(a);switch(v){case"valueForPath":d=new t.type,i=t.path;break;case"valueWithArray":d=new Array;break;case"valueForPathWithArray":d=new Array,i=t.path;break;default:r.error("modelTypeKey: [".concat(o,"] type error"))}}else c(t)?d=new t:r.error("property: [".concat(o,"] type error"));h||i?u(h)?i=h:s(h)&&(i=h.property,l=h.format,y=h.computed,p=h.unit,f=h.defaultValue):i=o,i||r.error("replacedKeyFromPropertyName: [".concat(o,"] type error")),d||r.error("property: [".concat(o,"] type error"));var b,m=r._get({data:a,path:i,computed:y});return b=Object.prototype.toString.call(m)===Object.prototype.toString.call(d)||n(i)?r.compose({distValue:m,type:d,unit:p,format:l,computed:y}):r.getDefaultValue(f,d),n(d)?s(t.type)?new e(t.type,h?h.children:void 0).objectArrayWithKeyValuesArray(b):r.checkNoObjectChildren({type:t.type,data:b}):b})}},{key:"checkNoObjectChildren",value:function(e){var t=this,r=e.type;return e.data.map(function(e){var a=new r;return Object.prototype.toString.call(a)===Object.prototype.toString.call(e)?e:t.getDefaultValue(void 0,a)})}},{key:"traverse",value:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!a)return this;var o={};return t(this._attributes,function(t,u){var n=t.property,i=t.unit,l=new t.type,s=(t.format,a[u]);if(s){var c=e.discompose({sourceValue:s,unit:i,key:u,type:l});r(o,n,c)}}),o}},{key:"compose",value:function(e){var t=e.distValue,r=(e.type,e.unit),a=e.format,o=e.computed;return r&&(t=Number.parseFloat(t/O[r]).toFixed(2)),a&&(t=p(parseFloat(t)).format(a)),o&&(t=o(t)),t}},{key:"discompose",value:function(e){var t=e.sourceValue,r=e.unit,a=e.key,o=e.type;return i(o)&&(t=p(t).time()),r&&(t*=O[r]),t||this.get(a)}},{key:"set",value:function(e,t){this[e]=t}},{key:"get",value:function(e,t){return this[e]}},{key:"_get",value:function(e){var t=e.data,r=e.path,o=e.computed;if(n(r)&&!o)return this.error("path定义为数组路径，computed属性必须定义");if(n(r)&&o){var u=[];return r.forEach(function(e,r){u.push(a(t,e))}),u}return n(r)?void 0:a(t,r)}},{key:"getDefaultValue",value:function(e,t){return void 0===e?this.setDefaultValue(t):e}},{key:"setDefaultValue",value:function(e){var t;return o(e)?t=0:u(e)?t="":n(e)?t=[]:l(e)?t=!0:i(e)?t=Date.now():s(e)?t={}:y(e)&&(t=null),t}},{key:"error",value:function(e){throw new Error(e)}}]),e}(),P=function(e,t){return{_modelTypeKey:"valueForPath",type:e,path:t}},g=function(e){return{_modelTypeKey:"valueWithArray",type:e}},j=function(e,t){return{_modelTypeKey:"valueForPathWithArray",type:e,path:t}};e.default=w,e.valueForPath=P,e.valueForPathWithArray=j,e.valueWithArray=g,Object.defineProperty(e,"__esModule",{value:!0})});
