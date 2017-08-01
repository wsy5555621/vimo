"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ModalFactory(e){return new Modal({el:(0,_getInsertPosition.getInsertPosition)("modalPortal").appendChild(document.createElement("div")),propsData:e})}function present(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};isModalEnable=!1;var r=ModalFactory(e),t=r.present();return window.history.pushState({id:(new Date).getTime()},"",""),modalArr.push(r),0===unRegisterUrlChange.length&&(0,_util.registerListener)(window,"popstate",function(){if(isModalEnable){var e=modalArr.pop();e&&e.dismiss(),0===modalArr.length&&unregisterAllListener()}},{},unRegisterUrlChange),t.then(function(){isModalEnable=!0}),t}function dismiss(e){return isModalEnable=!1,new _promise2.default(function(r){var t=modalArr.pop();0===modalArr.length&&unregisterAllListener(),window.history.back(),t.dismiss(e).then(function(){isModalEnable=!0,r()})})}function unregisterAllListener(){unRegisterUrlChange.forEach(function(e){return e&&e()}),unRegisterUrlChange=[]}Object.defineProperty(exports,"__esModule",{value:!0});var _promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_vue=require("vue"),_vue2=_interopRequireDefault(_vue),_getInsertPosition=require("../../util/getInsertPosition"),_util=require("../../util/util"),_modal=require("./modal.vue"),_modal2=_interopRequireDefault(_modal),modalArr=[],unRegisterUrlChange=[],Modal=_vue2.default.extend(_modal2.default),isModalEnable=!0;exports.default={present:present,dismiss:dismiss};