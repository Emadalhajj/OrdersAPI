// الكود يقوم بإنشاء طلب جديد (Order) في قاعدة البيانات، وبعد ذلك يرسل إيميل تأكيد للمستخدم باستخدام nodemailer

const Order = require("../models/orderModel");
const nodemailer = require("nodemailer");
// nodemailer: مكتبة لإرسال رسائل البريد الإلكتروني

// إنشاء طلب جديد وإرسال إيميل

exports.createOrder = async (req, res) => {
  const { user, products } = req.body;
  try {
    let order = new Order({ user, products });
    // إنشاء طلب جديد باستخدام Order
    await order.save();

    // إرسال إيميل تأكيد الطلب
    let transporter = nodemailer.createTransport({
      // إعداد transporter (خادم البريد الإلكتروني) -  SMTP لإرسال البريد الإلكتروني
      service: "gmail",
      // نستخدم gmail كخدمة بريد إلكتروني.
      auth: { user: "your-email@gmail.com", pass: "emad123456" },
      // نقوم بتوفير البريد الإلكتروني وكلمة المرور للمصادقة (auth)
    });
    // تفاصيل البريد الإلكتروني
    let mailOptions = {
      from: "emadalhajj2022@gmail.com",
      to: "customer@example.com.sa",
      subject: "Order Confirmation",
      text: `Your order has been placed successfully!`,
    };

    transporter.sendMail(mailOptions);
    // إرسال البريد باستخدام sendMail(mailOptions).
    res.status(201).json({ message: "Order placed and email sent", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب جميع الطلبات
const Order = require("../models/orderModel");

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user").populate("products");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//جلب طلب واحد حسب الـ ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user").populate("products");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//تحديث حالة الطلب وإرسال إشعار بالبريد الإلكتروني
const nodemailer = require("nodemailer");

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ message: "Order not found" });

        // إرسال بريد إلكتروني بتحديث حالة الطلب
        let transporter = nodemailer.createTransport({
                    // إعداد  SMTP لإرسال البريد الإلكتروني
            service: "gmail",
            // نستخدم gmail كخدمة بريد
            auth: { user: "emadalhaj2022@gmail.com", pass: "Emad123456" }
            // نوفر البريد الإلكتروني وكلمة المرور (يجب حفظها في .env وليس في الكود مباشرة).
        });

        let mailOptions = {
            from: "emadalhaj2022@gmail.com",
            to: "customer@gmail.com",
            subject: "Order Status Updated",
            text: `Your order status has been updated to: ${status}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log("Error sending email:", err);
            else console.log("Email sent:", info.response);
        });
// إرسال الاستجابةJSON Response
        res.status(200).json({ message: "Order updated and email sent", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//حذف الطلب
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        // تبحث عن الطلب باستخدام id الموجود في req.params.id
        res.status(200).json({ message: "Order deleted successfully" });
        // إذا تم العثور عليه، سيتم حذفه نهائيًا من قاعدة البيانات
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
