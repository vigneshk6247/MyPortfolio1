const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 5008
const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/MyPortfolio')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:String,
    subject:String,
    message:String
})
const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/post', async (req,res)=>{
    const { name, email, number, subject, message} = req.body;
    const user = new Users({
        name,
        email,
        number,
        subject,
        message
    });
    await user.save();
    console.log(user);
    res.send("Thank you for contacting me! I will get back to you soon.");
});

app.listen(port,()=>{
    console.log("server is running")
})