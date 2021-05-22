const express = require('express')
const app = express();
const port = 8000;  
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRoute = require("./routes/users")
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
     console.log("connected to mongo");
});
//Use express router
//app.use('/', require())
//MiddleWare

app.use(express.json());
app.use(helmet());
app.use(morgon("Common"));

app.use('/api/users', usersRoute);


app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("SERVER IS UP AND RUNNIG ON PORT: ", port);
});