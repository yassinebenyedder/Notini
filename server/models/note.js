const {Schema,model}=require("mongoose");
//note schema
const noteSchema= new Schema({
    title:{
        type: String,
        default: "Untitled"
    },
    content:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    tags:{
        type: [String],
        default: []
    },
    pinned:{
        type:Boolean,
        default:false
    }} ,{ timestamps: true });
const noteModel=model("notes",noteSchema);
module.exports=noteModel;