# TireCare Logic — Headless Smoke Test Contract

This is the minimum interaction contract for the static `index.html` build.

## Core lookup cases
The following searches must resolve against the loaded local database, not return UNKNOWN:

- `413` -> TR413
- `TR413` -> TR413
- `600HP` -> TR600HP
- `501` -> TR501
- `218A` -> TR218A
- `440` -> TR440
- `618A` -> TR618A
- `9.00R20` -> verified tube family
- `6.50R10` -> verified industrial/mining family
- `15R19.5` -> verified skid-steer/manlift family
- `11R22.5` -> verified family
- `20X8.00-10` -> verified lawn/garden family
- `16.9R38` -> verified rear-farm family
- `552-070` -> verified 7.00R/7.50R16LT family

## Module click contract
Every dashboard module must render a working panel:

- Tire / Tube
- PressureLogic
- ValveLogic + TPMS
- Patch Notes
- TrainingLogic
- InventoryLogic
- Knowledge Base
- Data Status
- Stump Test

## Interactive checks

- PressureLogic must compare entered measured PSI against entered placard PSI without inventing placard data.
- Patch Notes Puncture / Tube / No-go buttons must change the procedure shown.
- Training QUICK / LEARN / WHY buttons must change the training mode shown.
- InventoryLogic must allow a local part/description/quantity/bin entry to be added and removed.
- Knowledge Base must expose loaded valve and fitment records as clickable records.
- Stump Test must show pass/fail for its built-in core cases.
- Unknown inputs must return AIRLOCK/UNKNOWN rather than a fabricated result.

## Test execution
A headless Chromium smoke run was performed against the static HTML/CSS/JS bundle with Three.js disabled (Three is visual-only and must not be required for application logic). The interaction suite completed with no JavaScript page errors in the tested build.

Three.js/CDN failure must not prevent TireCare search, modules, database browsing, pressure comparison, training, repair workflows, or local inventory from functioning.
