import express from 'express';

//components
import { googlrAuth, signup, signin } from '../controllers/auth.js';

const router = express.Router();

//router.get('/test',test)

//CREATE A USER
router.post('/signup',signup)

//SIGN IN
router.post('/signin',signin)

//GOOGLE AUTH
router.post('/google', googlrAuth)



export default router;