import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../../redux/theme/theme.js";
import { setUser } from '../../redux/user/userSlice.js';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FcBusinessContact } from "react-icons/fc";
export default function Header() {
  const path = useLocation().pathname;
 const dispatch=useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme)
 const[searchTerm,setSearchTerm]=useState('');
 const location=useLocation();
 const navigate=useNavigate();
  const handleSignOut=async()=>{
    try{
      const res=await fetch('/api/auth/signOut',{
        method:"POST"
      });
      const data=await res.json();
      console.log(data);
      if(!res.ok){
        toast.error(data.message);
      }else{
        toast.success("Sign out successfully");
        dispatch(setUser(null));
        navigate('/sign-in');
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  

  return (
    <Navbar className='border-b-2 max-w-screen  px-10'>
  <Link to='/' className=' text-black self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
      Book'
    </span>Flight
  </Link>

  <Button type='submit' className='w-12 h-10 lg:hidden' color='gray' pill>
    <AiOutlineSearch />
  </Button>
  <div className='flex gap-2 md:order-2 py-1'>
    <Button
      className='w-12 h-10 sm:flex hidden '
      color='gray'
     pill
     onClick={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? <FaSun /> : <FaMoon />}
    </Button>
   { currentUser?(
      <Dropdown
      arrowIcon={false}
      inline

      label={
        <Avatar alt='user' className='w-12 h-6' img={currentUser.photoUrl} rounded />
      }
      >
       <Dropdown.Header>
              <span className='block text-sm'>{currentUser.userName}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>  
            
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut} >Sign out</Dropdown.Item>
      </Dropdown>
    ):(<Link to='/sign-in'>
    <button class=" w-13 h-10  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign-in
</span>
</button>
    </Link>)}
    
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse >
    <Navbar.Link active={path === '/'} as={'div'}>
      <Link to='/' >Home</Link>
    </Navbar.Link>
    {
      currentUser && !currentUser.isAdmin ? (
        <Navbar.Link active={path === '/myBooking'} as={'div'}>
        <Link to='/myBooking' className='flex items-center'>My Booking </Link>
      </Navbar.Link>
      ) : null
    }
    
    <Navbar.Link active={path === '/about'} as={'div'}>
      <Link to='/about'>About</Link>
    </Navbar.Link>
    <Navbar.Link active={path === '/contact'} as={'div'}>
      <Link to='/contact' className='flex items-center'>Contact Us </Link>
    </Navbar.Link>
    
  </Navbar.Collapse>
</Navbar>


  );
}