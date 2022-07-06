import React from 'react';
import Robo from '../assets/robot.gif';

const Home = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center">
      <img className="h-[16rem] sm:h-[24rem]" src={Robo} alt="Robo" />
      <h1 className="text-4xl sm:text-6xl text-sky-900">Welcome User!</h1>
      <h3 className="text-sm sm:text-lg text-gray-600">Click on create blog to create a new Blog.</h3>
    </div>
    </>
  )
}

export default Home
