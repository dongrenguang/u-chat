const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("A user connected.");
    socket.on("disconnect", () => {
        console.log("A user disconnect.");
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

app.use(express.static("./public"));

http.listen(8080, () => {
    console.log("The application is running on *:8080...");
});
