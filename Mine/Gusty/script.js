class Shirt{
    constructor(sleeves, neck, chest, length){
        this.sleeves = sleeves;
        this.neck = neck;
        this.chest = chest;
        this.length = length;
    }
}

let myShirt = new Shirt('short sleeves', 8, 'wide', 25);

console.log(myShirt);

let whiteShirt = [1, 2, 3, 4, 5, 6, 7, 8];

for (let i in whiteShirt){
    console.log(i + " white shirts");
}

let buttons = 10;
let trousers = 11; 

let fixed = 0;

while (buttons > 0 && trousers > 0){
    console.log(fixed + ' fixed trousers');
    buttons--;
    trousers--;
    fixed++;
}

class Fashion{
    constructor(totalPrice){
        this.totalPrice = totalPrice;
    }
    showPrice(){
        console.log('The  total price of clothing'+
         ' is '+this.totalPrice + 'GHC');
    }
    add(trousers){
        console.log('The trousers is '+ trousers);
    }
    skirtPrice(skirt){
        console.log('The skirt price is '+skirt+'GHC')
        this.totalPrice += skirt;
        thi
    }
}

const newFashion = new Fashion(50); 
newFashion.showPrice();
newFashion.add('fittings');

const shorts = () =>{
    let length = 75;
    let waist = 35;
    let legWidth = 23;
    console.log('The length is ' + length + ', the waist is ' + waist + ', the thigh width is '+ legWidth +'.')
}

shorts();
