(function(root){
'use strict';
const C=root.TIRE_CATALOG;if(!C)return;
const S=C.SOURCES||{};
Object.assign(S,{
 SCHRADER_APP_GUIDE:{name:'Schrader EZ-sensor Vehicle Application Guide',url:'https://www.schradertpms.com/sites/default/files/2021-11/2021%20App%20Guide%20Digital.pdf',scope:'Vehicle year/make/model, frequency, OEM sensor part number and EZ-sensor application reference'},
 DILL_MASTER:{name:'Dill Master Catalog / TPMS Sensor Tables',url:'https://www.dillvalves.com/wp-content/uploads/2022/05/Dill-2022-Catalog.pdf',scope:'REDI-Sensor and 5000-series TPMS sensor part numbers, frequencies, stems and service kits'},
 AUTEL_2025:{name:'Autel 2025 TPMS Catalog',url:'https://autel.us/wp-content/uploads/TPMS_Revamp-08062025.pdf',scope:'MX-Sensor, BLE sensor, bundles, stems and programming product families'},
 GOODYEAR_SPECS:{name:'Goodyear Product Tire Specifications',url:'https://www.goodyear.com/en_US/tires/',scope:'Model-specific tire size, load range/index, speed rating, measured rim, section width, revs/mile, max load, max inflation, outside diameter and approved rim-width data'},
 CONTINENTAL_TRUCK:{name:'Continental Truck Tire Product Data Guide',url:'https://www.continental-tires.com/us/en/products/truck/resources/downloads/',scope:'Commercial truck tire product data, applications and load/inflation tables'},
 USTMA_REPAIR:{name:'USTMA Passenger and Light Truck Puncture Repair Procedures',url:'https://www.ustires.org/sites/default/files/prp_wallchart1111_0.pdf',scope:'Passenger/light-truck puncture repair procedure and limits'},
 BRIDGESTONE_SIDEWALL:{name:'Bridgestone Tire Sidewall / Replacement Reference Information',url:'https://www.bridgestonetire.com/learn/maintenance/tire-size/',scope:'Tire size, load, speed and sidewall interpretation reference'}
});
const extra=[
 {maker:'Dill',part:'7005HPR',name:'REDI-Sensor',frequency:'433 MHz',stem:'VS-20; replacement VS-20 rubber or VS-240MC metal',programming:'Pre-programmed REDI-Sensor family; verify application/tool update',source:S.DILL_MASTER},
 {maker:'Dill',part:'7006HPR',name:'REDI-Sensor',frequency:'315 MHz',stem:'VS-20; replacement VS-20 rubber or VS-240MC metal',programming:'Pre-programmed REDI-Sensor family; verify application/tool update',source:S.DILL_MASTER},
 {maker:'Dill',part:'7007HP',name:'REDI-Sensor',frequency:'315 MHz',stem:'VS-70 metal',service:['7020K'],programming:'Pre-programmed application family; verify vehicle coverage',source:S.DILL_MASTER},
 {maker:'Dill',part:'7008HP',name:'REDI-Sensor',frequency:'433 MHz',stem:'VS-70 metal',service:['7020K'],programming:'Pre-programmed application family; verify vehicle coverage',source:S.DILL_MASTER},
 {maker:'Autel',part:'300100',name:'MX-Sensor BLE',frequency:'Bluetooth Low Energy',stem:'Tesla-ready BLE sensor family',programming:'Pre-programmed fit-and-go for supported Tesla 3/Y/S/X applications; verify model/year',source:S.AUTEL_2025},
 {maker:'Autel',part:'300040',name:'1-Sensor 8-Pack',frequency:'Dual-frequency universal family',stem:'Metal or rubber variants',programming:'Programmable MX-Sensor bundle',source:S.AUTEL_2025},
 {maker:'Autel',part:'300060',name:'1-Sensor 20-Pack Metal',frequency:'Dual-frequency universal family',stem:'Metal',programming:'Programmable MX-Sensor bundle',source:S.AUTEL_2025},
 {maker:'Autel',part:'300010',name:'1-Sensor 20-Pack Rubber',frequency:'Dual-frequency universal family',stem:'Rubber',programming:'Programmable MX-Sensor bundle',source:S.AUTEL_2025},
 {maker:'Autel',part:'300050',name:'1-Sensor 240-Pack',frequency:'Dual-frequency universal family',stem:'Bulk sensor family',programming:'Programmable MX-Sensor bundle',source:S.AUTEL_2025}
];
const existing=new Set((C.TPMS_PRODUCTS||[]).map(x=>`${x.maker}|${x.part}`));for(const p of extra){const k=`${p.maker}|${p.part}`;if(!existing.has(k)){C.TPMS_PRODUCTS.push(p);existing.add(k);}}
const aliasMap={TR150:['TR150A','150A'],TR440:['TR440A','TR75A','75A'],TR442:['TR77A','77A'],TR87:['87'],TR218A:['218A'],TR13:['13'],TR15:['15'],TR300:['300'],JS2:['JS-2']};
for(const v of C.VALVES||[]){if(aliasMap[v.code])v.aliases=[...new Set([...(v.aliases||[]),...aliasMap[v.code]])];}
C.TECHNICAL_REFERENCES=[S.SCHRADER_APP_GUIDE,S.DILL_MASTER,S.AUTEL_2025,S.GOODYEAR_SPECS,S.CONTINENTAL_TRUCK,S.USTMA_REPAIR,S.BRIDGESTONE_SIDEWALL];
root.TIRE_CATALOG=C;
})(typeof window!=='undefined'?window:globalThis);
