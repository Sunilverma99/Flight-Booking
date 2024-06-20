import express from 'express';
import { addNewFlight,deleteFlight,searchFlights,getFlights} from '../controller/flight.controller.js';
const router =express.Router();
router.post('/flight/addNew',addNewFlight);
router.delete('/flight/deleteFlight/:id',deleteFlight);
router.get('/flight/searchFlights',searchFlights)
router.get('/flight/getFlights',getFlights);
export default router;