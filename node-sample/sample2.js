const person = {

    name: 'Prga',
    age: 10,
    greet: function() {
        console.log("Hello I am "+ this.name);
    }
};

console.log(person);
person.greet();


const hobbies = ['Cooking', "Singing"]

for(let hobby of hobbies){
    console.log(hobby);
}

hobbies.forEach( hobby => {
    console.log("Hobby:" + hobby)
})

hobbies.push('Dancing');

console.log(hobbies);

const copiedArray = [hobbies];
console.log(copiedArray)

const copyArray = [...hobbies];
console.log(copyArray);


const [h1, h2] = hobbies;
console.log(h1,h2);