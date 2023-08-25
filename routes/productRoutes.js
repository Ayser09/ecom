const {
  createProductController,
  updateProductController,
  getProductController,
  singleProductController,
  deleteProductController,
  productPhotoController,
} = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");
const router = require("express").Router();

//delete
router.get(
  "/delete-product/:id",

  deleteProductController
);
//get photo
router.get("/product-photo/:pid", productPhotoController);

router.get("/get-product", getProductController);
//single catgeory controller
router.get("/get-single/:slug", singleProductController);
//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//update category
router.put("/update-product/:pid", formidable(), updateProductController);
module.exports = router;
