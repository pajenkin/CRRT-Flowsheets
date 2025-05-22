// src/main/MainFlowsheet.tsx

import { useState } from 'react';
import Select from 'react-select';
import Header from '../components/Header';
import { ProtocolResult } from '../types/ProtocolResult';
import { getCalculatedResult } from '../utils/protocolHelpers';

const protocolOptions = [
  { value: '1', label: 'Non-Shock' },
  { value: '2', label: 'Shock' }
];

function ResultCard({ result }: { result: ProtocolResult }) {
  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Calculated Protocol</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <p className="font-medium">BFR:</p><p>{result.BFR}</p>
        <p className="font-medium">ACDA:</p><p>{result.ACDA}</p>
        <p className="font-medium">DFR:</p><p>{result.DFR}</p>
        <p className="font-medium">RFR:</p><p>{result.RFR}</p>
        <p className="font-medium">Effluent:</p><p>{result.effluent}</p>
        <p className="font-medium">Calcium Dose:</p><p>{result.calciumDose}</p>
      </div>
    </div>
  );
}

export default function MainFlowsheet() {
  const [protocolType, setProtocolType] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [albumin, setAlbumin] = useState<number>(0);
  const [inputError, setInputError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const [result, setResult] = useState<ProtocolResult | null>(null);

  function handleProtocolChange(option: any) {
    setProtocolType(parseInt(option.value));
    setResult(null);
    setWarning('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const resultOrWarning = getCalculatedResult(protocolType, weight, albumin);
    if (typeof resultOrWarning === 'string') {
      setInputError(resultOrWarning);
      setResult(null);
      setWarning('');
    } else {
      setInputError('');
      setResult(resultOrWarning.result);
      setWarning(resultOrWarning.warning || '');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          University of Michigan CRRT Flowsheet Calculator
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <label className="block mb-2 font-medium">Protocol Type</label>
            <Select options={protocolOptions} onChange={handleProtocolChange} />
          </div>

          <div>
            <label className="block mb-2 font-medium">Patient Weight (kg)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter weight in kg"
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Patient Albumin (g/dL)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter albumin in g/dL"
              onChange={(e) => setAlbumin(parseFloat(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>

          {inputError && (
            <div className="text-red-600 font-medium text-center">{inputError}</div>
          )}

          {warning && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mt-4 space-y-1">
              <p className="font-medium">⚠️ Warning</p>
              {warning.split('. ').map((msg, i) => (
                <p key={i}>{msg.trim()}{!msg.trim().endsWith('.') ? '.' : ''}</p>
              ))}
            </div>
          )}

          {result && <ResultCard result={result} />}
        </form>
      </main>
    </div>
  );
}
