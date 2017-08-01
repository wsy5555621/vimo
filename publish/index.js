"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("./base/config"),_history=require("./base/history"),_platform=require("./base/platform"),_app=require("./components/app"),_content=require("./components/content"),_nav=require("./components/nav"),_page=require("./components/page");require("./util/polyfill");var VERSION="0.4.8",addLogo=function(e,o){var n={info:"Powered by Vimo@"+e+" and based on Vue@"+o+" \n源代码请访问GitHub https://github.com/DTFE/Vimo"};window.console&&console.info&&console.info(n.info)};exports.default={installed:!1,version:VERSION,install:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this.installed){var n=new e;window.VM={version:VERSION,vm:e},e.prototype.$eventBus=n;var t=(0,_platform.setupPlatform)(o.pltConf),a=(0,_config.setupConfig)(o.custConf,t),p=(0,_history.setupHistory)(o.router);e.prototype.$config=a,e.prototype.$platform=t,e.prototype.$history=p,e.component(_app.App.name,_app.App),e.component(_nav.Nav.name,_nav.Nav),e.component(_page.Page.name,_page.Page),e.component(_app.Header.name,_app.Header),e.component(_content.Content.name,_content.Content),e.component(_app.Footer.name,_app.Footer),addLogo(VERSION,e.version);var r=document.createEvent("HTMLEvents");r.initEvent("VimoReady",!1,!1),document.dispatchEvent(r),this.installed=!0}}};