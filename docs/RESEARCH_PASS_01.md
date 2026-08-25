# TubeLogic Research Pass 01

## Goal

Build a source-backed knowledge base that distinguishes tire size, application, valve, valve offset, and fitment constraints instead of assuming one tire size always maps to one tube.

## Verified application families

Current Bridgestone/Firestone tube listings separate at least these categories:

- Passenger
- Light Truck
- Low Platform Trailer
- Skidsteer / Manlift / Duplex
- Industrial / Mining Service
- Lawn and Garden
- ATV
- Rear Farm (radial and other farm categories in catalog)

This confirms TubeLogic should treat **application as a first-class field**, not just a note.

## Verified multi-fit examples

### Light Truck

`7.00R/7.50R16LT` appears in multiple manufacturer-listed configurations:

- TR15CW, article 552-046, 1 1/6 in offset
- TR135, article 552-054, 1 1/6 in offset
- TR150, article 552-062, 1 1/6 in offset
- TR440, article 552-070, center valve
- TR13, article 552-089, 1 1/6 in offset

This is the core TubeLogic demo case: same tire family, multiple legitimate valve configurations.

### Low Platform Trailer

Examples:

- `7.00R/7.50R15TR` -> TR440 center valve
- `8.25R15TR` -> TR444 center valve
- `9.00R/10.00R/11.00R15TR` -> TR444 center valve
- `9.00R20` -> TR443 center valve
- `10.00R/12.80R20` -> TR444 center valve
- `13.00R/14.00R20/21` -> TR445 center valve

Application suffix matters: a nominal size used in a low-platform-trailer tube family should not be merged blindly with light-truck or industrial data.

### Skidsteer / Manlift / Duplex

Examples:

- `15R/18R19.5` appears with TR15CW, TR218A, and TR440 variants
- `10R/11R/12R22.5` -> TR300
- `15R/16.5R/18R22.5` -> TR15CW

This is another strong proof that the valve is part of the fitment, not an afterthought.

### Industrial / Mining

Examples:

- `7.50R/9.00R10` -> TR440 center-valve configuration
- `23X8R9R10; 7.50R/9.00R10` -> TR15CW offset configuration
- `6.90R/6.00R9; 6.50R10` appears with both TR87 and TR440 variants

### Lawn and Garden

Examples:

- `16X6.50/7.50-8` -> TR13
- `6.50-10` -> TR15
- `20X8.00-10` -> JS2
- `6.00/7-16` -> TR218A
- `7.50/8/9.5-16` -> TR218A

### ATV

Examples:

- `8.00R6/7` -> TR87
- `16X8.00R7` -> TR6
- `20X7R8` -> TR6
- `25X12R12` -> TR6

## Valve rules verified

### TR218A

Bridgestone specifies:

- 150 PSI maximum pressure
- hydroflation: yes
- large bore
- straight, not hand-bendable
- rim hole: 0.625 in
- designed for liquid ballast

Bridgestone lists its use in rear tractor, front tractor, flotation, forestry, lawn/garden, and drag-racing sizes.

### TRSP1000 spud system

Bridgestone specifies:

- 150 PSI
- hydroflation: yes
- designed for liquid ballast
- rim hole 0.818 in or a slot
- uses extensions

Published compatible extensions include TR1075A, TR1077A, and TR1078A, with equivalent-valve relationships to TR440-series truck stems.

This means TubeLogic eventually needs a **valve-system / extension relationship**, not just a flat valve code field.

## Safety constraints that should become hard rules

Bridgestone tube safety guidance says:

1. Use only the size and type tube (and flap, when required) recommended for the tire.
2. Only radial tubes and radial flaps may be used with radial tires.
3. Use new tubes/flaps in new tires; do not use buckled, creased, or damaged tubes/flaps.
4. Do not use a repaired tube in a front-wheel position.
5. Rim and rings must match and be proper size and undamaged.
6. Rims with valve slots require flaps.
7. Tube and valve must be centered and beads fully seated.

These should become rule-engine flags rather than buried documentation.

## Data-model additions from this research pass

Add or preserve these fields:

- `application`
- `construction` (radial/bias/unknown)
- `tireFamily`
- `canonicalSize`
- `aliases`
- `valveCode`
- `valveOffset`
- `valvePosition` (center/offset)
- `rimHoleDiameter`
- `hydroflationCompatible`
- `requiresFlap`
- `flapType`
- `valveExtensions`
- `manufacturerArticle`
- `sourceUrl`
- `verificationStatus`
- `fitmentConditions`
- `doNotSubstituteReasons`

## Secondary cross-reference source

Air-Loc publishes an Inner Tube Fitment Chart with an explicit `ALSO FITS` field. This is useful for expanding alias and substitution coverage, but TubeLogic should prefer manufacturer-specific fitment data when available and retain source provenance for every relationship.

## Sources

- Bridgestone Americas Tube Business — Light Truck Imported: https://firestonetubes.com/products/page/2/light-truck-imported
- Bridgestone Americas Tube Business — Low Platform Trailer Made in USA: https://firestonetubes.com/products/page/3/low-platform-trailer-made-in-usa
- Bridgestone Americas Tube Business — Low Platform Trailer Imported: https://firestonetubes.com/products/page/26/low-platform-trailer-imported
- Bridgestone Americas Tube Business — Skidsteer Manlift Duplex: https://firestonetubes.com/products/page/4/skidsteer-manlift-duplex
- Bridgestone Americas Tube Business — Industrial Mining Service: https://firestonetubes.com/products/page/13/industrial-mining-service
- Bridgestone Americas Tube Business — Lawn and Garden: https://firestonetubes.com/products/page/15/lawn-and-garden
- Bridgestone Americas Tube Business — ATV: https://firestonetubes.com/products/page/16/atv
- Bridgestone Americas Tube Business — Tube Safety: https://firestonetubes.com/policies-and-forms/page/1/tube-safety
- Bridgestone Americas Tube Business — TR218A: https://firestonetubes.com/valves/page/7/tr218a-nr
- Bridgestone Americas Tube Business — TRSP1000: https://firestonetubes.com/valves/page/18/trsp1000
- Air-Loc Inner Tube Fitment Chart: https://www.stlwholesale.com/pageimages/download_docs/AIR_LOC_INNER_TUBE_FITMENT_CHART_5-11-18.pdf
