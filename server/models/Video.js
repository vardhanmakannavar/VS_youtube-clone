import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
       {
          userId : {
                type: String,
                require: true,
                //unique: true,
          },

          title : {
                type: String,
                require: true,
          },

          description: {
                type: String,
                require: true,
          },

          imageUrl : {
                type: String,
                require: true,
          },

          videoUrl : {
                type: String,
                require: true,
          },

          views : {
                type: Number,
                default: 0,
          },

          tags : {
                type:[String],
                default: [],
          },

          likes : {
                type:[String],
                default: [],
          },

          disLikes : {
                type:[String],
                default: [],
          },  
       },
       { timestamps: true }        //record the time or date off
);

export default mongoose.model("Video", VideoSchema)