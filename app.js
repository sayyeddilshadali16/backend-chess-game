const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

io.on("connection", function (uniqueSocket) {
  console.log("connected");

  // on socket.io connect

  //   uniqueSocket.on("connection", function () {
  //     io.emit("connection received")
  //   });

  // on socket.io disconnected

  //   uniqueSocket.on("disconnect", function(){
  //  console.log("disconnected")
  //   })

  // check player availability

  if (!players) {
    players.white = uniqueSocket.id;
    uniqueSocket.emit("playerRole", "W");
  } else if (!players.black) {
    players.black = uniqueSocket.id;
    uniqueSocket.emit("playerRole", "B");
  } else {
    uniqueSocket.emit("spectatorRole");
  }

  // disconnect player

  uniqueSocket.on("disconnect", function () {
    if (uniqueSocket.id === players.white) {
      delete players.white;
    } else if (uniqueSocket.id === players.black) {
      delete players.black;
    }
  });

  // player's move

  uniqueSocket.on("move", (move) => {
    try {
      // validate players move
      if (chess.turn() === "W" && uniqueSocket.id !== players.white) return;
      if (chess.turn() === "B" && uniqueSocket.id !== players.black) return;
      // check player's move
      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid move: ", move);
        uniqueSocket.emit("invalidMove", move);
      }
    } catch (error) {
      console.log(error);
      uniqueSocket.emit("Invalid move: ", move);
    }
  });
});

server.listen(8000, function () {
  console.log("Listening on port 8000");
});
