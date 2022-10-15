import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
       {
          userId : {
                type: String,
                require: true,
               // unique: true,
          },

          videoId : {
                type: String,
                require: true,
          },

          description : {
                type: String,
                require: true,
          },
       },
       { timestamps: true }        //record the time or date off 
);

export default mongoose.model("Comment", CommentSchema)