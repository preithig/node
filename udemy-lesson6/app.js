const express = require("express")
const body = require("body-parser");


const path = require('path');

const app = express();

app.set('view-engine' , 'pug');
app.set('views', 'views');


const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(body.urlencoded( {extended: true}));


app.use(express.static('./public'));

app.use("/admin",adminData.routes);

app.use(shopRoutes);



app.use( (req,res,next) => {
  //  res.status(404).send("<h1> Page not found </h1>");
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);