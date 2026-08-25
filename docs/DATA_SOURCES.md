# TireCare Logic data sources and confidence model

TireCare Logic deliberately separates generated nomenclature from source-backed product and standards data.

## Confidence levels

- `VERIFIED_PRODUCT`: a manufacturer or supplier page explicitly lists the tube, valve, article number or application.
- `VERIFIED_REFERENCE`: an authoritative source explicitly supports the reference/specification shown.
- `GENERATED_NOMENCLATURE`: the designation is syntactically and mathematically constructible inside TireCare Logic's configured size-space. It is **not** evidence that the tire is manufactured, approved, load-capable or suitable for a vehicle.
- `UNKNOWN`: the local database does not contain enough evidence to make a safety-critical fitment claim.

## Standards authorities

### ETRTO 2026 Standards Manual

https://www.etrto.org/publications/available/standards-manual/

ETRTO publishes separate 2026 standards material for passenger car, commercial vehicle, agricultural, motorcycle, cycle, industrial/lift-truck, earthmoving, rims, rim/valve combinations and valves. TireCare Logic references those authorities but does not copy licensed tables into this repository.

### The Tire and Rim Association (TRA) 2026 Year Book

https://www.us-tra.org/product/2026-year-book-copy/

TRA describes the Year Book as containing tire designations, load ratings and dimensions, approved rim contours and valves, rim dimensions, valve dimensions and related interchangeability data. Those licensed tables are not redistributed here.

## Manufacturer tube data

Bridgestone Americas Tube Business product index:

https://firestonetubes.com/products/home/

Current source-backed records in the local catalog include product rows from:

- Passenger - Made in USA: https://firestonetubes.com/products/page/1/passenger-made-in-usa
- Passenger - Imported: https://firestonetubes.com/products/page/20/passenger-imported
- Light Truck - Made in USA: https://firestonetubes.com/products/page/19/light-truck-made-in-usa
- Light Truck - Imported: https://firestonetubes.com/products/page/2/light-truck-imported
- Lawn and Garden: https://firestonetubes.com/products/page/15/lawn-and-garden
- Flotation: https://firestonetubes.com/products/page/8/flotation
- Industrial Mining Service: https://firestonetubes.com/products/page/13/industrial-mining-service
- Skidsteer / Manlift / Duplex: https://firestonetubes.com/products/page/4/skidsteer-manlift-duplex

Each imported tube record keeps its article number, manufacturer size-family text, valve, application/origin, valve offset/position and source URL.

## Valve data

Bridgestone valve index:

https://firestonetubes.com/valves/home/

Specific pages currently used include:

- TR13: https://firestonetubes.com/valves/page/2/tr13
- TR15CW: https://firestonetubes.com/valves/page/6/tr15cw

Haltec catalog reference:

https://www.haltec.com/pc/catalog/Haltec-Catalog-Updated-082025.pdf

The app only exposes pressure, rim-hole, hydroflation or dimensional fields where the cited source supports them. A valve code discovered only through a tube fitment row is labeled `FITMENT_REFERENCE_ONLY` instead of inheriting guessed specifications.

## What is intentionally not claimed

The generated tire size builder does not claim that every generated size exists in commerce. It exists to normalize input, calculate dimensions, provide complete selector coverage for the configured nomenclature ranges, and make it possible to overlay licensed/verified market data later.

Final vehicle fitment, pressure, load, rim width/contour, speed capability, tube selection, valve-hole selection and TPMS service decisions must remain source-backed. If TireCare Logic has no verified record, the correct result is `UNKNOWN`, not a guessed fitment.
