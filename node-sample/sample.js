const name = 'Prga';
let age = 30;
const isFemale = true;

function summary(username, userage, isfemale){

    return (

        'Name is : ' +
        username + 
        ' Age is: ' +
        userage+
        ' Is female : '+ 
        isfemale
    );
}

const add = (a,b) => a+b;

const addOne = a => a+1;

const addRandom = () => 49+22;


console.log(add(3,2));
console.log(summary(name,age, isFemale));