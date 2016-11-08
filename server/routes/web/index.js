/**
 * 网站路由。
 */

const express = require("express");
const router = express.Router();
const site = require("./site");

// home page with history api fallback.
router.get("*", site.home);

module.exports = router;
