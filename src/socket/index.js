let onlineUsers = [];

export const newConnectionHandler = (client) => {
  client.emit("welcome", { message: `Hello ${client.id}` });

  client.on("setUsername", (payload) => {
    onlineUsers.push({ username: payload.username, socketId: client.id });

    client.emit("loggedin", onlineUsers);

    client.broadcast.emit("newConnection", onlineUsers);
  });

  client.on("sendmessage", (message) => {
    console.log(message);
    client.broadcast.emit("newMessage", message);
  });

  client.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== client.id);
    client.broadcast.emit("newConnection", onlineUsers);
  });
};