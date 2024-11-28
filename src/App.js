import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {TestFunction} from './Functions.js';
import './Shock.js';
import './NonShock.js';
import { useState } from 'react';
import {calculateNonShockProtocol} from './NonShock.js';
import {calculateShockProtocol} from './Shock.js';

const ProtocolSelections = [
  {value:'1', label: 'Non-Shock'},
  {value:'2', label: 'Shock'}
];

let ProtocolType;
let PatientWeight;
let PatientCalcium;
let PatientAlbumin;
let PatientReturnParams = {weight: ' ', BFR: ' ', ACDA: ' ', DFR: ' ', RFR: ' ', calciumDose: ' '};

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



// The main App
function App() {
  //initialize variables
  const [ ProtocolType, setProtocolType] = useState();
  const [ PatientWeight, setPatientWeight] = useState('60');
  const [ PatientAlbumin, setPatientAlbumin] = useState(4.0);
  const [ PatientBFR, setPatientBFR] = useState(' ');
  const [ PatientACDA, setPatientACDA] = useState(' ');
  const [ PatientDFR, setPatientDFR] = useState(' ');
  const [ PatientRFR, setPatientRFR] = useState(' ');
  const [ PatientCaDose, setPatientCaDose] = useState(' ');
  const [ PatientEffluent, setPatientEffluent] = useState(' ');

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
    TestFunction();
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
    setPatientEffluent(PatientReturnParams.Effluent);
    setPatientACDA(PatientReturnParams.ACDA);
    setPatientRFR(PatientReturnParams.RFR);
  }
  
  function handleOnClick (){
    console.log("Sumbit Clicked");
    youMayProceed();
    PatientReturnParams = PatientReturnParams[0];
    console.log(PatientReturnParams);
    ChangeAllVariables();
  };

  return (
    <><div>
      <h1>University of Michigan CRRT Flows Check</h1>
      <h2>This is the brief web application to check your CRRT prescription at University of Michigan</h2>
      </div>
      <body>
        <div className="Protocol Type">
            <h1>Select Protocol Type</h1>
            <Select options={ProtocolSelections} onChange={defineProtocolType}/>
          </div><div className="PatientWeight">
            <h1>Input Patient Weight</h1>
            <input type="number"  placeholder="Patient Weight" onChange={definePatientWeight} /> kg
          </div>
          {/* <div className="PatientCalcium">
            <h1>Input Patient Total Calcium</h1>
            <input type="number" placeholder="Total Calcium" /> mg/dL
          </div> */}
          <div className="PatientAlbumin">
            <h1>Input Patient Albumin</h1>
            <input type="number" placeholder="1-5"  onChange={definePatientAlbumin}/> g/dL
        </div>
        <button onClick={handleOnClick}>Submit</button>
      <div>
        <h2>Results:</h2>
        <div>
          BFR:  {PatientBFR} <br></br>
          ACDA: {PatientACDA} <br></br>
          DFR:  {PatientDFR} <br></br>
          RFR:  {PatientRFR}<br></br>
          Total Effluent: {PatientEffluent} <br></br>
          Calcium Infusion Rate:  {PatientCaDose} <br></br>
        </div>
      </div>
      <div>There will be other considerations about HCT, uneven flows and such below. </div>
      </body>
    </>
  );
}

export default App;
