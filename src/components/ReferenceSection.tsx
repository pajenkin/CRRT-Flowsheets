// components/ReferenceSection.tsx
export const ReferenceSection = () => (
    <section className="mt-16 border-t pt-6">
      <h2 className="text-lg font-semibold mb-2">References</h2>
      <ol className="list-decimal list-inside text-sm text-gray-700">
        <li>
          Yessayan, L. T., Szamosfalvi, B., & Rosner, M. H. (2021).{" "}
          <i>Management of dysnatremias with continuous renal replacement therapy.</i>{" "}
          <span className="italic">Seminars in Dialysis, 34</span>(6), 472–479.{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/34218456/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            [PubMed]
          </a>
        </li>
      </ol>
    </section>
  );