# TireCare Logic — Brownie's-Inspired UI System

## Goal
TireCare Logic should visually feel at home beside Brownie's Tire Service without copying the public website pixel-for-pixel. The app uses the same broad visual language visible in the provided shop screenshots: strong blue brand fields, bright tire-service yellow accents, black section headers, white working surfaces, bold navigation, and simple service-oriented controls.

## Core palette
- Primary blue: `#276EB3`
- Deep blue: `#0B4D95`
- Dark blue: `#083D79`
- Tire-service yellow: `#F9DC1F`
- Hot yellow accent: `#FFCA0A`
- Section black: `#202429`
- Paper white: `#FFFFFF`
- Shop background: `#EEF0F2`

## Layout hierarchy
1. Utility/status strip.
2. Blue brand header with TireCare wordmark and Airlock/Stump-Test action.
3. Blue shop-navigation row.
4. Black section banner.
5. Identify → Verify → Act workflow strip.
6. Large white lookup panel.
7. White shop-tool cards with blue/yellow accents.
8. Result panels using the same catalog/service-card language.
9. Black/yellow technical footer.

## Interaction rules
- Every navigation item uses the existing `data-module` engine, so the branded navigation is functional rather than decorative.
- Search remains the primary action and keeps the existing `#query` and `#searchBtn` IDs.
- Quick searches preserve the existing `data-q` behavior.
- Module cards preserve the existing module names: `fitment`, `pressure`, `valves`, `patch`, `training`, `inventory`, `knowledge`, `status`, `selftest`.
- The visual redesign does not remove Airlock safety states, source links, multi-fitment warnings, or UNKNOWN results.

## Accessibility / shop-floor use
- High contrast blue/yellow/black/white palette.
- Large touch targets and rectangular controls suitable for mouse, touchscreen, or tablet use.
- Responsive navigation collapses from 8 columns to 4, 2, then a single-column module layout.
- Functional information is never communicated only by color; headings and text labels remain present.

## Brand intent
This is TireCare Logic with a Brownie's-compatible shop aesthetic, not a clone of the customer-facing website. The interface prioritizes bay speed, technical lookup, and source-backed answers while visually fitting the shop's existing identity.