const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const cloudinary = require('cloudinary');
const vaccins = require('./routes/vacxin')
const donvitiemchung = require('./routes/donViTiemChung')
const hosotiemchung = require('./routes/hoSoTiemChung')
const dangkytiemchung = require('./routes/dangKyTiemChung')
const thongbaoTiem = require('./routes/thongBaoTiem')
const chungnhanTiem = require('./routes/chungnhanTiem')
const report = require('./routes/report')
const testdangky = require('./routes/testRoute')

const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser")
const fileupload = require("express-fileupload");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileupload());
// connect to database
mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("DB Connection successfully"))
        .catch((err) => {
            console.log(err)
            })
// Setting up cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET,  
  });


// all routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1',vaccins)
app.use('/api/v1',donvitiemchung)
app.use('/api/v1',hosotiemchung)
app.use('/api/v1',dangkytiemchung)
app.use('/api/v1',thongbaoTiem)
app.use('/api/v1',chungnhanTiem)
app.use('/api/v1',report)
app.use('/api/v1',testdangky)


// middleware to handle errors
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`Backend is running on port: ${PORT}`)
})
