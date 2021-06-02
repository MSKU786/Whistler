const io = require('socket.io')(9999, {
    cors:{
        origin: "http://localhost:3000"
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