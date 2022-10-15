import User from "../models/User.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"



// export const test = (request, response, next) => {
//       //console.log('test is working!'); 
//       response.json('its successfull');         
// }  


export const update = async (request, response, next) => {
    if( request.params.id === request.user.id ) {
       try {
          const updatedUser = await User.findByIdAndUpdate(request.params.id,
          {
            $set:request.body      
          },
          {new: true} ); 
       
          response.status(200).json(updatedUser)
       } catch(error) {
            next(error)
       }
     } else {
      return next(createError(403, "You can update only your account!"))
    }           
};  

export const deleteUser = async (request, response, next) => {
      if( request.params.id === request.user.id ) {
            try {
                await User.findByIdAndDelete(request.params.id,
               ); 
            
               response.status(200).json("User has been deleted.")
            } catch(error) {
                 next(error)
            }
          } else {
           return next(createError(403, "You can delete only your account!"))
         }           
};  

export const getUser = async (request, response, next) => {
      try{
          const user = await User.findById ( request.params.id) 
          response.status(200).json(user) 
      } catch(error) {
        next(error)
      }        
};  

export const subscribe = async (request, response, next) => {
      try{
          await User.findByIdAndUpdate( request.user.id, {
            $push:{ subscribedUsers: request.params.id }
          }) 
          await User.findByIdAndUpdate ( request.params.id, { 
            $inc:{ subscribers:1 },
          });
          response.status(200).json("Subscription successfull.")   

      } catch(error) {
         next(error)
      }            
};  

export const unsubscribe = async (request, response, next) => {
      try{
         await User.findByIdAndUpdate ( request.user.id, {
               $pull:{ subscribedUsers: request.params.id }
             }) 
             await User.findByIdAndUpdate ( request.params.id, { 
               $inc:{ subscribers:1 },
             });
             response.status(200).json("Unsubscription successfull.")      

      } catch(error) {
         next(error)
      }         
};  

export const like = async (request, response, next) => {
  const uId = request.user.id;
  const vId = request.user.videoId;
    try{
      await Video.findByIdAndUpdate(vId, {
        $addToSet: { likes:uId },  //we cannot add like again and again
        $pull:{ disLikes:uId }
      })
      response.status(200).json("The Video has been liked.")

    } catch(error) {
       next(error);
    }        
};  

export const dislike = async (request, response, next) => {
  const uId = request.user.id;
  const vId = request.params.videoId;
    try{
      await Video.findByIdAndUpdate(vId, {
        $addToSet: { disLikes:uId }, 
        $pull:{ likes:uId }
      })
      response.status(200).json("The Video has been disliked.")
    } catch(error) {
       next(error);
    }        
};  

