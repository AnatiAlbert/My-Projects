
var RockIt = {
    init:function(){
        RockIt.mmenu();
        RockIt.headerScroll();
    },
    mmenu:function(){
        $("#menu").mmenu();
    },
    headerScroll:function(){
        var header = $('header');
        /// ON LOAD
        if($(window).scrollTop() >= 100){
            header.toggleClass('active')
        }
        // WHEN SCROLL
        $(window).scroll(function(){
            if($(window).scrollTop() >= 100){
                header.addClass('active')
            } else{
                header.removeClass('active')
            }
        })
    },
    slider:function(){

        $('.slick_home').slick({
            prevArrow:$('.custom_prev'),
            nextArrow:$('.custom_next')
        });

        // $('.slick_home').on('afterChange',function(event,slick,currentSlide,nextSlide){
        //     console.log(slick)
        // })
    },
    homeAlbums:function(){
        $.getJSON("js/json/albums.json",function(data){
           var template = "";

            data.albums.forEach(element=>{
                template += '<li class="album_list_item">'
                template +=  '<div class="item_cover" style="background:url(images/bin/albums/'+ element.cover +')"></div>'
                template +=     '<h4>'+ element.title +'</h4>'
                template +=     '<span>'+ element.year +'</span>'
                template +=     '<a href="'+ element.url+'" target="_blank">Get this record</a>'
                template += '</li>'
            })

            $('.home_albums_list').append(template);

            ScrollReveal().reveal('.album_list_item',{
                delay:500,
                distance:'50px',
                easing:'ease-in'
            })
        })
    },
    homeLoadEvents:function(){
        $.ajax({
            url:"http://localhost:3004/events",
            type:"GET",
            dataType:"json",
            success:function(res){
                RockIt.homeEvents(res)
            }
        })
    },
    homeEvents:function(events){
        var wrapper = $('.home_events_wrapper');
        var start = 0;
        var limit = 4;

        function createEvents(){
            var counter = 1;

            for(var i = start; i <= limit; i++){
                if(i <= events.length - 1){
                    var template =  ''

                    template += '<div class="event_item hidden element_'+ i+'">';
                    template +=     '<div>'+ events[i].date +'</div>'
                    template +=     '<div>'+ events[i].venue +'</div>'
                    template +=     '<div>'+ events[i].location +'</div>'

                    if(events[i].status){
                        template += '<div class="available"><span>Available</span></div>'
                    } else {
                        template += '<div class="available not"><span>Sold out</span></div>'
                    }

                    template += '</div>'

                    showEvents(template,counter,i)
                    counter++;
                } else {
                    $('.home_events_load_more_wrapper .btn').hide();
                }
            }

            start = start + 5;
            limit = limit + 5;
        }

        function listenToLoad(){
            $('.home_events_load_more_wrapper .btn').on('click',function(){
                createEvents();
            })
        }
        listenToLoad();

        function showEvents(template,counter,position){
            wrapper.append(template);

            setTimeout(function(){
                $('.element_' + position).removeClass('hidden')
            },200 * counter)
        }

        createEvents();
    }

}

$(function(){
    RockIt.init();
})