import express from 'express'
import { login, signup } from '../controllers/user-controllers.js';
import { loginRequired } from '../middlewares/protected.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/allUsers', async (req, res) => {
    try {
      const users = await User.find();
  
      res.json({allUser: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

export default router;