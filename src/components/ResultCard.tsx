// src/components/ResultCard.tsx
import React from 'react';
import { ProtocolResult } from '../types/ProtocolResult';

interface ResultCardProps {
  result: ProtocolResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { BFR, ACDA, DFR, RFR, effluent, calciumDose, weight } = result;
  const effluentDose = weight ? (effluent / weight).toFixed(1) : '—';

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Calculated Flows</h2>
      <ul className="text-sm text-gray-700 space-y-2">
        <li><strong>BFR:</strong> {BFR} ml/min</li>
        <li><strong>ACDA:</strong> {ACDA} ml/hr</li>
        <li><strong>DFR:</strong> {DFR} ml/hr</li>
        <li><strong>RFR:</strong> {RFR} ml/hr</li>
        <li><strong>Effluent:</strong> {effluent} ml/hr</li>
        <li><strong>Calcium Dose:</strong> {calciumDose} ml/hr</li>
        <li><strong>Calculated Effluent Dose:</strong> {effluentDose} mL/kg/h</li>
      </ul>
    </div>
  );
};

export default ResultCard;