window.TIRECARE_DB = {
  meta:{name:'TireCare Logic',version:'0.3-static',airlock:true},
  fitmentFamilies:[
    {canonical:'7.00R/7.50R16LT',aliases:['70075016','7.00R7.50R16LT','7.00 7.50 16','7.00-16','7.50-16','70016','75016'],application:'Light Truck',construction:'Radial',warning:'Multiple verified valve configurations exist. Verify wheel, valve style and offset before final selection.',fitments:[['534-099','TR15CW','3/4 in','USA'],['547-751','TR13','3/4 in','USA'],['552-046','TR15CW','1 1/6 in','Imported'],['552-054','TR135','1 1/6 in','Imported'],['552-062','TR150','1 1/6 in','Imported'],['552-070','TR440','Center','Imported'],['552-089','TR13','1 1/6 in','Imported']]},
    {canonical:'7.00R/7.50R15TR',aliases:['70075015TR','7.00R7.50R15TR','70075015'],application:'Low Platform Trailer',construction:'Radial',warning:'Center-valve trailer fitment.',fitments:[['538-655','TR440','Center','USA'],['556-556','TR440','Center','Imported']]},
    {canonical:'9.00R20',aliases:['90020','9.00R20','9.00-20'],application:'Low Platform Trailer',construction:'Radial',warning:'Verified center TR443 configuration.',fitments:[['540-196','TR443','Center','USA'],['553-054','TR443','Center','Imported']]},
    {canonical:'10.00R/12.80R20',aliases:['1000128020','10.00R12.80R20','1000R20','1280R20'],application:'Low Platform Trailer',construction:'Radial',warning:'Shared verified family using center TR444.',fitments:[['540-234','TR444','Center','USA'],['553-071','TR444','Center','Imported']]},
    {canonical:'13.6R/13.9R/14.9R36/38',aliases:['1361391493638','13.6R13.9R14.9R36/38'],application:'Rear Farm',construction:'Radial',warning:'Valve offset is part of the fitment.',fitments:[['552-593','TR218A','3 in','USA']]},
    {canonical:'16.9R/18.4R38',aliases:['16918438','16.9R18.4R38'],application:'Rear Farm',construction:'Radial',warning:'Shared rear-farm family; verify offset.',fitments:[['518-417','TR218A','3 1/2 in','USA']]},
    {canonical:'13.6R/13.9R/14.9R/15.5R38',aliases:['13613914915538','13.6R13.9R14.9R15.5R38'],application:'Rear Farm',construction:'Radial',warning:'Shared rear-farm family; valve offset is required.',fitments:[['549-452','TR218A','2 1/2 in','USA']]}
  ],
  valves:[
    {code:'TR413',class:'Standard snap-in',hole:'.453 in',pressure:'Typically 65 PSI class — verify stocked manufacturer',use:'Passenger/light-duty',replace:'Replace for cracking, damage, leakage or shop service policy.'},
    {code:'TR600HP',aliases:['600HP'],class:'High-pressure snap-in',hole:'.453 in',pressure:'High-pressure class — exact rating MUST match stocked manufacturer',use:'Higher-pressure LT/trailer applications where approved',replace:'Replace for rubber aging, damage, base leak, or service requirement.'},
    {code:'TR501',class:'Metal clamp-in',hole:'.625 in',pressure:'Commercial high-pressure class — verify exact part rating',use:'Truck/bus/commercial wheel applications',replace:'Service sealing parts or replace assembly when damaged/corroded.'},
    {code:'TR6',pressure:'Not loaded',use:'ATV/UTV, lawn & garden'},
    {code:'TR13',pressure:'60 PSI',use:'Lawn & garden, passenger, light truck',note:'B6 bushing may be required when correctly used in a .625 in TR15 hole.'},
    {code:'TR15',pressure:'60 PSI',use:'Front tractor, implement, industrial'},
    {code:'TR15CW',pressure:'150 PSI',use:'Light truck / farm-industrial depending on tube',hydro:true},
    {code:'TR135',pressure:'60 PSI',use:'Light truck'},
    {code:'TR150',pressure:'100 PSI',use:'Light truck, trailer, front tractor, implement'},
    {code:'TR218A',pressure:'150 PSI',use:'Tractor, implement, construction',hydro:true,note:'Large-bore air/water valve; common liquid-ballast application.'},
    {code:'TR300',pressure:'Verify',use:'Truck, bus, trailer, irrigation'},
    {code:'TR440',aliases:['TR75A'],pressure:'150 PSI',use:'Industrial/forklift/mining/commercial truck',note:'Bent valve family intended for slotted rims.'},
    {code:'TR441',aliases:['TR177A'],pressure:'150 PSI',use:'Industrial/forklift/mining/commercial truck'},
    {code:'TR442',aliases:['TR77A'],pressure:'150 PSI',use:'Industrial/forklift/mining/commercial truck'},
    {code:'TR443',aliases:['TR175A'],pressure:'150 PSI',use:'Industrial/forklift/mining/commercial truck'},
    {code:'TR444',aliases:['TR78A'],pressure:'150 PSI',use:'Industrial/forklift/mining/commercial truck'},
    {code:'TR445',aliases:['TR179A'],pressure:'150 PSI',use:'Industrial/forklift/mining/commercial truck'},
    {code:'JS2',pressure:'Verify',use:'Forklift/small industrial/material handling'},
    {code:'TR87',pressure:'Verify',use:'Small specialty applications'}
  ],
  tireKnowledge:{
    sidewall:'205/55R17 91V = 205 mm width, 55 aspect ratio, radial, 17 inch rim, load index 91, speed rating V.',
    commercial:'315/70R22.5 154/150L = commercial size with single/dual load indexes and speed symbol.',
    ag:'VF 650/60R38 155D = VF category, 650 mm width, 60 aspect, radial, 38 inch rim, load index 155, speed index D.',
    rules:['Maximum sidewall pressure is NOT the vehicle recommended operating pressure.','Same dimensional size does not guarantee equivalent load capacity.','Higher load index does not increase the vehicle engineered load capacity.','DOT/TIN last four date digits use WWYY format.']
  },
  pressure:{
    placardRule:'Passenger/light-duty vehicle pressure starts with the vehicle tire-information placard, normally on the driver door/door jamb/B-pillar. Use COLD PSI.',
    hardStop:'Do not calculate safe operating PSI from tire size alone. Commercial/ag/industrial applications may require exact tire model, load, axle position, speed and manufacturer load/inflation tables.',
    compare:['Read placard tire size','Read front/rear cold PSI','Compare installed tire size','If non-OE size or configuration differs, verify manufacturer/load data before changing target PSI']
  },
  tpms:{
    rules:['Never assign relearn method by brand alone.','Determine direct vs indirect TPMS first.','Programming/cloning a universal sensor and relearning the vehicle are separate operations.'],
    examples:[
      {vehicle:'2016 Chevrolet Cruze Limited',type:'Direct',method:'Manual tool learn',sequence:'LF → RF → RR → LR',drive:'No',confirm:'Horn chirps'},
      {vehicle:'Ford documented applications',type:'Direct',method:'Reset then drive OR explicit training depending on year/model',drive:'Varies',confirm:'Vehicle-specific'},
      {vehicle:'2020 Honda Civic Type R',type:'Indirect',method:'Calibration then drive',drive:'~30 cumulative min at 30–65 mph',confirm:'Calibration completes after driving'},
      {vehicle:'2025 Ram 1500',type:'Direct',method:'Automatic drive update',drive:'May need up to 20 min above 15 mph',confirm:'Vehicle display update'}
    ],
    diagnosis:['Leak through valve opening → inspect/replace core as appropriate','Leak at stem-to-wheel seal → service stem/grommet/base','Replaceable TPMS service stem → keep good sensor when design permits','Proprietary/integrated sensor-stem → use correct matched assembly','TPMS warning with no air leak → diagnose sensor/system before replacing stem']
  },
  patchNotes:{
    motto:'Bubbles are your friend.',
    puncture:['ALWAYS DUNK FIRST. Inflate safely as needed.','Rotate assembled tire/wheel slowly in water and watch for bubbles.','Mark the leak immediately.','Remove tire from wheel.','Inspect inner liner, injury angle, secondary damage, bead and evidence of run-flat/low-pressure damage.','Finding the leak does NOT mean the tire is repairable.','Use the shop-approved repair system and manufacturer limits.','Clean all buffing debris and contamination. No dirt.','Use proper tire lubricant during mounting.','Reassemble, inflate to correct target, dunk/recheck repair, bead and valve before release.'],
    tube:['Inflate tube only enough to take shape.','Dunk/listen/use approved leak detection and mark the leak.','Inspect the whole tube, valve base, seams, chafing, folds and previous repairs.','Find and remove the cause inside tire/rim BEFORE reinstalling.','Clean/lightly buff only as required by patch system.','Apply correct tube cement and patch; roll from center outward.','Recheck tube for leaks before installation.'],
    stop:['Sidewall/shoulder or structural damage outside approved repair limits','Severe run-flat damage','Cracked/bent/unsafe wheel','Damaged bead that cannot safely seal','Unknown damage — escalate instead of guessing']
  },
  training:{
    philosophy:'Explain it so a 15-year-old on their first job can perform the task and know they did it correctly.',
    levels:['Shop Basics','Tire Service','TPMS','Tubes','Advanced Commercial / Ag / Industrial'],
    modes:{quick:'Short checklist for experienced techs.',learn:'Step-by-step instructions with plain language.',why:'Explains why each step matters.'},
    rules:['Never give a step without a verification step.','Use real shop scenarios instead of trivia.','Common mistakes should be shown beside procedures.','Veteran corrections enter a Shop Verified review queue.']
  },
  airlock:[
    'Use only recommended tube/type/flap for the application.','Radial tires require radial tubes and radial flaps where a tube/flap is used.','New tire → new tube and flap when applicable.','Reject damaged, creased or buckled tube/flap.','Multiple valve/offset configurations → require wheel/valve check, do not choose arbitrarily.','TR440–TR445 family: slotted-rim requirement must be checked.','Unknown or unverified critical information → UNKNOWN — DO NOT GUESS.'
  ],
  inventory:{status:'Tomorrow: photograph valve bins, TPMS parts, tubes and labels; reconcile physical stock with system inventory.',fields:['Part #','Description','Size/Valve','System Qty','Visual Qty','Difference','Bin/Location','Status','Shop Notes']}
};