import React from 'react'
import Categorylist from '../components/categorylist';
import Bannerproduct from '../components/bannerproduct';
import Horizontalcomponent from '../components/Horizontalcomponent';
import Verticalcomponent from '../components/Verticalcomponent';

const Home = () => {
  return (
    <div>
      <Categorylist/>
      <Bannerproduct/>
      <Horizontalcomponent category={'airpodes'} heading={'top Airpods'}/>
      <Verticalcomponent category={'mobiles'} heading={'top mobiles'}/>
    </div>
  )
}

export default Home;
