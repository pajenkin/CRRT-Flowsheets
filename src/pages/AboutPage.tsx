// src/pages/AboutPage.tsx

import React from 'react';
import UnderConstruction from '../assets/under_construction.svg';

const AboutPage: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-blue-800">
        This page is still under construction
      </h1>
      <img src={UnderConstruction} alt="Under Construction" className="mx-auto w-48 opacity-80" />
      <h1 className="text-2xl font-semibold mb-4 text-blue-800">
        24-h Post-Dilution Veno-Venous Hemo-Diafiltration (post-CVVHDF) with Regional Citrate Anticoagulation (RCA)
      </h1>

      <section className="text-gray-700 text-base leading-relaxed space-y-4">
        <p>
          Citrate acts as an anticoagulation agent by complexing calcium (Ca) thereby lowering the plasma ionized calcium (iCa) level.
          Multiple clotting cascade reactions cannot progress if the plasma iCa is &lt;0.4 mM. A high, fixed citrate flow to blood flow ratio
          in the post-CVVHDF-RCA protocol ensures &lt;0.4 mM iCa and strong anticoagulant activity from the point where the citrate infusion
          enters the intake (arterial) limb of the blood circuit until the point where the Ca solution is infused.
        </p>

        <p>
          About 25–60% of the free [citrate]³⁻ and [citrate-Ca]⁻ complex ions are cleared through the HF1400 filter using a commercial Ca-free,
          bicarbonate-based sterile fluid. The effluent flow rate, typically 20–50% of the blood flow, is selected based on the patient's weight
          to prescribe ~30 mL/kg/h clearance. Since significant citrate returns to the patient in the venous blood limb, patients with severely
          impaired systemic citrate clearance (&lt;6 L/h) require adjusted settings.
        </p>

        <p>
          Simultaneous circuit blood pre-citrate infusion and post-filter (but before post-dilution) glucose measurements can estimate glucose
          dialysance and thus citrate and Ca clearance. Citrate removal is accomplished using Ca-free dialysate and replacement fluids. The
          anticoagulation effect is maintained throughout the circuit and reversed by Ca infusion into the venous limb just before the blood
          returns to the patient.
        </p>

        <p>
          Calcium infusion rates are determined using the patient’s serum albumin level and estimated plasma Ca clearance on the dialyzer.
          Optical sensors may assist by measuring post-filter hematocrit and O₂ saturation.
        </p>

        <p>
          After citrate infusion, circuit total Ca is normal but iCa is low due to high citrate levels. Once blood exits the Ca-free post-CVVHDF
          circuit, total Ca, citrate, and iCa are all reduced. Venous-limb Ca infusion restores systemic calcium for effective coagulation.
        </p>

        <p className="text-sm italic text-gray-500">
          References to follow in future updates.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
