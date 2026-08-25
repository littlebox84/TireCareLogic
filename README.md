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

## Current proof-of-concept

- forgiving tire-size normalization
- multi-fit tube families
- valve knowledge and valve offset support
- manufacturer/source attribution
- confidence/status labels
- reverse-search-ready data model
- AIRLOCK fitment rules
- tire sidewall/service-description knowledge
- TPMS relearn method model
- inventory reconciliation fields reserved for shop data

## Demo

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Evidence model

- **Verified** — directly supported by a manufacturer or technical source
- **Shop Verified** — reviewed and approved internally
- **Inventory Verified** — physically confirmed in current shop stock
- **Field Note** — observed during real service work and awaiting/including shop review
- **Needs Check** — plausible but not yet verified
- **Do Not Use** — known incompatibility or blocked procedure
- **Unknown** — insufficient information; TireCare Logic must not invent an answer

## Next phase

1. Build the PWA navigation shell
2. Add TrainingLogic and Patch Notes screens
3. Add ValveLogic decision workflows for TR413, TR600HP, TR501, TPMS stems/service kits, and valve-core diagnosis
4. Import actual shop valve/tube/TPMS inventory from photos and system exports
5. Add rack/bin locations and physical-vs-system reconciliation
6. Add vehicle placard/PSI lookup and camera capture
7. Expand TPMS programming/relearn procedures by exact year/make/model/platform
8. Add shop-approved corrections and veteran knowledge capture
9. Add camera-assisted identification for sidewalls, valve stems, TPMS parts, tube boxes, and placards
10. Keep all high-risk decisions AIRLOCKED: prove it, ask for missing information, or refuse to guess
