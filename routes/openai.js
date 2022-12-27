const { generateImage } = require("../controllers/openAiController");

const router = require("express").Router();

router.post("/generate-image", generateImage);

module.exports = router;
