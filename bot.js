var tmi = require("tmi.js");

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "ValksBot",
        password: "oauth:xxxxxxxxxxxxxxxxxxxxxxx"
    },
    channels: ["valkyrienyanko"]
};

var client = new tmi.client(options);

// Connect the client to the server..
client.connect();

client.on("connected", function (address, port) {
    console.log("Address: " + address + " Port: " + port)
    client.action("valkyrienyanko", "Connected.")
});

client.on("chat", function (channel, user, msg, self) {
    // Don't listen to my own messages..
    if (self) return;
    var cmd = msg.toLowerCase();
    if (cmd.startsWith("get")) client.action(channel, "Got " + msg.slice(4))

    if (!cmd.startsWith("v")) return;
    if (cmd === "vping") client.action(channel, "Pong")
    if (cmd.startsWith("vclear")){
      if (user.mod){
        client.clear(channel)
      } else {
        client.action(channel,"You need to be a mod to perform this command.")
      }
    }
    if (cmd.startsWith("vcatball")){
        var [args] = msg.split(' ').slice(2)
        if (args === undefined || args === '') return client.action(channel, 'Give catball a question to answer first.')
        client.action(channel, 'Kappa ' + eightBall())
    }
});

client.on("join", function (channel, username, self) {
    client.action(channel, 'A wild ' + username + ' appears!')
});

client.on("part", function (channel, username, self) {
    client.action(channel, username + ' vanished into thin air.')
});

function eightBall(){
  var answers = ['it is decidedly so', 'without a doubt', 'you may rely on it', 'outlook good', 'ask again later', 'better not tell you now', 'cannot predict now', 'concentrate and ask again', 'outlook not so good']
  var cats = ['The cats say, ', 'The evil cat says, ', 'The cat says, ', 'Valky says, ', 'Some random cat says, ']
  var answer = answers[Math.floor(Math.random() * answers.length)]
	var catanswer = cats[Math.floor(Math.random() * cats.length)]
  return catanswer + answer
}
