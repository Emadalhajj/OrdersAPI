const express = require("express");
const { createCategory ,
    getAllCategories,
    getCategoryById,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory);
// اضافة مسار لإنشاء الفئات (POST /categories)

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);

module.exports = router;
// عندما يقوم المستخدم بإرسال طلب POST إلى /categories، يتم استدعاء createCategory لإنشاء الفئة الجديدة.