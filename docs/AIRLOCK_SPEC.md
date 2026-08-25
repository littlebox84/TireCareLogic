# TubeLogic AIRLOCK Spec

TubeLogic must prefer a verified unknown over a confident guess.

## Core decision inputs

A final tube recommendation may depend on more than nominal tire size:

- normalized tire size / size family
- application class
- radial vs bias construction
- rim diameter
- rim type and valve-hole/slot geometry
- tube construction requirement
- valve family
- valve offset / center-valve requirement
- hydroflation / liquid-ballast requirement
- flap requirement
- manufacturer-specific fitment

## Hard-stop safety rules

1. Use only the size/type tube and flap, when required, recommended for the tire.
2. Radial tires require radial tubes and radial flaps.
3. New tires require new tubes and new flaps when applicable.
4. Reject buckled, creased, or damaged tubes/flaps.
5. A repaired tube must not be recommended for a front-wheel position.
6. Rim and rings must match, be correct size, and be undamaged.
7. Valve-slot rims require flaps.
8. Tube and valve must be centered and beads fully seated.
9. A size match alone is insufficient when manufacturer listings show multiple valve or offset configurations.
10. TubeLogic should output NEEDS WHEEL/VALVE CHECK instead of selecting arbitrarily among unresolved configurations.

## Verified multi-fit examples to encode

### Light truck
- 7.00R/7.50R16LT has current Bridgestone listings using TR15CW, TR135, TR150, TR440, and TR13 depending on article/configuration.
- The TR440 version is center-valve; others include offset configurations.

### Low platform trailer
- 7.00R/7.50R15TR -> TR440 center valve.
- 8.25R15TR -> TR444 center valve.
- 9.00R/10.00R/11.00R15TR -> TR444 center valve.
- 7.50R20 -> TR441 center valve.
- 8.25R20 -> TR442 center valve.
- 9.00R20 -> TR443 center valve.
- 10.00R/12.80R20 -> TR444 center valve.
- 11.00R/12.00R20 and 13.80R/14.80R20 -> TR444 center valve.
- 13.00R/14.00R20/21 -> TR445 center valve.

### Industrial / mining
- 7.50R/9.00R10 can be listed as TR440 center-valve or TR15CW offset-valve, so size alone cannot choose the valve.
- 6.90R/6.00R9 and 6.50R10 appear in both TR87 offset and TR440 center-valve configurations.

### Lawn and garden
- 16x6.50/7.50-8 -> TR13.
- 18x8.50/9.50-8 -> TR13.
- 20x8.00-10 -> JS2.
- 6.00/7-16 -> TR218A.
- 7.50/8/9.5-16 -> TR218A.

### ATV
- Current Bridgestone ATV listings include TR6 and TR87 depending on family/configuration.

## Liquid ballast / hydroflation

TR218A is a large-bore, 150 PSI, straight, non-hand-bendable air/water valve intended for liquid ballast and a 0.625-inch rim hole.

TRSP1000 is a spud system used for grader, off-highway and flotation applications. It requires an extension and supports liquid ballast. Extension families can correspond to familiar truck-style bent stems, for example:

- TR1075A extension ~ TR440 equivalent
- TR1077A extension ~ TR442 equivalent
- TR1078A extension ~ TR444 equivalent

TubeLogic must model spud + extension as a system rather than flattening it into one stem code.

## Agricultural installation nuance

Tube failures near the bead toe can result from pinching/cutting during bead seating. Manufacturer guidance specifically calls for proper lubrication of rim bead seats, tire beads, and the tube contact area during assembly. This is installation guidance, not a fitment substitute rule.

## Required output states

- VERIFIED FITMENT
- VERIFIED MULTIPLE CONFIGURATIONS — CHECK WHEEL/VALVE
- SHOP VERIFIED
- NEEDS MANUFACTURER VERIFICATION
- DO NOT USE
- UNKNOWN — DO NOT GUESS

## Source hierarchy

1. Current tire/tube manufacturer fitment data
2. Current manufacturer technical/safety publications
3. Manufacturer/distributor valve specification charts
4. Reputable industry fitment charts as secondary cross-checks
5. Shop knowledge, stored separately and labeled SHOP VERIFIED

Never silently merge shop practice into manufacturer-verified data.
