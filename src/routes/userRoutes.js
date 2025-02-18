const express = require("express");
const { registerUser } = require("../controllers/userController");
const { validateRegister } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/register", validateRegister, registerUser);

module.exports = router;


//إضافة المسار إلى userRoutes
router.post("/login", loginUser);
// عندما يقوم المستخدم بإرسال طلب POST إلى /login، يتم استدعاء loginUser
