// const express = require('express');
// const router = express.Router();
// const User = require("../models/User");
// const UserVerification = require("../models/UserVerification");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const {v4:uuidv4} = require("uuid")
// require("dotenv").config();
// // const {isAuthenticatedUser,authorizeRoles} = require("../middlewares/auth")

// let transporter = nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//             user:process.env.AUTH_EMAIL,
//             pass:process.env.AUTH_PASSWORD
//         }
// })


// // verify successfully
// transporter.verify((error,success)=>{
//         if(error){
//                 console.log(error)
//         }
//         else{
//                 console.log('Server is ready to take our messages')
//                 console.log(success)
//         }
// })
// router.post("/register",async(req,res)=>{
//         const newUser = new User({
//            username:req.body.username,
//            email:req.body.email,
//            dateOfBirth:req.body.dateOfBirth,
//            fullName:req.body.fullName,
//            password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
//            verified:false,
//            avatar:req.body.avatar
//         })
//         try {
//           const savedUser = await newUser.save()
//           res.status(201).json(savedUser);
//         } catch (error) {
//                res.status(500).json(error) 
//         }
// })

// // send verificationEmail
// const sendVerificationEmail = ({_id,email},res) => {
//     // url to be used in the email
//     const currentUrl = "http://localhost:8000/";
//     const uniqueString = uuid.v4() + _id;
        
//     // mail options
//     const mailOptions = {
//         from:process.env.AUTH_EMAIL,
//         to:email,
//         subject:"Verify your email",
//         html:`<p>Verify your email address to complete the singup and login into your account.</p>
//         <p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
//                 currentUrl + "user/verify/" + _id + "/" + uniqueString
//         }> here </a> to proceed.</p>
//         }`
//     }
// }
// router.post("/login",async(req,res)=>{
//         try {
//                 const user = await User.findOne({
//                         username:req.body.username,
//                         email:req.body.email
                       
//                      })
//                 !user  && res.status(401).json("Wrong credentials");

//                 const hashedPassword = CryptoJS.AES.decrypt(
//                         user.password,
//                         process.env.PASS_SEC
//                 )
//                 const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//                 OriginalPassword !== req.body.password && res.status(401).json('Wrong credentials');

//                 const accessToken = jwt.sign({
//                         id:user._id,
//                         isAdmin:user.isAdmin
//                 },process.env.JWT_SEC,{
//                         expiresIn:"3d"
//                 })

//                 const {password,...others} = user._doc;
//                 res.status(200).json({...others,accessToken});

//         } catch (error) {
//                res.status(500).json(error) 
//         }
// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout,forgotPassword,resetPassword} = require("../controller/authController")
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")
const {getUserProfile,updatePassword,updateProfile, allUsers, getUserDetails, updateUser,deleteUser} = require("../controller/userController");
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/users').get(allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
                                .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
                                .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)
module.exports = router;