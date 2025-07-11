import { useState } from "react";

export const D5WCalculator = () => {
  const [crrtNa, setCrrtNa] = useState(147);
  const [targetNa, setTargetNa] = useState(120);
  const [qd, setQd] = useState(2000);
  const [qrf, setQrf] = useState(2000);
  const [rate, setRate] = useState<number | null>(null);

  const calculateRate = () => {
    const numerator = crrtNa - targetNa;
    const denominator = targetNa;
    const flow = qd + qrf;
    const result = 0.9 * (numerator / denominator) * flow;
    setRate(result);
  };

  return (
    <div className="border rounded-md p-4 text-gray-700 space-y-4">
      <h3 className="text-md font-semibold mb-2">D5W Infusion Rate Calculator (Approximate ACD-A)</h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="font-medium">CRRT Na⁺ (130–155 mEq/L):</label>
          <input
            type="number"
            value={crrtNa}
            min={130}
            max={155}
            onChange={(e) => setCrrtNa(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
        <div className="flex justify-between">
          <label className="font-medium">Target Na⁺ (100–155 mEq/L):</label>
          <input
            type="number"
            value={targetNa}
            min={100}
            max={155}
            onChange={(e) => setTargetNa(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
        <div className="flex justify-between">
          <label className="font-medium">Dialysate Flow Q<sub>D</sub> (1000–6000 mL/hr):</label>
          <input
            type="number"
            value={qd}
            min={1000}
            max={6000}
            onChange={(e) => setQd(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
        <div className="flex justify-between">
          <label className="font-medium">Replacement Flow Q<sub>RF</sub> (0–6000 mL/hr):</label>
          <input
            type="number"
            value={qrf}
            min={0}
            max={6000}
            onChange={(e) => setQrf(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
      </div>

      <button
        onClick={calculateRate}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      <div className="mt-4 font-medium">
        D5W Infusion Rate: {rate !== null ? `${rate.toFixed(2)} mL/hr` : "--"}
      </div>
    </div>
  );
};