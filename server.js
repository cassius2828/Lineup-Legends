// env var setup
const dotenv = require("dotenv");
dotenv.config();
// server set up
const express = require("express");
const app = express();
// db
const mongoose = require("mongoose");
// middleware modules
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

const pathname = path.join(__dirname, "public");
app.use(express.static(pathname));
///////////////////////////
// Set Up Port
///////////////////////////
const port = process.env.PORT ? process.env.PORT : "3000";

///////////////////////////
// Connect to MongoDB
///////////////////////////
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

///////////////////////////
// Middleware
///////////////////////////
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

///////////////////////////
// Routes
///////////////////////////
const authRouter = require("./routers/auth-router.js");
const lineupsRouter = require("./routers/lineups-router.js");
// Landing Page
app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

// VIP Lounge
app.get("/vip-lounge", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send("Sorry, no guests allowed.");
  }
});

// Auth Routes

app.use("/auth", authRouter);
app.use("/lineups", lineupsRouter);

///////////////////////////
// Start Server
///////////////////////////
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
