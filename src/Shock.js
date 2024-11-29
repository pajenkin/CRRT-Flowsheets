
export function calculateShockProtocol (weight, albumin){
    const NonShockTable = [
        {weight: 50, BFR: 50, ACDA: 125, DFR: 1250, RFR: 500}, 
        {weight: 60, BFR: 60, ACDA: 150, DFR: 1500, RFR: 600}, 
        {weight: 70, BFR: 70, ACDA: 175, DFR: 1750, RFR: 700}, 
        {weight: 80, BFR: 80, ACDA: 200, DFR: 2000, RFR: 800}, 
        {weight: 90, BFR: 90, ACDA: 225, DFR: 2250, RFR: 900}, 
        {weight: 100, BFR: 100, ACDA: 250, DFR: 2500, RFR: 1000}, 
        {weight: 110, BFR: 110, ACDA: 375, DFR: 2750, RFR: 1100}, 
        {weight: 120, BFR: 120, ACDA: 300, DFR: 3000, RFR: 1200}, 
        {weight: 130, BFR: 130, ACDA: 300, DFR: 3250, RFR: 1300}, 
        {weight: 140, BFR: 140, ACDA: 300, DFR: 3500, RFR: 1400}, 
        {weight: 150, BFR: 150, ACDA: 300, DFR: 3750, RFR: 1500}
    ];

    const calciumTableS = [
        {effluent: 2100, CalciumDose: [28,29,30,31,32,32,33,34,35,36] }, 
        {effluent: 2500, CalciumDose: [34,35,36,37,38,39,40,41,42,43] },
        {effluent: 2850, CalciumDose: [39,41,42,43,44,45,47,48,49,50] },
        {effluent: 3250, CalciumDose: [45,47,48,50,51,52,53,55,55,57] },
        {effluent: 3650, CalciumDose: [51,52,54,56,57,58,60,61,62,64] },
        {effluent: 4000, CalciumDose: [56,58,60,62,63,65,67,68,69,71] },
        {effluent: 4400, CalciumDose: [62,64,66,68,69,71,73,75,76,78] },
        {effluent: 4750, CalciumDose: [68,70,72,74,75,78,80,82,83,85] },
        {effluent: 5150, CalciumDose: [72,74,77,79,81,83,85,87,89,91] },
        {effluent: 5500, CalciumDose: [76,78,81,84,85,88,90,92,94,97] },
        {effluent: 5850, CalciumDose: [79,82,85,87,90,92,94,97,99,101] }
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
        array[0].calciumDose = findCalciumDose(array[0].effluent, ptAlbumin)
        return array;
    }

    function findCalciumDose(effluent, albumin){
    
        function findEffluentCount(effluent){
            let eStep = [2100, 2500, 2850, 3250, 3650, 4000, 4400, 4750, 5150, 5500, 5850];
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
        
        return calciumTableS[findEffluentCount(effluent)].CalciumDose[findAlbuminCount(albumin)];
    }
    
    //calls the function and returns the parameters to ultimately display
    mapParams(ptWeight);
    ptParams = calculateEffluentDose(ptParams);
    ptParams = calculateCalciumDose(ptParams);
    return ptParams;
};