const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiMTEiLCJlZWVlIjoiMjIiLCJpYXQiOjE2MDc0MTgwNzcsImV4cCI6MTYwNzUwNDQ3N30.jkOr60HToMBbc6iH0NNXlJXM06HquRp_Xb8HnfTP0_k"
const socketOptions = {
    path: "/all",
    auth: {
        token: token,
        id: Math.floor(Math.random() * 3)
    },
    transports: ["websocket"],
}
const socket = require('socket.io-client')('ws://localhost', socketOptions);


const message = document.getElementById("message")
const send = document.getElementById("send")
const public = document.getElementById("public")
const ping = document.getElementById("ping")
const messageContainer = document.querySelector(".msg-container")

function makeMessage(data) {
    const content = document.createElement("div")
    const userName = document.createElement("div")
    const contents = document.createElement("div")

    userName.innerHTML = data.author
    contents.innerHTML = data.message

    content.appendChild(userName)
    content.appendChild(contents)

    const tmp = document.createElement("div")

    tmp.appendChild(content)

    messageContainer.innerHTML = tmp.children[0].innerHTML + messageContainer.innerHTML
}



socket.on('connect', function () {
    console.log("connect")
    socket.emit("ping", new Date().getTime())
});

socket.on("connect_error", err => {
    console.error(err.message)
})


socket.on('message', function (data) {
    makeMessage(data)
});
socket.on('notice', function (data) {
    makeMessage(data)
});
socket.on('hello', function (data) {
    const id = document.createElement("div")
    id.innerHTML = data
    document.body.appendChild(id)
});
socket.on('disconnect', function () {
    console.log("disconnect")
});

socket.on("ping", function (prevTime) {
    let time = new Date().getTime()

    ping.innerHTML = ~~time - ~~prevTime

    socket.emit("ping", time)
})


send.addEventListener("click", function () {
    socket.emit("message", {
        author: Math.floor(Math.random() * 10),
        message: message.value
    })
})

public.addEventListener("click", function () {
    socket.emit("notice", {
        author: Math.floor(Math.random() * 10),
        message: message.value
    })
})
