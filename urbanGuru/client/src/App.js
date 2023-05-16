import React from 'react';
import {Routes, Route} from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Registration from './components/Registration';

// Pages
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './components/Login';

const App = () => {
  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/property/:id' element={<PropertyDetails/>}/>
      </Routes>
      <Footer/>
    </div>
  )
};

export default App;
