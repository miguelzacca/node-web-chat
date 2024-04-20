import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 255,
  },
  timestamp: {
    type: String,
    required: true,
  },
  sortime: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
