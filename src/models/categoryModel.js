
// Lec-4--- انشاء نموذج الفئاتCategories
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Category", categorySchema);
// يتم تصدير الموديل (Category) ليتم استخدامه في باقي أجزاء التطبيق
