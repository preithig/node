const express = require('express');
const mongoose = require('mongoose');

const app = express();
const TodoTask = require('./models/TodoTask');

const env = require('dotenv');
env.config();

mongoose.set("useFindAndModify", false);
mongoose.connect('mongodb+srv://<username>:<pwd>@cluster0.inwgq.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {
    console.log('Connected to dB');
    app.listen(3000, () => console.log("Server is running"));
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });

    //res.render('todo.ejs')

});

app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

app.route("/edit/:id").get ( (req,res) => {
    const id = req.params.id;
    TodoTask.find( {}, (err, tasks) => {
        res.render("todoEdit.ejs", {todoTasks: tasks, idTask: id})
    });
})
.post( (req,res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, {content: req.body.content}, err=> {
        if (err) return res.send(500,err);
        res.redirect('/');
    })
})

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        console.log("todotask ", todoTask);
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});