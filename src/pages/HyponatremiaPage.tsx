// src/pages/HyponatremiaPage.tsx

import 'katex/dist/katex.min.css';
import { ReferenceSection } from "../components/ReferenceSection";
import { HyponatremiaApproach } from "../components/HyponatremiaApproach";

export default function HyponatremiaPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Handling Hyponatremia</h2>
      {/* Explaining the approach and calculator */}
      <HyponatremiaApproach />
      <ReferenceSection />
    </div>
  );
}