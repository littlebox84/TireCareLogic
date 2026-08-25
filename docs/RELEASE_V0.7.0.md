# TireCare Logic v0.7.0 — Deep Catalog Release

## Release purpose

This release fixes the core lookup architecture: TireCare now recognizes major tire-size notation independently from source-backed product fitment. A valid tire designation is no longer labeled an unknown tire simply because the local product catalog has no row for it.

## Verified regression fix

Input: `type M, 255/65, 15`

Normalized tire designation: `255/65R15`

Loaded Air-Loc source-backed tube coverage includes:

- `TU02377` — `7.00/7.50R15` tube family — `TR150A`
- `TU02246` — `MR14/15` tube family — `TR13`

The UI intentionally shows both instead of silently choosing one. The actual wheel/application/valve requirement must decide the correct configuration.

## Data loaded in this snapshot

- 61,154 generated tire-nomenclature combinations across passenger, LT, ST, commercial metric and motorcycle metric spaces. These are **syntax/nomenclature coverage, not claims that every combination is manufactured**.
- 77 Firestone / manufacturer tube-product records in the base catalog.
- 114 Air-Loc fitment/cross-reference records.
- 559 searchable Air-Loc `ALSO FITS` aliases.
- 13 base valve technical/reference records plus six additional shop-service valve records.
- 24 TPMS product/SKU records from Schrader, Dill, Hamaton and Autel.
- Three captured Brownie's public Goodyear model catalogs containing 142 model-size listings.
- Five Air-Loc flap records.
- More than 30 registered source/technical references after the TPMS and tire-technical enrichment pass.

## Tire categories covered by the source-backed tube catalog

- Passenger radial
- Light truck
- Medium truck
- Agricultural rear radial
- Farm implement
- Industrial / forklift
- Off-the-road
- ATV / UTV
- Lawn & garden
- Bias trailer
- Flotation
- Skid-steer / manlift / duplex

## TPMS catalog

Current SKU examples include:

- Schrader: 33500, 33600, 33610, 33700, 33900
- Dill: 5001, 5002, 5003M, 5003R, 7005HPR, 7006HPR, 7007HP, 7008HP
- Hamaton: HTS-A78DD, HTS-A78DG, HTS-A78DH, HTS-A78DK
- Autel: 300020, 300030, 300100, 300040, 300060, 300010, 300050

TireCare does not assign one of these sensors from tire size alone. Vehicle year/make/model/platform and TPMS architecture are required.

## Pressure rules

- Passenger/light-duty operating PSI is placard/owner-information first.
- Commercial, agricultural, industrial and OTR pressure requires exact tire/equipment/load/application information and the appropriate load-inflation reference.
- Valve/tube/sensor maximum pressure ratings are component limits, not target tire pressure.

## Brownie's catalog rules

Brownie's public website is used as a catalog-observation source. A model/size appearing on the website does not prove physical on-hand quantity at the Glenwood store. Physical shop inventory remains a separate Shop Verified dataset.

## Automated verification

The feature branch head was tested by GitHub Actions with:

- direct Node catalog regression tests
- real Playwright Chromium against the actual static `index.html`
- messy-input parsing
- tube cross-reference search
- valve number lookup
- TPMS part-number lookup
- Brownie's catalog lookup
- unknown/garbage behavior

The final tested feature head was `309ff5ac1e2aed10ee38beaeb706629518280b76` and its `Catalog QA` run completed successfully before merge.

## Safety / confidence contract

- `VERIFIED_PRODUCT`: explicit loaded product/fitment relationship.
- `VERIFIED_REFERENCE`: source-backed technical reference.
- `GENERATED_NOMENCLATURE`: recognized/generated tire-size notation only; market existence or fitment not implied.
- `UNKNOWN`: insufficient evidence for a safety-critical answer.

This architecture is intended to keep expanding without converting generated possibilities into fake product records.
