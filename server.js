require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
  //لقراءة بيانات JSON في الطلبات
connectDB();
app.use("/categories", categoryRoutes); // تسجيل مسارات الفئات

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection failed:", err));



app.listen(5000, () => console.log("Server running on port 5000"));
//لسماح اي بي اي للوصول الى الفرونت (ربط الفرونت بالباك ) اند نستخدم كورس
// CORS (Cross-Origin Resource Sharing) -- for install cors : npm install cors

const cors = require("cors")
app.use(cors({
    origin: "http://localhost:3000", // استبدل بعنوان الـ Frontend
    // يسمح فقط بالطلبات القادمة من http://localhost:3000
    credentials : true

    // يسمح بإرسال ملفات تعريف الارتباط (Cookies) والجلسات (Sessions) بين Frontend و Backend
}))