import assert from 'node:assert/strict';
import '../src/catalog-engine.js';
import '../src/research-catalog.js';
import '../src/catalog-runtime.js';
const C = globalThis.TIRE_CATALOG;
assert.ok(C && C.RUNTIME_SAFE, 'safe catalog runtime must load');
const cases = [
  ['type M, 255/65, 15', r => r.tire?.normalized === '255/65R15' && r.tubes.some(x=>x.stock==='TU02377') && r.tubes.some(x=>x.stock==='TU02246')],
  ['255/65R15', r => r.tire?.normalized === '255/65R15' && r.tubes.length >= 2],
  ['P255/65R15', r => r.tire?.normalized === 'P255/65R15' && r.tubes.length >= 2],
  ['16.9R38', r => !!r.tire && r.tubes.length > 0],
  ['420/85R38', r => r.tire?.family === 'ag_metric' && r.tubes.length > 0],
  ['31x10.50R15', r => !!r.tire && r.tubes.some(x=>x.stock==='TU02706' || x.stock==='TU0271')],
  ['11R22.5', r => !!r.tire && r.tubes.some(x=>x.stock==='TU0630' || x.stock==='TU0629')],
  ['20x7-8', r => !!r.tire && r.tubes.some(x=>x.stock==='TU0076')],
  ['TR413', r => r.valves.some(x=>x.code==='TR413')],
  ['600HP', r => r.valves.some(x=>x.code==='TR600HP')],
  ['TR501', r => r.valves.some(x=>x.code==='TR501')],
  ['TR618A', r => r.valves.some(x=>x.code==='TR618A')],
  ['33500', r => r.tpms.some(x=>x.part==='33500')],
  ['5001', r => r.tpms.some(x=>x.part==='5001')],
  ['HTS-A78DH', r => r.tpms.some(x=>x.part==='HTS-A78DH')],
  ['300020', r => r.tpms.some(x=>x.part==='300020')],
  ['255/65R18', r => !!r.tire && r.brownies.length > 0],
  ['definitely-not-a-tire-xyz', r => !r.tire && !r.tubes.length && !r.valves.length && !r.tpms.length]
];
let pass=0;
for (const [query, check] of cases) {
  const result=C.search(query); const ok=!!check(result);
  console.log(`${ok?'PASS':'FAIL'} ${query}`);
  if (!ok) console.log(JSON.stringify(result,null,2));
  assert.ok(ok, `regression failed: ${query}`); pass++;
}
const messy=C.search('type M, 255/65, 15');
assert.match(messy.compatibility.pressureGuidance,/placard/i,'passenger PSI guidance must be placard-first');
assert.equal(C.search('TR413').valves.find(x=>x.code==='TR413').maxPsi,65);
assert.equal(C.search('600HP').valves.find(x=>x.code==='TR600HP').maxPsi,80);
assert.equal(C.search('TR501').valves.find(x=>x.code==='TR501').maxPsi,null,'TR501 must not invent universal PSI');
const audit=C.audit();
assert.ok(audit.airlocFitmentRecords>80,'Air-Loc research catalog should be broad');
assert.ok(audit.airlocFitAliases>200,'Air-Loc aliases should provide broad searchable coverage');
assert.ok(audit.tpmsProducts>=15,'TPMS product data should be loaded');
console.log(`\n${pass}/${cases.length} catalog regression cases passed.`);
console.log(JSON.stringify(audit,null,2));
