# TubeLogic Data Model

## Core entities

### TireSize
Represents a normalized tire size or tire-size family.

Fields should eventually include:

- `canonical`
- `aliases`
- `rimDiameter`
- `application`
- `construction`
- `metricEquivalent`
- `legacyEquivalent`

### Tube
Represents a specific manufacturer tube/article.

- manufacturer
- article / SKU
- tube family
- supported tire sizes
- valve
- valve offset
- application
- construction notes
- source

### Valve
- code
- aliases
- valve-hole diameter
- maximum pressure
- bore
- bendable
- air/water / hydroflation support
- geometry

### Fitment
The relationship between a tire/application and a tube.

- `preferred`
- `verified`
- `shop_verified`
- `needs_check`
- `do_not_use`
- `unknown`

A fitment must be able to contain conditions such as:

- wheel/rim configuration
- valve-hole diameter
- valve offset
- flap requirement
- pressure/application constraints

### Source
Every manufacturer-backed fitment should carry:

- manufacturer/publisher
- document/page or web location
- URL
- date checked
- notes

### Inventory (Phase 2)
- shop SKU
- manufacturer SKU
- description
- system quantity
- physical quantity
- variance
- rack
- bin
- photo reference
- last counted
