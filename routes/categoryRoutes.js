const {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = require("express").Router();

//delete
router.get(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

router.get("/get-category", categoryController);
//single catgeory controller
router.get("/single-category/:slug", singleCategoryController);
//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
module.exports = router;
