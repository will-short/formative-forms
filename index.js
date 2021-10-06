const express = require("express");

const app = express();
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

const csrfProtection = csurf({ cookie: true });

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

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
  let errors = [];
  res.render("create", { csrfToken: req.csrfToken(), errors });
});

app.post("/create", csrfProtection, (req, res) => {
  let form = req.body;
  let errors = [];

  if (!form.firstName) errors.push("Please provide a first name.");
  if (!form.lastName) errors.push("Please provide a last name.");
  if (!form.email) errors.push("Please provide an email.");
  if (!form.password) errors.push("Please provide a password.");
  if (form.password !== form.confirmedPassword)
    errors.push(
      "The provided values for the password and password confirmation fields did not match."
    );
  if (errors.length)
    res.render("create", { csrfToken: req.csrfToken(), errors, form });
  else {
    users.push({
      id: users[users.length - 1].id + 1,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    });
    res.redirect("/");
  }
});

app.get("/create-interesting", csrfProtection, function (req, res) {
  let errors = [];
  res.render("create-interesting", { csrfToken: req.csrfToken(), errors });
});

app.post("/create-interesting", csrfProtection, (req, res) => {
  let form = req.body;
  let errors = [];

  if (!form.firstName) errors.push("Please provide a first name.");
  if (!form.lastName) errors.push("Please provide a last name.");
  if (!form.email) errors.push("Please provide an email.");
  if (!form.password) errors.push("Please provide a password.");
  if (!form.password) errors.push("Please provide a password.");
  if (form.password !== form.confirmedPassword)
    errors.push(
      "The provided values for the password and password confirmation fields did not match."
    );
  if (errors.length)
    res.render("create", { csrfToken: req.csrfToken(), errors, form });
  else {
    users.push({
      id: users.length + 1,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    });
    res.redirect("/");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
