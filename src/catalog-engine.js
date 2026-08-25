(function (root) {
  'use strict';

  const SOURCES = {
    ETRTO_2026: {
      name: 'ETRTO Standards Manual 2026',
      url: 'https://www.etrto.org/publications/available/standards-manual/',
      scope: 'Passenger, commercial, agricultural, motorcycle, cycle, industrial, earthmoving, rims, rim/valve combinations and valves',
      access: 'reference-metadata-only'
    },
    TRA_2026: {
      name: 'The Tire and Rim Association 2026 Year Book',
      url: 'https://www.us-tra.org/product/2026-year-book-copy/',
      scope: 'Tire designations, dimensions, load ratings, approved rims and valves',
      access: 'licensed-publication-metadata-only'
    },
    FIRESTONE_HOME: {
      name: 'Bridgestone Americas Tube Business product index',
      url: 'https://firestonetubes.com/products/home/',
      scope: 'Tube product categories'
    },
    FIRESTONE_VALVES: {
      name: 'Bridgestone Americas Tube Business valve index',
      url: 'https://firestonetubes.com/valves/home/',
      scope: 'Tube valve dimensions, pressure and service attributes'
    },
    PASSENGER_USA: {name:'Bridgestone Passenger - Made in USA',url:'https://firestonetubes.com/products/page/1/passenger-made-in-usa'},
    PASSENGER_IMPORT: {name:'Bridgestone Passenger - Imported',url:'https://firestonetubes.com/products/page/20/passenger-imported'},
    LT_USA: {name:'Bridgestone Light Truck - Made in USA',url:'https://firestonetubes.com/products/page/19/light-truck-made-in-usa'},
    LT_IMPORT: {name:'Bridgestone Light Truck - Imported',url:'https://firestonetubes.com/products/page/2/light-truck-imported'},
    LAWN: {name:'Bridgestone Lawn and Garden',url:'https://firestonetubes.com/products/page/15/lawn-and-garden'},
    FLOTATION: {name:'Bridgestone Flotation',url:'https://firestonetubes.com/products/page/8/flotation'},
    MINING: {name:'Bridgestone Industrial Mining Service',url:'https://firestonetubes.com/products/page/13/industrial-mining-service'},
    SKID: {name:'Bridgestone Skidsteer / Manlift / Duplex',url:'https://firestonetubes.com/products/page/4/skidsteer-manlift-duplex'},
    HALTEC_CATALOG: {name:'Haltec tire valve catalog',url:'https://www.haltec.com/pc/catalog/Haltec-Catalog-Updated-082025.pdf'}
  };

  const STATUS = Object.freeze({
    VERIFIED_PRODUCT: 'VERIFIED_PRODUCT',
    VERIFIED_REFERENCE: 'VERIFIED_REFERENCE',
    GENERATED_NOMENCLATURE: 'GENERATED_NOMENCLATURE',
    UNKNOWN: 'UNKNOWN'
  });

  const clean = v => String(v ?? '').trim().toUpperCase();
  const key = v => clean(v).replace(/[^A-Z0-9.]/g, '');
  const round = (n, d = 2) => Number(Number(n).toFixed(d));
  const range = (start, end, step, digits = 0) => {
    const out = [];
    for (let n = start; n <= end + step / 100; n += step) out.push(Number(n.toFixed(digits)));
    return out;
  };
  const uniq = arr => [...new Set(arr)];
  const SPECIALTY = root.TIRECARE_SPECIALTY_CATALOG || {meta:{counts:{}},tires:[],tubes:[],valves:[],sources:[]};
  const specialtySource = url => {
    const match = (SPECIALTY.sources || []).find(source => source.url === url);
    return {name:match?.name || 'Manufacturer catalog reference',url};
  };
  const uniqueBy = (items, signature) => {
    const seen = new Set();
    return items.filter(item => {
      const id = signature(item);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const FAMILY_DEFS = {
    passenger_metric: {
      label: 'Passenger / P-Metric',
      prefixes: ['', 'P'], widths: range(125, 355, 5), aspects: range(20, 85, 5), rims: range(10, 26, 1), constructions: ['R'],
      warning: 'Generated size-space only. A generated designation is not evidence that a tire is manufactured or approved for a vehicle.'
    },
    light_truck_metric: {
      label: 'Light Truck Metric',
      prefixes: ['LT'], widths: range(135, 395, 5), aspects: range(20, 85, 5), rims: range(14, 24, 1), constructions: ['R'],
      warning: 'Load range, service description, approved rim and vehicle placard must be verified separately.'
    },
    special_trailer_metric: {
      label: 'Special Trailer Metric',
      prefixes: ['ST'], widths: range(135, 315, 5), aspects: range(50, 85, 5), rims: range(10, 18, 1), constructions: ['R'],
      warning: 'ST designation alone does not establish load capacity or wheel approval.'
    },
    commercial_metric: {
      label: 'Commercial Metric',
      prefixes: [''], widths: range(175, 495, 5), aspects: range(35, 95, 5), rims: [17.5, 19.5, 22.5, 24.5], constructions: ['R'],
      warning: 'Commercial fitment requires load table, approved rim contour and valve verification.'
    },
    motorcycle_metric: {
      label: 'Motorcycle Metric',
      prefixes: [''], widths: range(50, 360, 10), aspects: range(25, 100, 5), rims: range(8, 23, 1), constructions: ['-', 'R', 'ZR'],
      warning: 'Motorcycle tube/tire fitment also depends on wheel type, speed category and manufacturer specification.'
    }
  };

  function normalizeTireSize(input) {
    let s = clean(input).replace(/\s+/g, '');
    s = s.replace(/[–—]/g, '-');
    if (/^\d{3}\d{2}R\d{2}(\.5)?$/.test(s)) s = s.replace(/^(\d{3})(\d{2})(R\d{2}(?:\.5)?)$/, '$1/$2$3');
    if (/^(P|LT|ST)?\d{3}\d{2}\d{2}$/.test(s)) {
      const m = s.match(/^(P|LT|ST)?(\d{3})(\d{2})(\d{2})$/);
      s = `${m[1] || ''}${m[2]}/${m[3]}R${m[4]}`;
    }
    return s;
  }

  function parseTireSize(input) {
    const raw = clean(input);
    const s = normalizeTireSize(raw);
    let m = s.match(/^(P|LT|ST)?(\d{3})\/(\d{2,3})(ZR|R|-)(\d{2}(?:\.5)?)$/);
    if (m) {
      const width = Number(m[2]), aspect = Number(m[3]), rim = Number(m[5]);
      const sidewallMm = width * aspect / 100;
      return {
        raw, normalized: `${m[1] || ''}${width}/${aspect}${m[4]}${rim}`,
        family: m[1] === 'LT' ? 'light_truck_metric' : m[1] === 'ST' ? 'special_trailer_metric' : (rim % 1 ? 'commercial_metric' : 'passenger_metric'),
        prefix: m[1] || '', widthMm: width, aspectRatio: aspect, construction: m[4], rimIn: rim,
        sidewallMm: round(sidewallMm), overallDiameterIn: round((rim * 25.4 + sidewallMm * 2) / 25.4),
        circumferenceIn: round(Math.PI * ((rim * 25.4 + sidewallMm * 2) / 25.4))
      };
    }
    m = s.match(/^(\d{2,3}(?:\.\d{1,2})?)X(\d{1,2}(?:\.\d{1,2})?)(R|-)?(\d{1,2}(?:\.5)?)$/);
    if (m) {
      return {raw, normalized:s, family:'flotation', overallDiameterIn:Number(m[1]), sectionWidthIn:Number(m[2]), construction:m[3] || '-', rimIn:Number(m[4])};
    }
    m = s.match(/^(\d{1,2}(?:\.\d{1,2})?)(R|-)(\d{1,2}(?:\.5)?)$/);
    if (m) return {raw, normalized:s, family:'numeric_or_ag', sectionWidthIn:Number(m[1]), construction:m[2], rimIn:Number(m[3])};
    m = s.match(/^(\d{2,3})\/(\d{2,3})(R|-)(\d{2}(?:\.5)?)$/);
    if (m) return {raw, normalized:s, family:'commercial_or_industrial_metric', widthMm:Number(m[1]), aspectRatio:Number(m[2]), construction:m[3], rimIn:Number(m[4])};
    return null;
  }

  function isInGeneratedSpace(parsed) {
    if (!parsed) return false;
    const def = FAMILY_DEFS[parsed.family];
    if (!def) return ['flotation','numeric_or_ag','commercial_or_industrial_metric'].includes(parsed.family);
    return def.prefixes.includes(parsed.prefix || '') && def.widths.includes(parsed.widthMm) && def.aspects.includes(parsed.aspectRatio) && def.rims.includes(parsed.rimIn) && def.constructions.includes(parsed.construction);
  }

  function countGenerated(family) {
    const d = FAMILY_DEFS[family];
    if (!d) return 0;
    return d.prefixes.length * d.widths.length * d.aspects.length * d.rims.length * d.constructions.length;
  }

  function selectorOptions(family, partial = {}) {
    const d = FAMILY_DEFS[family];
    if (!d) return null;
    return {
      family,
      label: d.label,
      prefixes: d.prefixes.slice(),
      widths: d.widths.slice(),
      aspects: d.aspects.slice(),
      rims: d.rims.slice(),
      constructions: d.constructions.slice(),
      warning: d.warning,
      selected: {...partial},
      status: STATUS.GENERATED_NOMENCLATURE
    };
  }

  function buildMetricSize({family='passenger_metric', prefix, width, aspect, construction='R', rim}) {
    const d = FAMILY_DEFS[family];
    if (!d) return null;
    const p = prefix ?? d.prefixes[0];
    const w = Number(width), a = Number(aspect), r = Number(rim);
    if (!d.prefixes.includes(p) || !d.widths.includes(w) || !d.aspects.includes(a) || !d.rims.includes(r) || !d.constructions.includes(construction)) return null;
    return `${p}${w}/${a}${construction}${r}`;
  }

  const CORE_TUBES = [
    ['536-261','GR13/14/15;7R14','TR13','Passenger','USA','7/8 in','PASSENGER_USA'],
    ['536-296','KR14/15','TR13','Passenger','USA','7/8 in','PASSENGER_USA'],
    ['521-078','MR14/15;7R7.5LR7.50R8R8.5LR9.5LR14/15','TR13','Passenger','USA','2 in','PASSENGER_USA'],
    ['532-517','GR16;5.50R5.90R6.00R6.40R15/16','TR13','Passenger','USA','3/4 in','PASSENGER_USA'],
    ['538-469','KR16;6.50R6.70R7.00R7.50R7.60R15/16','TR13','Passenger','USA','3/4 in','PASSENGER_USA'],
    ['542-865','DR12/13/14;4.00R4.50R4.80R5.00R5.30R5.70R12','TR13','Passenger','Imported','1/2 in','PASSENGER_IMPORT'],
    ['551-937','ER12/13','TR13','Passenger','Imported','2/3 in','PASSENGER_IMPORT'],
    ['551-929','FR13/14;6R14','TR13','Passenger','Imported','4/5 in','PASSENGER_IMPORT'],
    ['551-791','FR15;5.50R5.90R6.00R6.40R15/16','TR13','Passenger','Imported','4/5 in','PASSENGER_IMPORT'],
    ['551-902','GR13/14/15;7R14','TR13','Passenger','Imported','1 in','PASSENGER_IMPORT'],
    ['551-899','KR14/15','TR13','Passenger','Imported','1 1/7 in','PASSENGER_IMPORT'],
    ['551-880','MR14/15;7R7.5LR7.50R8R8.5LR9.5LR14/15','TR13','Passenger','Imported','1 3/8 in','PASSENGER_IMPORT'],
    ['551-872','GR16;6.00R6.50R16LT','TR13','Passenger / LT','Imported','1 in','PASSENGER_IMPORT'],
    ['551-864','KR16','TR13','Passenger','Imported','1 in','PASSENGER_IMPORT'],
    ['552-542','MR16 HD','TR15CW','Passenger','Imported','1 3/8 in','PASSENGER_IMPORT'],
    ['551-023','7/8/9R14.5LT','TR15CW','Light Truck','USA','7/8 in','LT_USA'],
    ['534-099','7.00R7.50R16LT','TR15CW','Light Truck','USA','3/4 in','LT_USA'],
    ['533-432','10R12R16.5LT','TR15CW','Light Truck','USA','1 1/2 in','LT_USA'],
    ['547-751','7.00R7.50LR16LT','TR13','Light Truck','USA','3/4 in','LT_USA'],
    ['551-988','7/8/9R14.5LT','TR15CW','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['551-996','7.00R7.50R15LT','TR13','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-003','7.00R7.50R15LT','TR150','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-011','9R10R11R15LT','TR13','Light Truck','Imported','1 2/9 in','LT_IMPORT'],
    ['554-516','9.00R15/16LT','TR150','Light Truck','Imported','1 1/3 in','LT_IMPORT'],
    ['552-038','12R15/16LT','TR13','Light Truck','Imported','1 2/3 in','LT_IMPORT'],
    ['554-482','6.00R6.50R16LT','TR150','Light Truck','Imported','1 in','LT_IMPORT'],
    ['552-046','7.00R7.50R16LT','TR15CW','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-054','7.00R7.50R16LT','TR135','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-062','7.00R7.50R16LT','TR150','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-070','7.00R7.50LR16LT','TR440','Light Truck','Imported','Center','LT_IMPORT'],
    ['552-089','7.00R7.50LR16LT','TR13','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-100','8.00R8.75R16.5LT','TR15CW','Light Truck','Imported','1 1/6 in','LT_IMPORT'],
    ['552-119','9.50R16.5LT','TR15CW','Light Truck','Imported','1 3/8 in','LT_IMPORT'],
    ['552-399','10R12R16.5LT','TR15CW','Light Truck','Imported','1 2/3 in','LT_IMPORT'],
    ['552-534','14/35/36.5R15/16/16.5LT','TR13','Light Truck','Imported','2 1/3 in','LT_IMPORT'],
    ['542-911','16X6.50/7.50-8','TR13','Lawn & Garden','Firestone','3/5 in','LAWN'],
    ['542-938','18X8.50/9.50-8','TR13','Lawn & Garden','Firestone','1 1/6 in','LAWN'],
    ['551-287','4.50/5.00/5.20-10','TR13','Lawn & Garden','Firestone','2/5 in','LAWN'],
    ['551-228','6.50-10','TR15','Lawn & Garden','Firestone','3/5 in','LAWN'],
    ['551-252','20X8.00-10','JS2','Lawn & Garden','Firestone','1 in','LAWN'],
    ['542-954','24/26X12-12','TR13','Lawn & Garden','Firestone','1 7/9 in','LAWN'],
    ['551-244','6.00/7-16','TR218A','Lawn & Garden / Tractor','Firestone','3/5 in','LAWN'],
    ['551-236','7.50/8/9.5-16','TR218A','Lawn & Garden / Tractor','Firestone','1 in','LAWN'],
    ['551-309','8.3/8/9.5-18/20','TR218A','Lawn & Garden / Tractor','Firestone','1 7/9 in','LAWN'],
    ['542-881','13X5.00/6.50-6','TR13','Lawn & Garden','Firestone','2/5 in','LAWN'],
    ['542-903','15X6.00-6','TR13','Lawn & Garden','Firestone','3/5 in','LAWN'],
    ['543-128','6.00R12(6R12)','TR13','Lawn & Garden','Firestone','3/5 in','LAWN'],
    ['542-946','23X8.50R9.50R10.50R12;23.5X8.5R12','TR13','Lawn & Garden','Firestone','1 1/6 in','LAWN'],
    ['532-118','6.50R7.00R7.50R8R18','TR15CW','Lawn & Garden','Firestone','3/5 in','LAWN'],
    ['545-236','42/48X25.00R20','TR218A-NR','Flotation','Natural Rubber','3 3/4 in','FLOTATION'],
    ['540-862','48X31.00R20+','TR218A-NR','Flotation','Natural Rubber','Center','FLOTATION'],
    ['536-857','67X34.00R26/25 FLB','TR218A-NR','Flotation','Natural Rubber','Center','FLOTATION'],
    ['538-442','66X43.00R26/25 FLB','TR218A-NR','Flotation','Natural Rubber','Center','FLOTATION'],
    ['536-865','67X34.00R26/25 DCR','TR218A-NR','Flotation','Natural Rubber','8 in','FLOTATION'],
    ['532-711','66X43.00R26/25 DCR','TR218A-NR','Flotation','Natural Rubber','7 in','FLOTATION'],
    ['537-101','VA 73X44.00R32','TR218A-NR','Flotation','Natural Rubber','Center','FLOTATION'],
    ['533-726','DH 35.5LR32 DCR','TR218A-NR','Flotation','Natural Rubber','8 in','FLOTATION'],
    ['538-426','42/48X25.00R20','TR218A-NR','Flotation','Natural Rubber','Center','FLOTATION'],
    ['533-556','7.50R9.00R10','TR440','Industrial / Mining','Imported','Center','MINING'],
    ['540-633','23X8R9R10;7.50R9.00R10','TR15CW','Industrial / Mining','Imported','7/8 in','MINING'],
    ['519-405','6.90R6.00R9;6.50R10','TR87','Industrial / Mining','Imported','4/5 in','MINING'],
    ['552-267','6.90R6.00R9;6.50R10','TR440','Industrial / Mining','Imported','Center','MINING'],
    ['533-343','7.00R12','TR440','Industrial / Mining','Imported','Center','MINING'],
    ['549-819','8.25R15','TR440','Industrial / Mining','Imported','Center','MINING'],
    ['540-625','25X7.50R27X9.50R15;28X9R29X8R30X8R15','TR440','Industrial / Mining','Imported','Center','MINING'],
    ['552-291','29X10R32X12RX12.1R15','TR440','Industrial / Mining','Imported','1 3/8 in','MINING'],
    ['552-216','250/300R15','TR442','Industrial / Mining','Imported','Center','MINING'],
    ['556-607','7R8R17.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','1 3/8 in','SKID'],
    ['556-624','14R17.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','2 1/3 in','SKID'],
    ['556-641','8R9R19.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','1 in','SKID'],
    ['556-658','15R18R19.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','2 5/7 in','SKID'],
    ['556-675','15R18R19.5','TR218A','Skidsteer / Manlift / Duplex','Imported','2 5/7 in','SKID'],
    ['556-692','15R18R19.5','TR440','Skidsteer / Manlift / Duplex','Imported','2 5/7 in','SKID'],
    ['556-709','8R9R22.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','1 1/9 in','SKID'],
    ['556-726','10R11R12R22.5','TR300','Skidsteer / Manlift / Duplex','Imported','1 1/3 in','SKID'],
    ['556-743','15R16.5R18R22.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','3 1/7 in','SKID'],
    ['556-760','11R12R24.5','TR15CW','Skidsteer / Manlift / Duplex','Imported','4/5 in','SKID']
  ].map(r => ({article:r[0], size:r[1], valve:r[2], application:r[3], origin:r[4], valveOffset:r[5], source:SOURCES[r[6]], status:STATUS.VERIFIED_PRODUCT}));

  const CORE_VALVES = [
    {code:'JS2',lengthIn:'1.30 straight / 1.02 bent',maxPsi:60,handBendable:true,hydroflation:false,bore:'Standard',source:SOURCES.FIRESTONE_VALVES},
    {code:'TR13',lengthIn:1.375,maxPsi:60,handBendable:false,hydroflation:false,bore:'Standard',rimHoleIn:0.453,notes:'B6 bushing allows use in a 0.625 in rim hole. Not intended for liquid ballast.',source:{name:'Bridgestone TR13 valve page',url:'https://firestonetubes.com/valves/page/2/tr13'}},
    {code:'TR135',lengthIn:2.63,maxPsi:60,handBendable:true,hydroflation:false,bore:'Standard',source:SOURCES.FIRESTONE_VALVES},
    {code:'TR15',lengthIn:1.375,maxPsi:60,handBendable:false,hydroflation:false,bore:'Standard',source:SOURCES.FIRESTONE_VALVES},
    {code:'TR150',lengthIn:3.5,maxPsi:100,handBendable:true,hydroflation:false,bore:'Standard',source:SOURCES.FIRESTONE_VALVES},
    {code:'TR15CW',lengthIn:1.375,maxPsi:150,handBendable:false,hydroflation:true,bore:'Standard',rimHoleIn:0.625,notes:'Liquid-ballast capable; two identification rings near top of rubber stem.',source:{name:'Bridgestone TR15CW valve page',url:'https://firestonetubes.com/valves/page/6/tr15cw'}},
    {code:'TR218A',lengthIn:0.81,maxPsi:150,handBendable:false,hydroflation:true,bore:'Large',rimHoleIn:0.625,source:SOURCES.FIRESTONE_VALVES},
    {code:'TR220A',maxPsi:null,hydroflation:true,rimHoleIn:0.625,notes:'Tractor/grader air-liquid valve. Haltec TV-220R equivalent shown with 2 15/16 in vertical height.',source:SOURCES.HALTEC_CATALOG},
    {code:'TR916A',maxPsi:null,hydroflation:true,rimHoleIn:0.812,notes:'Tractor/grader tube valve family; Haltec TV-916R equivalent.',source:SOURCES.HALTEC_CATALOG},
    {code:'TR440',specStatus:'FITMENT_REFERENCE_ONLY',source:SOURCES.LT_IMPORT},
    {code:'TR442',specStatus:'FITMENT_REFERENCE_ONLY',source:SOURCES.MINING},
    {code:'TR87',specStatus:'FITMENT_REFERENCE_ONLY',source:SOURCES.MINING},
    {code:'TR300',specStatus:'FITMENT_REFERENCE_ONLY',source:SOURCES.SKID}
  ].map(v => ({...v,status:STATUS.VERIFIED_REFERENCE}));

  const SPECIALTY_TUBES = (SPECIALTY.tubes || []).map(t => ({
    article:t.articleNumber,
    size:t.fitmentLabel,
    valve:t.valve,
    application:t.category,
    origin:'Manufacturer catalog',
    valveOffset:null,
    weightLb:t.weightLb,
    packPallet:t.packPallet,
    compatibilityNote:t.compatibilityNote,
    source:specialtySource(t.sourceUrl),
    status:STATUS.VERIFIED_PRODUCT,
    dataset:'specialty-2026-08-25'
  }));

  const SPECIALTY_VALVES = (SPECIALTY.valves || []).map(v => ({
    code:v.partNumber,
    class:v.valveSystem,
    description:v.description,
    length:v.length,
    pressure:v.maximumPressure,
    handBendable:v.handBendable,
    hydroflation:String(v.hydroflation || '').toLowerCase() === 'yes',
    hydroflationText:v.hydroflation,
    boreOrHole:v.boreOrHole,
    source:specialtySource(v.sourceUrl),
    status:STATUS.VERIFIED_REFERENCE,
    dataset:'specialty-2026-08-25'
  }));

  const CATALOG_TIRES = (SPECIALTY.tires || []).map(t => ({
    ...t,
    source:specialtySource(t.sourceUrl),
    status:STATUS.VERIFIED_PRODUCT
  }));

  const TUBES = uniqueBy([...SPECIALTY_TUBES, ...CORE_TUBES], t => key(t.article));
  const VALVES = uniqueBy([...CORE_VALVES, ...SPECIALTY_VALVES], v => key([v.code,v.source?.url,v.description].join('|')));

  const tubeSearchText = t => key([t.article,t.size,t.valve,t.application,t.origin].join(' '));
  function searchTubes(query) {
    const q = key(query);
    if (!q) return [];
    return TUBES.filter(t => tubeSearchText(t).includes(q) || q.includes(key(t.article)) || q === key(t.valve));
  }
  const valveKey = value => key(value).replace(/^TV(?=\d)/,'TR');
  function searchValves(query) {
    const q = valveKey(query);
    if (!q) return [];
    const exact = VALVES.filter(v => valveKey(v.code) === q);
    if (exact.length || q.length < 4) return exact;
    return VALVES.filter(v => valveKey(v.code).includes(q));
  }
  function searchCatalogTires(query) {
    const q = key(normalizeTireSize(query));
    if (!q) return [];
    return CATALOG_TIRES.filter(t => key(normalizeTireSize(t.code)) === q);
  }

  function compatibilityForTire(input) {
    const parsed = parseTireSize(input);
    const q = key(normalizeTireSize(input));
    const tubeMatches = TUBES.filter(t => key(t.size).includes(q) || (q.length >= 5 && q.includes(key(t.size))));
    const catalogTireMatches = searchCatalogTires(input);
    return {
      input, parsed,
      generatedNomenclatureMatch: isInGeneratedSpace(parsed),
      catalogTireMatches,
      tubeMatches,
      status: tubeMatches.length || catalogTireMatches.length ? STATUS.VERIFIED_PRODUCT : (parsed && isInGeneratedSpace(parsed) ? STATUS.GENERATED_NOMENCLATURE : STATUS.UNKNOWN),
      warning: tubeMatches.length ? 'Tube records are manufacturer-listed product references. Verify wheel valve-hole, valve position, tube material and exact application before installation.' : catalogTireMatches.length ? 'This designation appears in a cited manufacturer catalog. That proves a catalog size record—not vehicle fitment, current stock, load, rim, pressure, or TPMS approval.' : 'No verified tube product or exact catalog size in the local dataset matches this input. Do not infer fitment from dimensions alone.'
    };
  }

  function search(query) {
    const valves = searchValves(query);
    const tubes = searchTubes(query);
    const catalogTires = searchCatalogTires(query);
    const tire = parseTireSize(query);
    const compat = tire ? compatibilityForTire(query) : null;
    return {query, valves, tubes, catalogTires, tire, compatibility: compat, status: valves.length || tubes.length || catalogTires.length ? STATUS.VERIFIED_PRODUCT : (tire && isInGeneratedSpace(tire) ? STATUS.GENERATED_NOMENCLATURE : STATUS.UNKNOWN)};
  }

  function audit() {
    const tubeApplications = uniq(TUBES.map(t=>t.application)).sort();
    return {
      version:'1.1.0',
      generatedFamilies:Object.fromEntries(Object.keys(FAMILY_DEFS).map(k=>[k,countGenerated(k)])),
      generatedTotal:Object.keys(FAMILY_DEFS).reduce((n,k)=>n+countGenerated(k),0),
      catalogTireSizes:CATALOG_TIRES.length,
      catalogTireCategories:SPECIALTY.meta?.tireCategories || {},
      verifiedTubeProducts:TUBES.length,
      verifiedValveReferences:VALVES.length,
      specialtyTubeProducts:SPECIALTY.meta?.counts?.tubes || 0,
      specialtyValveReferenceRows:SPECIALTY.meta?.counts?.valveReferenceRows || 0,
      uniqueSpecialtyValveParts:SPECIALTY.meta?.counts?.uniqueValveParts || 0,
      excludedSpecialtyRows:SPECIALTY.meta?.excludedRows || [],
      tubeApplications,
      sourceCount:Object.keys(SOURCES).length + (SPECIALTY.sources || []).filter(source => source.url).length,
      rules:[
        'Exact catalog size means the designation appears in a cited catalog; it is not vehicle fitment, load, pressure, rim or inventory approval.',
        'Generated nomenclature is never labeled as verified market fitment.',
        'Manufacturer tube products retain article number, valve, offset/application and source.',
        'Valve specifications are only shown when a source explicitly supports them.',
        'TRA/ETRTO publications are referenced as standards authorities; copyrighted licensed tables are not copied into this repository.',
        'Vehicle OE pressure/load/approved-rim decisions require placard and authoritative fitment data.'
      ]
    };
  }

  const API = {SOURCES, STATUS, FAMILY_DEFS, CATALOG_TIRES, TUBES, VALVES, normalizeTireSize, parseTireSize, isInGeneratedSpace, countGenerated, selectorOptions, buildMetricSize, searchCatalogTires, searchTubes, searchValves, compatibilityForTire, search, audit};
  root.TIRE_CATALOG = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : globalThis);
