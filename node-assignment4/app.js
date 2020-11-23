const body = require ('body-parser');
const express = require("express")

const app = express();

const listRouter = require('./routes/list');
const userRouter = require('./routes/users');

app.set('view engine', 'ejs');


//app.use(listRouter);
//app.use(userRouter);

app.use(body.urlencoded ({ extended: true}));

const users = [];

app.get("/users", (req, res, next ) => {

    console.log("in users");
    res.render('users',  {pageTitle : 'Users' , users: users});

})


app.get("/", (req, res, next ) => {

    console.log("in get");

    res.render("list", {pageTitle : 'Add User'});

})


app.post('/add-user', (req,res,next) => {
    users.push( {name : req.body.username});
    res.redirect("/users");
})

app.use((req, res, next) => {
    res.status(404).send('404');
  });
  



app.listen(3000);