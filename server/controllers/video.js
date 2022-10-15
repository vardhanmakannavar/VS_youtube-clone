import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import { request } from "express";

export const addVideo = async (request, response, next) => {
  const newVideo = new Video({ UserId: request.user.id, ...request.body });
  console.log(newVideo);
  try {
    const savedVideo = await newVideo.save();
    response.status(200).json(savedVideo);  
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (request.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      response.status(200).json(updateVideo);
    } else {
      return next(createError(403, "You can update only your Video."));
    }
  } catch (error) {
      next(error);
  }
};

export const deleteVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (request.user.id === video.userId) {
      await Video.findByIdAndDelete(request.params.id);
      response.status(200).json("Video has been deleted");
    } else {
      return next(createError(403, "You can delete only your Video"));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    console.log(video);
    response.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (request, response, next) => {
  try {
    await Video.findByIdAndUpdate(request.params.id, {
      $inc: { views: 1 },
    });
    response.status(200).json("The view has been increased.");
  } catch (error) {
    next(error);
  }
};

export const random = async (request, response, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    response.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (request, response, next) => {
  try {
    const videos = await Video.find({}).sort({ views: -1 });
    response.status(200).json(videos);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const sub = async (request, response, next) => {
  try{
     const user = await User.findById( request.user.id)
     const subscribers = await Promise.all(
      user.subscribedUsers.map(async (subscriber) => {
        const userPopulated = await User.findById(subscriber);
        return userPopulated;
      })
    );
    

     response.status(200).json(subscribers.flat().sort((a,b) => b.createdAt - a.createdAt));
       //flat() provides single array.
       //sort() use to give latest vedios.
  } catch (error) {
     next(error);   
  }
};

export const getByTag = async (request, response, next) => {
  const tags = request.query.tags.split(",")   //?tags=js,py,c
  console.log(tags); 
  try {
    const videos = await Video.find({ tags: {$in: tags }}).limit(20);
    console.log(videos);
    response.status(200).json(videos);
  } catch (error) {
    next(error)
  }
};

export const search = async (request, response, next) => {
  const query = request.query.q       //search?q=user
  try {
    const videos = await Video.find( { title: { $regex: query, $options: "i"},}).limit(40);
    response.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
