# TireCare Logic v0.6.0 — Brownie's Shop UI

## Release purpose
This release aligns TireCare Logic visually with the Brownie's Tire Service aesthetic shown in the supplied reference screenshots while preserving the existing static HTML/CSS/JavaScript lookup engine and knowledge-base behavior.

## Visual system
- Deep/medium shop blue header fields.
- Bright tire-service yellow accents.
- Black section banners.
- White catalog/service working panels.
- Bold, rectangular shop-floor controls.
- TireCare wordmark treatment inspired by the visual energy of the Brownie's site without cloning the customer-facing site.

## New shell
- Utility/status bar with Airlock state.
- TireCare branded header.
- Functional top navigation wired to existing modules.
- Identify → Verify → Act workflow strip.
- Larger bay-friendly lookup panel.
- Shop Tools section with nine functional module cards.
- Stronger result panels and verification/status presentation.
- Brownie's-compatible technical footer.

## Functional modules preserved
- Tire / Tube lookup.
- PressureLogic.
- ValveLogic + TPMS.
- Patch Notes.
- TrainingLogic.
- InventoryLogic.
- Knowledge Base browser.
- Data Status.
- Stump Test.

## Compatibility contract
The redesign preserves the existing engine selectors and attributes required by `app.js`:
- `#query`
- `#searchBtn`
- `[data-q]`
- `[data-module]`
- `#result`

The top navigation also uses `[data-module]`, so it executes the same module functions as the dashboard cards rather than linking to decorative placeholder pages.

## Responsive behavior
- Desktop: eight-item navigation and three-column shop tools.
- Medium screens: four/two-column navigation and two-column tools.
- Small screens: two-column navigation and one-column tools.
- Search and form rows collapse cleanly on narrow screens.

## Documentation
See `docs/BROWNIES_UI_SYSTEM.md` for the design system, palette, hierarchy, and interaction rules.

## Safety behavior unchanged
Visual branding does not change Airlock behavior. Safety-critical unknowns must remain UNKNOWN rather than being inferred from appearance, nominal size, or a partial match.