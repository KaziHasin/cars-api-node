const express = require("express");
const app = express();
port = process.env.PORT || 4000;
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const notFound = require("./middleware/not-found");
const productRoute = require("./routes/products");
const errorHandling = require("./middleware/error-handling");

const connectionString = process.env.MONGO_URI;

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Product API </h1> <a href='api/v1/products'>API Route</a>");
});

app.use("/api/v1/products", productRoute);

// unknown routes
app.use(notFound);

// error handling
app.use(errorHandling);

const start = async () => {
  try {
    await connectDB(connectionString);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
