const t=new class{constructor(t=Array.from({length:4},()=>[,,,,].fill(0))){this.score=0,this.status="idle",this.initialState=t,this.state=this.cloneState(this.initialState)}cloneState(t){return t.map(t=>[...t])}generateRandomTile(){let t=this.getEmptyTiles();if(0===t.length)return;let[e,s]=t[Math.floor(Math.random()*t.length)];this.state[e][s]=.9>Math.random()?2:4}getEmptyTiles(){let t=[];return this.state.forEach((e,s)=>{e.forEach((e,a)=>{0===e&&t.push([s,a])})}),t}move(t){if("playing"!==this.status)return;let e=this.cloneState(this.state);this.state=this.processMove(t),this.areStatesEqual(this.state,e)||(this.generateRandomTile(),this.validateGameState())}processMove(t){let e=t=>{let e=t.filter(t=>0!==t),s=[];for(let t=0;t<e.length;t++)e[t]===e[t+1]?(s.push(2*e[t]),this.score+=2*e[t],t++):s.push(e[t]);return[...s,...Array(4-s.length).fill(0)]},s=(t,s=!1)=>t.map(t=>s?e(t.reverse()).reverse():e(t));switch(t){case"left":return s(this.state);case"right":return s(this.state,!0);case"up":return this.rotateState(s(this.rotateState(this.state)));case"down":return this.rotateState(s(this.rotateState(this.state),!0));default:return this.state}}validateGameState(){this.state.flat().includes(2048)?this.status="win":this.hasEmptyCells()||this.canCombine()||(this.status="lose")}hasEmptyCells(){return this.state.some(t=>t.includes(0))}canCombine(){return this.state.some((t,e)=>t.some((s,a)=>a<3&&s===t[a+1]||e<3&&s===this.state[e+1][a]))}rotateState(t){return t[0].map((e,s)=>t.map(t=>t[s]))}start(){"idle"===this.status&&(this.status="playing",this.generateRandomTile(),this.generateRandomTile())}restart(){this.state=this.cloneState(this.initialState),this.score=0,this.status="idle"}areStatesEqual(t,e){return t.every((t,s)=>t.every((t,a)=>t===e[s][a]))}getScore(){return this.score}getState(){return this.state}getStatus(){return this.status}moveLeft(){this.move("left")}moveRight(){this.move("right")}moveUp(){this.move("up")}moveDown(){this.move("down")}},e=document.querySelectorAll(".field-cell"),s=document.querySelector(".button.start"),a=document.querySelector(".game-score"),i=document.querySelector(".message-win"),r=document.querySelector(".message-lose"),n=document.querySelector(".message-start"),o=()=>{i.classList.add("hidden"),r.classList.add("hidden"),n.classList.add("hidden")};function l(){let s=t.getState().flat();switch(e.forEach((t,e)=>{t.className="field-cell",s[e]?(t.textContent=s[e],t.classList.add(`field-cell--${s[e]}`)):t.textContent=""}),a.textContent=t.getScore(),t.getStatus()){case"win":i.classList.remove("hidden");break;case"lose":r.classList.remove("hidden");break;default:i.classList.add("hidden"),r.classList.add("hidden")}}document.addEventListener("keydown",e=>{if("playing"===t.getStatus()){switch(e.key){case"ArrowLeft":t.moveLeft();break;case"ArrowRight":t.moveRight();break;case"ArrowUp":t.moveUp();break;case"ArrowDown":t.moveDown()}l()}}),s.addEventListener("click",()=>{s.classList.contains("restart")&&t.restart(),t.start(),l(),o(),s.textContent="Restart",s.classList.add("restart")});
//# sourceMappingURL=index.01501d46.js.map
