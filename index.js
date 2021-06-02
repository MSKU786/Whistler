const express = require('express')
const app = express();
const port = process.env.PORT || 8800;  
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
const passport = require("passport")
const http = require("http")
const cors = require("cors")
const socketio = require("socket.io");
dotenv.config();

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")))




app.use(passport.initialize());
//Passport config
require("./passport")(passport);
//Use express router
//app.use('/', require())
//MiddleWare

app.use(express.json());
app.use(helmet());
app.use(morgan("Common"));
app.use(cors());
//app.use(express.bodyParser());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
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


app.use('/api/users',usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

const server = http.createServer(app);
const io = socket(server, {
    cors:{
        origin: "*"
    }
});


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user=> user.userId === userId)
}

io.on("connection", (socket) => {
    console.log("a user connected");
    //Take userId and socketId for user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        //Sending data to client 
        io.emit("getUsers", users);
    });

    //Event from client use socket.on
    //Send or get messge from client
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //On disconnected remove user from user array
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("SERVER IS UP AND RUNNIG ON PORT: ", port);
});