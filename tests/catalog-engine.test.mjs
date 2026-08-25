import assert from 'node:assert/strict';
await import('../src/catalog-engine.js');
const C = globalThis.TIRE_CATALOG;
assert.ok(C, 'catalog engine should attach to globalThis');

const p = C.parseTireSize('245/75R16');
assert.equal(p.widthMm, 245);
assert.equal(p.aspectRatio, 75);
assert.equal(p.rimIn, 16);
assert.equal(p.normalized, '245/75R16');
assert.equal(C.isInGeneratedSpace(p), true);

const lt = C.parseTireSize('LT265/70R17');
assert.equal(lt.family, 'light_truck_metric');
assert.equal(C.isInGeneratedSpace(lt), true);

const compact = C.parseTireSize('2457516');
assert.equal(compact.normalized, '245/75R16');

const floatSize = C.parseTireSize('33X12.50R15');
assert.equal(floatSize.family, 'flotation');
assert.equal(floatSize.overallDiameterIn, 33);

const byArticle = C.searchTubes('552-070');
assert.equal(byArticle.length, 1);
assert.equal(byArticle[0].valve, 'TR440');
assert.equal(byArticle[0].status, 'VERIFIED_PRODUCT');

const byTubeSize = C.searchTubes('7.00R7.50R16LT');
assert.ok(byTubeSize.length >= 4, 'expected multiple manufacturer-listed tube variations');

const tr13 = C.searchValves('TR13');
assert.equal(tr13.length, 1);
assert.equal(tr13[0].rimHoleIn, 0.453);
assert.equal(tr13[0].maxPsi, 60);

const tr15cw = C.searchValves('TR15CW');
assert.equal(tr15cw[0].hydroflation, true);
assert.equal(tr15cw[0].rimHoleIn, 0.625);

const unknown = C.compatibilityForTire('245/75R16');
assert.equal(unknown.status, 'GENERATED_NOMENCLATURE');
assert.equal(unknown.tubeMatches.length, 0);

const audit = C.audit();
assert.ok(audit.generatedTotal > 100000, 'generated size-space should be broad');
assert.ok(audit.verifiedTubeProducts >= 70, 'verified tube records should be loaded');
assert.ok(audit.verifiedValveReferences >= 10, 'valve references should be loaded');

console.log('catalog-engine tests passed', audit);
