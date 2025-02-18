const Category = require("../models/categoryModel");

//انشاء فئة جديدة
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        let category = new Category({ name });
        await category.save();
        // حفظ الفئة الجديدة في قاعدة البيانات باستخدام category.save()
        res.status(201).json(category);
        // إرسال الاستجابة (201 Created) تتضمن بيانات الفئة التي تم إنشاؤها
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// الحصول على جميع الفئات

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// حصول ع فئة واحدة
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// حذف فئة
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};