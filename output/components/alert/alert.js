"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function AlertFactory(e){var t=(0,_getInsertPosition.getInsertPosition)("alertPortal").appendChild(document.createElement("div"));return new Alert({el:t,propsData:e})}Object.defineProperty(exports,"__esModule",{value:!0});var _vue=require("vue"),_vue2=_interopRequireDefault(_vue),_alert=require("./alert.vue"),_alert2=_interopRequireDefault(_alert),_getPresentDismissIns=require("../../util/getPresentDismissIns"),_getInsertPosition=require("../../util/getInsertPosition"),Alert=_vue2.default.extend(_alert2.default);exports.default=(0,_getPresentDismissIns.getPresentDismissIns)(AlertFactory);