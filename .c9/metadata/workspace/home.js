{"filter":false,"title":"home.js","tooltip":"/home.js","undoManager":{"mark":2,"position":2,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["","var isExtended = 0;","function slideSideBar(){","\tnew Effect.toggle('sideBarContents', 'blind', {scaleX: 'true', scaleY: 'true;', scaleContent: false});","if(isExtended==0){","new Effect.Fade('sideBarContents',","  \t{ duration:1.0, from:0.0, to:1.0 });","isExtended++;","}","else{","new Effect.Fade('sideBarContents',"," { duration:1.0, from:1.0, to:0.0 });","\tisExtended=0;","}}","function init(){","  Event.observe('sideBarTab', 'click', slideSideBar, true);","}","Event.observe(window, 'load', init, true);","","",""]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":18,"column":0},"end":{"row":18,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1418375834553,"hash":"da261208f81ff40f0d9dc2d2a9adca604ffec49d"}