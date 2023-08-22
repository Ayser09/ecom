const {
  getAllUsers,
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = require("express").Router();

//get all user ||GET
router.get("/all-users", getAllUsers);
router.get("/test", testController);

//CREATE USER || POST
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", requireSignIn, isAdmin, loginController);
module.exports = router;
