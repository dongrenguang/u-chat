const io = require("../io");

const messageCenter = io.of("/messageCenter");
const users = {};
messageCenter.on("connection", (socket) => {
    socket.emit("auth");

    socket.on("login", (user, callback) => {
        if (!user[user.name]) {
            users[user.name] = user;
            var room = getRoom(user.name);
            socket.join(room);
            callback(true);
        }
        else {
            callback(false);
        }
    });

    socket.on("message", (value) => {
        var from = value.from;
        var to = value.to;
        var message = value.message;
        var room = getRoom(to);
        if (users[from] && users[to]) {
            messageCenter.to(room).emit("message", from + ": " + message);
        }
    });
});

function getRoom(username) {
    return "room-" + username;
}
