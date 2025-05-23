import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import WarningCard from '../components/WarningCard';
import { getCalculatedResult } from '../utils/protocolHelpers';
import Select from 'react-select';

const protocolOptions = [
  { value: 1, label: 'Non-Shock' },
  { value: 2, label: 'Shock' }
];

const MainFlowsheet: React.FC = () => {
  const [protocolType, setProtocolType] = useState<number>(1);
  const [weight, setWeight] = useState<number>(70);
  const [albumin, setAlbumin] = useState<number>(3.5);
  const [collapsed, setCollapsed] = useState(false);

  const result = getCalculatedResult(protocolType, weight, albumin);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-xl font-bold text-blue-900 mb-4">CRRT Flowsheet Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Protocol Type</label>
            <Select
              options={protocolOptions}
              defaultValue={protocolOptions[0]}
              onChange={(option) => setProtocolType(option?.value || 1)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Weight (kg)</label>
            <input
              type="number"
              step="1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Albumin (g/dL)</label>
            <input
              type="number"
              step="any"
              value={albumin}
              onChange={(e) => setAlbumin(parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
        </div>
      </div>

      {typeof result === 'string' ? (
        <WarningCard message={result} />
      ) : (
        <>
          {result.warning && <WarningCard message={result.warning} />}
          <ResultCard result={result.result} />
        </>
      )}

      <div className="bg-white shadow-md rounded-2xl p-6 mt-8">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-blue-600 underline mb-2"
        >
          {collapsed ? 'Show More Info' : 'Hide Info'}
        </button>

        {!collapsed && (
          <div className="text-gray-700 text-sm space-y-2">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              {protocolType === 1 ? 'Non-Shock Protocol Info' : 'Shock-Liver Protocol Info'}
            </h2>
            {/* This is the non-shock considerations */}
            {protocolType === 1 ? (
              <ul className="list-disc pl-5 space-y-1">
                <li>This protocol is used for any patient who can metabolize citrate (without shock liver or concern for cardiac induced hepatic congestion).</li>
                <li>Recommend fluid composition: 137 Na, 4K, 25 HCO3-, 1 Phos</li>
                <li>Smaller patients &lt;=80 kg will be treated with a lower QB to keep single pass citrate extraction &lt; 25%.</li>
                <li>Calcium replacement is adjusted for albumin and citrate clearance.</li>
              </ul>
            ) : (
              // This is for the shock-liver protocol
              <ul className="list-disc pl-5 space-y-1">
                <li>This protocol uses a higher effluent dose to have higher first pass citrate removal</li>
                <li>This is for the patients without significant liver metabolism to convert citrate into bicarbonate.</li>
                <li>If your Hgb is higher than 12 then you may have a post-filter Hct that is higher than 50% which can cause clotting. You can increase the QD and proportionally decrease the QRF to achieve
                post-filter Hct &lt; =50% while keeping QD+QRF unchanged.</li>
                <li>Recommend fluid comp  osition: 147 Na, 4K, 35 HCO3-, 1 Phos</li>
                <li>There are special considerations for managing with hyponatremia. Please see *Hyponatremia*</li>
                <li>Due to the high first pass, it is recommended to replace glucose and vitmains lost on the filter.</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFlowsheet;