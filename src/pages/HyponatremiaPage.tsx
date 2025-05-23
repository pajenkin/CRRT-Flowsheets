// src/pages/HyponatremiaPage.tsx

import UnderConstruction from '../assets/under_construction.svg';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function HyponatremiaPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Handling Hyponatremia</h2>
      <p className="mb-6">
        This section will eventually contain resources and guidance on managing hyponatremia in critically ill
        patients undergoing CRRT.
      </p>
      <img src={UnderConstruction} alt="Under Construction" className="mx-auto w-48 opacity-80" />
      <BlockMath math="\text{D5W Rate (mL/hr)} = 0.9 \times \left( \frac{[\text{CRRT Na}] - [\text{Target Na}]}{[\text{Target Na}]} \right) \times (Q_d + Q_{rf})" />      <p className="text-sm text-gray-700 mt-2">
        Where:
        <ul className="list-disc pl-6">
          <li><strong>CRRT Na</strong> = Sodium concentration of CRRT fluid (mmol/L)</li>
          <li><strong>Target Na</strong> = Desired serum sodium level (mmol/L)</li>
          <li><strong>Q<sub>d</sub></strong> = Dialysate flow rate (mL/hr)</li>
          <li><strong>Q<sub>rf</sub></strong> = Replacement fluid flow rate (mL/hr)</li>
        </ul>
      </p>
    </div>
  );
}