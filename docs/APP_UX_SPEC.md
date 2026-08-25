# TireCare Logic — App / UX Specification

## Product shape

TireCare Logic should be a **browser-first Progressive Web App (PWA)**.

Why:
- opens instantly from a URL on any shop computer
- installable like a normal app
- works well on desktop, tablet, and phone
- can cache core reference data for offline use
- camera access supports placard, tire, valve, TPMS, tube-box, and inventory capture
- easier to deploy and update than a traditional desktop installer

## Primary UI principle

A technician should never wonder where to go next.

The home screen should present a small set of large, high-contrast actions:

1. **Find a Tire / Tube**
2. **Pressure / Placard**
3. **Valves & TPMS**
4. **Patch Notes**
5. **Training**
6. **Inventory**
7. **Scan / Identify**
8. **Ask TireCare**

A global search bar remains visible or one tap away everywhere.

## Navigation

### Desktop / shop terminal
- left rail with module icons and labels
- central workspace
- persistent global search at top
- contextual right-side detail drawer for warnings, sources, inventory, and "Why?"

### Tablet / phone
- bottom navigation with Home, Search, Scan, Training, Inventory
- module actions appear as large cards
- no tiny hamburger-menu dependency for daily work

## Visual style

- dark, shop-friendly base
- strong contrast
- large typography
- large touch targets that work with dirty hands/gloves
- status colors used sparingly and consistently
- subtle motion: cards slide/expand, results transition smoothly, no flashy animation that slows work
- highly scannable cards instead of dense spreadsheets for daily workflows

## AIRLOCK status language

Every answer carries a visible status:

- VERIFIED
- SHOP VERIFIED
- INVENTORY VERIFIED
- NEEDS CHECK
- DO NOT USE
- UNKNOWN

UNKNOWN is a valid result, not a failure.

If a safe answer depends on missing information, show the missing fields as large prompts rather than inventing a recommendation.

Example:

> 315/80R22.5
> Pressure cannot be determined from size alone.
> Need: actual load, axle position, tire/load table.

## Progressive disclosure

Every result supports three levels:

### QUICK
One-screen answer and checklist.

### LEARN
Step-by-step workflow for a brand-new employee.

### WHY?
Explanation of the reason behind the procedure, plus source/shop note.

Experienced technicians should never be forced through beginner content.

## Camera-first flows

The Scan button should eventually support:

- Tire sidewall → decode size/service description
- Door placard → extract OE tire size and cold front/rear/spare PSI
- Valve stem / TPMS → identify likely family and request confirmation
- Tube box → identify size, valve, part number, possible fitments
- Inventory shelf/bin → capture product labels and counts
- Repair area → assist with documentation, never visually declare a repair safe without required inspection

Every visual identification should retain a confidence state and ask for confirmation when uncertain.

## Module behaviors

### TireLogic
Input can be messy shop shorthand. Return normalized size, construction, rim, load/speed information, application context, and related modules.

### TubeLogic
Show every verified valid tube configuration rather than collapsing real ambiguity into one answer. Include valve, position/offset, flap, rim-interface warnings, source, and inventory.

### PressureLogic
Passenger/light-vehicle workflow prioritizes the physical vehicle placard. Commercial/ag/industrial workflows use verified load/inflation data and ask for load/service information when needed.

### ValveLogic
Decision screen answers:
- what valve/stem?
- why this one?
- rim-hole/interface?
- pressure/service rating for the exact stocked product?
- TPMS attached or plain valve?
- replace stem/service kit/core/sensor?
- programming required?
- vehicle relearn required?
- manual relearn, auto-learn, drive learn, or indirect calibration?

Initial shop-language families include TR413, TR600HP, TR501, proprietary TPMS stem/sensor systems, replaceable TPMS service stems, and valve-core-only failures.

### Patch Notes
Repair workflow begins with diagnosis and inspection rather than "patch everything."

Shop rule for suspected leaks:
- **Bubbles are your friend.** Dunk the assembled tire/wheel first where shop equipment and job type allow.
- rotate slowly
- locate bubbles
- mark leak before disassembly
- remove tire
- internally inspect before deciding repairability

Finding a leak does not prove the tire is repairable.

### TrainingLogic
Assume the learner may be 15, on a first job, and unfamiliar with shop terminology. Instructions must use plain language, show what to look for, explain what success looks like, and include stop/escalate conditions.

### InventoryLogic
Return not just generic products but shop language:

> TR600HP — Bin 4 — 17 in stock

Future reconciliation compares system quantity, visual quantity, location, and discrepancies.

## Repair / training writing rules

- one action per step
- plain language first; technical term second
- explain where to look
- explain why when it prevents a mistake
- include "How to verify" at the end of every workflow
- include "Stop and ask" conditions
- never hide a safety-critical warning behind an accordion
- preserve memorable shop language where useful

## Home-screen concept

Top:

**TireCare Logic**
`Search tire, tube, vehicle, valve, TPMS, part #...`

Large cards:

**SCAN SOMETHING**
Camera-first identification

**FIND TIRE / TUBE**
Fitment and inventory

**PRESSURE**
Placard and load/inflation

**VALVES & TPMS**
Stem, sensor, service kit, relearn

**PATCH NOTES**
Repairs and leak diagnosis

**TRAINING**
Learn the job step-by-step

Bottom contextual strip:

**AIRLOCK ACTIVE — Verified answers or clear unknowns. No guessing.**

## Technical recommendation

Keep the existing Vite frontend for the prototype, then evolve toward:
- React or similarly component-based frontend
- PWA manifest + service worker
- IndexedDB/local cache for core knowledge and shop inventory snapshots
- responsive desktop/tablet/mobile layouts
- camera/file capture abstraction
- structured JSON/SQLite-compatible knowledge model
- backend/API later for multi-user sync, audit trail, and shop-specific knowledge

The frontend should remain usable even if the backend is temporarily unavailable for already-cached reference data.
