function createErrors(req, res, next) {
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

  req.errors = errors;
  next();
}
module.exports = { createErrors };
