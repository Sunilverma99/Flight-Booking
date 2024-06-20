import express from 'express';
import { signUp ,signIn} from '../controller/auth.controller.js';
const router =express.Router();
router.post('/auth/signUp',signUp);
router.post('/auth/signIn',signIn);
router.post('/auth/signOut', (req, res) => { 
   res.clearCookie('jwt');  
    res.json({ message: 'Sign out successfully' });
  }
);
export default router;