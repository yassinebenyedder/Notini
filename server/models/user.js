const {Schema,model}=require("mongoose");
//user schema
const UserSchema=new Schema({

    username:{
    type:String,
    required:true
    },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   }}, { timestamps: true });
const userModel=model("users",UserSchema);
module.exports=userModel;