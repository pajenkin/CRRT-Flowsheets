# CRRT Flowsheet Calculator

This is a React + TypeScript-based tool for calculating CRRT (Continuous Renal Replacement Therapy) protocol flows, supporting both **Shock** and **Non-Shock** modalities. It includes precise lookup logic for BFR, ACDA, DFR, RFR, effluent, and calcium dosing based on weight and albumin, all backed by testable data-driven logic.

---

## 🧠 Protocol Logic Overview

### Non-Shock
- Uses `NonShockTable` and `calciumTableNS` for weight-based flow lookups
- Effluent and albumin determine calcium dose using binning logic

### Shock
- Uses `shockTable` and `calciumTableS`
- Shares the same logic structure as Non-Shock

---

## 🗂️ Project Structure

```
src/
├── components/         # UI components (Header, etc.)
├── constants/          # Shock/Non-Shock lookup tables
├── main/               # MainFlowsheet component
├── protocols/          # Shock and NonShock logic
├── types/              # Type definitions (ProtocolResult, etc.)
├── utils/              # Reusable helpers (index lookup, weight, etc.)
└── App.tsx             # App entry point
```

---

## 🧪 Running Tests

```bash
npm test
```

- Test files are located in `src/protocols/__tests__` and `src/utils/__tests__`
- Tests verify:
  - Flow values for various weights/albumin levels
  - Calcium dose logic by effluent & albumin bin
  - Edge cases like high/low weights and albumin

---

## 🛠 How to Extend

- Add a new protocol? → Create a new file in `protocols/`, and corresponding constants.
- Update logic? → Refactor shared methods in `utils/`
- Adjust calcium tables? → Edit `constants/shockConstants.ts` or `nonShockConstants.ts`
- Add new test case? → Drop into relevant `__tests__` folder.

---

## 🔧 ESLint Note

If you're using ESLint and see config like the following, you can safely ignore it **unless you're using the modern ESLint flat config system**:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

Optional rules:
```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

Unless you're actively customizing ESLint, you don't need to worry about this now.

---

## ✅ Next Priorities

- [ ] UI polish and Tailwind layout refinement
- [ ] Add result export/share/download
- [ ] Add toggle to compare shock vs non-shock side-by-side
- [ ] Optional admin panel for editing tables?

---

## 🙏 Maintainer

Initial author: Patrick Jenkinson  
For questions or collaboration, feel free to reach out via GitHub or internal team repo.
