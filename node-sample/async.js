setTimeout( () => {
    console.log("Executing after 5s delay");
    fetch(text => console.log(text));
}, 5000);


const fetch = callback => {
    setTimeout( ()=> {
        callback("Done");
     }, 1500);
}

console.log("Hi");

