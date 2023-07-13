const express = require("express");

//requiring user controllers or functions to execute on different routes
const {
    getAllUsers,
    registerController,
    loginController,
} = require("../controllers/userControll");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/all-users", getAllUsers);

// CREATE USER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//exporting router
module.exports = router;