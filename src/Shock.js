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
}