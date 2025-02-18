// عريف المسارات (Routes) الخاصة بالطلبات (Orders)، حيث يربط بين الطلبات المرسلة من المستخدم والوظائف الموجودة في orderController.js
const express = require("express")
// express: لإنشاء router يدير المسارات الخاصة بالطلبات.

const {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder 
} = require("../controllers/orderController")
// يتم استيراد وظائف التحكم (Controllers) الخاصة بالطلبات من orderController.js
const router = express.Router()

router.get("/",getAllOrders)
router.get("/:id", getOrderById)
router.put("/:id",updateOrderStatus)
router.delete("/:id", deleteOrder)

module.exports = router