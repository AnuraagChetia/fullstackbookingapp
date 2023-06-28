const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/booking");

router.post("/add-user", bookingController.postAddUser);

router.get("/get-user", bookingController.getUser);

router.delete("/delete-user/:id", bookingController.deleteUser);

module.exports = router;
