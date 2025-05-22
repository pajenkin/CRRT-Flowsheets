// src/pages/HyponatremiaPage.tsx

import UnderConstruction from '../assets/under_construction.svg';

export default function HyponatremiaPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Handling Hyponatremia</h2>
      <p className="mb-6">
        This section will eventually contain resources and guidance on managing hyponatremia in critically ill
        patients undergoing CRRT.
      </p>
      <img src={UnderConstruction} alt="Under Construction" className="mx-auto w-48 opacity-80" />
    </div>
  );
}