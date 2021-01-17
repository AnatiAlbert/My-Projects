var myDatabase = [
    {name:'Captain Spora', email:'spora@gmail.com',age:25, gender:'male'},
    {name:'Kendle Matic', email:'kendle@gmail.com',age:26, gender:'male'},
    {name:'Remedy One', email:'remedy@gmail.com',age:27, gender:'male'},
];

(function Avatars(db){

    var init = function(){
        generateList();
        enterUser();
    }
    
    var generateList = function(){
        var parent = document.querySelector('#parent_avatars');
        var template = '';

        for(var i = 0; i < db.length; i++){
            
            template += '<div class="col-sm-4">';
            template +=     '<div class="card">';
            template +=         '<div class="card-delete" data-card="'+ i +'">X</div>';
            template +=              '<div class="card-block">';
            template +=                 '<h3 class="card-title">'+db[i].name+'</h3>';
            template +=                   '<p class="card-text">';
            template +=                      
             '<strong>Email</strong>:<span>'+db[i].email+'</span>';
            template +=                    '</p>';
            template +=                    '<p class="card-text">';
            template +=                       '<strong>Age</strong>:<span>'+db[i].age+'</span>';
            template +=                    '</p>';
            template +=                    '<p class="card-text">';
            template +=                       '<strong>Gender</strong>:<span>'+db[i].gender+'</span>';
            template +=                    '</p>';
            template +=         '</div>';
            template +=     '</div>';
            template += '</div>';
                    
        }

        parent.innerHTML = '';
        parent.insertAdjacentHTML('afterbegin',template);
        deleteCard();
        
    }

    var enterUser = function(){

        function grabUser(){

            var name = document.querySelector('#user_name').value;
            var email = document.querySelector('#user_email').value;
            var age = document.querySelector('#user_age').value;
            var gender = document.querySelector('#user_gender').value;

            var elements = [name,email,age,gender]

            if(validateUser(elements)){
                document.querySelector('#myForm').reset();
                db.push({name:name,email:email,age:age,gender:gender})
                generateList();

            }else{
                
                document.querySelector('#error').style.display = 'block';
                setTimeout(function(){
                    document.querySelector('#error').style.display = 'none';
                },2000)
            }

        }
        
        document.querySelector('#myForm').addEventListener("submit",function(event){
            event.preventDefault();
            grabUser();
        })

    }

    var validateUser = function(elements){
        for(var i = 0; i < elements.length; i++){
            if(elements[i] ==""){
                return false
                // kill
            }
        }
        return true
    }

    var deleteCard = function(){
        var buttons = document.querySelectorAll('.card-delete');

        function deleteThis(element){
            var obj = parseInt(element.getAttribute('data-card'))
            db.splice(obj,1);
            generateList();
        
        }
        
        for(var i = 0; i < buttons.length; i++){
            buttons[i].addEventListener('click',function(e){
                deleteThis(this);
            })
        }

    }

    init();
}(myDatabase))