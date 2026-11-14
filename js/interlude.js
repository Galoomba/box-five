(function (root) {
  /* The interludes between the scenes, drawn the same way on the host and on the TV:
       lightsOut  (after 1.3)  the gas lamps go out, a few seconds of dark for the host to drop the
                               sandbag, a crash, then the sandbag on the stage and the Count alive
       twoGhosts  (after 2.3)  the Ghost's letter in red ink unfolds, sealed in black wax
     play(ov, key, o) draws into the overlay `ov`. o.lines is the lines node, o.alive() says whether the
     interlude is still showing, o.sfx(name) plays a sound, o.cue is an optional host-only note shown in
     the dark, o.onReady() runs once the text is up and o.voice() starts the narration.
     letter() and mask() are also drawn by the full story (js/story-view.js); memorial and ghostPair are
     kept as names for them, since the story view calls those. */
  const { el, clear, candles, flashLightning } = root.BM.ui;
  const data = root.BM.data;

  function later(o, ms, fn) { setTimeout(() => { if (o.alive()) fn(); }, ms); }

  /* The Ghost's letter: cream paper, red ink, a black wax seal with O.G. */
  function letter(text) {
    return el('div', { class: 'ghost-letter' },
      el('div', { class: 'ghost-letter-paper' },
        el('span', { class: 'ghost-letter-text' }, text || 'Name me, or he will not see Ash Wednesday.'),
        el('span', { class: 'ghost-letter-sign' }, 'O.G.')),
      el('div', { class: 'ghost-letter-seal' }, 'OG'));
  }

  /* The white half-mask of the Opera Ghost (drawn in CSS as .opera-mask). */
  function mask() { return el('div', { class: 'opera-mask-wrap' }, el('div', { class: 'opera-mask' })); }

  /* The sandbag on the stage floor where the Count had stood. */
  function sandbag() {
    return el('div', { class: 'sandbag-scene' },
      el('div', { class: 'sandbag-wire' }),
      el('div', { class: 'sandbag' }, el('span', {}, '7')),
      el('div', { class: 'sandbag-dust' }));
  }

  function lightsOut(ov, o) {
    ov.classList.add('blackout', 'interlude');
    const c = candles();
    ov.append(c);
    o.sfx('powerdown');
    [0, 1, 2].forEach((i) => later(o, 700 + i * 650, () => { c.children[i].classList.add('out'); o.sfx('puff'); }));
    later(o, 2600, () => {
      clear(ov);
      ov.scrollTop = 0;
      ov.classList.add('flicker');
      if (o.cue) ov.append(el('p', { class: 'interlude-cue' }, o.cue));
    });
    /* The crash in the dark. */
    later(o, 5200, () => { o.sfx('glass'); o.sfx('death'); flashLightning(); });
    /* Then the lamps come back: the sandbag, and the Count alive. */
    later(o, 7600, () => {
      clear(ov);
      ov.scrollTop = 0;
      ov.classList.remove('flicker');
      ov.classList.add('mourning');
      o.sfx('heartbeat');
      ov.append(
        sandbag(),
        el('h1', { class: 'interlude-title' }, 'Scene 2'),
        el('h2', { class: 'interlude-sub' }, data.scenes[1].title),
        o.cue ? el('p', { class: 'interlude-cue' }, 'Lights on again.') : null,
        o.lines);
      o.lines.classList.add('interlude-lines');
      o.onReady();
      later(o, 1800, o.voice);
    });
  }

  function twoGhosts(ov, o) {
    ov.classList.add('ghostly', 'interlude');
    const l = letter('You still do not know my name.');
    ov.append(l);
    o.sfx('whisper');
    later(o, 2200, () => {
      l.classList.add('open');
      if (o.cue) ov.append(el('p', { class: 'interlude-cue' }, o.cue));
      flashLightning();
    });
    later(o, 4200, () => {
      ov.append(el('h1', { class: 'interlude-title' }, 'Scene 3'), el('h2', { class: 'interlude-sub' }, data.scenes[2].title), o.lines);
      o.lines.classList.add('interlude-lines');
      o.onReady();
      later(o, 1200, o.voice);
    });
  }

  const KINDS = { lightsOut, twoGhosts };

  function has(key) { return Boolean(KINDS[key]); }
  function play(ov, key, o) { ov.scrollTop = 0; KINDS[key](ov, o); }

  root.BM = root.BM || {};
  root.BM.interlude = { has, play, letter, mask, sandbag, memorial: () => letter(), ghostPair: () => mask() };
})(window);
