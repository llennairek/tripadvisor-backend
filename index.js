const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(formidable());

const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

app.post("/form-submit", (req, res) => {
  const { firstName, lastName, email, subject, message } = req.fields;

  const data = {
    from: `${firstName} ${lastName} <${email}>`,
    to: "llennairek@gmail.com",
    subject: subject,
    text: message,
  };
  try {
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      console.log(error);
    });

    res.status(200).json("Form submitted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
