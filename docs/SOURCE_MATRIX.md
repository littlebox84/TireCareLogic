# TireCare Logic Source Matrix

| Domain | Primary loaded sources | Relationship stored |
|---|---|---|
| Tire notation / geometry | TireCare parser + manufacturer reference material | Recognized nomenclature; not product existence |
| Manufacturer tubes | Bridgestone Americas / Firestone tube catalog and valve pages | Exact tube article / size family / valve / application |
| Tube cross-reference | Air-Loc / St. Louis Wholesale Tire fitment chart | Explicit tube `ALSO FITS` coverage |
| Tube valve geometry | Air-Loc valve spec sheet, Firestone valve pages | Valve geometry/application/reference |
| High-pressure / truck / ag valves | Haltec, Dill | Exact product/reference component data |
| TPMS aftermarket | Schrader, Dill, Hamaton, Autel | Sensor SKU, frequency family, stem/service configuration, programming class |
| TPMS vehicle compatibility | OE/application guides | Year/make/model/platform/protocol/relearn; must not be inferred from tire size |
| Shop public retail catalog | Brownie's Tire Service public catalog | Public model/size observation only |
| Operating pressure | Vehicle placard/owner data; manufacturer load-inflation data | Actual operating pressure logic |
| Passenger/LT puncture repair | USTMA + repair-system/manufacturer guidance | Repair procedure/limits |
| Physical shop inventory | Brownie's physical labels/photos + register inventory | Shop Verified on-hand quantity/location |

Every critical record should retain its source and relationship type. Cross-reference coverage must not be silently converted into tire equivalency, and a public retail listing must not be converted into physical inventory.
