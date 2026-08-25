# Dataset scope and safety boundary

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
