"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function AlertFactory(e){var t=(0,_getInsertPosition.getInsertPosition)("alertPortal").appendChild(document.createElement("div"));return new Alert({el:t,propsData:e})}function getPresentDismissIns(e){return{_i:null,present:function(t){var n=this,i=window.VM.platform.is("alipay")&&window.AlipayJSBridge&&!t.isH5,o=window.VM.platform.is("dingtalk")&&window.dd&&!t.isH5,r=window.VM.platform.is("dtdream")&&window.dd&&!t.isH5;if(t.buttons||(t.buttons=[]),1===t.buttons.length){if(i)return console.info("Alert 组件使用Alipay模式!"),new _promise2.default(function(e){window.AlipayJSBridge.call("alert",{title:t.title||"",message:t.message||"",button:t.buttons[0].text||"确定"},function(){t.buttons[0]&&t.buttons[0].handler&&t.buttons[0].handler()}),e()});if(o)return console.info("Alert 组件使用DingTalk模式!"),new _promise2.default(function(e){window.dd.device.notification.alert({title:t.title||"",message:t.message||"",buttonName:t.buttons[0].text||"确定",onSuccess:function(){t.buttons[0]&&t.buttons[0].handler&&t.buttons[0].handler()}}),e()});if(r)return console.info("Alert 组件使用 DtDream 模式!"),new _promise2.default(function(e){window.dd.device.notification.alert({title:t.title||"",message:t.message||"",buttonName:t.buttons[0].text||"确定",onSuccess:function(){t.buttons[0]&&t.buttons[0].handler&&t.buttons[0].handler()}}),e()})}if(2===t.buttons.length&&!t.inputs){var l={},a={};if(t.buttons.forEach(function(e){"cancel"===e.role?l=e:a=e}),i)return console.info("Confirm 组件使用Alipay模式!"),new _promise2.default(function(e){window.AlipayJSBridge.call("confirm",{title:t.title||"",message:t.message||"",okButton:a.text||"确定",cancelButton:l.text||"取消"},function(e){e.ok?a.handler&&a.handler():l.handler&&l.handler()}),e()});if(o)return console.info("Confirm 组件使用DingTalk模式!"),new _promise2.default(function(e){window.dd.device.notification.confirm({message:t.message||"",title:t.title||"",buttonLabels:[l.text||"取消",a.text||"确定"],onSuccess:function(e){0===e.buttonIndex?l.handler&&l.handler():a.handler&&a.handler()}}),e()});if(r)return console.info("Confirm 组件使用 DtDream 模式!"),new _promise2.default(function(e){window.dd.device.notification.confirm({message:t.message||"",title:t.title||"",buttonLabels:[l.text||"取消",a.text||"确定"],onSuccess:function(e){0===e.buttonIndex?l.handler&&l.handler():a.handler&&a.handler()}}),e()})}if(2===t.buttons.length&&t.inputs&&1===t.inputs.length&&("radio"!==t.inputs[0].type||"checkbox"!==t.inputs[0].type)){var s={},u={};if(t.buttons.forEach(function(e){"cancel"===e.role?s=e:u=e}),i)return console.info("Prompt 组件使用Alipay模式!"),new _promise2.default(function(e){window.AlipayJSBridge.call("prompt",{title:t.title||"",message:t.message||"",okButton:u.text||"确定",cancelButton:s.text||"取消",placeholder:t.inputs[0].placeholder},function(e){e.ok?u.handler&&u.handler((0,_defineProperty3.default)({},t.inputs[0].name,e.inputValue)):s.handler&&s.handler((0,_defineProperty3.default)({},t.inputs[0].name,e.inputValue))}),e()});if(o)return console.info("Prompt 组件使用DingTalk模式!"),new _promise2.default(function(e){window.dd.device.notification.prompt({title:t.title||"",message:t.message||"",buttonLabels:[s.text||"取消",u.text||"确定"],onSuccess:function(e){0===e.buttonIndex?s.handler&&s.handler((0,_defineProperty3.default)({},t.inputs[0].name,e.value)):u.handler&&u.handler((0,_defineProperty3.default)({},t.inputs[0].name,e.value))}}),e()});if(r)return console.info("Prompt 组件使用 DtDream 模式!"),new _promise2.default(function(e){window.dd.device.notification.prompt({title:t.title||"",message:t.message||"",buttonLabels:[s.text||"取消",u.text||"确定"],onSuccess:function(e){0===e.buttonIndex?s.handler&&s.handler((0,_defineProperty3.default)({},t.inputs[0].name,e.value)):u.handler&&u.handler((0,_defineProperty3.default)({},t.inputs[0].name,e.value))}}),e()})}return console.info("Alert 组件使用H5模式!"),new _promise2.default(function(i){n._i&&n._i.isActive?n._i.dismiss().then(function(){n._i=e(t),n._i.present().then(function(){i()})}):(n._i=e(t),n._i.present().then(function(){i()}))})},dismiss:function(){var e=this;return new _promise2.default(function(t){e._i&&e._i.isActive?e._i.dismiss().then(function(){t()}):t()})}}}Object.defineProperty(exports,"__esModule",{value:!0});var _defineProperty2=require("babel-runtime/helpers/defineProperty"),_defineProperty3=_interopRequireDefault(_defineProperty2),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_vue=require("vue"),_vue2=_interopRequireDefault(_vue),_getInsertPosition=require("../../util/getInsertPosition"),_alert=require("./alert.vue"),_alert2=_interopRequireDefault(_alert),Alert=_vue2.default.extend(_alert2.default),alertInstance=getPresentDismissIns(AlertFactory);exports.default=alertInstance;