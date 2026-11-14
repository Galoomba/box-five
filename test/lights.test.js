const test = require('node:test');
const assert = require('node:assert/strict');
const data = require('../js/data.js');
const lights = require('../js/lights.js');

test('every stage has a lighting cue that exists', () => {
  for (const st of data.stages) {
    const name = lights.cueForStage(st.id);
    assert.ok(lights.CUES[name], `stage ${st.id} -> ${name}`);
  }
  assert.equal(lights.cueForStage('3.4'), 'box');
});

test('cue steps respect the Hue rate limits and value ranges', () => {
  for (const [name, c] of Object.entries(lights.CUES)) {
    const room = c.steps.filter((st) => st.state);
    const bulb = c.steps.filter((st) => st.each);
    room.forEach((st, i) => { if (i) assert.ok(st.at - room[i - 1].at >= 1000, `${name}: room steps under 1s apart`); });
    bulb.forEach((st, i) => { if (i) assert.ok(st.at - bulb[i - 1].at >= 250, `${name}: bulb steps under 250ms apart`); });
    c.steps.forEach((st) => {
      const s = st.state || st.each;
      assert.ok(s, `${name}: a step needs state or each`);
      if (s.bri != null) assert.ok(s.bri >= 1 && s.bri <= 254, `${name} bri`);
      if (s.ct != null) assert.ok(s.ct >= 153 && s.ct <= 500, `${name} ct`);
      if (s.xy) assert.ok(s.xy.every((v) => v >= 0 && v <= 1), `${name} xy`);
      assert.ok(Number.isInteger(s.transitiontime), `${name} transitiontime`);
    });
  }
});

test('the blackout flickers in step with the screen: lightning at 2.6s, moonlight at 6.8s', () => {
  const steps = lights.CUES.lightsOut.steps;
  assert.deepEqual(steps.find((st) => st.each).at, 2600);
  assert.equal(steps[steps.length - 1].at, 6800);
  assert.equal(steps.filter((st) => st.each).pop().each.on, false);
});

test('the set pieces the lights follow exist in the story', () => {
  for (const key of ['prologue', 'sheIsDead', 'lightsOut', 'twoGhosts', 'lastLetter']) assert.ok(data.setPieces[key], key);
});

test('every host effect has a sound, a light burst that ends on the previous look, and safe bulb timing', () => {
  const effects = require('../js/effects.js');
  const fs = require('node:fs');
  const audioSrc = fs.readFileSync(require('node:path').join(__dirname, '../js/audio.js'), 'utf8');
  const back = { on: true, ct: 400, bri: 99 };
  for (const fx of effects.list) {
    assert.ok(new RegExp(`\\b${fx.sound}: \\(\\)`).test(audioSrc), `${fx.name}: sound ${fx.sound} has no fallback in audio.js`);
    assert.ok(fs.existsSync(require('node:path').join(__dirname, '../css/style.css')) && /\.fx-/.test(fs.readFileSync(require('node:path').join(__dirname, '../css/style.css'), 'utf8')) && (fx.name === 'lightning' || fs.readFileSync(require('node:path').join(__dirname, '../css/style.css'), 'utf8').includes(`.fx-${fx.name}`) || fs.readFileSync(require('node:path').join(__dirname, '../css/theme.css'), 'utf8').includes(`.fx-${fx.name}`)), `${fx.name}: no screen look (.fx-${fx.name})`);
    const make = lights.EFFECT_STEPS[fx.name];
    assert.ok(make, `${fx.name}: no light burst`);
    if (fx.name === 'lightning') continue;
    const steps = make((tt) => Object.assign({}, back, { transitiontime: tt }));
    const lastStep = steps[steps.length - 1];
    assert.equal((lastStep.each || lastStep.state).bri, 99, `${fx.name} must end on the look that was showing`);
    assert.ok(lastStep.at <= fx.ms, `${fx.name}: the lights must come back before the screen effect ends`);
    const each = steps.filter((s) => s.each).map((s) => s.at).sort((a, b) => a - b);
    each.forEach((at, i) => { if (i) assert.ok(at - each[i - 1] >= 250, `${fx.name}: bulb steps closer than 250ms`); });
    const room = steps.filter((s) => s.state).map((s) => s.at);
    room.forEach((at, i) => { if (i) assert.ok(at - room[i - 1] >= 1000, `${fx.name}: room steps closer than 1s`); });
  }
});
