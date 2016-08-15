const app = require("./app");
const server = require("http").Server(app);

server.listen(8080, () => {
    console.log("The application is running on *:8080...");
});

module.exports = server;
