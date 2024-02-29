// Import packages
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require('dotenv').config();

// Initiate the app
const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB and listening for requests on PORT 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Set Up static files
app.use(express.static("public"));

// Using morgan to log instead
app.use(morgan("dev"));

// Built a logger middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} request: http://${req.hostname}${req.path}\t${res.statusCode}`
  );
  next();
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
