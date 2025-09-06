// server.js
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all clients
  },
});

const usersData = {};
const roomsDrawing = {};

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("draw", (data) => {
    if (data.room) {
      socket.broadcast.to(data.room).emit("draw", data.paths);
      roomsDrawing[data.room] = [
        ...(roomsDrawing[data.room] || []),
        ...data.paths,
      ];
    } else {
      socket.broadcast.emit("draw", data);
    }
  });

  socket.on("clear", (roomId) => {
    if (roomId) {
      socket.broadcast.to(roomId).emit("clear");
    } else {
      socket.broadcast.emit("clear");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });

  socket.on("join-room", async (room) => {
    socket.join(room.room);

    if (roomsDrawing[room.room]) {
      socket.emit("draw", roomsDrawing[room.room]);
    }

    const clients = await io.in(room.room).allSockets();
    const userCount = clients.size;

    // socket.to(socket.id).emit("draw", roomsDrawing[room.room]);

    usersData[room.room] = {
      count: userCount,
      users: usersData[room.room]?.users
        ? [
            ...usersData[room.room]?.users,
            {
              id: socket.id,
              name: room.name,
              color: room.color,
            },
          ]
        : [
            {
              id: socket.id,
              name: room.name,
              color: room.color,
            },
          ],
    };

    io.to(room.room).emit("active-users", {
      count: userCount,
      users: usersData[room.room].users,
    });

    socket.broadcast.to(room.room).emit("join-room", room);
  });

  socket.on("disconnecting", async () => {
    const rooms = [...socket.rooms].filter((r) => r !== socket.id);

    for (const roomId of rooms) {
      // Get all sockets still in this room (before the user leaves)
      const clients = await io.in(roomId).allSockets();

      // Remove this socket manually from your usersData
      if (usersData[roomId]) {
        usersData[roomId].users = usersData[roomId].users.filter(
          (user) => user.id !== socket.id
        );
        usersData[roomId].count = usersData[roomId].users.length;
      }

      io.to(roomId).emit("active-users", {
        count: usersData[roomId]?.count || 0,
        users: usersData[roomId]?.users || [],
      });

      console.log(
        `User ${socket.id} left room ${roomId}, total: ${usersData[roomId]?.count}`
      );
    }
  });
});

server.listen(4000, () => {
  console.log("Socket server running on http://localhost:4000");
});
