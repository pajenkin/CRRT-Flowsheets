//import React from 'react'
// @ts-nocheck --> Keep to ignore typescript typing errors. KEEP I PROMISE. 
import Select from 'react-select';
import { useState } from 'react';
import {Logo} from './Logo.jsx';
import './App.css';
import './Shock.js';
import './NonShock.js';
import {calculateNonShockProtocol} from './NonShock.js';
import {calculateShockProtocol} from './Shock.js';

const ProtocolSelections = [
  {value:'1', label: 'Non-Shock'},
  {value:'2', label: 'Shock'}
];

function App() {

  let PatientReturnParams = [];

    //initialize variables
    const [ ProtocolType, setProtocolType] = useState(0);
    const [ PatientWeight, setPatientWeight] = useState(0);
    const [ PatientAlbumin, setPatientAlbumin] = useState(0);
    const [ PatientBFR, setPatientBFR] = useState(0);
    const [ PatientACDA, setPatientACDA] = useState(0);
    const [ PatientDFR, setPatientDFR] = useState(0);
    const [ PatientRFR, setPatientRFR] = useState(0);
    const [ PatientCaDose, setPatientCaDose] = useState(0);
    const [ PatientEffluent, setPatientEffluent] = useState(0);
    const [ InputError, setInputError] = useState(' ');
 

  // Set protocol Type: Shock/Non-Shock
  function defineProtocolType (e: React.ChangeEvent<HTMLInputElement>) {
    setProtocolType(parseInt(e.value));
  };

  function definePatientWeight (e: React.ChangeEvent<HTMLInputElement>){
    let weight = parseInt(e.target.value);
    if (weight >= 20 && weight <= 150){
      //console.log("weight check ok");
      sendInputError("");
      setPatientWeight(weight);
    } else {
      sendInputError("Weight not within range");
      console.log("patient weight not right")
    };
  };

  function definePatientAlbumin (e: React.ChangeEvent<HTMLInputElement>) {
    let albumin = parseInt(e.target.value);
    console.log(albumin);
    if (albumin >=1.0 && albumin <= 5.0){
      //console.log ("albumin check is ok");
      sendInputError("");
      setPatientAlbumin(albumin);
    } else {
      sendInputError("Albumin not within range");
      console.log("Patient albumin not right");
    }
  
  };

  //Check Weight as a variable
  function checkPatientWeight(){
      if (PatientWeight >= 20 && PatientWeight <= 300) {
          sendInputError("");
          return true;
      } else {
        sendInputError("Weight not within range");
        return false;
      }
  };

    //Check Weight as a variable
  function checkPatientAlbumin(){
      if (PatientAlbumin >=1.0 && PatientAlbumin <= 5.0) {
          return true;
      } else {
          sendInputError("Albumin not within range");
          return false;
      }
  };
  
  function ValidateVariables (){
    //definePatientCalcium();
    if (checkPatientWeight() == true && checkPatientAlbumin() == true){
      return true;
    } else {
      return false;
    };
  };

  function youMayProceed(){
    if (ProtocolType == 1){
      if (ValidateVariables() == true){
        PatientReturnParams = calculateNonShockProtocol(PatientWeight, PatientAlbumin);
      } else { console.log("not yet complete"); };
    } else if (ProtocolType == 2) {
      if (ValidateVariables() == true){
        PatientReturnParams = calculateShockProtocol(PatientWeight, PatientAlbumin);
      } else {console.log ("not yet complete")};
    } else {
      console.log("Not valid input")
    }
  }

  function ChangeAllVariables(){
    setPatientBFR(PatientReturnParams.BFR);
    setPatientDFR(PatientReturnParams.DFR);
    setPatientCaDose(PatientReturnParams.calciumDose);
    setPatientEffluent(PatientReturnParams.effluent);
    setPatientACDA(PatientReturnParams.ACDA);
    setPatientRFR(PatientReturnParams.RFR);
  }
  
  function handleOnClick (){
    youMayProceed();
    PatientReturnParams = Object.values(PatientReturnParams)[0];
    ChangeAllVariables();
  };

  function sendInputError (message){
    if(message == ""){
      console.log("Error: " + message);
      setInputError("");
    } else {
      console.log("Error: " + message);
      setInputError("Error: " + message);
    };
  };

  return (
    <>
      <div>
        <header className="header">
          <div className="header-container">
            <Logo />
            <div className="header-logo-words">
              <h3>Nephrology</h3>
            </div>
          </div>
        </header>
        <div>
          <h1>University of Michigan CRRT Flows Check</h1>
          <h2>This is the brief web application to check your CRRT prescription at University of Michigan</h2>
        </div>
      </div>
      <div className="totalWrapper">
        <div className="selectionWrapper ProtocolType">
          <h3>Select Protocol Type</h3>
          <Select options={ProtocolSelections} onChange={defineProtocolType}/><br></br>
        </div>
        <div className="PatientWeight">
          <h3>Input Patient Weight</h3>
          <input type="number"  placeholder="Patient Weight" onChange={definePatientWeight} /> kg
        </div>
        <div className="PatientAlbumin">
          <h3>Input Patient Albumin</h3>
          <input type="number" placeholder="1-5"  onChange={definePatientAlbumin}/> g/dL
        </div>
        <div> 
          <button onClick={handleOnClick}>Submit</button>
        </div>
        <div className="read-the-docs">
          <div>
            <h2>{InputError}</h2>
          </div>
          <div>
              <h2>Results:</h2>
              <div>
                BFR:  {PatientBFR} <br></br>
                ACDA: {PatientACDA} <br></br>
                DFR:  {PatientDFR} <br></br>
                RFR:  {PatientRFR}<br></br>
                Total Effluent: {PatientEffluent} (BFR + ACDA + DFR + RFR + 100 UF)<br></br>
                Calcium Infusion Rate:  {PatientCaDose} <br></br>
              </div>
          </div>
          <br></br>
          <br></br>
          <div>
            There will be other considerations about HCT, uneven flows and such below. 
          </div>
        </div>
      </div> 
    </>
  )
}



export default App

