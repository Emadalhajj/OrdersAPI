//استيراد الابديت في الروتر للمنتجات
const express = require("express");
const { createProduct ,
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct  
} = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), createProduct);


// جميع المسارات  - تحديث المنتج ر


router.get("/", getAllProducts);          // جلب جميع المنتجات
router.get("/:id", getProductById);       // جلب منتج واحد
router.post("/", createProduct);          // إنشاء منتج جديد
router.put("/:id", updateProduct);        // تحديث منتج
router.delete("/:id", deleteProduct);     // حذف منتج





module.exports = router;
