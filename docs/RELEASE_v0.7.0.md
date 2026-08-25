# TireCare Logic v0.7.0 — Specialty Catalog Static Release

Released: 2026-08-25

## What changed

- Added a bundled, no-fetch `specialty-catalog.js` snapshot generated from `specialty_tires_tubes_valves.xlsx`.
- Added 791 exact catalog-backed specialty tire size rows: 42 LT metric, 90 flotation LT, 22 special trailer, 37 commercial truck/bus, 429 agricultural, and 171 motorcycle.
- Added 261 manufacturer tube product rows with article number, exact fitment label, valve, weight, pack/pallet, compatibility note, and source URL.
- Added 83 valve reference rows representing 81 unique valve part numbers.
- Excluded article `551-759` because its workbook fitment value was the placeholder `TEST SIZE`.
- Added exact catalog-size lookup and retained AIRLOCK separation between catalog existence, generated nomenclature, tube compatibility, vehicle fitment, and inventory.
- Fixed valve exact matching so a `TR13` lookup does not incorrectly return `TR135`.
- Fixed prefix safety so `245/75R16` cannot be verified by a partial match against `LT245/75R16`.
- Removed Vite/npm/build dependencies. `index.html` is now the actual deployable app.
- Updated GitHub Pages to test and publish the repository directly with no generated `dist` folder.

## Validation

- `node --test` passes catalog engine, tire math, static asset, script-order, and contaminated-row rejection tests.
- The catalog audit reports 791 exact tire rows, 261 tube products, 83 valve reference rows, and 61,154 explicitly generated nomenclature combinations.

## Safety boundary

A cited catalog row verifies that a designation or product reference appears in the cited source. It does not prove current manufacture, current shop stock, vehicle fitment, load capacity, approved rim, operating pressure, valve-hole compatibility, TPMS compatibility, or an approved substitution.
