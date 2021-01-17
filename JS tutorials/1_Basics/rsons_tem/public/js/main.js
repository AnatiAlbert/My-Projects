var RockIt = {
    init:function(){
        RockIt.mmenu();
        RockIt.headerScroll();
    },
    mmenu:function(){
        $("#menu").mmenu();
    },
    headerScroll:function(){
        var header = $('.header');

        //// on load
        if($(window).scrollTop() >= 100){
            header.toggleClass('active');
        }

        /// when scroll
        $(window).scroll(function(){
            if($(window).scrollTop()){
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
        //     console.log(currentSlide);
        // })
    },
    homeAlbums:function(){
        $.getJSON("js/json/albums.json",function(data){
            var template = "";

            data.albums.forEach(element=>{
                template += '<li class="album_list_item">'
                template +=     '<div class="item_cover" style="background:url(images/bin/albums/'+ element.cover +')"></div>'
                template +=        '<h4>'+element.title+'</h4>'
                template +=         '<span>'+element.year+'</span>'
                template +=         '<a href="'+element.url+'"target="_blank">Get this record</a>'
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
            url:" http://localhost:3004/events",
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

                var template = ""

                template += '<div class="event_item hidden element_'+i+'">';
                template += '<div>'+ events[i].date+'</div>'
                template += '<div>'+ events[i].venue+'</div>'
                template += '<div>'+ events[i].location+'</div>'

                if(events[i].status){
                    template += '<div class="available"><span>Available</span></div>'
                } else{
                    template += '<div class="available not"><span>Sold out</span></div>'
                }
                template += '</div>'

                showEvents(template,counter,i);
                counter++;
            } else{
                $('.home_events_load_more_wrapper .btn').hide();
            }
            }

            start = start + 5;
            limit = limit + 5;

            function listenToLoad(){
                $('.home_events_load_more_wrapper .btn').on('click',function(){
                    createEvents();
                })
            }
            listenToLoad();
        }

        function showEvents(template,counter,position){
            wrapper.append(template);

            setTimeout(function(){
                $('.element_' + position).removeClass('hidden')
            },200 * counter)
        }

        createEvents();
    },
    subscribeWidgetStart:function(){
        var wrapper = $('.subscribe_widget');
        var template = "";

        template += '<div class="subscribe_wrapper container">'
        template +=  '<div class="col">'
        template +=   '<h3>Subscribe</h3>'
        template +=   '<span>Sign up for new releases every month</span>'
        template +=  '</div>'
        template +=  '<div class="col">'
        template +=   '<div class="subscribe_input_wrapper">'
        template +=    '<div>'
        template +=     '<input type="text" id="subscribe_email">'
        template +=    '</div>'
        template +=    '<div>'
        template +=     '<div class="btn">Subscribe</div>'
        template +=    '</div>'
        template +=    '<div class="error_wrapper"></div>'
        template +=    '<div class="success_wrapper"></div>'
        template +=   '</div>'
        template +=  '</div>'
        template += '</div>'

        wrapper.append(template)
        RockIt.subscribeWidgetInputs();
    },
    subscribeWidgetInputs:function(){
        var subscribe = $('.subscribe_widget .btn');

        subscribe.click(function(){
            var email = $('#subscribe_email');
            
            if(validateInput(email.val())){
                checkUserEmail(email.val());
            } else{
                showError('Sorry, something is wrong');
            }
        })

        function checkUserEmail(email){
            $.ajax({
                url:"http://localhost:3004/email?email_like=" + email,
                type:"GET",
                dataType:"json",
                success:function(res){
                    if(res.length <= 0){
                        addUserToEmail(email)
                    } else{
                        showError('Sorry, your email already exists.')
                    }
                }
            })
        }

        function addUserToEmail(email){
            $.ajax({
                url:"http://localhost:3004/email",
                type:"GET",
                dataType:"json",
                contentType:"application/json",
                data: JSON.stringify({email:email}),
                success:function(res){
                    var success = $('.subscribe_widget .success_wrapper');

                    $('#subscribe_email').val('');
                    success.text('thank you !!')
                    setTimeout(function(){
                        success.text('')
                    },1000)
                }
            })
        }

        function showError(message){
            var error = $('.subscribe_widget .error_wrapper')
            error.text(message)
            setTimeout(function(){
                error.text('');
            },1000)
        }

        function validateInput(email){
            var regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if(email === ""){
                return false;
            }
            if(!regEmail.test(email)){
                return false;
            }
            return true;
        }
    },
    getRandomNumber:function(start,end){
        return Math.floor(Math.random() * end) + start;
    },
    masonryConfig:[],
    masonryLimit:'5',
    masonryStartGallery:function(start,limit){
        $.ajax({
            url:"http://localhost:3004/gallery?_start="+start+"&_limit="+limit,
            type:"GET",
            success:function(response){
                RockIt.masonryRenderBlock(response);
                RockIt.masonryConfig = [start,limit];
                RockIt.masonryLimit = limit;
            }
        })
    },
    masonryRenderBlock:function(elements){
        var wrapper = $('.gallery_masonry_grid');
        var template = "";

        elements.forEach(function(element){
            template += '<div class="grid-item grid-height-'+RockIt.getRandomNumber(1,5) +'" style="background:url(images/gallery/'+ element.location_small+')" data-image="'+ element.location+'">';
            template += '<div></div>'
            template += '</div>'
        })

        wrapper.append(template);
        wrapper.masonry({
            itemSelector: '.grid-item'
        })
        wrapper.on('layoutComplete',RockIt.masonryAddBlock())
    },
    masonryAddBlock:function(){
        var btn = $('.masonry_load_more')

        btn.click(function(){
            var start = RockIt.masonryConfig[0] + RockIt.masonryConfig[1];

            btn.hide();
            $.ajax({
                url:"http://localhost:3004/gallery?_start="+start+"&_limit="+RockIt.masonryLimit,
                type:"GET",
                success:function(response){
                    RockIt.masonryConfig = [start,RockIt.masonryLimit];
                    addNewBlock(response,btn,start);
                    // RockIt.masonryRenderBlock(response);
                    // RockIt.masonryLimit = limit;
                }
            })
        })

        function addNewBlock(elements,btn,start){
            var wrapper = $('.gallery_masonry_grid');
            var template = "";

            elements.forEach(function(element){
                template += '<div class="grid-item grid-height-'+RockIt.getRandomNumber(1,5) +'" style="background:url(images/gallery/'+ element.location_small+')" data-image="'+ element.location+'">';
                template += '<div></div>'
                template += '</div>'
            });

            var $box = $(template);
            wrapper.append($box).masonry('appended',$box);

            if(elements.length === RockIt.masonryLimit){
                btn.show();
            }
        }
    },
    contactForm:function(){
        $('#contact_form').validate({
            rules:{
                contact_message:{
                    required: true,
                    minlength:20
                },
                contact_name:{
                    required: true,
                    maxlength:100
                },
                contact_email:{
                    required: true,
                    email: true
                }
            },
            messages:{
                contact_message:{
                    required:"Sorry, this field is required :(",
                    minlength:"really less than 20 really?"
                }, 
                contact_name:{
                    required:"Sorry, this field is required :(",
                    maxlength:"Sorry, only 100 chars"
                },
                contact_email:{
                    required:"Sorry, this field is required :(",
                    email:"this must be an email"
                }
            },
            submitHandler:function(form){
                var contact = {
                    message:$('#contact_message').val(),
                    name:$('#contact_name').val(),
                    email:$('#contact_email').val()
                }

                $.ajax({
                    url:"http://localhost:3004/contact",
                    type:"POST",
                    dataType:"json",
                    contentType:"application/json",
                    data: JSON.stringify(contact),
                    success: function(res){
                        var element = $('contact_form');
                        var success = element.find('.success');

                        element.find('input, textarea').val('');
                        success.text('Thank you, we will check it later')
                        setTimeout(function(){
                            success.text('')
                        },2000)
                    }
                })
            }
        });
    }
}

$(function(){
    RockIt.init();
    
})