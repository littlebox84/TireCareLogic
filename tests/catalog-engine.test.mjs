import assert from 'node:assert/strict';
await import('../specialty-catalog.js');
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
assert.ok(tr13.length >= 1);
assert.ok(tr13.every(v => v.code.replace(/[^A-Z0-9]/gi, '').replace(/^TV/i, 'TR').toUpperCase() === 'TR13'), 'TR13 must not return TR135');
assert.ok(tr13.some(v => v.rimHoleIn === 0.453 && v.maxPsi === 60));

const tr15cw = C.searchValves('TR15CW');
assert.equal(tr15cw[0].hydroflation, true);
assert.equal(tr15cw[0].rimHoleIn, 0.625);

const unknown = C.compatibilityForTire('245/75R16');
assert.equal(unknown.status, 'GENERATED_NOMENCLATURE');
assert.equal(unknown.tubeMatches.length, 0);

const catalogLt = C.search('LT285/70R17');
assert.ok(catalogLt.catalogTires.some(t => t.code === 'LT285/70R17'));
assert.equal(catalogLt.status, 'VERIFIED_PRODUCT');

const commercial = C.searchCatalogTires('425/65R22.5');
assert.ok(commercial.some(t => t.category === 'Commercial Truck/Bus'));

const agricultural = C.searchCatalogTires('380/90R54');
assert.ok(agricultural.some(t => t.category === 'Agricultural'));

const motorcycle = C.searchCatalogTires('2.50-10');
assert.ok(motorcycle.some(t => t.category === 'Motorcycle'));

const specialtyTube = C.searchTubes('542-970');
assert.ok(specialtyTube.some(t => t.valve === 'TR6' && t.application === 'ATV'));

assert.equal(C.searchTubes('551-759').length, 0, 'placeholder TEST SIZE row must not ship');

const specialtyValve = C.searchValves('H-543C');
assert.ok(specialtyValve.some(v => v.description === '45-degree O-ring valve'));

const audit = C.audit();
assert.ok(audit.generatedTotal > 50000, 'generated size-space should be broad');
assert.equal(audit.catalogTireSizes, 791, 'all catalog-backed specialty tire rows should load');
assert.ok(audit.verifiedTubeProducts >= 261, 'verified tube records should be loaded');
assert.ok(audit.verifiedValveReferences >= 83, 'valve references should be loaded');
assert.equal(audit.uniqueSpecialtyValveParts, 81);
assert.equal(audit.excludedSpecialtyRows.length, 1);

console.log('catalog-engine tests passed', audit);
