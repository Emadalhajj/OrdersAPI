//create productmodel

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema)

//إعداد multer لرفع الصور
const multer = require("multer");

//إنشاء storage لتحديد مكان واسم الملفات

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
        // يتم إضافة تاريخ Date.now() قبل اسم الملف الأصلي (file.originalname) لجعل الاسم فريد
    }
});

const upload = multer({ storage });

module.exports = upload;
