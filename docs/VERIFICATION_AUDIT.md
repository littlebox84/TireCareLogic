# TireCare Logic — Verification Audit

Last audited: 2026-08-24

## Rule

TireCare Logic is not allowed to present incomplete coverage as complete coverage.

A result may be labeled VERIFIED only when a manufacturer, industry technical source, or clearly identified shop-approved record supports it.

If a critical value is not present, the application must return UNKNOWN / NEEDS VERIFICATION rather than infer a result.

## Static search fixes completed

The original static build required exact text matches. That caused normal shop searches such as `413`, `501`, and individual tire sizes inside a multi-size tube family to fail.

The audited search now:

- treats `413`, `TR413`, `TV413`, and `TV-413` as cross-reference forms where the database explicitly maps them
- treats `600HP`, `TR600HP`, `TV600HP`, and `TV-600-HP` as searchable forms
- treats `501`, `TR501`, `TV501`, and `TV-501` as searchable forms
- searches tube article numbers
- searches individual tire sizes stored inside a multi-size fitment family
- searches verified knowledge keywords such as TPMS, relearn, puncture, patch, pressure, and service kit
- returns UNKNOWN instead of inventing a match

## Verified valve coverage in the current local build

### Tubeless / wheel valves

- TR412
- TR413
- TR414
- TR415
- TR418
- TR423
- TR425
- TR600HP
- TR602HP
- TR801HP
- TR802HP
- TR416
- TR500
- TR501
- TR570
- TR571
- TR572
- TR573
- TR574
- TR575

Primary sources: Haltec, Dill, Hamaton.

### Tube valves

- TR6
- TR13
- TR15
- TR15CW
- TR135
- TR150
- TR218A
- TR220A
- TR300
- TR440
- TR441
- TR442
- TR443
- TR444
- TR445
- TR87
- JS2
- TR618A (kept distinct from TR600HP)

Primary source: Bridgestone Americas Tube Business; Haltec for TR618A family reference.

## Important verified valve distinctions

- Dill lists standard snap-in 412/413/414/418/423 in the .453-inch hole family at 65 PSI maximum cold inflation.
- TR415 and TR425 are .625-inch snap-in sizes in the cited valve catalog.
- Haltec lists TV-600-HP and TV-602-HP for .453-inch holes up to 80 PSI cold inflation.
- Haltec lists TV-801-HP and TV-802-HP for .625-inch holes up to 100 PSI. Hamaton publishes an 80 PSI TR801HP version, so TireCare must verify the stocked manufacturer rather than assume one universal rating.
- Haltec lists TR501 / TV-501 as a straight .625-inch truck/bus clamp-in valve with 1.5-inch effective length. The Haltec truck/bus page does not publish one universal PSI number, so TireCare does not invent one.
- Bridgestone tube-valve TR13 is a 60 PSI tube valve, which is a different data context from a tubeless TR413 wheel valve.
- Bridgestone TR15CW is a .625-inch, 150 PSI tube valve intended for liquid ballast where specified.
- Bridgestone TR218A is a .625-inch large-bore air/water valve rated 150 PSI and supplied with TRCH3/TR-LN10 hardware.
- Bridgestone TR440–TR445 are supplied bent, rated 150 PSI, and intended for slotted-rim use.

## Verified tube-fitment categories now represented locally

Current local fitment records include verified examples from:

- Light Truck
- Low Platform Trailer
- Industrial / Mining
- Skid Steer / Manlift / Duplex
- Lawn & Garden
- Rear Farm

The local build now contains multiple individual tire-size aliases inside those families so a tech does not have to type the catalog's combined family marking exactly.

Examples now searchable include:

- 7.00R16LT / 7.50R16LT
- 7.00R15TR / 7.50R15TR
- 8.25R15TR
- 9.00R15TR / 10.00R15TR / 11.00R15TR
- 7.50R20
- 8.25R20
- 9.00R20
- 10.00R20 / 12.80R20
- 11.00R20 / 12.00R20 / 13.80R20 / 14.80R20
- 13.00R20 / 14.00R20
- 11.00R24 / 12.00R24 / 11.00R25 / 12.00R25
- 13.00R24 / 14.00R24 / 13.00R25 / 14.00R25
- 7.50R10 / 9.00R10 industrial/mining
- 6.90R9 / 6.00R9 / 6.50R10 industrial/mining
- 7.00R12 industrial/mining
- 8.25R15 industrial/mining
- 15R19.5 / 18R19.5 skid-steer/manlift family
- 10R22.5 / 11R22.5 / 12R22.5
- 7R17.5 / 8R17.5
- 8R19.5 / 9R19.5
- 16x6.50-8 / 16x7.50-8
- 18x8.50-8 / 18x9.50-8
- 20x8.00-10
- 6.00-16 / 7.00-16 lawn/garden tractor family
- 7.50-16 / 8-16 / 9.5-16 lawn/garden tractor family
- 13.6R36 / 13.9R36 / 14.9R36 / 13.6R38 / 13.9R38 / 14.9R38
- 16.9R38 / 18.4R38
- 20.8R38
- 18.4R42
- 20.8R42

## Verified repair rules

Passenger/light-truck permanent puncture repair rules are grounded in USTMA and Michelin guidance:

- tire must be demounted for internal inspection
- qualifying puncture must be in the approved tread repair area
- common industry limit is 1/4 inch (6 mm) or less, subject to manufacturer-specific restrictions
- injury channel must be filled and inner liner must be patched
- plug-only and patch-only are not accepted permanent repair methods
- shoulder/sidewall and structural/run-flat damage are stop conditions

Shop workflow additionally records the shop practice: locate the leak by dunking the assembled tire/wheel first when practical and safe, mark it, then demount and determine repairability internally.

## Verified TPMS model

The local TPMS logic now distinguishes:

- direct vs indirect systems
- stationary/manual relearn
- auto/drive relearn
- OBD registration/relearn
- sensor programming/cloning vs vehicle relearn
- replaceable service stem/service kit vs sensor electronics
- core leak vs stem/grommet leak vs sensor/system fault

Primary sources include Bartec, ATEQ, and Schrader.

## Verified pressure model

For passenger/light-duty vehicles the app is placard-first and uses COLD pressure language.

It does not substitute tire-sidewall maximum pressure for the vehicle recommended operating pressure.

For commercial/ag/industrial/OTR, tire size alone is treated as insufficient for a safe PSI recommendation. Exact tire model, load, position, speed/service, and the correct manufacturer load/inflation table may be required.

## NOT claimed complete yet

These areas are intentionally NOT represented as complete:

- every year/make/model placard PSI
- every vehicle-specific TPMS sensor frequency and sensor part number
- every vehicle-specific TPMS relearn procedure
- every tire manufacturer load/inflation table
- every Firestone/Bridgestone tube SKU in the full catalog
- every tube manufacturer other than the sources already imported
- shop-specific proprietary TPMS stem/sensor combinations
- shop-specific stock counts, bins, and internal part numbers

Those must be added from verified technical sources and the actual physical shop inventory.

## Primary audit sources

- Bridgestone Americas Tube Business product catalog and valve pages
- Haltec standard-bore, high-pressure, clamp-in, truck/bus and air/liquid valve catalogs
- Dill snap-in valve catalog
- Hamaton product catalog
- Schrader TPMS service guidance
- Bartec TPMS relearn guidance
- ATEQ TPMS service/relearn guidance
- USTMA puncture repair procedures
- Michelin repair criteria
- NHTSA tire-pressure / placard material

## AIRLOCK acceptance test

Before showing this build to a veteran technician, test at minimum:

1. `413` -> TR413 record
2. `TR413` -> same TR413 record
3. `600HP` -> TR600HP record
4. `501` -> TR501 record
5. `218A` -> TR218A record
6. `440` -> TR440 record
7. `9.00R20` -> TR443 low-platform trailer fitment
8. `6.50R10` -> industrial/mining family showing TR87 and TR440 alternatives
9. `15R19.5` -> skid-steer/manlift family showing TR15CW, TR218A and TR440 alternatives
10. `11R22.5` -> TR300 skid-steer/manlift family
11. `20X8.00-10` -> JS2 lawn/garden fitment
12. `16.9R38` -> rear-farm TR218A family
13. `552-070` -> 7.00R/7.50R16LT family / TR440 article
14. `TPMS relearn` -> TPMS module
15. `puncture` -> Patch Notes / repair guidance
16. nonsense input -> UNKNOWN, not a fabricated result

If any of those fail, the build is not demo-ready.