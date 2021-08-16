const io = require("socket.io")(5000, {
    cors: {
        origin: '*',
        
    }
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recepients, text }) => {
    recepients.forEach((recepient) => {
      const newrecepients = recepients.filter((r) => r !== recepient);
      newrecepients.push(id);
      socket.broadcast.to(recepient).emit("receive-message", {
        recepients: newrecepients,
        sender: id,
        text,
      });
    });
  });
});

