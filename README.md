# TubeLogic

**TubeLogic** is a tire-tube fitment knowledge base and shop assistant.

The goal is simple: let a technician type a tire size the way people actually type it — even something ugly like `70075016` — and return verified tube families, valve options, fitment warnings, and source-backed reasoning.

## Current proof-of-concept

- Forgiving tire-size normalization
- Multi-fit tube families
- Valve knowledge
- Valve offset support
- Manufacturer/source attribution
- Confidence/status labels
- "Why this fit?" explanations
- Reverse-search-ready data model
- Inventory reconciliation fields reserved for the next phase

## Demo

```bash
npm install
npm run dev
```

Then open the local Vite URL.

Try:

- `70075016`
- `7.00 7.50 16`
- `7.00R7.50R16LT`
- `TR218A`
- `TR15CW`

## Philosophy

TubeLogic should never guess when a fitment depends on wheel, valve, offset, application, or another unresolved condition.

Status model:

- **Verified** — directly supported by a manufacturer or technical source
- **Shop Verified** — reviewed and approved internally
- **Needs Check** — plausible relationship but not yet verified
- **Do Not Use** — known incompatibility
- **Unknown** — insufficient information

## Next phase

1. Import actual shop inventory
2. Photograph and inventory the tube room
3. Reconcile physical vs system stock
4. Add rack/bin locations
5. Add shop-approved substitutions
6. Add reverse lookup: "What can I use this tube in?"
7. Add conversational shop search
