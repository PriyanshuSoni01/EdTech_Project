import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import emailTemplate from "../mail/templates/emailVerificationTemplate.js"

const otpSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
  }
})

//a function to send mails
async function sendVerificationEmail(email,otp){
  try {
    const mailResponse = await mailSender(email,"Verification Email from EduConnect", emailTemplate(otp));

    console.log("Email Sent Successfully!!", mailResponse);
  } catch (error) {
    console.log("Error occured in sending mail !!", error);
    throw error;
  }
}

otpSchema.pre("save", async function(next){
  if(this.isNew){
  await sendVerificationEmail(this.email, this.otp);
  }
  next();
})

export default mongoose.model("OTP", otpSchema);