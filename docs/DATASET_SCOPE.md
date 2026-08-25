# Dataset scope and safety boundary

## 2026-08-25 bundled specialty snapshot

The static app now bundles 791 exact specialty tire designation rows, 261 manufacturer tube product rows, and 83 valve reference rows representing 81 unique part numbers.

Exact tire categories are LT metric, flotation LT, trailer, commercial truck/bus, agricultural, and motorcycle. Each shipped catalog row retains a source URL. Tube rows retain the manufacturer's multi-size fitment label rather than splitting it into guessed one-to-one fitments.

Article `551-759` is excluded because its source workbook row contained the placeholder fitment label `TEST SIZE`.

TireCare Logic separates verified catalog records, shop-verified inventory records, and calculated parameter-space records.

The calculated passenger-shaped space contains 4,704 combinations. The calculated LT-shaped space contains 4,092 combinations. They are generated in the browser so the repo does not ship thousands of repetitive rows. The Size Math module exports either complete set as CSV, with every row labeled CALCULATED_NOT_MARKET_VERIFIED.

Calculated rows support parsing, search normalization, diameter, circumference, revolutions-per-mile, and comparison math. They do not prove that a tire is manufactured, approved for a vehicle or wheel, adequate for a load, compatible with a tube/flap/valve, or safe at a particular pressure.

Pressure remains placard/table-first. Tube and valve results remain catalog-first. Unknown safety-critical facts remain UNKNOWN.

## Implemented math

- sidewall height (mm) = section width × aspect ratio / 100
- overall diameter (mm) = rim diameter × 25.4 + 2 × sidewall height
- circumference = pi × overall diameter
- revolutions per mile = 63,360 / circumference in inches
- comparison speed = indicated speed × new diameter / original diameter

Flotation sizes use nominal overall diameter. Real mounted dimensions vary by manufacturer, tread, measuring rim, load, pressure, and wear.
