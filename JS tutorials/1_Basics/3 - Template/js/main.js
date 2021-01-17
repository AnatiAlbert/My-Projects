var user = ['Raymond','George'];
var price = [20,12,5];
var products = ['Potatoes','Apples','Lemmons'];

for(var i = 0; i < user.length; i++){
    
    if(user[i] === 'Raymond'){
        console.log(user[i]+ ' bought:');
        for(var x = 0; x < products.length; x++){
            console.log('.' + products[x] + '= $' + (price[x] - 3));
        }
    }else{
        console.log(user[i]+ ' bought:');
        for(var x = 0; x < products.length; x++){
            console.log('.' + products[x] + '= $' + price[x]);
    }
}
}