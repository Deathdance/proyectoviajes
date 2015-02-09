{"changed":true,"filter":false,"title":"espejo.js","tooltip":"/canvas/espejo.js","value":" window.onload = function() {\n        initCanvas();\n      }\n \t//espejo\n      var context, sctxt, video;\n      function initCanvas() {\n    \t  var radio=document.getElementsByName(\"controls\");\n          // Recorremos todos los valores del radio button para encontrar el\n          // seleccionado\n          for(var i=0;i<radio.length;i++)\n          {\n              if(radio[0].checked){\n            \t  video = document.getElementsByTagName(\"video\")[0];\n                  canvases = document.getElementsByTagName(\"canvas\");\n                  canvas = canvases[0];\n                  scratch = canvases[1];\n                  context = canvas.getContext(\"2d\");\n                  sctxt = scratch.getContext(\"2d\");\n                  video.addEventListener(\"play\", paintFrame, false);  \n              }else{\n            \t  \n            \t  //no sé cómo hacer que muestre en el canvas el video num2\n            \t  video = document.getElementsByTagName(\"video\")[1];\n                  canvases = document.getElementsById(\"canvas\");\n                  canvas = canvases[0];\n                  scratch = canvases[1];\n                  context = canvas.getContext(\"2d\");\n                  sctxt = scratch.getContext(\"2d\");\n                  video.addEventListener(\"play\", paintFrame, false);\n              }\n                  \n          }\n        \n      }\n      function paintFrame() {\n        \n        var w = 320;\n        var h = 160;\n        sctxt.drawImage(video, 0, 0, w, h);\n        \n        // se cambia la anchura\n        width = -250;\n        // escala de la parte derecha\n        scale = 2;\n\n        // dimensiones del canvas\n        cw = 1000; ch = 400;\n        // número de columnas a dibujar\n        columns = Math.abs(width);\n        // mostrar el vídeo en espejo\n        mirror = (width > 0) ? 1 : -1;\n        ox = cw/2; oy= (ch-h)/2;\n        sw = columns/w;\n        sh = (h*scale-h)/columns;\n        \n        // bucle por cada pixel de la salida del video\n        for (var x = 0; x < w; x++) {\n          // columnas del video salida\n          dx = ox + mirror*x*sw;\n          dy = oy - x*sh/2;\n          // escalar las columnas del canvas\n          dw = sw;\n          dh = h + x*sh;\n          // dibujar la columna\n          context.drawImage(scratch, x, 0, 1, h, dx, dy, dw, dh);\t\n        }\n        if (video.paused || video.ended) {\n          return;\n        }\n        setTimeout(function () {\n            paintFrame();\n        }, 0);\n      }","undoManager":{"mark":-1,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":72,"column":7},"action":"insert","lines":[" window.onload = function() {","        initCanvas();","      }"," \t//espejo","      var context, sctxt, video;","      function initCanvas() {","    \t  var radio=document.getElementsByName(\"controls\");","          // Recorremos todos los valores del radio button para encontrar el","          // seleccionado","          for(var i=0;i<radio.length;i++)","          {","              if(radio[0].checked){","            \t  video = document.getElementsByTagName(\"video\")[0];","                  canvases = document.getElementsByTagName(\"canvas\");","                  canvas = canvases[0];","                  scratch = canvases[1];","                  context = canvas.getContext(\"2d\");","                  sctxt = scratch.getContext(\"2d\");","                  video.addEventListener(\"play\", paintFrame, false);  ","              }else{","            \t  ","            \t  //no sé cómo hacer que muestre en el canvas el video num2","            \t  video = document.getElementsByTagName(\"video\")[1];","                  canvases = document.getElementsById(\"canvas\");","                  canvas = canvases[0];","                  scratch = canvases[1];","                  context = canvas.getContext(\"2d\");","                  sctxt = scratch.getContext(\"2d\");","                  video.addEventListener(\"play\", paintFrame, false);","              }","                  ","          }","        ","      }","      function paintFrame() {","        ","        var w = 320;","        var h = 160;","        sctxt.drawImage(video, 0, 0, w, h);","        ","        // se cambia la anchura","        width = -250;","        // escala de la parte derecha","        scale = 2;","","        // dimensiones del canvas","        cw = 1000; ch = 400;","        // número de columnas a dibujar","        columns = Math.abs(width);","        // mostrar el vídeo en espejo","        mirror = (width > 0) ? 1 : -1;","        ox = cw/2; oy= (ch-h)/2;","        sw = columns/w;","        sh = (h*scale-h)/columns;","        ","        // bucle por cada pixel de la salida del video","        for (var x = 0; x < w; x++) {","          // columnas del video salida","          dx = ox + mirror*x*sw;","          dy = oy - x*sh/2;","          // escalar las columnas del canvas","          dw = sw;","          dh = h + x*sh;","          // dibujar la columna","          context.drawImage(scratch, x, 0, 1, h, dx, dy, dw, dh);\t","        }","        if (video.paused || video.ended) {","          return;","        }","        setTimeout(function () {","            paintFrame();","        }, 0);","      }"]}]}]]},"ace":{"folds":[],"scrolltop":798.5,"scrollleft":0,"selection":{"start":{"row":72,"column":7},"end":{"row":72,"column":7},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":48,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1423044681000}