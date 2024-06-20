import mongoose from "mongoose";
const flightschema = mongoose.Schema({
    flight_number: {
        type: String,
        required: true
      },
      origin: {
        type: String,
        required: true
      },
      destination: {
        type: String,
        required: true
      },
      departure_time: {
        type: Date,
        required: true
      },
      arrival_time: {
        type: Date,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      airline: {
        type: String,
        required: true
      },
      capacity: {
        type: Number,
        required: true,
        default:60
      },
  })

const Flight = mongoose.model("Flight", flightschema);
export default Flight;