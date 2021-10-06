const express = require("express");

const app = express();
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

const csrfProtection = csurf({ cookie: true });

app.use(cookieParser());

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com",
  },
];

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.get("/create", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render("create", { csrfToken: req.csrfToken() });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
