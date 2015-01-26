var mainslider;

$(document).ready(function(){
    var options = {
        slides: '.slide', // El nombre del slide en el slidesContainer
        swipe: true,    // Añade la posibilidad de Swipe > tienes que añadir touchSwipe para esto
        transition: "slide", // Acepta "slide" y "fade" para un slide o fade de transicion
        slideTracker: true, // Añade un UL con una lista de objetos para rastrear el slide actual
        slideTrackerID: 'slideposition', // El nombre del UL que rastrea los slides
        slideOnInterval: true, // Intervalos en el Slide
        interval: 12000, // Intervalos en el slide si slideOnInterval esta habilitado
        animateDuration: 3000, // Duracion de la animacion
        animationEasing: 'ease', // Acepta: linear ease in out in-out snap easeOutCubic easeInOutCubic easeInCirc easeOutCirc easeInOutCirc easeInExpo easeOutExpo easeInOutExpo easeInQuad easeOutQuad easeInOutQuad easeInQuart easeOutQuart easeInOutQuart easeInQuint easeOutQuint easeInOutQuint easeInSine easeOutSine easeInOutSine easeInBack easeOutBack easeInOutBack
        pauseOnHover: false // Pausa cuando el usuario pasa por encima del contenedor del slide
    };

    $(".slider").simpleSlider(options);
    mainslider = $(".slider").data("simpleslider");

    // Funcion fade para antes del transito del slide
    $(".slider").on("beforeSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider .slide[data-index='"+prevSlide+"'] .slidecontent").fadeOut();
        $(".slider .slide[data-index='"+newSlide+"'] .slidecontent").hide();
    });

    // Funcion fade para despues del transito del slide
    $(".slider").on("afterSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider .slide[data-index='"+newSlide+"'] .slidecontent").fadeIn();
    });

    // Establecer fondos a los diferentes Slides
    $(".slide#first").backstretch("images/europa.jpg");
    $(".slide#sec").backstretch("images/saintemilion.jpg");
    $(".slide#thirth").backstretch("images/monpazier1.png");
    $(".slide#fourth").backstretch("images/cueva.jpg");

    $('.slide .backstretch img').on('dragstart', function(event) { event.preventDefault(); });

    $(".slidecontent").each(function(){
        $(this).css('margin-top', -$(this).height()/2);
    });
});
