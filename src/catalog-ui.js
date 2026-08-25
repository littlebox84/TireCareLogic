(function () {
  'use strict';
  const C = window.TIRE_CATALOG;
  if (!C) return;

  const $ = s => document.querySelector(s);
  const safe = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const result = $('#result');
  const input = $('#query');

  function sourceLink(s) {
    if (!s) return '';
    return `<a href="${safe(s.url)}" target="_blank" rel="noreferrer">${safe(s.name)}</a>`;
  }

  function sources(items) {
    const unique = [];
    const seen = new Set();
    (items || []).filter(Boolean).forEach(s => { if (!seen.has(s.url)) { seen.add(s.url); unique.push(s); } });
    if (!unique.length) return '';
    return `<div class="source-list"><b>References</b>${unique.map(s => `<span>${sourceLink(s)}</span>`).join('')}</div>`;
  }

  function panel(title, body, badge='CATALOG ENGINE') {
    result.innerHTML = `<article class="panel"><div class="panel-badge">${safe(badge)}</div><h2>${safe(title)}</h2>${body}</article>`;
    result.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderCatalogSearch(q) {
    const r = C.search(q);
    if (!r.tire && !r.tubes.length && !r.valves.length) return false;
    const ref = [];
    r.tubes.forEach(t=>ref.push(t.source));
    r.valves.forEach(v=>ref.push(v.source));

    let body = '';
    if (r.tire) {
      const t = r.tire;
      body += `<h3>Tire designation</h3><div class="detail-grid">
        <div><b>Normalized</b><span>${safe(t.normalized)}</span></div>
        <div><b>Family</b><span>${safe(t.family)}</span></div>
        <div><b>Rim</b><span>${safe(t.rimIn)} in</span></div>
        ${t.widthMm ? `<div><b>Width</b><span>${safe(t.widthMm)} mm</span></div>` : ''}
        ${t.aspectRatio ? `<div><b>Aspect</b><span>${safe(t.aspectRatio)}</span></div>` : ''}
        ${t.overallDiameterIn ? `<div><b>Calculated OD</b><span>${safe(t.overallDiameterIn)} in</span></div>` : ''}
      </div>`;
      const c = r.compatibility;
      body += `<p class="${c.status === C.STATUS.VERIFIED_PRODUCT ? 'ok':'warning'}"><b>${safe(c.status)}</b><br>${safe(c.warning)}</p>`;
      if (c.generatedNomenclatureMatch) body += `<p class="warning"><b>Generated nomenclature match:</b> the syntax/parameter space recognizes this designation, but that does not prove the size is manufactured or approved for a vehicle.</p>`;
    }

    if (r.tubes.length) {
      body += `<h3>Manufacturer-listed tube records</h3><div class="fit-grid">${r.tubes.slice(0,50).map(t=>`<div class="fit"><strong>${safe(t.size)}</strong><span>Article ${safe(t.article)}</span><span>Valve ${safe(t.valve)}</span><span>${safe(t.application)} • ${safe(t.origin)}</span><span>Valve position: ${safe(t.valveOffset)}</span></div>`).join('')}</div>`;
    }

    if (r.valves.length) {
      body += `<h3>Valve references</h3><div class="fit-grid">${r.valves.map(v=>`<div class="fit"><strong>${safe(v.code)}</strong><span>${v.maxPsi ? `Max ${safe(v.maxPsi)} PSI` : safe(v.specStatus || 'Reference')}</span><span>${v.rimHoleIn ? `Rim hole ${safe(v.rimHoleIn)} in` : 'Rim hole: verify source/application'}</span><span>${v.hydroflation ? 'Air/liquid capable' : 'Air service / verify application'}</span>${v.notes ? `<span>${safe(v.notes)}</span>`:''}</div>`).join('')}</div>`;
    }

    body += sources(ref);
    panel(`Catalog result: ${q}`, body, r.status);
    return true;
  }

  function option(values, selected='') { return values.map(v=>`<option value="${safe(v)}" ${String(v)===String(selected)?'selected':''}>${safe(v === '' ? '(none)' : v)}</option>`).join(''); }

  function renderBuilder() {
    const audit = C.audit();
    const families = Object.keys(C.FAMILY_DEFS);
    panel('Full tire / tube / valve catalog', `<p class="lead">Search verified manufacturer tube records and valve references, or construct any designation in the generated nomenclature space. Generated does <b>not</b> mean manufactured or fitment-approved.</p>
      <div class="stat-grid"><div><b>${audit.generatedTotal.toLocaleString()}</b><span>generated metric designation combinations</span></div><div><b>${audit.verifiedTubeProducts}</b><span>source-backed tube products</span></div><div><b>${audit.verifiedValveReferences}</b><span>valve references</span></div></div>
      <h3>Size builder</h3>
      <div class="calculator-grid">
        <label>Family<select id="catFamily">${families.map(k=>`<option value="${k}">${safe(C.FAMILY_DEFS[k].label)}</option>`).join('')}</select></label>
        <label>Prefix<select id="catPrefix"></select></label>
        <label>Width<select id="catWidth"></select></label>
        <label>Aspect ratio<select id="catAspect"></select></label>
        <label>Construction<select id="catConstruction"></select></label>
        <label>Rim<select id="catRim"></select></label>
        <button id="catBuild">BUILD + SEARCH</button>
      </div>
      <div id="catBuilt"></div>
      <h3>Coverage policy</h3><ol class="steps">${audit.rules.map(x=>`<li>${safe(x)}</li>`).join('')}</ol>
      ${sources([C.SOURCES.ETRTO_2026,C.SOURCES.TRA_2026,C.SOURCES.FIRESTONE_HOME,C.SOURCES.FIRESTONE_VALVES])}`,'FULL CATALOG');

    const fill = () => {
      const d = C.selectorOptions($('#catFamily').value);
      $('#catPrefix').innerHTML = option(d.prefixes);
      $('#catWidth').innerHTML = option(d.widths);
      $('#catAspect').innerHTML = option(d.aspects);
      $('#catConstruction').innerHTML = option(d.constructions);
      $('#catRim').innerHTML = option(d.rims);
      $('#catBuilt').innerHTML = `<p class="warning">${safe(d.warning)}</p>`;
    };
    $('#catFamily').onchange = fill;
    fill();
    $('#catBuild').onclick = () => {
      const size = C.buildMetricSize({family:$('#catFamily').value,prefix:$('#catPrefix').value,width:$('#catWidth').value,aspect:$('#catAspect').value,construction:$('#catConstruction').value,rim:$('#catRim').value});
      if (!size) return;
      input.value = size;
      renderCatalogSearch(size);
    };
  }

  const nav = document.querySelector('.nav-inner');
  if (nav && !document.querySelector('[data-module="catalog"]')) {
    const b = document.createElement('button'); b.dataset.module='catalog'; b.textContent='FULL CATALOG'; b.onclick=renderBuilder; nav.appendChild(b);
  }
  const grid = document.querySelector('.module-grid');
  if (grid && !document.querySelector('.catalog-engine-card')) {
    const b = document.createElement('button'); b.className='module-card catalog-engine-card'; b.innerHTML='<span class="icon">◎</span><strong>Full Catalog Engine</strong><small>Generated tire-size space + source-backed tubes + valves</small><em>OPEN CATALOG →</em>'; b.onclick=renderBuilder; grid.appendChild(b);
  }

  const searchBtn = $('#searchBtn');
  if (searchBtn) searchBtn.addEventListener('click', e => { const q=input.value.trim(); if (q && renderCatalogSearch(q)) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') { const q=input.value.trim(); if (q && renderCatalogSearch(q)) { e.preventDefault(); e.stopImmediatePropagation(); } } }, true);

  window.TIRE_CATALOG_UI = {renderBuilder, renderCatalogSearch};
})();
