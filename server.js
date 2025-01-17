const catalyst = require("zcatalyst-sdk-node");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/contactDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// Define Schema & Model for Contact Messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// API Route for Form Submission
app.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message Sent Successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Export the Express app as a Catalyst function
module.exports = (req, res) => {
  return app(req, res);
};
