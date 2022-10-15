import mongoose from "mongoose"; 
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { createError } from "../error.js";


export const signup = async (request, response, next) => {     //async - it will take time
    //console.log(request.body);
    try{
       //const bcrypt = require('bcriptjs'); 
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(request.body.password, salt); 
       const newUser = new User({...request.body, password:hash}) ;
        
       
       await newUser.save();
       response.status(200).send("user has been created")
    }catch(error) {
       next(error) 
       // next(createError(404, "not found sorry!"))
    }     
};


export const signin = async (request, response, next) => {     //async - it will take time
    //console.log(request.body);
    try{
       const user = await User.findOne({ name:request.body.name }) //coming from User models
       if ( !user ) return next(createError(404, "user not found!"))
        
       const isCorrect = bcrypt.compare( request.body.password, user.password)

       if ( !isCorrect ) return next(createError(400, "Wrong credentials!"))
       
       const token = jwt.sign({ id:user._id}, process.env.JWT)
       //const { password, ...others } = user    provides unnessasary information
       const { password, ...others } = user._doc;

       response.cookie("access_token", token, { 
          httpOnly:true
       })
       .status(200).json(others);
  
    }catch(error) {
       next(error) 
       // next(createError(404, "not found sorry!"))
    }     
};
       
export const googlrAuth = async (request, response, next) => {
   try{
      const user = await User.findOne({email:request.body.email});
      if (user) {
         const token = jwt.sign({ id: user._id}, process.env.JWT);
         response.cookie("access_token", token, { 
            httpOnly:true
         })
         .status(200).json(user._doc);
      } else {
         const newUser = new User ({
            ...request.body,
            formGoogle: true
         })
         const savedUser = await newUser.save()
         const token = jwt.sign({ id: savedUser._id}, process.env.JWT);
         response.cookie("access_token", token, { 
            httpOnly:true
         })
         .status(200).json(savedUser._doc);
      }

   }catch(error) {
      next(error);
   }
}
          