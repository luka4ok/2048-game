!function(){function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function e(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}}function n(n){return function(e){if(Array.isArray(e))return t(e)}(n)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(n)||e(n)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var r=new/*#__PURE__*/(function(){var t;function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Array.from({length:4},function(){return[,,,,].fill(0)});!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,r),this.score=0,this.status="idle",this.initialState=t,this.state=this.cloneState(this.initialState)}return t=[{key:"cloneState",value:function(t){return t.map(function(t){return n(t)})}},{key:"generateRandomTile",value:function(){var t=this.getEmptyTiles();if(0!==t.length){var n,r=function(t){if(Array.isArray(t))return t}(n=t[Math.floor(Math.random()*t.length)])||function(t,e){var n,r,a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var i=[],s=!0,o=!1;try{for(a=a.call(t);!(s=(n=a.next()).done)&&(i.push(n.value),2!==i.length);s=!0);}catch(t){o=!0,r=t}finally{try{s||null==a.return||a.return()}finally{if(o)throw r}}return i}}(n,2)||e(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),a=r[0],i=r[1];this.state[a][i]=.9>Math.random()?2:4}}},{key:"getEmptyTiles",value:function(){var t=[];return this.state.forEach(function(e,n){e.forEach(function(e,r){0===e&&t.push([n,r])})}),t}},{key:"move",value:function(t){if("playing"===this.status){var e=this.cloneState(this.state);this.state=this.processMove(t),this.areStatesEqual(this.state,e)||(this.generateRandomTile(),this.validateGameState())}}},{key:"processMove",value:function(t){var e=this,r=function(t){for(var r=t.filter(function(t){return 0!==t}),a=[],i=0;i<r.length;i++)r[i]===r[i+1]?(a.push(2*r[i]),e.score+=2*r[i],i++):a.push(r[i]);return n(a).concat(n(Array(4-a.length).fill(0)))},a=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t.map(function(t){return e?r(t.reverse()).reverse():r(t)})};switch(t){case"left":return a(this.state);case"right":return a(this.state,!0);case"up":return this.rotateState(a(this.rotateState(this.state)));case"down":return this.rotateState(a(this.rotateState(this.state),!0));default:return this.state}}},{key:"validateGameState",value:function(){this.state.flat().includes(2048)?this.status="win":this.hasEmptyCells()||this.canCombine()||(this.status="lose")}},{key:"hasEmptyCells",value:function(){return this.state.some(function(t){return t.includes(0)})}},{key:"canCombine",value:function(){var t=this;return this.state.some(function(e,n){return e.some(function(r,a){return a<3&&r===e[a+1]||n<3&&r===t.state[n+1][a]})})}},{key:"rotateState",value:function(t){return t[0].map(function(e,n){return t.map(function(t){return t[n]})})}},{key:"start",value:function(){"idle"===this.status&&(this.status="playing",this.generateRandomTile(),this.generateRandomTile())}},{key:"restart",value:function(){this.state=this.cloneState(this.initialState),this.score=0,this.status="idle"}},{key:"areStatesEqual",value:function(t,e){return t.every(function(t,n){return t.every(function(t,r){return t===e[n][r]})})}},{key:"getScore",value:function(){return this.score}},{key:"getState",value:function(){return this.state}},{key:"getStatus",value:function(){return this.status}},{key:"moveLeft",value:function(){this.move("left")}},{key:"moveRight",value:function(){this.move("right")}},{key:"moveUp",value:function(){this.move("up")}},{key:"moveDown",value:function(){this.move("down")}}],function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(r.prototype,t),r}()),a=document.querySelectorAll(".field-cell"),i=document.querySelector(".button.start"),s=document.querySelector(".game-score"),o=document.querySelector(".message-win"),u=document.querySelector(".message-lose"),l=document.querySelector(".message-start"),c=function(){o.classList.add("hidden"),u.classList.add("hidden"),l.classList.add("hidden")};function f(){var t=r.getState().flat();switch(a.forEach(function(e,n){e.className="field-cell",t[n]?(e.textContent=t[n],e.classList.add("field-cell--".concat(t[n]))):e.textContent=""}),s.textContent=r.getScore(),r.getStatus()){case"win":o.classList.remove("hidden");break;case"lose":u.classList.remove("hidden");break;default:o.classList.add("hidden"),u.classList.add("hidden")}}document.addEventListener("keydown",function(t){if("playing"===r.getStatus()){switch(t.key){case"ArrowLeft":r.moveLeft();break;case"ArrowRight":r.moveRight();break;case"ArrowUp":r.moveUp();break;case"ArrowDown":r.moveDown()}f()}}),i.addEventListener("click",function(){i.classList.contains("restart")&&r.restart(),r.start(),f(),c(),i.textContent="Restart",i.classList.add("restart")})}();
//# sourceMappingURL=index.285741d4.js.map
