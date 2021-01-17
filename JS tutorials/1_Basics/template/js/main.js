var child = document.querySelector('.child');
var parent = document.querySelector('.parent');

function showChild(event){
    event.stopPropagation();
    event.target.style.background = 'blue';
    console.log('I am green !!');
}

function showParent(event){
    console.log('I am red !!');
}

child.addEventListener('click',showChild)
parent.addEventListener('click',showParent)
