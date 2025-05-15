import { calculateShockProtocol, calculateNonShockProtocol } from '../protocols';
import { getParamsForWeight, findEffluentIndex, findAlbuminIndex, roundTo } from '../utils';
import { ProtocolResult } from '../types';

import Select from 'react-select';
import { useState } from 'react';

import '../App.css';

// Define the type for PatientReturnParams
// type ProtocolResult = {
//   BFR: number;
//   DFR: number;
//   ACDA: number;
//   RFR: number;
//   effluent: number;
//   calciumDose: number;
// };

const ProtocolSelections = [
  { value: '1', label: 'Non-Shock' },
  { value: '2', label: 'Shock' }
];

const MainFlowsheet = () => {
  const [ProtocolType, setProtocolType] = useState(0);
  const [PatientWeight, setPatientWeight] = useState(0);
  const [PatientAlbumin, setPatientAlbumin] = useState(0);
  const [PatientBFR, setPatientBFR] = useState(0);
  const [PatientACDA, setPatientACDA] = useState(0);
  const [PatientDFR, setPatientDFR] = useState(0);
  const [PatientRFR, setPatientRFR] = useState(0);
  const [PatientCaDose, setPatientCaDose] = useState(0);
  const [PatientEffluent, setPatientEffluent] = useState(0);
  const [InputError, setInputError] = useState(' ');

  let PatientReturnParams: ProtocolResult | null = null;

  function defineProtocolType(e: any) {
    setProtocolType(parseInt(e.value));
  }

  function definePatientWeight(e: React.ChangeEvent<HTMLInputElement>) {
    const weight = parseInt(e.target.value);
    if (weight >= 20 && weight <= 150) {
      sendInputError("");
      setPatientWeight(weight);
    } else {
      sendInputError("Weight not within range");
    }
  }

  function definePatientAlbumin(e: React.ChangeEvent<HTMLInputElement>) {
    const albumin = parseInt(e.target.value);
    if (albumin >= 1.0 && albumin <= 5.0) {
      sendInputError("");
      setPatientAlbumin(albumin);
    } else {
      sendInputError("Albumin not within range");
    }
  }

  function checkPatientWeight() {
    if (PatientWeight >= 20 && PatientWeight <= 300) {
      sendInputError("");
      return true;
    } else {
      sendInputError("Weight not within range");
      return false;
    }
  }

  function checkPatientAlbumin() {
    if (PatientAlbumin >= 1.0 && PatientAlbumin <= 5.0) {
      return true;
    } else {
      sendInputError("Albumin not within range");
      return false;
    }
  }

  function ValidateVariables() {
    return checkPatientWeight() && checkPatientAlbumin();
  }

  function youMayProceed() {
    if (ProtocolType === 1 && ValidateVariables()) {
      PatientReturnParams = calculateNonShockProtocol(PatientWeight, PatientAlbumin);
    } else if (ProtocolType === 2 && ValidateVariables()) {
      PatientReturnParams = calculateShockProtocol(PatientWeight, PatientAlbumin);
    } else {
      console.log("Not valid input");
    }
  }

  function ChangeAllVariables() {
    if (PatientReturnParams) {
      setPatientBFR(PatientReturnParams.BFR);
      setPatientDFR(PatientReturnParams.DFR);
      setPatientCaDose(PatientReturnParams.calciumDose);
      setPatientEffluent(PatientReturnParams.effluent);
      setPatientACDA(PatientReturnParams.ACDA);
      setPatientRFR(PatientReturnParams.RFR);
    }
  }

  function handleOnClick() {
    youMayProceed();
    if (PatientReturnParams) {
      ChangeAllVariables();
    }
  }

  function sendInputError(message: string) {
    setInputError(message ? `Error: ${message}` : "");
  }

  return (
    <div className="grid grid-flow-row auto-rows-max">
      <div>
        <h1>University of Michigan CRRT Flows Check</h1>
        <h2>This is the brief web application to check your CRRT prescription at University of Michigan</h2>
      </div>

      <div className="flex justify-center mt-10 items-center ProtocolType">
        <h3>Select Protocol Type</h3>
        <Select options={ProtocolSelections} onChange={defineProtocolType} /><br />
      </div>

      <div className="flex justify-center mt-10 items-center PatientWeight">
        <h3>Input Patient Weight</h3>
        <input type="number" placeholder="Patient Weight" onChange={definePatientWeight} /> kg
      </div>

      <div className="flex justify-center mt-10 items-center PatientAlbumin">
        <h3>Input Patient Albumin</h3>
        <input type="number" placeholder="1-5" onChange={definePatientAlbumin} /> g/dL
      </div>

      <div>
        <button onClick={handleOnClick}>Submit</button>
      </div>

      <div className="read-the-docs">
        <h2>{InputError}</h2>
        <h2>Results:</h2>
        <div>
          BFR: {PatientBFR} <br />
          ACDA: {PatientACDA} <br />
          DFR: {PatientDFR} <br />
          RFR: {PatientRFR} <br />
          Total Effluent: {PatientEffluent} (BFR + ACDA + DFR + RFR + 100 UF) <br />
          Calcium Infusion Rate: {PatientCaDose} <br />
        </div>

        <div className="mt-4">
          There will be other considerations about HCT, uneven flows and such below.
        </div>
      </div>
    </div>
  );
};

export default MainFlowsheet;
