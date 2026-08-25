# TireCare Logic — Deep Research Catalog

## Purpose

TireCare Logic separates three different questions that must never be collapsed into one:

1. **Is the input recognizable as a tire designation?**
2. **Is there a source-backed tube / valve / flap / tire-product relationship for it?**
3. **What operating pressure, TPMS part, repair procedure, or service action is correct for the actual vehicle/equipment?**

A valid-looking size is not automatically a manufactured tire. A manufactured tire size does not automatically have an approved tube. A tube valve pressure rating is not operating tire pressure. A tire size does not identify a TPMS sensor.

## Source priority

1. Tire / tube / valve manufacturer technical data.
2. Tire and rim standards authorities and current tire manufacturer data books.
3. Major distributor fitment/cross-reference charts, stored as cross-reference relationships rather than as tire-size equivalencies.
4. Vehicle owner/service information for placard pressure and TPMS procedures.
5. Brownie's public catalog for products publicly displayed by the shop website.
6. Shop-verified inventory and field knowledge once physically captured.

## Loaded research sources

### Tubes and valves

- Bridgestone Americas / Firestone inner-tube catalog and valve pages.
- Air-Loc / St. Louis Wholesale Tire 2022 fitment chart.
- Air-Loc tube-valve specification sheet.
- Haltec high-pressure snap-in, truck/bus, and agricultural air/liquid valve references.
- Dill snap-in valve references.

### TPMS

- Schrader EZ-sensor family, including 33500, 33600, 33610, 33700 and 33900 plus service-kit references.
- Dill programmable sensor families including 5001, 5002, 5003M and 5003R.
- Hamaton U-Pro Hybrid 2.5 sensor families and valve variants.
- Autel MX-Sensor programmable sensor families including 300020 and 300030.

TPMS product availability is deliberately separate from vehicle compatibility. Vehicle compatibility needs year, make, model/platform, direct-vs-indirect architecture, frequency/protocol where applicable, programming requirement and relearn procedure.

### Brownie's Tire Service of Glenwood

The public Brownie's tire catalog is stored as **catalog observation**, not physical inventory. Current captured Goodyear model/size observations include Assurance Fuel Max, Eagle Sport All-Season, and Assurance WeatherReady 2. Brownie's passenger and commercial brand sets are also recorded.

The shop's actual on-hand inventory remains a different data source and will be populated from physical labels/photos and register inventory.

### Tire technical / safety references

The broader project also references current manufacturer data books and industry guidance for load/inflation, sidewall interpretation, puncture repair, tube safety and wheel/application limits. Operating pressure remains placard/load-table driven rather than inferred from a tire-size string.

## Search architecture

### Layer 1 — input normalization

The runtime recognizes normal and messy shop input including examples such as:

- `255/65R15`
- `P255/65R15`
- `type M, 255/65, 15`
- `31x10.50R15`
- `20x7-8`
- `16.9R38`
- `420/85R38`
- `11R22.5`

### Layer 2 — source-backed fitment

For a recognized tire size, the app searches manufacturer tube rows and Air-Loc explicit `ALSO FITS` relationships. These relationships are kept as **tube coverage**, not mislabeled as tire-size equivalency.

Example regression case:

`255/65R15` currently returns two Air-Loc source-backed configurations:

- `TU02377` — tube family `7.00/7.50R15`, valve `TR150A`
- `TU02246` — tube family `MR14/15`, valve `TR13`

The presence of two records is intentional. The app must tell the technician to verify the real application/wheel/valve requirements rather than silently choosing one.

### Layer 3 — service logic

- Passenger/light-duty operating PSI starts with the vehicle placard/owner information.
- Commercial/ag/industrial/OTR pressure requires exact tire/equipment/load/application data and the correct load-inflation reference.
- TPMS selection requires vehicle data; tire size alone is insufficient.
- Valve max PSI is a component rating, not a target inflation pressure.
- Unknown safety-critical data remains UNKNOWN.

## Data-status vocabulary

- `VERIFIED_PRODUCT` — explicit product or fitment relationship from a loaded source.
- `VERIFIED_REFERENCE` — technical reference record supported by a source.
- `GENERATED_NOMENCLATURE` — input follows a recognized/generative size pattern but does not prove market availability or fitment.
- `UNKNOWN` — not recognized or insufficient evidence for a safety-critical conclusion.

## Automated QA

The branch contains two automated test levels:

1. `tests/catalog-regression.mjs` — direct engine tests for tire parsing, tube cross-reference, valves, TPMS part numbers, Brownie's catalog matching and unknown behavior.
2. `tests/browser-smoke.mjs` — Playwright Chromium test against the actual static `index.html`, including real searches and button/module behavior.

The release must not be merged until both pass.

## Required regression cases

- `type M, 255/65, 15`
- `255/65R15`
- `P255/65R15`
- `16.9R38`
- `420/85R38`
- `31x10.50R15`
- `11R22.5`
- `20x7-8`
- `TR413`
- `600HP`
- `TR501`
- `TR618A`
- `33500`
- `5001`
- `HTS-A78DH`
- `300020`
- `255/65R18`
- deliberately invalid garbage input

## What this catalog does not claim

The project does **not** claim that every combinatorial tire-size string is a real product, that every website listing is on the shelf, or that one tire size determines vehicle PSI/TPMS. Those would be unsafe claims.

The long-term complete system is built by continuously importing source-backed manufacturer/distributor/OE datasets into this same normalized schema, while preserving source, date, relationship type and confidence on every record.
