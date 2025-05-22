export const effluentStepsNonShock = [
    1400,1700,2000,2300,2600,2900,3200,3500,3800,4100,4400,4700
  ];

  // Constants for NonShock Table (adjust these values as needed)
export const NonShockTable = [
    { weight: 50, BFR: 80, ACDA: 200, DFR: 500, RFR: 500 },
    { weight: 60, BFR: 80, ACDA: 200, DFR: 650, RFR: 650 },
    { weight: 70, BFR: 100, ACDA: 250, DFR: 800, RFR: 800 },
    { weight: 80, BFR: 100, ACDA: 250, DFR: 950, RFR: 950 },
    { weight: 90, BFR: 150, ACDA: 300, DFR: 1050, RFR: 1050 },
    { weight: 100, BFR: 150, ACDA: 300, DFR: 1200, RFR: 1200 },
    { weight: 110, BFR: 150, ACDA: 300, DFR: 1350, RFR: 1350 },
    { weight: 120, BFR: 150, ACDA: 300, DFR: 1500, RFR: 1500 },
    { weight: 130, BFR: 150, ACDA: 300, DFR: 1650, RFR: 1650 },
    { weight: 140, BFR: 150, ACDA: 300, DFR: 1800, RFR: 1800 },
    { weight: 150, BFR: 150, ACDA: 300, DFR: 1950, RFR: 1950 }
  ];
  
  // Calcium Dosing Table (same shape as Shock but values may differ)
export const calciumTableNS = [
    {effluent: 1400, CalciumDose: [16,17,17,18,19,19,20,20,21,21] }, 
    {effluent: 1700, CalciumDose: [20,20,21,23,23,24,24,25,25,26] },
    {effluent: 2000, CalciumDose: [23,24,25,26,27,28,28,29,30,31] },
    {effluent: 2300, CalciumDose: [26,27,28,30,31,32,32,33,34,35] },
    {effluent: 2600, CalciumDose: [32,33,34,35,37,38,39,40,41,42] },
    {effluent: 2900, CalciumDose: [35,37,38,39,41,42,43,44,45,46] },
    {effluent: 3200, CalciumDose: [38,40,42,43,44,46,47,48,50,51] },
    {effluent: 3500, CalciumDose: [42,43,45,47,48,50,51,53,54,55] },
    {effluent: 3800, CalciumDose: [45,47,48,50,52,54,55,57,58,60] },
    {effluent: 4100, CalciumDose: [48,50,52,54,56,57,59,61,63,64] },
    {effluent: 4400, CalciumDose: [51,53,55,57,59,61,63,65,67,68] },
    {effluent: 4700, CalciumDose: [54,56,58,60,63,65,67,69,71,73] }
  ]; 