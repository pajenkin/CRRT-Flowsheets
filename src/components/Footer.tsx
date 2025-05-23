// src/components/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 text-sm text-center py-4 mt-12 space-y-2">
        <p>
          © {new Date().getFullYear()} University of Michigan — CRRT. For educational use only.
        </p>
        <p>
          Protocols Derived by: Dr. Lenar Yessayan, Dr. Balazs Szamosfalvi, Dr. Michael Heung at the University of Michigan
        </p>
        <p>
          Website created by: Dr. Patrick Jenkinson
        </p>
      </footer>
    );
  }
  