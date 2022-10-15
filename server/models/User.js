import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
       {
          name : {
                type: String,
                require: true,
                unique: true,
          },
          email : {
                type: String,
                require: true,
                unique: true,
          },
          password: {
                type: String,
                
          },
          img: {
                type: String,
          },
          subscribers : {
                type: Number,
                default: 0,
          },
          subscribedUsers:{
                type:[String]
          },
          formGoogle:{
            type:Boolean,
            default:false,
          }
       },
       { timestamps: true }        //record the time or date off 
);

export default mongoose.model("User", UserSchema)