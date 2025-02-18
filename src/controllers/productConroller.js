const Product = require("../models/productModel");

// إنشاء منتج جديد
exports.createProduct = async (req, res) => {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.path : "";
    // req.file يحتوي على بيانات الصورة التي تم رفعها بواسطة multer

    try {
        let product = new Product({ name, price, image, category });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//إضافة وظائف جلب وتحديث المنتجات 

// جلب جميع المنتجات
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
//         عند جلب المنتجات، يتم استبدال category (ObjectId) بالتفاصيل الكاملة للفئة (Category).
//          -بدون populate()، ستكون category مجرد id فقط
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// جلب منتج واحد
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// تحديث منتج
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         يتم تحديث بيانات المنتج بناءً على id. - findByIdAndUpdate يوم ب
//          الخيار { new: true } يضمن إرجاع البيانات بعد التحديث مباشرةً
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// حذف منتج
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        // findByIdAndDelete(req.params.id): يحذف المنتج بناءً على id
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};