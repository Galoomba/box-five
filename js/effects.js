(function (root) {
  /* Host effects: one press makes a screen effect, a sound and a room-light effect at the same moment.
     The host window and the TV both call play(name); the lights follow from the host window only
     (js/lights.js › effect(name)), and every effect gives the room back the look it had before.
     The look of each effect is in css/style.css (.fx-layer.fx-<name>), coloured by css/theme.css. */
  /* This game's effects. The engine can draw these looks (css/style.css .fx-<name>, js/lights.js
     EFFECT_STEPS): lightning, powercut, heartbeat, haunt, gas, blizzard, memory, glass, scream.
     Pick the ones that fit the story, relabel them in its words, or add new ones (a look, a light
     burst and a sound). sound is a name in js/audio.js; ms is how long the screen effect lasts. */
  const EFFECTS = [
    { name: 'lightning', label: '⚡ Lightning',     sound: 'thunder',   ms: 900,  hint: 'Two white flashes and thunder' },
    { name: 'powercut',  label: '🔌 Power cut',     sound: 'powerdown', ms: 5200, hint: 'Screen and lights stutter, go black for a few seconds, come back' },
    { name: 'heartbeat', label: '❤ Heartbeat',      sound: 'heartbeat', ms: 3800, hint: 'The room pulses red, four beats' },
    { name: 'haunt',     label: '👻 The Ghost passes', sound: 'ghost',     ms: 6000, hint: 'A cold glow rises, the screen drifts, the lights turn moon-blue and sink' },
    { name: 'glass',     label: '✕ Glass breaks',   sound: 'glass',     ms: 3200, hint: 'A crack across the screen, a white snap of light' },
    { name: 'scream',    label: '! Scream',         sound: 'scream',    ms: 1600, hint: 'The screen shakes and flashes red with the lights' }
  ];
  const byName = Object.fromEntries(EFFECTS.map((e) => [e.name, e]));

  function layer() {
    let l = root.document.getElementById('fx-layer');
    if (!l) { l = root.document.createElement('div'); l.id = 'fx-layer'; l.className = 'fx-layer'; l.setAttribute('aria-hidden', 'true'); root.document.body.append(l); }
    return l;
  }
  const CRACK = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="52,0 49,18 55,31 47,46 53,58 44,74 50,100"/><polyline points="49,18 36,24 22,22"/><polyline points="55,31 70,36 86,33 100,40"/><polyline points="47,46 30,52 12,50 0,57"/><polyline points="53,58 66,66 80,80"/><polyline points="44,74 30,82 24,96"/></svg>';

  let timer = null;
  /* sound(name) plays a clip; it is passed in so each window keeps its own sound switch. */
  function play(name, sound) {
    const fx = byName[name];
    if (!fx) return false;
    if (name === 'lightning') { if (root.BM.ui) root.BM.ui.flashLightning(); if (sound) sound(fx.sound); return true; }
    const l = layer();
    clearTimeout(timer);
    l.className = 'fx-layer';
    l.innerHTML = name === 'glass' ? CRACK : name === 'blizzard' ? '<i></i><i></i>' : '';
    void l.offsetWidth;
    l.classList.add('on', `fx-${name}`);
    root.document.body.classList.add(`fx-body-${name}`);
    timer = setTimeout(() => { l.className = 'fx-layer'; l.innerHTML = ''; EFFECTS.forEach((e) => root.document.body.classList.remove(`fx-body-${e.name}`)); }, fx.ms);
    if (sound && fx.sound) sound(fx.sound);
    return true;
  }

  const api = { list: EFFECTS, has: (n) => Boolean(byName[n]), get: (n) => byName[n] || null, play };
  root.BM = root.BM || {};
  root.BM.effects = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
