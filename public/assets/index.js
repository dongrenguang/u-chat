var logined = false;
var socket = io("/messageCenter");
var user = {};

socket.on("auth", function() {
    user.name = window.location.hash.slice(1);
    socket.emit("login", user, function(result) {
        if (result) {
            logined = true;
        }
        else {
            logined = false;
            alert("Login failed.");
        }
    });
});

socket.on("message", function(msg) {
    var $newMessage = $("<li>").text(msg);
    $("#messages").append($newMessage);
});

$("#message-form").submit(function() {
    var from = user.name;
    var to = $(".to > input").val();
    var message = $(".message > input").val();
    socket.emit("message", {
        from: from,
        to: to,
        message: message
    });

    $(".message > input").val("");
    return false;
});
