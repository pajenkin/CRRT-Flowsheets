import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//import React from 'react'
import Select from 'react-select';
import { useState } from 'react';
import './App.css';
import './Shock.js';
import './NonShock.js';
import * as calculateNonShockProtocol from './NonShock.js';
import * as calculateShockProtocol from './Shock.js';
const ProtocolSelections = [
    { value: '1', label: 'Non-Shock' },
    { value: '2', label: 'Shock' }
];

function App() {
    let PatientReturnParams = [];
    //initialize variables
    const [ProtocolType, setProtocolType] = useState(0);
    const [PatientWeight, setPatientWeight] = useState(0);
    const [PatientAlbumin, setPatientAlbumin] = useState(0);
    const [PatientBFR, setPatientBFR] = useState(0);
    const [PatientACDA, setPatientACDA] = useState(0);
    const [PatientDFR, setPatientDFR] = useState(0);
    const [PatientRFR, setPatientRFR] = useState(0);
    const [PatientCaDose, setPatientCaDose] = useState(0);
    const [PatientEffluent, setPatientEffluent] = useState(0);
    // Set protocol Type: Shock/Non-Shock
    function defineProtocolType(e) {
        setProtocolType(e.value);
        console.log(ProtocolType);
    }
    ;
    function definePatientWeight(e) {
        let weight = e.target.value;
        console.log(weight);
        if (weight >= 20 && weight <= 150) {
            console.log("weight check ok");
            setPatientWeight(weight);
        }
        else {
            console.log("patient weight not right");
        }
        ;
    }
    ;
    function definePatientAlbumin(e) {
        let albumin = e.target.value;
        console.log(albumin);
        if (albumin >= 1.0 && albumin <= 5.0) {
            console.log("albumin check is ok");
            setPatientAlbumin(albumin);
        }
        else {
            console.log("Patient albumin not right");
        }
    }
    ;
    //Check Weight as a variable
    function checkPatientWeight() {
        if (PatientWeight >= 20 && PatientWeight <= 300) {
            return true;
        }
        else {
            return false;
        }
    }
    ;
    //Check Weight as a variable
    function checkPatientAlbumin() {
        if (PatientAlbumin >= 1.0 && PatientAlbumin <= 5.0) {
            return true;
        }
        else {
            return false;
        }
    }
    ;
    function ValidateVariables() {
        //definePatientCalcium();
        if (checkPatientWeight() == true && checkPatientAlbumin() == true) {
            return true;
        }
        else {
            return false;
        }
        ;
    }
    ;
    function youMayProceed() {
        if (ProtocolType == 1) {
            if (ValidateVariables() == true) {
                PatientReturnParams = calculateNonShockProtocol(PatientWeight, PatientAlbumin);
            }
            else {
                console.log("not yet complete");
            }
            ;
        }
        else if (ProtocolType == 2) {
            if (ValidateVariables() == true) {
                PatientReturnParams = calculateShockProtocol(PatientWeight, PatientAlbumin);
            }
            else {
                console.log("not yet complete");
            }
            ;
        }
        else {
            console.log("Not valid input");
        }
    }
    function ChangeAllVariables() {
        setPatientBFR(PatientReturnParams.BFR);
        setPatientDFR(PatientReturnParams.DFR);
        setPatientCaDose(PatientReturnParams.calciumDose);
        setPatientEffluent(PatientReturnParams.effluent);
        setPatientACDA(PatientReturnParams.ACDA);
        setPatientRFR(PatientReturnParams.RFR);
    }
    function handleOnClick() {
        console.log("Sumbit Clicked");
        youMayProceed();
        PatientReturnParams = Object.values(PatientReturnParams)[0];
        ChangeAllVariables();
    }
    ;
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsxs("div", { children: [_jsx("h1", { children: "University of Michigan CRRT Flows Check" }), _jsx("h2", { children: "This is the brief web application to check your CRRT prescription at University of Michigan" })] }) }), _jsxs("div", { className: "ProtocolType", children: [_jsx("h1", { children: "Select Protocol Type" }), _jsx(Select, { options: ProtocolSelections, onChange: defineProtocolType })] }), _jsxs("div", { className: "PatientWeight", children: [_jsx("h1", { children: "Input Patient Weight" }), _jsx("input", { type: "number", placeholder: "Patient Weight", onChange: definePatientWeight }), " kg"] }), _jsxs("div", { className: "PatientAlbumin", children: [_jsx("h1", { children: "Input Patient Albumin" }), _jsx("input", { type: "number", placeholder: "1-5", onChange: definePatientAlbumin }), " g/dL"] }), _jsx("div", { children: _jsx("button", { onClick: handleOnClick, children: "Submit" }) }), _jsxs("div", { className: "read-the-docs", children: [_jsxs("div", { children: [_jsx("h2", { children: "Results:" }), _jsxs("div", { children: ["BFR:  ", PatientBFR, " ", _jsx("br", {}), "ACDA: ", PatientACDA, " ", _jsx("br", {}), "DFR:  ", PatientDFR, " ", _jsx("br", {}), "RFR:  ", PatientRFR, _jsx("br", {}), "Total Effluent: ", PatientEffluent, " (BFR + ACDA + DFR + RFR + 100 UF)", _jsx("br", {}), "Calcium Infusion Rate:  ", PatientCaDose, " ", _jsx("br", {})] })] }), _jsx("div", { children: "There will be other considerations about HCT, uneven flows and such below." })] })] }));
}
export default App;
