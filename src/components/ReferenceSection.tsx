// components/ReferenceSection.tsx
export const ReferenceSection = () => (
    <section className="mt-16 border-t pt-6">
      <h2 className="text-lg font-semibold mb-2">References</h2>
      <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
        <li>
          Yessayan, L.&nbsp;T., Szamosfalvi, B., &amp; Rosner, M.&nbsp;H. (2021).{' '}
          <i>Management of dysnatremias with continuous renal replacement therapy.</i>{' '}
          <span className="italic">Seminars in Dialysis, 34</span>(6), 472–479.{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/34218456/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            [PubMed]
          </a>
        </li>
        <li>
          Yessayan, L., Yee, J., Frinak, S., &amp; Szamosfalvi, B. (2016).{' '}
          <i>Continuous renal replacement therapy for the management of acid-base and electrolyte imbalances in acute kidney injury.</i>{' '}
          <span className="italic">Advances in Chronic Kidney Disease, 23</span>(3), 203–210.{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/27113697/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            [PubMed]
          </a>
        </li>
        <li>
          Szamosfalvi, B., Puri, V., Sohaney, R., Wagner, B., Riddle, A., Dickinson, S., Napolitano, L., Heung, M., Humes, D., &amp; Yessayan, L. (2020).{' '}
          <i>Regional citrate anticoagulation protocol for patients with presumed absent citrate metabolism.</i>{' '}
          <span className="italic">Kidney360, 2</span>(2), 192–204.{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/35373034/"
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