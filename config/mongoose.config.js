const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/blogDatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("[!] Connection Failed!");
    return console.log("[+]Database Connected Successfully.");
  }
);


