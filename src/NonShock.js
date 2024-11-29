export function calculateNonShockProtocol(weight, albumin){
    const NonShockTable = [
        {weight: 50, BFR: 80, ACDA: 200, DFR: 500, RFR: 500}, 
        {weight: 60, BFR: 80, ACDA: 200, DFR: 650, RFR: 650}, 
        {weight: 70, BFR: 100, ACDA: 250, DFR: 800, RFR: 800}, 
        {weight: 80, BFR: 100, ACDA: 250, DFR: 950, RFR: 950}, 
        {weight: 90, BFR: 150, ACDA: 300, DFR: 1050, RFR: 1050}, 
        {weight: 100, BFR: 150, ACDA: 300, DFR: 1200, RFR: 1200}, 
        {weight: 110, BFR: 150, ACDA: 300, DFR: 1350, RFR: 1350}, 
        {weight: 120, BFR: 150, ACDA: 300, DFR: 1500, RFR: 1500}, 
        {weight: 130, BFR: 150, ACDA: 300, DFR: 1650, RFR: 1650}, 
        {weight: 140, BFR: 150, ACDA: 300, DFR: 1800, RFR: 1800}, 
        {weight: 150, BFR: 150, ACDA: 300, DFR: 1950, RFR: 1950}
    ];

    const calciumTableNS = [
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
      ]

    const ptWeight = weight;
    const ptAlbumin = albumin;
    let ptParams = {};

    //check to make sure it is a valid weight
    function checkWeightValid (PatientWeight) {
        if (PatientWeight >= 20 && PatientWeight <= 300) {
            return true;
        } else {
            return false;
        }
    };

    //sets the global parameters pending weight
    //returns an array with the current parameters after setting the global 'ptParams'
    function mapParams (weight){
        if (checkWeightValid(weight) === true) {
            if (weight >= 150){
                ptParams = NonShockTable.filter(function(wt){return wt.weight >= 150});
              } else if (weight <= 50){
                  ptParams = NonShockTable.filter(function(wt){return wt.weight <= 50});
              } else {
                  weight = Math.ceil(weight/10)*10;
                  ptParams = NonShockTable.filter(function(wt){return wt.weight === weight });
              };
        } else {
            return undefined;
        }

    };

    //calculate effluent dose
    function calculateEffluentDose (array) {
        array[0].effluent = array[0].BFR + array[0].ACDA + array[0].DFR + array[0].RFR + 100;
        return array;
    };

    //calculate calcium dose
    function calculateCalciumDose (array) {
        array[0].calciumDose = findCalciumDose(array[0].effluent, ptAlbumin);
        return array;
    }

    function findCalciumDose(effluent, albumin){
    
        function findEffluentCount(effluent){
            let eStep = [1400,1700,2000,2300,2600,2900,3200,3500,3800,4100,4400,4700];
            let count=0;
            for (let i = eStep[0]; i <= effluent && i<= eStep[count--]; i=eStep[count++]){
                count++;
            };
            if (count == 0){return count} else {return count=count-1 };
        };
        
        function findAlbuminCount(albumin){
            let count=0;
            for (let i = 0.7; i <= albumin && i <= [albumin-0.4]; i=i+0.4) {
                count++;
            };
            if (count == 0){return count} else {return count=count-1 };
        };
        
        return calciumTableNS[findEffluentCount(effluent)].CalciumDose[findAlbuminCount(albumin)];
    }
    
    
    //calls the function and returns the parameters to ultimately display
    mapParams(ptWeight);
    ptParams = calculateEffluentDose(ptParams);
    ptParams = calculateCalciumDose(ptParams);
    return ptParams;

}; 