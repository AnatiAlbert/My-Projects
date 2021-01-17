
var awesomeQuiz = {
    settings:{
        results:[]
    },
    
    loadQuiz:function(){
        $('.panel_one h1').show("drop",500,function(){
            $('.start_quiz').addClass("started",500)
        });

        $('.start_quiz').on('click',function(){
            awesomeQuiz.showPanel(1);
            awesomeQuiz.listenNext();
        })
    },
    showPanel:function(position){
        var current = $('div[data-panel="'+ (position -1) +'"]')

        current.find('.wrapper').animate({left:"-=100px",opacity:0},500,function(){
            current.addClass('hidden');

            var next = $('div[data-panel="'+ position +'"]');
            next.removeClass('hidden');
            awesomeQuiz.showWrapper(next);
        });
    },
    showWrapper:function(next){
        var wrapper = next.find('.wrapper');

        wrapper.fadeIn('500',function(){
            awesomeQuiz.manageOption(next);
        })
    },
    manageOption:function(next){
        var options = next.find(".options");
        var childrens = options.find('div');
        var counter = 0;

        childrens.each(function(index,el){
            $(el).delay(counter).fadeIn(300)
            counter += 500;
        });

        childrens.on('click',function(){
            childrens.removeClass('active');
            next.addClass('valid');
            $(this).addClass('active');
        })
    },
    listenNext:function(){
        $('.next_question').on("click",function(){
            if(awesomeQuiz.validateSection($(this))){
                var next = $(this).data('next');
                awesomeQuiz.showPanel(next);
                awesomeQuiz.showProgressAndStore(next);
            }
        })
    },
    validateSection:function($this){
        var parent = $this.parents().eq(1);

        if(parent.hasClass('valid')){
            return true
        } else{
            $('.error').fadeIn('300',function(){
                $(this).delay(1000).fadeOut('300');
            });
            return false
        }
    },
    showProgressAndStore: function(panel){
        $('.progress .bar').animate({'width':'+=25%'},500);

        var options = $('div[data-panel="'+ (panel-1) +'"]').find('.options');
        options.find('div').each(function(index,el){
            if($(this).hasClass('active')){
                awesomeQuiz.settings.results.push($(this).text());
                console.log(awesomeQuiz.settings.results);
            }
        })
    }
}

$(document).ready(function(){
    awesomeQuiz.loadQuiz();
})