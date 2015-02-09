 window.onload = function() {
        initCanvas();
      }
 	//espejo
      var context, sctxt, video;
      function initCanvas() {
    	  var radio=document.getElementsByName("controls");
          // Recorremos todos los valores del radio button para encontrar el
          // seleccionado
          for(var i=0;i<radio.length;i++)
          {
              if(radio[0].checked){
            	  video = document.getElementsByTagName("video")[0];
                  canvases = document.getElementsByTagName("canvas");
                  canvas = canvases[0];
                  scratch = canvases[1];
                  context = canvas.getContext("2d");
                  sctxt = scratch.getContext("2d");
                  video.addEventListener("play", paintFrame, false);  
              }else{
            	  
            	  //no sé cómo hacer que muestre en el canvas el video num2
            	  video = document.getElementsByTagName("video")[1];
                  canvases = document.getElementsById("canvas");
                  canvas = canvases[0];
                  scratch = canvases[1];
                  context = canvas.getContext("2d");
                  sctxt = scratch.getContext("2d");
                  video.addEventListener("play", paintFrame, false);
              }
                  
          }
        
      }
      function paintFrame() {
        
        var w = 320;
        var h = 160;
        sctxt.drawImage(video, 0, 0, w, h);
        
        // se cambia la anchura
        width = -250;
        // escala de la parte derecha
        scale = 2;

        // dimensiones del canvas
        cw = 1000; ch = 400;
        // número de columnas a dibujar
        columns = Math.abs(width);
        // mostrar el vídeo en espejo
        mirror = (width > 0) ? 1 : -1;
        ox = cw/2; oy= (ch-h)/2;
        sw = columns/w;
        sh = (h*scale-h)/columns;
        
        // bucle por cada pixel de la salida del video
        for (var x = 0; x < w; x++) {
          // columnas del video salida
          dx = ox + mirror*x*sw;
          dy = oy - x*sh/2;
          // escalar las columnas del canvas
          dw = sw;
          dh = h + x*sh;
          // dibujar la columna
          context.drawImage(scratch, x, 0, 1, h, dx, dy, dw, dh);	
        }
        if (video.paused || video.ended) {
          return;
        }
        setTimeout(function () {
            paintFrame();
        }, 0);
      }