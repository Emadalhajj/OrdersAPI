const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.OMONGO_URI, {
            userNewUrlParser: true,
            userUnifiedToplogy: true
        });
        console.log("Mongodb conncted")

    }catch (error){
        console.error("database connection erro ,",error)
    }
}
module.exports = connectDB