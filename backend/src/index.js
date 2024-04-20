import express from "express";
import dotenv from "dotenv";
import z from "zod";
import Message from "../models/Message.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/messages", (req, res) => {
  Message.find()
    .sort({ sortime: -1 })
    .then((messages) => {
      res.status(200).json({ messages });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ msg: "A server error occurred. Please, try again later." });
    });
});

const messageDataSchema = z.object({
  sender: z.string().min(3).max(20),
  content: z.string().min(1).max(255),
  timestamp: z.string(),
});

const validateData = (data) => {
  try {
    return messageDataSchema.parse(data);
  } catch (err) {
    throw [err];
  }
};

const clearDB = async () => {
  const totalMessages = await Message.countDocuments();

  if (totalMessages > 10) {
    const messagesToDelete = totalMessages - 10;
    await Message.deleteMany({}, { sort: { timestamp: 1 }, limit: messagesToDelete });
  }
}

app.post("/send", async (req, res) => {
  try {
    const { sender, content, timestamp } = validateData(req.body);

    const message = new Message({
      sender,
      content,
      timestamp,
    });

    await message.save();
    res.status(201).json({ msg: "Sent with success." });
    clearDB();
  } catch (err) {
    if (err[0]) {
      return res.status(400).json({ msg: err[0] });
    }
    console.error(err);
    res
      .status(500)
      .json({ msg: "A server error occurred. Please, try again later." });
  }
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.nxgyqvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Listen... :${PORT}`);
    });
  })
  .catch((err) => console.error(err));
