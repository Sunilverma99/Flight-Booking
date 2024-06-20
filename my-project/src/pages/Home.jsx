import { set } from 'mongoose';
import React from 'react'
import { useEffect,useState } from 'react';
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function Home() {
  const {currentUser}=useSelector((state)=>state.user);
 
  if(currentUser!=null&& currentUser.isAdmin){
    const[flights,setFlights]=useState([]);
    useEffect(()=>{
      const fetchFlights=async()=>{
        const response=await fetch("http://localhost:5000/api/flight/getFlights");
        const data=await response.json();
        setFlights(data);
      }
      fetchFlights();
    },[]);
    const giveDate=(DATE)=>{
      const date=new Date(DATE);
      return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    }
    const giveTime=(TIME)=>{
      const date=new Date(TIME);
      return date.getHours()+":"+date.getMinutes();
    }
    const handleDelete=async(id)=>{
      const confirmed = window.confirm("Are you sure you want to delete this flight?");
      if(!confirmed){
        return;
      }else{
      const response=await fetch(`http://localhost:5000/api/flight/deleteFlight/${id}`,{
        method:'DELETE',
        headers:{
          "Content-Type":"application/json",
          }
        });
        if(response.ok){
          
          const newFlights=flights.filter((flight)=>flight._id!==id);
          setFlights(newFlights);
        }
    }
  }
    return (
     <div className="h-screen">
      <div className="flex gap-x-5 py-4">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 px-8">Flights</h1>
        <Link to="/addFlight" className=" bg-blue-500 text-white dark:text-black p-2 rounded-md ">Add new Flight</Link>
      </div>
       <div className="elative overflow-x-auto">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Flight Name</th>
                <th scope="col" className="px-6 py-3">Flight Number</th>
                <th scope="col" className="px-6 py-3">Departure</th>
                <th scope="col" className="px-6 py-3">Arrival</th>
                <th scope="col" className="px-6 py-3">Departure Date</th>
                <th scope="col" className="px-6 py-3">Arrival Date</th>
                <th scope="col" className="px-6 py-3">Departure Time</th>
                <th scope="col" className="px-6 py-3">Arrival Time</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight)=>(
                   <tr id={flight._id}>
                   <td scope="col" className="px-6 py-3">Flight Name</td>
                   <td scope="col" className="px-6 py-3">{flight.flight_number}</td>
                   <td scope="col" className="px-6 py-3">{flight.origin}</td>
                   <td scope="col" className="px-6 py-3">{flight.destination}</td>
                  
                   <td scope="col" className="px-6 py-3">{giveDate(flight.departure_time)}</td>
                   <td scope="col" className="px-6 py-3">{giveDate(flight.arrival_time)}</td>
                   <td scope="col" className="px-6 py-3">{giveTime(flight.departure_time)}</td>
                   <td scope="col" className="px-6 py-3">{giveTime(flight.arrival_time)}</td>
                   <td scope="col" className="px-6 py-3">{flight.price}</td>
                   <td scope="col" className="px-6 py-3"><button type="submit" onClick={()=>handleDelete(flight._id)} className="bg-red-500 rounded-md text-white dark:text-black p-2">Delete</button></td>
                 </tr>
              ))}
             
            </tbody>
         </table>
       </div>
      </div>
    )
  }else{
    const[departure,setDeparture]=useState("");
    const[arrival,setArrival]=useState("");
    const[departureDate,setDepartureDate]=useState("");
    const [flights,setFlights]=useState([]);
    
      useEffect(()=>{
        const fetchFlights=async()=>{
          const response=await fetch("http://localhost:5000/api/flight/getFlights");
          const data=await response.json();
          setFlights(data);
        }
        fetchFlights();
    },[])
    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(departure,arrival,departureDate);
      const response=await fetch(`http://localhost:5000/api/flight/searchFlights?origin=${departure}&destination=${arrival}&date=${departureDate}&time=00:00`);
      const data=await response.json();
       setFlights(data);
    }
    const handleBookFlight=async(id)=>{{
      const confirmed = window.confirm("Are you sure you want to book this flight?");
      if(!confirmed){
        return;
    }
    const flightId=id;
    console.log(flightId,currentUser._id);
    const userId=currentUser._id;
    const response=await fetch(`http://localhost:5000/api/bookFlight`,
    {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({flightId,userId})
    }
    
   );
    if(response.ok){
      toast.success("Flight Booked Successfully");
    }else {
      toast.error("Failed to book flight");
    }
   }
    }
    const giveDate=(DATE)=>{
      const date=new Date(DATE);
      return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    }
    const giveTime=(TIME)=>{
      const date=new Date(TIME);
      return date.getHours()+":"+date.getMinutes();
    }
    return (
      <div>
      <div className='flex items-center gap-96 px-16  p-2'>
       <div>
  <h1 className=' text-4xl text-center font-bold rounded-2xl text-gray-500 py-9'>Search Your Flight</h1>
<form  className="max-w-md mx-auto p-4 ">
 
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" value={departure} onChange={(e)=>setDeparture(e.target.value)}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Departure</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" value={arrival} onChange={(e)=>setArrival(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Arrival</label>
    </div>
  </div>
  <div className="grid md:grid-cols-1 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="Date" value={departureDate} onChange={(e)=>setDepartureDate(e.target.value)}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Departure Date</label>
    </div>
    
  </div>
  <button type="submit" onClick={handleSubmit}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Flight</button>
</form>
        </div>
        <div>
         <img  className=' w-96 rounded-xl  ' src="https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
    </div>
    <div className="elative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         <tr>
           <th scope="col" className="px-6 py-3">Flight Name</th>
           <th scope="col" className="px-6 py-3">Flight Number</th>
           <th scope="col" className="px-6 py-3">Departure</th>
           <th scope="col" className="px-6 py-3">Arrival</th>
           <th scope="col" className="px-6 py-3">Departure Date</th>
           <th scope="col" className="px-6 py-3">Arrival Date</th>
           <th scope="col" className="px-6 py-3">Departure Time</th>
           <th scope="col" className="px-6 py-3">Arrival Time</th>
           <th scope="col" className="px-6 py-3">Price</th>
           <th scope="col" className="px-6 py-3">Delete</th>
         </tr>
       </thead>
       <tbody>
         {flights.map((flight)=>(
              <tr id={flight._id}>
              <td scope="col" className="px-6 py-3">Flight Name</td>
              <td scope="col" className="px-6 py-3">{flight.flight_number}</td>
              <td scope="col" className="px-6 py-3">{flight.origin}</td>
              <td scope="col" className="px-6 py-3">{flight.destination}</td>
             
              <td scope="col" className="px-6 py-3">{giveDate(flight.departure_time)}</td>
              <td scope="col" className="px-6 py-3">{giveDate(flight.arrival_time)}</td>
              <td scope="col" className="px-6 py-3">{giveTime(flight.departure_time)}</td>
              <td scope="col" className="px-6 py-3">{giveTime(flight.arrival_time)}</td>
              <td scope="col" className="px-6 py-3">{flight.price}</td>
              <td scope="col" className="px-6 py-3"><button type="submit" onClick={()=>handleBookFlight(flight._id)} className="bg-green-500 rounded-md text-white dark:text-black p-2">Book</button></td>
            </tr>
         ))}
        
       </tbody>
    </table>
  </div>
  </div>
    )
  }
}

export default Home