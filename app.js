// app.js
require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser=require("cookie-parser")
const methodOverride=require("method-override")
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(methodOverride('_method'))

async function db(){
    await mongoose.connect('mongodb://127.0.0.1:27017/task_manager')
    console.log('Connected to MongoDB');
}
db()
    



app.get("/",(req,res)=>{
    res.render("Index")
})


app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });