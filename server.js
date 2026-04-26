const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/iot");

const DataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  time: { type: Date, default: Date.now }
});

const Data = mongoose.model("Data", DataSchema);

app.get("/api/data", async (req, res) => {
  const { temp, hum } = req.query;

  const newData = new Data({
    temperature: temp,
    humidity: hum
  });

  await newData.save();
  res.send("Data Saved");
});

app.get("/api/getData", async (req, res) => {
  const data = await Data.find().sort({ time: -1 }).limit(10);
  res.json(data);
});

app.listen(5000, () => console.log("Server running on 5000"));
