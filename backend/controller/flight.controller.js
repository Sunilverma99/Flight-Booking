import Flight from "../models/flight.model.js";
import errHandler from "../utlies/error.js"
const addNewFlight= async (req, res,next) => {
    const {flightNumber,departure,arrival,departureDateTime,arrivalDateTime,price,airline}=req.body;
    if(!flightNumber|| !departure ||!arrival ||!departureDateTime ||!arrivalDateTime ||!price){
        return next(errHandler(400,"All fields are required"))
    }
    const newFlight=new Flight({flight_number:flightNumber,origin:departure,destination:arrival,departure_time:departureDateTime,arrival_time:arrivalDateTime,price,airline:airline});
    try{
        await newFlight.save();
        res.status(201).json(newFlight);    
    }catch(err){
        return next(errHandler(500,"Internal server error"))
    }
}
const deleteFlight=async (req,res,next)=>{
    const id=req.params.id;
    try{
        const flight=await Flight.findByIdAndDelete(id);
        if(!flight){
            return next(errHandler(404,"Flight not found"))
        }
        res.status(200).json({message:"Flight removed successfully"})
    }catch(err){
        return next(errHandler(500,"Internal server error"))
    }
}
const searchFlights = async (req, res) => {
    const { origin, destination, date, time } = req.query;
    const departureDateTimeString = `${date}T${time}:00.000Z`;
    const departureDateTime = new Date(departureDateTimeString);

    try {
        const flights = await Flight.find({
            origin,
            destination,
            departure_time: {
                $gte: departureDateTime,
                $lt: new Date(departureDateTime.getTime() + 24 * 60 * 60 * 1000) // Adding 24 hours to get flights for the whole day
            }
        }).limit(10);

        if (flights.length === 0) {
            return res.status(404).send('No flights found');
        }

        res.status(200).json(flights);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getFlights=async (req,res,next)=>{
    try{
        const flights=await Flight.find().limit(10);
        res.status(200).json(flights);
    }catch(err){
        return next(errHandler(500,"Internal server error"))
    }

}
export {addNewFlight,deleteFlight,searchFlights,getFlights};
