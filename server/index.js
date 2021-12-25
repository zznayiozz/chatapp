require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");
const getPostRouter = require("./routers/getPost");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learnnode.exy57.mongodb.net/learnnode?retryWrites=true&w=majority`,
      {}
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`error`);
    process.exit(1);
  }
};

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/getpost", getPostRouter);

const PORT = 5000;

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
