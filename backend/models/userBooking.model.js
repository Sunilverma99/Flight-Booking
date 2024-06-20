import mongoos from "mongoose";
const userBookingSchema = mongoos.Schema({
    userId: {
        type: mongoos.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    flightId: {
        type: mongoos.Schema.Types.ObjectId,
        required: true,
        ref: "Flight"
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingStatus: {
        type: String,
        required: true,
        default: "Booked"
    },
    flightNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });
const UserBooking = mongoos.model("UserBooking", userBookingSchema);
export default UserBooking;