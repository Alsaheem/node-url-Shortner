const express = require(`express`);
const router = express.Router();
const Shortner = require("../models/shortner");

router.get("", (req, res) => {
  res.render("index", {
    title: "URL Shortner",
    heading: "Shorten your url`s with the speed of light",
    name: "Alsaheem",
  });
});

router.post("/generate", async (req, res) => {
  console.log(req.body);
  const shortner = new Shortner(req.body);
  try {
    await shortner.save(shortner);
    let shortened_link = `localhost:5000/${shortner.name}`;
    console.log(shortened_link);
    res.status(201).send({ shortened_link });
    //res.status(201).send({ shortner});
  } catch (err) {
    res.status(500); //set status to  400
    res.send(err);
  }
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  const url = await Shortner.findOne({ name });
  try {
    if (!url) {
      return res.status(404).send(`url with id cannot be found`);
    }
    const redirect_url = url.url;
    res.redirect(redirect_url);
    //res.status(200).send({redirect_url});
  } catch (err) {
    res.status(400); //set status to  400
    res.send(err);
  }
});

module.exports = router;
