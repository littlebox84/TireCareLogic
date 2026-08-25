# TireCare Logic

**TireCare Logic** is a browser-first tire-service knowledge and training platform for real shop work.

The project started as **TubeLogic** and has expanded into a modular system for tires, tubes, valves, TPMS, pressure, repairs, inventory, and new-hire training.

## Core modules

- **TireLogic** — tire size decoding, construction, load/speed data, application context
- **TubeLogic** — tube fitment, valve position, flaps, substitutions, source-backed reasoning
- **PressureLogic** — placard PSI, load/inflation logic, application-specific pressure guidance
- **ValveLogic** — valve stems, TPMS sensors, service kits, programming, relearn methods, drive relearn, indirect calibration
- **Patch Notes** — tire, tube, bead, and valve repair workflows with inspect-first stop rules
- **TrainingLogic** — beginner-friendly step-by-step procedures written so a first-job teenager can follow them safely
- **InventoryLogic** — shop stock, rack/bin location, physical-vs-system reconciliation, approved substitutes

## App direction

TireCare Logic is intended to be a **Progressive Web App (PWA)** that runs in the browser and can also be installed like an app on shop PCs, tablets, and phones.

Design goals:

- fast, fluid, touch-friendly interface
- large obvious actions instead of deep menus
- global search from every screen
- dark shop-friendly visual design with strong contrast
- card-based workflows for quick scanning
- offline-capable core reference data
- installable on Windows, Android, iOS, and Chromium-based shop terminals
- camera-first workflows for tire sidewalls, placards, valve bins, tube boxes, and inventory
- AIRLOCK mode: if the evidence is insufficient, do not guess

## Beginner training philosophy

Every procedure should answer three questions:

1. **What do I do?**
2. **Why am I doing it?**
3. **How do I know I did it correctly?**

Training content should support three levels:

- **Quick** — concise checklist for experienced techs
- **Learn** — step-by-step instructions for a new employee
- **Why?** — explanation of the reasoning behind the procedure

## Shop-language rules

Training should preserve memorable shop guidance where appropriate, including:

- **Bubbles are your friend** — use the dunk tank to locate leaks and mark the leak before disassembly
- **Finding the leak does not prove the tire is repairable** — internal inspection decides repairability
- **Keep it clean** — no dirt, rust flakes, loose rubber, or debris trapped inside the assembly or bead area
- **Use proper tire lubricant generously** — reduce bead stress and make mounting/demounting cleaner and more controlled

## Current static release

- one-click `index.html` entry point with no install, package manager, build step, or server required
- forgiving tire-size normalization
- 791 catalog-backed specialty tire size records across LT metric, flotation LT, trailer, commercial truck/bus, agricultural, and motorcycle categories
- 261 manufacturer tube product rows with article number, exact multi-size fitment label, valve, weight, pack/pallet, notes, and source
- 83 valve reference rows covering 81 unique part numbers with manufacturer system, dimensions, pressure text, hydroflation/bore details, and source
- multi-fit tube families
- valve knowledge and valve offset support
- manufacturer/source attribution
- confidence/status labels
- reverse-search-ready data model
- AIRLOCK fitment rules
- metric and flotation tire-size parsing
- diameter, sidewall, circumference, revolutions-per-mile, and speedometer comparison math
- downloadable calculated passenger/LT size-space CSV datasets with explicit non-fitment status
- tire sidewall/service-description knowledge
- TPMS relearn method model
- inventory reconciliation fields reserved for shop data

## Demo

Open [`index.html`](index.html) directly in Chrome, Edge, Chromium, Firefox, or Safari. The same files can be published directly with GitHub Pages.

There is no Vite project, npm install, dependency install, compile step, or generated `dist` directory. GitHub Pages deploys the repository as static files after `node --test` verifies the engine and asset wiring.

## Catalog snapshot

The bundled `specialty-catalog.js` snapshot was generated from `specialty_tires_tubes_valves.xlsx` on 2026-08-25. It is a union of cited manufacturer catalogs, not a claim that every listed size or part is currently manufactured or in shop stock.

One workbook placeholder row was intentionally rejected during import: article `551-759` contained the fitment label `TEST SIZE`. It is recorded in the catalog audit metadata but is not searchable as a product.

## Evidence model

- **Verified** — directly supported by a manufacturer or technical source
- **Shop Verified** — reviewed and approved internally
- **Inventory Verified** — physically confirmed in current shop stock
- **Field Note** — observed during real service work and awaiting/including shop review
- **Needs Check** — plausible but not yet verified
- **Do Not Use** — known incompatibility or blocked procedure
- **Unknown** — insufficient information; TireCare Logic must not invent an answer

## Production boundary

The application distinguishes verified catalog fitments from calculated size combinations. A calculated size is never presented as proof that a product exists or is approved for a vehicle, wheel, load, tube, valve, or pressure.

## Next phase

1. Import actual shop valve/tube/TPMS inventory from photos and system exports
2. Add rack/bin locations and physical-vs-system reconciliation
3. Add vehicle placard/PSI lookup and camera capture
4. Expand TPMS programming/relearn procedures by exact year/make/model/platform
5. Add shop-approved corrections and veteran knowledge capture
6. Add camera-assisted identification for sidewalls, valve stems, TPMS parts, tube boxes, and placards
7. Keep all high-risk decisions AIRLOCKED: prove it, ask for missing information, or refuse to guess
