import express from 'express';
import {bookFlight,getUserBookings} from "../controller/user.controller.js";
const router=express.Router();
router.post('/bookFlight',bookFlight);
router.get('/getUserBookings/:id',getUserBookings);
export default router;