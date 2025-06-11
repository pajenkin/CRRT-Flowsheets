import { useState } from "react";
import { BlockMath } from "react-katex";
import { D5WCalculator } from "../components/D5WCalculator";

export const HyponatremiaApproach = () => {
  const [d5wOpen, setD5wOpen] = useState(false);
  const [acdaOpen, setAcdaOpen] = useState(false);
  const [acdaPreciseOpen, setAcdaPreciseOpen] = useState(false);
  const [d5wCalcOpen, setD5wCalcOpen] = useState(true);

  return (
    <section className="mt-10 space-y-10">
      {/* Approach and Assumptions */}
      <div>
        <h2 className="text-center text-xl font-semibold mb-2">Approach and Assumptions</h2>
        <div className="text-gray-700 space-y-4 text-left">
          <p>
            Our most common approach to managing hyponatremia during CRRT is the administration of
             hypotonic intravenous fluids (e.g., D5W) alongside standard CRRT. This method is simple,
            effective, and avoids the need to modify dialysate or replacement fluid composition. The method could be adopted 
            for both postdilution CVVH and CVVHDF or counter- current CVVHD using standard CRRT fluids.
          </p>
          <p>To ensure safe and predictable correction, the following assumptions apply:</p>
          <ul className="list-disc pl-5 text-left text-sm space-y-1">
            <li>CRRT is continuous and uninterrupted.</li>
            <li>There are no major non-isotonic sodium losses or gains.</li>
            <li>Filter performance remains stable (minimal clotting or shunting).</li>
            <li>Effluent flow rate provides ~25–30 mL/kg/h small solute clearance.</li>
            <li>Sodium kinetic volume is estimated at ≥600 mL/kg of body weight.</li>
            <li>Serum sodium is checked at least every 6 hours.</li>
            <li>Maximum correction allowed: <strong>≤8 mEq/L increase over 24 hours</strong>.</li>
          </ul>
        </div>
      </div>
      {/* Calculator for D5W with ACDA */}
      <div>
        <button
            className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2 focus:outline-none"
            onClick={() => setD5wCalcOpen(!d5wCalcOpen)}
        >
            <span>D5W Infusion Calculator (with Approximated ACD-A)</span>
            <span className="text-sm">{d5wCalcOpen ? "▲" : "▼"}</span>
        </button>

        {d5wCalcOpen && (
            <div className="border rounded-md p-4 text-gray-700 space-y-4">
            <D5WCalculator />
            </div>
        )}
        </div>
        <p>More equations below:</p>
        <hr className="my-8 border-t-2 border-gray-300" />
      {/* D5W Infusion Rate (Without ACD-A) */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2 focus:outline-none"
          onClick={() => setD5wOpen(!d5wOpen)}
        >
          <span>Equation: D5W Infusion Rate (Without ACD-A)</span>
          <span className="text-sm">{d5wOpen ? "▲" : "▼"}</span>
        </button>

        {d5wOpen && (
          <div className="border rounded-md p-4 text-gray-700 space-y-4">
            <p>
              When administering D5W during CRRT without citrate anticoagulation (ACD-A), use the following equation
              to calculate the infusion rate that achieves a targeted sodium correction:
            </p>

            <div className="bg-white rounded p-4">
              <BlockMath
                math={`
                  \\text{D5W Rate (mL/hr)} = 
                  \\left( \\frac{[Na^+]_{\\text{CRRT}} - [Na^+]_{\\text{serum target}}}{[Na^+]_{\\text{serum target}}} \\right)
                  \\times (Q_{D} + Q_{RF})
                `}
              />
            </div>

            <h3 className="text-md font-semibold">Variable Definitions:</h3>
            <ul className="list-disc pl-5 text-left text-sm space-y-1">
              <li><strong>[Na⁺]<sub>CRRT</sub></strong>: Sodium concentration in dialysate/replacement fluid</li>
              <li><strong>[Na⁺]<sub>serum target</sub></strong>: Target serum sodium</li>
              <li><strong>Q<sub>D</sub></strong>: Dialysate flow rate (mL/hr)</li>
              <li><strong>Q<sub>RF</sub></strong>: Replacement fluid flow rate (mL/hr)</li>
            </ul>
          </div>
        )}
      </div>

      {/* Precise ACD-A Sodium Gain Mitigation Equation */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2 focus:outline-none"
          onClick={() => setAcdaPreciseOpen(!acdaPreciseOpen)}
        >
          <span>Equation: D5W to Mitigate ACD-A Sodium Gain</span>
          <span className="text-sm">{acdaPreciseOpen ? "▲" : "▼"}</span>
        </button>

        {acdaPreciseOpen && (
          <div className="border rounded-md p-4 text-gray-700 space-y-4">
            <BlockMath
              math={`
                \\text{D5W Rate} =
                \\frac{
                  Q_{\\text{Cit}} \\times \\left( \\text{Citrate}[\\text{Na}^+] - \\text{CRRT}[\\text{Na}^+] \\right)
                  \\times \\left( 1 - \\frac{Q_{\\text{Eff}}}{Q_{\\text{Cit}} + Q_{\\text{Be}}} \\right)
                }{
                  \\text{Serum Target}[\\text{Na}^+]
                }
              `}
            />

            <h3 className="text-md font-semibold">Variable Definitions:</h3>
            <ul className="list-disc pl-5 text-left text-sm space-y-1">
              <li><strong>Q<sub>Cit</sub></strong>: Citrate flow rate</li>
              <li><strong>Citrate [Na⁺]</strong>: Sodium concentration in citrate solution</li>
              <li><strong>CRRT [Na⁺]</strong>: Sodium concentration in CRRT fluid</li>
              <li><strong>Q<sub>Eff</sub></strong>: Effluent flow rate</li>
              <li><strong>Q<sub>Be</sub></strong>: Net buffer (bicarbonate + citrate) delivery rate</li>
              <li><strong>Serum Target [Na⁺]</strong>: Desired serum sodium level</li>
            </ul>
          </div>
        )}
      </div>

      {/* D5W with Approximated ACD-A */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2 focus:outline-none"
          onClick={() => setAcdaOpen(!acdaOpen)}
        >
          <span>Equation: D5W with Approximated ACD-A</span>
          <span className="text-sm">{acdaOpen ? "▲" : "▼"}</span>
        </button>

        {acdaOpen && (
          <div className="border rounded-md p-4 text-gray-700 space-y-4">
            <BlockMath
              math={`
                \\text{D5W Rate (mL/hr)} = 0.9 \\times \\left( \\frac{[\\text{CRRT Na}] - [\\text{Target Na}]}{[\\text{Target Na}]} \\right) \\times (Q_D + Q_{RF})
              `}
            />
            <h3 className="text-md font-semibold">Variable Definitions:</h3>
            <ul className="list-disc pl-5 text-left text-sm space-y-1">
              <li><strong>CRRT [Na⁺]</strong>: Sodium concentration of CRRT fluid (mmol/L)</li>
              <li><strong>Target [Na⁺]</strong>: Desired serum sodium level (mmol/L)</li>
              <li><strong>Q<sub>D</sub></strong>: Dialysate flow rate (mL/hr)</li>
              <li><strong>Q<sub>RF</sub></strong>: Replacement fluid flow rate (mL/hr)</li>
            </ul>
          </div>
        )}
      </div>

    </section>
  );
};