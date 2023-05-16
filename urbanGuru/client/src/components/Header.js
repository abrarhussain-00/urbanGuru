import React from 'react';

// import link
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='py-6 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'>
          <h1>UrbanGuru</h1>
        </Link>
        <div className='flex items-center gap-6'>
          <Link className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition' to='/login'>
            Log in
          </Link>
          <Link
            className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition'
            to='/signup'
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
