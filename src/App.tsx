import React from 'react'
import Select from 'react-select'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Shock.js';
import './NonShock.js';
import {calculateNonShockProtocol} from './NonShock.js';
import {calculateShockProtocol} from './Shock.js';

const ProtocolSelections = [
  {value:'1', label: 'Non-Shock'},
  {value:'2', label: 'Shock'}
];

// let ProtocolType;
// let PatientWeight;
// let PatientCalcium;
// let PatientAlbumin;
// let PatientReturnParams: number {
//   weight: number;
//   BFR: number;
//   ACDA: number;
//   DFR: number;
//   RFR: number;
//   calciumDose: number;
//   effluent: number;
// };

// return params for Shock and Non-shock from the respected .JS sheets
// function calculateNonShockProtocol(weight, albumin);
// function calculateShockProtocol(weight, albumin);

// function definePatientCalcium (e){
//   let calcium = e.target.value;
//   console.log(calcium);
//   if (calcium >= 0.70 && calcium <= 1.4){
//     console.log("calcium check ok");
//     let PatientCalcium = calcium;
//   } else {
//     console.log("patient calcium not right")
//   };
// }; 


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
 

  // Set protocol Type: Shock/Non-Shock
  function defineProtocolType (e) {
    setProtocolType(e.value);
    console.log(ProtocolType);
  };

  function definePatientWeight (e){
    let weight = e.target.value;
    console.log(weight);
    if (weight >= 20 && weight <= 150){
      console.log("weight check ok");
      setPatientWeight(weight);
    } else {
      console.log("patient weight not right")
    };
  };

  function definePatientAlbumin (e) {
    let albumin = e.target.value;
    console.log(albumin);
    if (albumin >=1.0 && albumin <= 5.0){
      console.log ("albumin check is ok");
      setPatientAlbumin(albumin);
    } else {
      console.log("Patient albumin not right");
    }
  
  };

  //Check Weight as a variable
  function checkPatientWeight(){
      if (PatientWeight >= 20 && PatientWeight <= 300) {
          return true;
      } else {
          return false;
      }
  };

    //Check Weight as a variable
  function checkPatientAlbumin(){
      if (PatientAlbumin >=1.0 && PatientAlbumin <= 5.0) {
          return true;
      } else {
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
    console.log("Sumbit Clicked");
    youMayProceed();
    PatientReturnParams = Object.values(PatientReturnParams)[0];
    ChangeAllVariables();
  };

  return (
    <>
      <div>
          {/* <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a> */}
                <div>
        <h1>University of Michigan CRRT Flows Check</h1>
        <h2>This is the brief web application to check your CRRT prescription at University of Michigan</h2>
      </div>
      </div>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      <div className="ProtocolType">
        <h1>Select Protocol Type</h1>
        <Select options={ProtocolSelections} onChange={defineProtocolType}/>
      </div>
      <div className="PatientWeight">
        <h1>Input Patient Weight</h1>
        <input type="number"  placeholder="Patient Weight" onChange={definePatientWeight} /> kg
      </div>
      <div className="PatientAlbumin">
        <h1>Input Patient Albumin</h1>
        <input type="number" placeholder="1-5"  onChange={definePatientAlbumin}/> g/dL
      </div>
      <div> 
        <button onClick={handleOnClick}>Submit</button>
      </div>
      <div className="read-the-docs">
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
        <div>
          There will be other considerations about HCT, uneven flows and such below. 
        </div>
      </div> 
    </>
  )
}



export default App

