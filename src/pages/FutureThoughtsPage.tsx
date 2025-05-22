// src/pages/FutureThoughtsPage.tsx

import UnderConstruction from '../assets/under_construction.svg';

export default function FutureThoughtsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Future Thoughts</h2>
      <p className="mb-6">
        We plan to enhance this tool to update the possibilities and integrations in the future. 
      </p>
      <img src={UnderConstruction} alt="Under Construction" className="mx-auto w-48 opacity-80" />
    </div>
  );
}