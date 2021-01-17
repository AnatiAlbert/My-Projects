var servers = [true,true,false,true];

function message(number){
    console.log('Server ' + number + '.Running...');
}

function restart(number){
    servers[number] = true;
    message(number);
}

for(var i = 0; i < servers.length; i++){

    if(servers[i]){
        message(i);
    } else{
        console.log('Server ' + i + ', down.Restarting...');
        restart(i);
    }
}