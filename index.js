const express = require('express')
const app = express();
const port = 8800;  
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts") 
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages") 
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")))

//Use express router
//app.use('/', require())
//MiddleWare

app.use(express.json());
app.use(helmet());
app.use(morgan("Common"));
//app.use(express.bodyParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("*********");
        console.log(req)
        console.log("*********************");
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        console.log("****************************");
        console.log(  )
        console.log("****************************");
        cb(null, req.body.name);
    }
})
const upload = multer({storage:storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (err) {
        
    }
})


app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("SERVER IS UP AND RUNNIG ON PORT: ", port);
});