// إدارة الطلبات وإرسال الإيميلات

//* انشاء اوردر موديل  الكود يعرّف مخطط الطلبات (Order Schema) باستخدام Mongoose، والذي يُستخدم لإدارة الطلبات في قاعدة البيانات
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // يحتوي على ObjectId يشير إلى المستخدم (User) الذي قدم الطلب

    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    // ref: "User" يسمح باستخدام populate() لجلب بيانات المستخدم

    status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" }
    // لتتبع حالة الطلب
}, { timestamps: true });
//تواريخ الانشاء والتحديث -- يضيف تلقائيًا حقلين إلى المستند:
// createdAt: تاريخ إنشاء الطلب.
// updatedAt: تاريخ آخر تعديل على الطلب

module.exports = mongoose.model("Order", orderSchema);
