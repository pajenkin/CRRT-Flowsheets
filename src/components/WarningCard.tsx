// src/components/WarningCard.tsx
import React from 'react';

interface WarningCardProps {
  message: string;
}

const WarningCard: React.FC<WarningCardProps> = ({ message }) => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mt-6 rounded-xl shadow-sm">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default WarningCard;