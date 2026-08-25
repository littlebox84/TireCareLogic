import db from './data/tubes.json' with { type: 'json' };

const input = document.querySelector('#query');
const result = document.querySelector('#result');
const button = document.querySelector('#searchBtn');

function compact(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/LIGHT\s*TRUCK/g, 'LT')
    .replace(/[^A-Z0-9]/g, '');
}

function tokens(value) {
  return compact(value)
    .replace(/R/g, '')
    .replace(/LT/g, '');
}

function findFamily(q) {
  const key = compact(q);
  const stripped = tokens(q);

  return db.fitmentFamilies.find(family => {
    const candidates = [family.canonical, ...family.aliases];
    return candidates.some(candidate => {
      const ck = compact(candidate);
      const cs = tokens(candidate);
      return key === ck || stripped === cs;
    });
  });
}

function findValve(q) {
  const key = compact(q);
  return db.valves.find(v => compact(v.code) === key);
}

function renderFamily(family) {
  result.innerHTML = `
    <article class="card">
      <div class="status">VERIFIED MANUFACTURER FITMENT</div>
      <div class="title">${family.canonical}</div>
      <div class="muted">${family.application}</div>

      <div class="warning">${family.warning}</div>

      <div class="grid">
        ${family.fitments.map(f => `
          <div class="fitment">
            <h3>${f.valve}</h3>
            <div class="kv"><strong>Article:</strong> ${f.article}</div>
            <div class="kv"><strong>Valve offset:</strong> ${f.offset}</div>
            <div class="kv"><strong>Source:</strong> ${f.origin}</div>
          </div>
        `).join('')}
      </div>

      <div class="source">
        ${family.sources.map(s => `${s.publisher}: ${s.url}`).join('<br>')}
      </div>
    </article>
  `;
}

function renderValve(valve) {
  const pressure = valve.maxPressurePsi ? `${valve.maxPressurePsi} PSI` : 'Not yet loaded';
  const hydro = valve.hydroflation === true ? 'Yes' : valve.hydroflation === false ? 'No' : 'Not yet loaded';
  result.innerHTML = `
    <article class="card">
      <div class="status">VALVE KNOWLEDGE</div>
      <div class="title">${valve.code}</div>
      <div class="grid">
        <div class="fitment"><h3>Max pressure</h3><div class="kv">${pressure}</div></div>
        <div class="fitment"><h3>Hydroflation</h3><div class="kv">${hydro}</div></div>
        <div class="fitment"><h3>Bore</h3><div class="kv">${valve.bore}</div></div>
      </div>
      <div class="warning">${valve.notes}</div>
    </article>
  `;
}

function search() {
  const q = input.value.trim();
  if (!q) return;

  const valve = findValve(q);
  if (valve) return renderValve(valve);

  const family = findFamily(q);
  if (family) return renderFamily(family);

  result.innerHTML = `
    <article class="card">
      <div class="status">UNKNOWN</div>
      <div class="title">No verified match yet</div>
      <p class="muted">TubeLogic will not invent a fitment. Add this query to the research queue or shop-review queue.</p>
      <div class="warning">Search received: <strong>${q.replace(/[<>]/g, '')}</strong></div>
    </article>
  `;
}

button.addEventListener('click', search);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') search();
});
document.querySelectorAll('[data-q]').forEach(btn => {
  btn.addEventListener('click', () => {
    input.value = btn.dataset.q;
    search();
  });
});

input.value = '70075016';
search();
