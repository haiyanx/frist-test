/**
 * API 路由。
 */

const express = require("express");
const router = express.Router();

// just an api test.
router.get("/hello", (req, res) =>
{
    res.json({ result: "Hello Jack!" });
});

module.exports = router;
