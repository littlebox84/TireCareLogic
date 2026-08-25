# TireCare Logic Data Import Status

## Imported architecture

The app is being expanded into separate linked databases:

- Tire sizes
- Tube fitment
- Valve logic
- TPMS logic
- Vehicle pressure data
- Repair training
- Shop inventory

## Verification rules

Every answer must identify whether it is:

- Verified manufacturer data
- Verified shop data
- Cross-reference match
- Needs confirmation
- Unknown

## Integrated 2026-08-25 snapshot

- 791 exact catalog tire designation rows: LT metric, flotation LT, trailer, commercial truck/bus, agricultural, and motorcycle
- 261 manufacturer tube product rows with exact fitment labels, valve, weight, pack/pallet, notes, and sources
- 83 valve reference rows representing 81 unique part numbers
- 61,154 generated nomenclature combinations kept explicitly separate from exact catalog records
- Placeholder tube article `551-759` rejected because its fitment value was `TEST SIZE`

## Next data loads

- Passenger tire catalog snapshot and manufacturer model/SKU layers
- Additional tube manufacturers and shop-approved cross references
- Shop-specific valve cross references
- TPMS application tables
- Brownie's physical inventory import

This document prevents unsupported assumptions from becoming database facts.
