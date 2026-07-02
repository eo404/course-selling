import mongoose from "mongoose";

const userSchema = new moongoose.Schema (
    {
        name:{
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
        },
    },{timeStamp : true}
);

const User = mongoose.model('User',userSchema);
export default User;