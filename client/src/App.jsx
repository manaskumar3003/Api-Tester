
import React from 'react';
import ApiTester from './components/ApiTester';
import { Button } from './components/ui/button';
import Navbar from './components/home/navbar';
import Home from './pages/home';
import TestComponent from './pages/home';

function App() {

  return (
    <div>
    <Navbar />
    <div className=" mt-10 pt-16"> 
      <TestComponent />
      </div>
    </div>
  )
}

export default App
