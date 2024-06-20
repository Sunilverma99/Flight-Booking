import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <motion.h1 
          className="text-4xl font-bold text-center text-black dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
          <motion.div 
            className='w-full lg:w-1/2 rounded-lg p-4  '
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img className='w-full h-auto rounded-lg' src="https://images.pexels.com/photos/6803523/pexels-photo-6803523.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </motion.div>
          <motion.div 
            className="bg-opacity-75 p-8 w-full lg:w-1/2 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
            Welcome to our flight booking website! We are a dedicated team of travel enthusiasts, aviation experts, and tech-savvy professionals passionate about making your travel experience seamless and enjoyable.            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
            Our founder, Sunil, is currently studying at IIIT Una, Himachal Pradesh. With his expertise as a full stack developer, he envisioned this platform to simplify the process of booking flights and to provide travelers with a user-friendly and efficient service.            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
            Whether you are planning a business trip, a family vacation, or a spontaneous getaway, our website offers a comprehensive range of flight options to suit your needs. We strive to provide competitive prices, convenient booking options, and exceptional customer service to ensure your journey is smooth from start to finish.            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
            Thank you for choosing our flight booking website. Feel free to browse through our flight options, take advantage of our deals, and let us help you reach your destination with ease. Happy travels!






</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
