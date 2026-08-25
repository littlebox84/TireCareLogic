# v0.7.0 Release Checklist

- [x] Brownie's public tire catalog researched as a catalog source, not physical inventory.
- [x] Air-Loc 2022 cross-reference imported as tube coverage relationships.
- [x] Firestone manufacturer tube records preserved separately from distributor cross-references.
- [x] Major shop valve references include standard snap-in, high-pressure snap-in, commercial clamp-in and agricultural air/liquid classes.
- [x] TPMS SKU catalog includes Schrader, Dill, Hamaton and Autel families.
- [x] Messy tire input `type M, 255/65, 15` normalizes and returns source-backed tube records.
- [x] Passenger PSI remains vehicle-placard first.
- [x] Commercial/ag/industrial PSI requires load/application data.
- [x] Browser UI distinguishes recognized nomenclature, verified products and unknown data.
- [x] Node regression tests committed.
- [x] Real Playwright Chromium test committed.
- [x] GitHub Actions executes both test layers.

Release merge should occur only after the final branch-head `Catalog QA` run is green.
