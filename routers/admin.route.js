const express = require("express");
const { signUp, adminVideo } = require("../controllers/admin.controllers");
const { authAdmin } = require("../middlewares/authorization");

const adminRoute = express.Router();

adminRoute.route("/signup").post(signUp);
adminRoute.route("/admin/playlists/:adminId").get(authAdmin, adminVideo);

module.exports = adminRoute;