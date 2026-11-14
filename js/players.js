(function (root) {
  /* Guest phones, host side. Guests scan a code and join with their first name (play.html); here the
     host gives each phone a character. This window tells the server how far the night has come, and
     the server sends each phone only its own cards for the scenes already reached. */
  let info = null;
  let list = [];
  let listJson = '';
  let node = null;
  let game = null;
  let onChange = null;

  async function fetchJson(url, opts) {
    const r = await root.fetch(url, Object.assign({ cache: 'no-store' }, opts || {}));
    return r.json();
  }
  async function post(url, body) {
    try { await fetchJson(url, { method: 'POST', body: JSON.stringify(body || {}) }); } catch (e) { /* server gone */ }
    await refresh(true);
  }

  /* How far the night has come, for the phones. */
  let lastProgress = '';
  async function publish() {
    if (!game) return;
    const s = game.get();
    const body = JSON.stringify({ stageIndex: s.stageIndex, phase: s.phase, prologueDone: s.prologueDone, screen: s.screen, presentIds: s.presentIds, opened: s.opened || [] });
    if (body === lastProgress) return;
    try { await root.fetch('/play/progress', { method: 'POST', body }); lastProgress = body; } catch (e) { lastProgress = ''; }
  }

  async function refresh(force) {
    try { const r = await fetchJson('/play/players'); list = r.players || []; } catch (e) { return; }
    const json = JSON.stringify(list.map((p) => [p.id, p.name, p.characterId, p.seen != null && p.seen < 10000]));
    if (force || json !== listJson) { listJson = json; draw(); }
  }

  function assign(p, characterId) {
    /* A character with a phone is here tonight. */
    if (characterId && game && !game.get().presentIds.includes(characterId)) game.togglePresent(characterId);
    post('/play/assign', { id: p.id, characterId: characterId || null }).then(() => { if (onChange) onChange(); });
  }

  function draw() {
    if (!node) return;
    const { el, clear } = root.BM.ui;
    const data = root.BM.data;
    clear(node);
    node.append(el('h3', {}, 'Guest phones'));
    if (!info) {
      node.append(el('p', { class: 'dim' }, 'Start the game with "Start Box Five" (or npm start) so guests can read their cards on their phones.'));
      return;
    }
    const qr = el('div', { class: 'remote-qr' });
    node.append(el('p', { class: 'dim' }, 'Guests scan this code (it is on the TV too), on the same Wi-Fi, and type their first name. Then give each phone a character below. Each phone shows only that character\'s cards, one scene at a time, when you press "Cards out". You do not need the printed guest cards.'),
      qr, el('p', {}, el('code', {}, info.url)));
    if (root.QRCode) { try { new root.QRCode(qr, { text: info.url, width: 180, height: 180, colorDark: '#000000', colorLight: '#ffffff' }); } catch (e) { /* the link is enough */ } }
    const taken = new Map(list.filter((p) => p.characterId).map((p) => [p.characterId, p]));
    const rows = el('div', { class: 'phone-list' });
    if (!list.length) rows.append(el('p', { class: 'dim' }, 'No phones yet.'));
    list.forEach((p) => {
      const sel = el('select', { 'aria-label': `Character for ${p.name}`, onchange: (e) => assign(p, e.target.value) }, el('option', { value: '' }, '— choose a character —'),
        ...data.characters.map((c) => el('option', { value: c.id, selected: p.characterId === c.id ? 'selected' : null },
          `${c.name} (Room ${c.room})${taken.has(c.id) && taken.get(c.id).id !== p.id ? ` · now ${taken.get(c.id).name}` : ''}${c.killer ? ' · killer' : ''}`)));
      const live = p.seen != null && p.seen < 10000;
      rows.append(el('div', { class: 'phone-row' },
        el('span', { class: 'tvdot' + (live ? ' on' : ''), title: live ? 'Phone is open' : 'Phone not seen for a while' }),
        el('strong', {}, `📱 ${p.name}`), sel,
        el('button', { class: 'small', onclick: () => { if (root.confirm(`Remove ${p.name}'s phone?`)) post('/play/remove', { id: p.id }); } }, 'Remove')));
    });
    const free = data.characters.filter((c) => game && game.get().presentIds.includes(c.id) && !taken.has(c.id));
    node.append(rows,
      list.length ? el('p', { class: 'dim' }, free.length ? `Here tonight without a phone: ${free.map((c) => c.short).join(', ')} (they use paper cards, or untick them).` : 'Every guest here tonight has a phone.') : null,
      el('div', { class: 'row' }, el('button', { class: 'small', onclick: () => { if (root.confirm('Forget every phone? Guests will have to scan and join again.')) post('/play/clear'); } }, 'Forget all phones')));
  }

  /* The setup-screen panel: built once and re-attached on every render, so a choice in progress survives. */
  function panel() {
    if (!node) node = root.BM.ui.el('div', { class: 'panel phones-panel' });
    draw();
    refresh();
    return node;
  }

  /* The phone page's address, for the TV's title screen. */
  function joinUrl() { return info && info.url; }

  async function start(g, changed) {
    game = g;
    onChange = changed;
    try { info = await fetchJson('/play/info'); } catch (e) { info = null; }
    if (!info || !info.url) { info = null; return; }
    draw();
    setInterval(publish, 1000);
    setInterval(() => refresh(), 2500);
    publish();
    refresh();
  }

  root.BM = root.BM || {};
  root.BM.players = { start, panel, joinUrl, publish };
})(window);
