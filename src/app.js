import db from './data/tubes.json' with { type: 'json' };

const input = document.querySelector('#query');
const result = document.querySelector('#result');
const searchBtn = document.querySelector('#searchBtn');

function compact(value) {
  return String(value || '').toUpperCase().replace(/LIGHT\s*TRUCK/g, 'LT').replace(/[^A-Z0-9]/g, '');
}

function tokens(value) {
  return compact(value).replace(/R/g, '').replace(/LT/g, '');
}

function findFamily(q) {
  const key = compact(q);
  const stripped = tokens(q);
  return db.fitmentFamilies.find(family => [family.canonical, ...family.aliases].some(candidate => compact(candidate) === key || tokens(candidate) === stripped));
}

function findValve(q) {
  const key = compact(q);
  return db.valves.find(v => compact(v.code) === key || (v.aliases || []).some(a => compact(a) === key));
}

function shell(title, eyebrow, body) {
  result.innerHTML = `<article class="panel"><div class="panel-eyebrow">${eyebrow}</div><h2>${title}</h2>${body}</article>`;
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderFamily(family) {
  shell(family.canonical, 'VERIFIED FITMENT', `
    <p class="muted">${family.application}</p>
    <div class="alert">${family.warning || 'Verify wheel, valve position, and application before service.'}</div>
    <div class="detail-grid">${family.fitments.map(f => `<div class="detail-card"><div class="big">${f.valve}</div><div>Article ${f.article}</div><div>Offset: ${f.offset}</div><div>${f.origin}</div></div>`).join('')}</div>
    <div class="source-line">${(family.sources || []).map(s => s.publisher).join(' • ')}</div>
  `);
}

function renderValve(valve) {
  const pressure = valve.maxPressurePsi ? `${valve.maxPressurePsi} PSI` : 'Verify stocked part';
  shell(valve.code, 'VALVELOGIC', `
    <div class="detail-grid">
      <div class="detail-card"><span>Max pressure</span><div class="big">${pressure}</div></div>
      <div class="detail-card"><span>Bore</span><div class="big">${valve.bore || '—'}</div></div>
      <div class="detail-card"><span>Hydroflation</span><div class="big">${valve.hydroflation === true ? 'YES' : valve.hydroflation === false ? 'NO' : 'CHECK'}</div></div>
    </div>
    <div class="alert">${valve.notes || 'Confirm application, rim interface, pressure and service requirements.'}</div>
  `);
}

function search() {
  const q = input.value.trim();
  if (!q) return;
  const valve = findValve(q);
  if (valve) return renderValve(valve);
  const family = findFamily(q);
  if (family) return renderFamily(family);
  shell('No verified match yet', 'UNKNOWN — AIRLOCK STOP', `<p class="muted">TireCare Logic will not invent an answer for <strong>${q.replace(/[<>]/g, '')}</strong>.</p><div class="alert danger">Verify the exact tire, wheel, valve, vehicle or application before continuing.</div>`);
}

const modules = {
  fitment: () => shell('Tire / Tube Logic', 'FITMENT', `<p>Search a tire size or valve above. The system checks verified tube families, valve choices, offsets and application warnings.</p><div class="tip">Try <b>70075016</b> or <b>TR218A</b>.</div>`),
  pressure: () => shell('PressureLogic', 'PLACARD FIRST', `<div class="lesson"><b>1.</b> Open the driver door.<br><b>2.</b> Find the tire-information placard.<br><b>3.</b> Use the listed COLD front/rear PSI.<br><b>4.</b> Do not use sidewall MAX PSI as the vehicle target.</div><div class="alert">If tire size differs from the placard, stop and verify the correct load/inflation data.</div>`),
  valves: () => shell('ValveLogic', 'STEM • SENSOR • RELEARN', `<div class="detail-grid"><div class="detail-card"><div class="big">413</div><div>Standard snap-in class</div></div><div class="detail-card"><div class="big">600HP</div><div>High-pressure snap-in class</div></div><div class="detail-card"><div class="big">501</div><div>Commercial clamp-in class</div></div><div class="detail-card"><div class="big">TPMS</div><div>Identify sensor/stem system first</div></div></div><div class="alert">Leak at core? Service the core. Leak at stem/seal? Diagnose stem or service kit. Dead sensor? Programming/relearn may be required.</div>`),
  patch: () => shell('Patch Notes', 'BUBBLES ARE YOUR FRIEND', `<div class="lesson"><b>1. Always dunk first.</b><br>Rotate the assembled tire/wheel slowly in water and watch for bubbles.<br><br><b>2. Mark the leak.</b><br>Do it before taking anything apart.<br><br><b>3. Remove the tire.</b><br>Inspect the inside before deciding the injury is repairable.<br><br><b>4. Keep it clean.</b><br>No dirt, rust flakes or loose debris inside the tire.<br><br><b>5. Repair, reassemble and verify.</b><br>Leak-check again before release.</div><div class="alert danger">Finding a leak does NOT automatically mean the tire is repairable.</div>`),
  training: () => shell('TrainingLogic', 'NEW-HIRE MODE', `<div class="mode-row"><button>QUICK</button><button class="active">LEARN</button><button>WHY?</button></div><p class="muted">Built so someone with zero tire-shop experience can follow one job at a time.</p><div class="lesson"><b>Rule:</b> Every instruction should tell you what to do, what to look for, and how to know you did it correctly.</div>`),
  inventory: () => shell('InventoryLogic', 'COMING NEXT', `<p class="muted">Tomorrow: photograph valve bins, tube boxes and shelf stock. We’ll reconcile shop part numbers, quantities and locations against the system.</p><div class="detail-grid"><div class="detail-card"><span>Part</span><div class="big">600HP</div></div><div class="detail-card"><span>Location</span><div class="big">BIN ?</div></div><div class="detail-card"><span>Qty</span><div class="big">—</div></div></div>`)
};

searchBtn.addEventListener('click', search);
input.addEventListener('keydown', e => e.key === 'Enter' && search());
document.querySelectorAll('[data-q]').forEach(btn => btn.addEventListener('click', () => { input.value = btn.dataset.q; search(); }));
document.querySelectorAll('[data-module]').forEach(btn => btn.addEventListener('click', () => modules[btn.dataset.module]?.()));

modules.training();
