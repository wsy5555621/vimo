"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ActionSheetFactory(e){var t=(0,_getInsertPosition.getInsertPosition)("sheetPortal").appendChild(document.createElement("div"));return new ActionSheet({el:t,propsData:e})}Object.defineProperty(exports,"__esModule",{value:!0});var _vue=require("vue"),_vue2=_interopRequireDefault(_vue),_actionSheet=require("./action-sheet.vue"),_actionSheet2=_interopRequireDefault(_actionSheet),_getPresentDismissIns=require("../../util/getPresentDismissIns"),_getInsertPosition=require("../../util/getInsertPosition"),ActionSheet=_vue2.default.extend(_actionSheet2.default);exports.default=(0,_getPresentDismissIns.getPresentDismissIns)(ActionSheetFactory);