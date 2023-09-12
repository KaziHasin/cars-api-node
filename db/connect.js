const mongoose = require("mongoose");

const connectDB = (connectionString) => {
  mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDB connected successfully..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
