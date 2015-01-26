/*
    Version 2.5.1
    The MIT License (MIT)

    Simple jQuery Slider is just what is says it is: a simple but powerfull jQuery slider.
    Copyright (c) 2014 Dirk Groenen - Bitlabs Development

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
*/
(function($){
    var simpleSlider = function(element, useroptions){
        // Establece variables
        var obj = this,
            sliderInterval = null;
        obj.currentSlide = 0;
        obj.totalSlides = 0;

        // Extiende las opciones por defecto con las opciones del usuario
        useroptions = (useroptions === undefined) ? {} : useroptions;
        var options = $.extend({
            slidesContainer: element,
            slides: '.slide',
            slideTracker: true,
            slideTrackerID: 'slideposition',
            slideOnInterval: true,
            interval: 5000,
            swipe: true,
            magneticSwipe: true, 
            transition: "slide",
            animateDuration: 1000,
            animationEasing: 'ease',
            pauseOnHover: false,
            updateTransit: true, // Cambia a falsesi no quieres que el slider actualice el transuto userTransitionEnd a verdadero
            useDefaultCSS: true
        }, useroptions);

       
        /*
         * Metodo para crear e iniciar el slider
         */
        obj.init = function(){
            // Si el transito esta habilitado y userTransitionEnd == false , cambiaremos esto a true (mejor rendimiento de animacion). 
            // Anoser que el usuario cambie updateTransit a false
            
            if(options.updateTransit && $.support.transition && jQuery().transition && !$.transit.useTransitionEnd){
                $.transit.useTransitionEnd = true;
            }

            // Cuenta el total de slides
            obj.totalSlides = $(options.slidesContainer).find(options.slides).length;

            var cacheWidth = 0;
          
            // Añade posicionamiento por defecto al css cuando este habilitado
            if(options.useDefaultCSS){
                $(options.slidesContainer).css({
                    position: "relative",
                    overflow: "hidden"
                });
            }

            // Busca los slides en sliderdom y añade el atributo index
            $(options.slidesContainer).find(options.slides).each(function(index){
                // Pone a cada slide un data-index para que podamos controlarlos mas adelante
                $(this).attr('data-index', index);
                cacheWidth = ($(this).outerWidth() > cacheWidth) ? $(this).outerWidth() : cacheWidth;

                // Añade css para el transito del slide
                if(options.transition == "slide"){
                    // Se necesita un width fijo para la animacion izquierda del IE. Aqui se le da a cada slide un width
                    if($.support.transition !== undefined){
                        $(this).css({
                            x: index * 100 + '%',
                            'z-index': obj.totalSlides - index,
                            width: cacheWidth
                        });
                    }
                    else{
                        $(this).css({
                            lef : index * 100 + '%',
                            'z-index': obj.totalSlides - index,
                            width: cacheWidth
                        });
                    }
                }

                // Añade css para la transicion de fade
                if(options.transition == "fade"){
                    // Se necesita un width fijo para la animacion izquierda del IE. Aqui se le da a cada slide un width 
                    var alpha = (index == 0) ? 1 : 0;
                    $(this).css({
                        left: 0,
                        top: 0,
                        'z-index': obj.totalSlides - index,
                        width: cacheWidth,
                        opacity: alpha
                    });
                }

                // Añade un posicionamiento por defecto cuando este habilitado
                if(options.useDefaultCSS){
                    $(this).css({
                        position: "absolute",
                        float: "left",
                        height: "100%",
                        top: 0
                    });
                }
            });

            // Introduce el slideTraker despues del contenedor si se habilita esta opcion
            if(options.slideTracker){
                // Añade el slideposition div y los indicadores
                $(options.slidesContainer).after("<div id='"+ options.slideTrackerID +"'><ul></ul></div>");
                for(var x = 0; x < obj.totalSlides;x++){
                    $('#'+ options.slideTrackerID +' ul').append('<li class="indicator" data-index="'+x+'"></li>');
                }
                $('#'+ options.slideTrackerID +' ul li[data-index="'+obj.currentSlide+'"]').addClass('active');

                // Hace los indicadores del slide clicables
                $("#"+ options.slideTrackerID +" ul li").click(function(){
                    if(!($(this).hasClass("active")))
                        obj.nextSlide($(this).data('index'));
                });
            }

            // Empiezan los intervalos del slider si se habilita
            if(options.slideOnInterval){
                setSliderInterval();
            }

            // Cambia el cursor a una mano agarrando para simular el movimiento de escritorios
            if(options.swipe || options.magneticSwipe){
                // Establece la mano que agarra
                $(options.slidesContainer).css('cursor','-webkit-grab');
                $(options.slidesContainer).css('cursor','-moz-grab');
                $(options.slidesContainer).css('cursor','grab');

                // Establece variables para el movimiento
                var isDragging = false;
                var startPosition = {x: 0, y: 0};
                var percentageMove = 0;
                var slideWidth = $(options.slidesContainer).width();

                // Comprueba que eventos tactiles se usaran
                var touchstartEvent = (window.navigator.msPointerEnabled) ? "MSPointerDown" : "touchstart";
                var touchmoveEvent = (window.navigator.msPointerEnabled) ? "MSPointerMove" : "touchmove";
                var touchendEvent = (window.navigator.msPointerEnabled) ? "MSPointerUp" : "touchend";

                // Enlaza el evento mousedown o el touchstart
                $(options.slidesContainer).on(touchstartEvent + " mousedown", function(e){
                    // Establece isDragging a verdadero
                    isDragging = true;
                    
                    // Guarda coodernadas de inicio
                    startPosition = {
                        x: (e.pageX != undefined) ? e.pageX : e.originalEvent.touches[0].pageX,
                        y: (e.pageY != undefined) ? e.pageY : e.originalEvent.touches[0].pageY
                    };

                    // Resetea la animacion de transicion
                    if(options.magneticSwipe)
                        $(options.slidesContainer).find(options.slides).css('transition', 'none');

                    // Resetea el porcentaje de movimiento
                    percentageMove = 0;

                    // Establece el cursor del raton
                    $(options.slidesContainer).css('cursor','-webkit-grabbing');
                    $(options.slidesContainer).css('cursor','-moz-grabbing');
                    $(options.slidesContainer).css('cursor','grabbing');
                });

                // Enlaza el evento mousemove o touchmove
                $(options.slidesContainer).on(touchmoveEvent + " mousemove", function(e){
                    if(isDragging){
                        // Calcula la distancia dada en pixels a porcentaje
                        var x = (e.pageX != undefined) ? e.pageX : e.originalEvent.touches[0].pageX;
                        percentageMove = ((startPosition.x - x) / slideWidth) * 100;

                        // Comprueba si el movimiento magnetico esta habilitado
                        if(options.magneticSwipe){
                            // Mueve los slides
                            obj.manualSlide(percentageMove);    
                        }
                    }
                });

                // Enlaza el evento mouseup o touchend
                $(options.slidesContainer).on(touchendEvent + " mouseup", function(e){
                    isDragging = false;

                    // Comprueba si tenemos que llamar al siguiente slide o al anterior, o resetear los slides.
                    if((percentageMove > 25 && obj.currentSlide < (obj.totalSlides - 1)))
                        obj.nextSlide();
                    else if(percentageMove < -25 && obj.currentSlide > 0)
                        obj.prevSlide();    
                    else
                        obj.resetSlides();

                    // Resetea el cursor del raton
                    $(options.slidesContainer).css('cursor','-webkit-grab');
                    $(options.slidesContainer).css('cursor','-moz-grab');
                    $(options.slidesContainer).css('cursor','grab');
                });
            }
            
            // Añade evento al init
            $(element).trigger({
                type: "init",
                totalSlides: obj.totalSlides
            });
        }();

        // Enlaza una funcion que recalcula el width de cada slide en cada cambio de tamaño.
        $(window).resize(function(){
            var cacheWidth = 0;
        
            $(options.slidesContainer).find(options.slides).each(function(index){
                // Resetea el width: sino se mantendra el mismo width que antes
                $(this).css('width','');
                
                cacheWidth = ($(this).outerWidth() > cacheWidth) ? $(this).outerWidth() : cacheWidth;
                
                $(this).css({x: ($(this).data('index') - obj.currentSlideindex) * 100 + '%', width: cacheWidth});
            });
        });

        /*
         * Establece los intervalos del slide
         */
        function setSliderInterval(){
            clearInterval(sliderInterval);
            sliderInterval = setInterval(function(){
                obj.nextSlide();
            },options.interval);
        };

        /*
         * Compensa manualmente el slider con el porcentaje dado
         *
         * @param int percentage
         */
        obj.manualSlide = function(percentage){
            // Mueve los slides basados en un porcentaje calculado
            $(options.slidesContainer).find(options.slides).each(function(index){
                if(options.transition == "slide"){                    
                    if ($.support.transition && jQuery().transition)
                        $(this).stop().css({x: (($(this).data('index') - obj.currentSlide) * 100) - percentage + '%'});
                    else
                        $(this).stop().css({left: (($(this).data('index') - obj.currentSlide) * 100) - percentage + '%'});
                }
            });
        };

        /*
         * Resetea los slides a su posicion dada. Usado despues de una accion manualSlide
         */
        obj.resetSlides = function(){
            $(options.slidesContainer).find(options.slides).each(function(index){
              if(options.transition == "slide"){                    
                if ($.support.transition && jQuery().transition)
                    $(this).stop().transition({x: ($(this).data('index')-obj.currentSlide)*100+'%'}, options.animateDuration, options.animationEasing);
                else
                    $(this).stop().animate({left: ($(this).data('index')-obj.currentSlide)*100+'%'}, options.animateDuration);
                }
            });
        };

        /*
         * Ir al slide previo, llama al ultimo slide cuando no hay slides previos
         */
        obj.prevSlide = function(){
            var slide = (obj.currentSlide > 0) ? obj.currentSlide -= 1 : (obj.totalSlides - 1);
            obj.nextSlide(slide);
        };

        /*
         * Va al siguiente slide (la funcion tambien es usada para el slide anterior y para ir a las funciones slides)
         * Si se le introduce un parametro este ira al correspondiente slide
         *
         * @param1 int slide
         */
        obj.nextSlide = function(slide){
            // Guarda en cache el numero de slide anterior y establece el slided a falso
            var prevSlide = obj.currentSlide,
                slided = false;

            if(slide === undefined)
                obj.currentSlide = (obj.currentSlide < (obj.totalSlides-1)) ? obj.currentSlide += 1 : 0 ;
            else
                obj.currentSlide = slide;

            // Crea un trigger antes de que un slide se deslice. El trigger devuelve el numero del slide anteriro y del siguiente
            $(element).trigger({
                type: "beforeSliding",
                prevSlide: prevSlide,
                newSlide: obj.currentSlide
            });

            // Animacion de Slide, aqui determinamos si podemos usar transiciones de CSS (transit.js) o tener que usar animacion JQuery
            $(options.slidesContainer).find(options.slides).each(function(index){
            
                if(options.transition == "slide"){                    
                    if ($.support.transition && jQuery().transition)
                        $(this).stop().transition({x: ($(this).data('index')-obj.currentSlide)*100+'%'}, options.animateDuration, options.animationEasing);
                    else
                        $(this).stop().animate({left: ($(this).data('index')-obj.currentSlide)*100+'%'}, options.animateDuration, triggerSlideEnd);
                }
                
                if(options.transition == "fade"){
                    var alpha = (index == obj.currentSlide) ? 1 : 0;

                    if(index == obj.currentSlide){
                        $(this).show();
                    }

                    if ($.support.transition && jQuery().transition)
                        $(this).stop().transition({opacity: alpha}, options.animateDuration, triggerSlideEnd);
                    else
                        $(this).stop().animate({opacity: alpha}, options.animateDuration, triggerSlideEnd);
                }
            
            });

            // Si por algun motivo el callback de $.transition no funciona, creamos nuestro propio enlace aqui
            $(options.slidesContainer).on('oTransitionEnd webkitTransitionEnd oTransitionEnd otransitionend transitionend', triggerSlideEnd);

            // Creamos un trigger despues del movimiento del slide. Todos los slides devuelven un TransitionEnd; para prevenir la repeticion de un trigger, mantenemos la variable slided
            function triggerSlideEnd(){
                if(!slided){
                    if(options.transition == "fade"){
                        $(options.slidesContainer).children(options.slides).each(function(index){
                            if($(this).data('index') == obj.currentSlide){
                                $(this).show();
                            }
                            else{
                                $(this).hide();
                            }
                        });
                    }
                
                    // Evento Trigger
                    $(element).trigger({
                        type: "afterSliding",
                        prevSlide: prevSlide,
                        newSlide: obj.currentSlide
                    });

                    slided = true;
                }
            }

            // Muestra el monton de slide actual
            $('#'+ options.slideTrackerID +' ul li').removeClass('active');
            $('#'+ options.slideTrackerID +' ul li[data-index="'+obj.currentSlide+'"]').addClass('active');

            // Resetea/Establece el intervalo del slide
            if(options.slideOnInterval){
                setSliderInterval();
            }
        };

        // Funcion para el pauseOnHover.
        // La funcion dejara en blanco el intervalo y lo reseteara despues de que el raton desaparezca del contenedor
        if(options.pauseOnHover){
            $(options.slidesContainer).hover(function(){
                clearInterval(sliderInterval);
            }, function(){
                setSliderInterval();
            });
        }
    };

    // Crea un pluggin
    $.fn.simpleSlider = function(options){
        return this.each(function(){
            var element = $(this);

            // Devuelve antes de tiempo si este elemento ya tiene un pluggin instanciado
            if (element.data('simpleslider')) return;

            // Pasa opciones y elementos al contenedor del pluggin
            var simpleslider = new simpleSlider(this, options);

            // Almacena el objeto del pluggin en lso datos de este elemento
            element.data('simpleslider', simpleslider);
        });
    }
})(jQuery);
