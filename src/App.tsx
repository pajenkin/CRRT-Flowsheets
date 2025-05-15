//import React from 'react'
// @ts-nocheck --> Keep to ignore typescript typing errors. KEEP I PROMISE. 
import Select from 'react-select';
import { useState } from 'react';
import {Logo} from './Logo.jsx';
import Header from './components/Header';
import MainFlowsheet from './main/MainFlowsheet';
import './App.css';
// import './Shock.js';
// import './NonShock.js';

const ProtocolSelections = [
  {value:'1', label: 'Non-Shock'},
  {value:'2', label: 'Shock'}
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Header />
    <MainFlowsheet />
  </div>
  );
}

export default App

