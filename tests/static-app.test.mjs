import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(repo, 'index.html'), 'utf8');

test('index is a self-contained static entry point', () => {
  assert.match(html, /<title>TireCare Logic<\/title>/);
  assert.ok(!fs.existsSync(path.join(repo, 'vite.config.js')));
  assert.ok(!fs.existsSync(path.join(repo, 'package.json')));
});

test('all local index assets exist', () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(match => match[1])
    .filter(ref => !/^(?:https?:|#)/.test(ref));
  for (const ref of refs) {
    assert.ok(fs.existsSync(path.join(repo, ref)), `missing static asset: ${ref}`);
  }
});

test('catalog bundle loads before the catalog engine', () => {
  const dataIndex = html.indexOf('specialty-catalog.js');
  const engineIndex = html.indexOf('src/catalog-engine.js');
  assert.ok(dataIndex > -1 && engineIndex > dataIndex);
});

test('placeholder workbook rows are excluded from the bundled catalog', async () => {
  await import('../specialty-catalog.js');
  const catalog = globalThis.TIRECARE_SPECIALTY_CATALOG;
  assert.equal(catalog.meta.counts.tires, 791);
  assert.equal(catalog.meta.counts.tubes, 261);
  assert.equal(catalog.meta.counts.valveReferenceRows, 83);
  assert.equal(catalog.meta.excludedRows.length, 1);
  assert.ok(!catalog.tubes.some(row => /TEST SIZE/i.test(row.fitmentLabel)));
});
