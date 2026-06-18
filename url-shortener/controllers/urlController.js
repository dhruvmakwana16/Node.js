const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.createShortUrl = async (req, res) => {

  const { originalUrl } = req.body;

  const shortCode = nanoid(6);

  const newUrl = await Url.create({
    originalUrl,
    shortCode
  });

  res.json({
    shortUrl:
      `http://localhost:3000/${shortCode}`
  });
};

exports.redirectUrl = async (req, res) => {

  const url =
    await Url.findOne({
      shortCode: req.params.code
    });

  if (!url) {
    return res.status(404)
      .send("URL Not Found");
  }

  url.clicks++;

  await url.save();

  res.redirect(url.originalUrl);
};