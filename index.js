const express = require("express");

const app = express();
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const { createErrors } = require("./create-errors");

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

app.post("/create", csrfProtection, createErrors, (req, res) => {
  let form = req.body;
  if (req.errors.length)
    res.render("create", {
      csrfToken: req.csrfToken(),
      errors: req.errors,
      form,
    });
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

app.post("/create-interesting", csrfProtection, createErrors, (req, res) => {
  let form = req.body;
  let errors = req.errors;

  if (!form.age) {
    errors.push("age is required");
  } else if (!Number(form.age) || form.age > 120 || form.age < 0) {
    errors.push("age must be a valid age");
  }

  if (!form.favoriteBeatle) errors.push("favoriteBeatle is required");
  if (form.favoriteBeatle === "Scooby-Doo")
    errors.push("favoriteBeatle must be a real Beatle member");
  if (errors.length)
    res.render("create-interesting", {
      csrfToken: req.csrfToken(),
      errors,
      form,
    });
  else {
    users.push({
      id: users.length + 1,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      age: form.age,
      favoriteBeatle: form.favoriteBeatle,
      iceCream: (form.iceCream = "on" ? true : false),
    });
    res.redirect("/");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
