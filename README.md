## Tech Stack

- Node.js
- Express.js
- Socket.io
- Chess.js

## Working

- Intialization

-> Socket and chess objecrs are intialized
-> Board element is selected from the DOM
-> Initial for draggedPiece, sourceSquare, and playerRole are set values to null

- Initial Board Renderning

-> renderBoard() is called to display the initial state of the chessboard.

- Drag-and-Drop functionality

-> renderBoard() sets up drag and drop event listeners for each piece and square
-> Piece are draggable based on the player's role
-> When a piece is dropped, handleMoved() is called to handle the more logic and edmit to the server
-> When a piece is dropped, handleMove() is called to handle the move logic and edmit it to server.

- Socket Event handleing -> client -> server

Browser1 <-Realtime-> Server <-Realtime-> Browser2

- Variable Client Side

Socket -> Connection to the servcer using socket.io
Chess -> An instance of the chess class
BoardElement -> DOM element with the id "chessboard"
DraggedElement -> The piece being dragged during a drag and drop action
SourceSquare -> Stores the starting square if the dragged piece
PlayerRole -> Holds the role of the player (e.g, "W" for white, "B" for Black, or null for a spectator)

- Function Client Side

RenderBoard
HandleMove
GetPieceUnicode

- Socket Client Side

SocketOn("PlayerRole")
SocketOn("SpectatorRole")
SocketOn("BoardState")
SocketOn("Move")

## FEN equation

current state of board - defines players move on the chessboard with positions