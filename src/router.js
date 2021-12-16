const Router = require("express").Router;
const { webhook } = require("./handler");

const router = new Router();

router.post("/webhook", (req, res) => {
  webhook(req, res);
});

module.exports = router;
