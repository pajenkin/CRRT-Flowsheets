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
                  weight = Math.floor(weight/10)*10;
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
        array[0].calciumDose = 20 //Needs logic for calculations;
        return array;
    }
    
    //calls the function and returns the parameters to ultimately display
    mapParams(ptWeight);
    ptParams = calculateEffluentDose(ptParams);
    ptParams = calculateCalciumDose(ptParams);
    return ptParams;

}; 