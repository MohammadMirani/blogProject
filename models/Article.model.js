const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  description: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("article", articleSchema);
