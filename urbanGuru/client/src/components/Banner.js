import React from 'react';
import { Link } from 'react-router-dom'

// component
import Search from '../components/Search';

import Image from '../assets/img/houses/house-banner.png';

const Banner = () => {
  return(
    <header style={{ paddingLeft: 0 }}>
    <main
      className='p-5 text-center bg-image'
      style={{ backgroundImage:`url(${Image})`,backgroundSize:'cover' ,borderRadius: '', backgroundPosition:'center', height:'50vh'}}
    >
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding:'90px', borderRadius: '', marginTop:'2vh'}}>
        <div className='text-center h-100'>
          <div className='text-white'>
          <h1 className="mt-9 mb-1 text-4xl text-white-800">UrbanGuru</h1>
            <h4 className='mb-3'>Leave the Heavy Lifting to Us, Focus on Your Move!</h4>
            <Link to='/signup' className="btn text-white border-white text-sm bg-transparent border-2 rounded-lg px-6 py-3">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </main>
    <br/>
    <Search/>
  </header>
  )
};

export default Banner;
