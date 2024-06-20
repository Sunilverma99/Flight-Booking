import User from '../models/user.model.js';
import Flight from '../models/flight.model.js';
import UserBooking from '../models/userBooking.model.js';

const bookFlight = async (req, res, next) => {
    const { flightId, userId } = req.body;
    console.log(req.body);
    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        if (flight.capacity === 0) {
            return res.status(400).send('Flight is full');
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        const userBooking = new UserBooking({
            userId,
            flightId,
            bookingDate: new Date(),
            flightNumber: flight.flight_number   
        });

        await userBooking.save();

        // Update flight capacity
        await Flight.findByIdAndUpdate(flightId, { $inc: { capacity: -1 } });
        console.log(flight.capacity);
        res.status(200).send('Flight booked successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getUserBookings = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);  
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        const userBookings = await UserBooking.find({ userId });
        
        if (!userBookings.length) {
            return res.status(200).send([]); // No bookings found, return empty array
        }
        
        const flightIds = userBookings.map(booking => booking.flightId);
        const flights = await Flight.find({ _id: { $in: flightIds } }).limit(10);
        
        res.status(200).json(flights);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export { bookFlight, getUserBookings};
