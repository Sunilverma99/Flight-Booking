import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
function MyBooking() {
    const[flights,setFlights]=useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const giveDate=(DATE)=>{
      const date=new Date(DATE);
      return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    }
    const giveTime=(TIME)=>{
      const date=new Date(TIME);
      return date.getHours()+":"+date.getMinutes();
    }
     useEffect(()=>{
        if(currentUser){
            fetch(`/api/getUserBookings/${currentUser._id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            }).then(res=>res.json())
            .then(data=>{
             setFlights(data);
             console.log(flights);
            })
        }
     },[])
  return (
    <div className="elative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         <tr>
           <th scope="col" className="px-6 py-3">Flight Number</th>
           <th scope="col" className="px-6 py-3">Departure</th>
           <th scope="col" className="px-6 py-3">Arrival</th>
           <th scope="col" className="px-6 py-3">Departure Date</th>
           <th scope="col" className="px-6 py-3">Arrival Date</th>
           <th scope="col" className="px-6 py-3">Departure Time</th>
           <th scope="col" className="px-6 py-3">Arrival Time</th>
           <th scope="col" className="px-6 py-3">Price</th>
         </tr>
       </thead>
       <tbody>
        {flights && flights.length>0 &&
         flights.map((flight)=>(
          flight &&
              <tr key={flight._id}>
              <td scope="col" className="px-6 py-3">{flight.flight_number}</td>
              <td scope="col" className="px-6 py-3">{flight.origin}</td>
              <td scope="col" className="px-6 py-3">{flight.destination}</td>
             
              <td scope="col" className="px-6 py-3">{giveDate(flight.departure_time)}</td>
              <td scope="col" className="px-6 py-3">{giveDate(flight.arrival_time)}</td>
              <td scope="col" className="px-6 py-3">{giveTime(flight.departure_time)}</td>
              <td scope="col" className="px-6 py-3">{giveTime(flight.arrival_time)}</td>
              <td scope="col" className="px-6 py-3">{flight.price}</td>
            </tr>
         ))}
        
       </tbody>
    </table>
  </div>
  )
}

export default MyBooking