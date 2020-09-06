const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const { addSafeReadOnlyGlobal } = require("./custom/index");

//mongo models
const users = require("./models/User");
const products = require("./models/Product");
const carts = require("./models/Cart");

mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost/camera-store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.error(err));

var routes = require("./routes/index");

var app = express();

app.use(
  logger(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
  )
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  expressValidator({
    customValidators: {
      isDate: (value) => !isNaN(Date.parse(value)),
      isMobile: (value) => /^[6789]\d{9}$/.test(value),
      isCountryCode: (value) => value == 91, // eslint-disable-line
      isLoginType: (value) => value === "otp",
      isArray: (value) => Array.isArray(value),
      isToday: (value) => value === new Date().toISOString().substring(0, 10),
      isMobileWithCountryCode: (value) => /^(\91)[6789]\d{9}$/.test(value),
    },
  })
);

app.use("/api", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ message: "Something went wrong" });
});

addSafeReadOnlyGlobal("db", {
  users,
  products,
  carts,
});

module.exports = app;
