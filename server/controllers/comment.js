import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Vedio from "../models/Video.js";


export const addComment = async (request, response, next) => {
    const newComment = new Comment({ ...request.body, userId:request.user.id})                     
    try{
       const savedComment = await newComment.save()
       response.status(200).send(savedComment)          
    }catch(error) {
        next(error);         
    }            
}

export const deleteComment = async (request, response, next) => {
    try{
       const comment = await Comment.findById(response.params.id)         
       const vedios = await Vedio.findById(response.params.id)   
       if( request.user.id === comment.userId || request.user.id === Video.userId )
         {
            await Comment.findByIdAndDelete( request.params.id)
            response.status(200).json("Comment has been deleted.")    
         }else {
              return next(createError(403,'You can delete only your comment!'))  
         }      
    }catch(error) {
        next(error);        
    }            
}

export const getComment = async (request, response, next) => {
    try{
       const comments = await Comment.find({ videoId: request.params.videoId})
       //populate('userId', 'videoId'); we can access multiple path at same time
       response.status(200).json(comments)         
    }catch(error) {
        next(error);        
    }  
              
}
