// create user controller
const User = require("../models/userModel")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req , res)=>{
    const {name, email, password} = req.body

    try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).join({message: "user already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save(); 

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    
}

const Joi = require("joi");
const { isRgbColor } = require("validator");

const registerSchema = Joi.object({
    name: Joi.string().min(3).required,
    email: Joi.string().email().required,
    password: Joi.string().min(6).required()
})
//تتحقق من صحة البيانات القادمة في req
exports.validateRegister = (req , res , next)=>{
    const {error} = registerSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message });
    // مصفوفة تحتوي على تفاصيل الخطأ، ونأخذ أول خطأ منها يحتوي على تفاصيل الخطا 
    next();
    //اذا لم يكون هناك خطا انتقل للخطوة التالية
}

//Lec-3--- تسجيل الدخول وإنشاء توكن

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         يقارن كلمة المرور المُدخلة مع كلمة المرور المشفرة المخزنة في قاعدة البيانات.
// إذا كانت غير متطابقة، يتم إرجاع خطأ 400 بنفس الرسالة

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // secret: مفتاح سري يُستخدم لتشفير التوكن، يتم تخزينه في البيئة (environment variables) لحمايته (process.env.JWT_SECRET).
        // expiresIn: مدة صلاحية التوكن، هنا ساعة واحدة 
        res.status(200).json({ token });
        // عند نجاح تسجيل الدخول، يتم إرسال التوكن إلى العميل في صيغة JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
        // في حالة حدوث خطأ في الخادم، يتم إرجاع خطأ 500 مع تفاصيل الخطأ
    }
};
