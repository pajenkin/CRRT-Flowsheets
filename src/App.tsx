//import React from 'react'
// @ts-nocheck --> Keep to ignore typescript typing errors. KEEP I PROMISE. 
import Select from 'react-select';
import { useState } from 'react';
import {Logo} from './Logo.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import MainFlowsheet from './main/MainFlowsheet';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HyponatremiaPage from './pages/HyponatremiaPage';
import FutureThoughtsPage from './pages/FutureThoughtsPage';

const ProtocolSelections = [
  {value:'1', label: 'Non-Shock'},
  {value:'2', label: 'Shock'}
];

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainFlowsheet />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/hyponatremia" element={<HyponatremiaPage />} />
        <Route path="/future" element={<FutureThoughtsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;