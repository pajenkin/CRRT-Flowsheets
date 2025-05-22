// src/pages/AboutPage.tsx

import UnderConstruction from '../assets/under_construction.svg';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">About the Protocol</h2>
      <p className="mb-6">
        This section will explain the clinical rationale behind the shock/liver protocol...
      </p>
      <img src={UnderConstruction} alt="Under Construction" className="mx-auto w-48 opacity-80" />
    </div>
  );
}