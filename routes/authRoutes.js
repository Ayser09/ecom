const {
  getAllUsers,
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = require("express").Router();

// get all users || GET
router.get("/all-users", getAllUsers);
router.get("/test", testController);

// create user || POST
router.post("/register", registerController);

// login || POST
router.post("/login", requireSignIn, loginController);

module.exports = router;
