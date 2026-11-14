const test = require('node:test');
const assert = require('node:assert/strict');
const data = require('../js/data.js');
const logic = require('../js/logic.js');

function selectionWithout(...ids) {
  return { presentIds: data.characters.map((c) => c.id).filter((id) => !ids.includes(id)) };
}

test('buildRoster splits present and missing and reports a missing killer', () => {
  const r = logic.buildRoster(data, selectionWithout('nina', 'edouard'));
  assert.equal(r.present.length, 8);
  assert.deepEqual(r.missing.map((c) => c.id), ['nina', 'edouard']);
  assert.deepEqual(r.errors, []);
  const bad = logic.buildRoster(data, selectionWithout('armand'));
  assert.equal(bad.errors.length, 1);
  assert.match(bad.errors[0], /Armand/);
  assert.equal(logic.buildRoster(data, selectionWithout('julien')).errors.length, 1, 'the Count is essential too');
});

test('buildRoster groups teams from present characters only', () => {
  const r = logic.buildRoster(data, selectionWithout('nina'));
  assert.ok(r.teams.julien.every((c) => c.team === 'julien'));
  assert.ok(!r.teams.julien.some((c) => c.id === 'nina'));
  assert.equal(r.teams.victor.length, 5);
});

test('orphanedClues moves an absent witness card to Victor at 3.2', () => {
  const r = logic.buildRoster(data, selectionWithout('nina'));
  const o = logic.orphanedClues(data, r, '3.2');
  const witness = o.find((x) => x.kind === 'witness');
  assert.ok(witness);
  assert.equal(witness.reader, 'Victor');
  assert.match(witness.text, /half past ten/);
  const word = o.find((x) => x.kind === 'word');
  assert.equal(word.text, 'BONES');
});

test('orphanedClues returns an introduction at 1.1, observation at 1.3, torn strip at 2.3, alibi at 3.3', () => {
  const r = logic.buildRoster(data, selectionWithout('gustave'));
  assert.equal(logic.orphanedClues(data, r, '1.3')[0].kind, 'observation');
  const strip = logic.orphanedClues(data, r, '2.3')[0];
  assert.equal(strip.kind, 'torn strip');
  assert.equal(strip.number, 6);
  assert.equal(logic.orphanedClues(data, r, '3.3')[0].kind, 'alibi');
  assert.equal(logic.orphanedClues(data, r, '1.1')[0].kind, 'introduction');
});

test('an absent guest has a stand-in line at every stage, read in the third person', () => {
  const r = logic.buildRoster(data, selectionWithout('edouard'));
  for (const sid of data.STAGE_IDS) {
    const lines = logic.orphanedClues(data, r, sid).filter((x) => x.kind !== 'word');
    assert.equal(lines.length, 1, `stage ${sid}`);
  }
  for (const c of data.characters.filter((x) => !data.requiredIds.includes(x.id))) {
    for (const sid of data.STAGE_IDS) {
      const t = c.cards[sid].absent;
      assert.ok(t, `${c.id} ${sid} has a stand-in line`);
      assert.ok(!/^You\b|\bSay (so|this|it)\b/.test(t), `${c.id} ${sid} stand-in is written for the host to read`);
    }
  }
  const at32 = logic.orphanedClues(data, r, '3.2').find((x) => x.kind === 'team clue');
  assert.match(at32.text, /Milan/);
  assert.ok(logic.orphanedClues(data, r, '3.1').some((x) => x.kind === 'team clue' && /quarter to twelve/.test(x.text)));
  assert.ok(!logic.orphanedClues(data, logic.buildRoster(data, selectionWithout()), '3.2').length, 'nothing when everyone is present');
});

test('the host, the Count and the killer are always present, so they need no stand-in', () => {
  assert.deepEqual(data.requiredIds.slice().sort(), ['armand', 'julien', 'victor']);
  for (const id of data.requiredIds) assert.equal(data.characters.find((c) => c.id === id).optional, false, `${id} is never optional`);
  assert.deepEqual(data.killerIds, ['armand'], 'one killer');
});

test('teamSentence orders words and flags missing holders', () => {
  const r = logic.buildRoster(data, selectionWithout('nina'));
  const s = logic.teamSentence(data, r, 'julien', '3.1');
  assert.equal(s.sentence, 'SUN THAT SLEEPS BY DAY');
  assert.equal(s.picture, 'Lamp');
  assert.deepEqual(s.missing.map((w) => w.text), ['DAY']);
});

test('tally with one killer: the house wins only when the killer alone is clearly top', () => {
  const win = logic.tally({ a: ['armand'], b: ['armand'], c: ['rosalie'] }, ['armand']);
  assert.equal(win.counts.armand, 2);
  assert.equal(win.houseWins, true);
  const tie = logic.tally({ a: ['armand'], b: ['rosalie'] }, ['armand']);
  assert.equal(tie.houseWins, false);
  assert.deepEqual(tie.tie.sort(), ['armand', 'rosalie'], 'a tie for first needs a runoff');
  const miss = logic.tally({ a: ['rosalie'], b: ['rosalie'], c: ['armand'] }, ['armand']);
  assert.equal(miss.houseWins, false);
  assert.deepEqual(miss.tie, []);
});

test('tally with two killers still needs both as the clear top two (the engine supports both)', () => {
  assert.equal(logic.tally({ a: ['x', 'y'], b: ['x', 'y'], c: ['x', 'z'] }, ['x', 'y']).houseWins, true);
  assert.equal(logic.tally({ a: ['x', 'y'], b: ['x', 'z'] }, ['x', 'y']).houseWins, false);
  assert.deepEqual(logic.tally({ a: ['x', 'y'], b: ['x', 'z'] }, ['x', 'y']).tie.sort(), ['y', 'z']);
});

test('rumourFor prints the whisper only when its unnamed subject is present', () => {
  const card = data.characters.find((c) => c.id === 'victor').cards['1.1'];
  assert.equal(card.rumour.about, 'lucia');
  assert.equal(logic.rumourFor(card, ['victor', 'lucia']).text, card.rumour.text);
  assert.equal(logic.rumourFor(card, ['victor']), null);
});

test('every card carries a whisper about someone else who is never named in it', () => {
  for (const c of data.characters) {
    for (const sid of data.STAGE_IDS) {
      const r = c.cards[sid].rumour;
      assert.ok(r && r.text, `${c.id} ${sid} has no whisper`);
      assert.notEqual(r.about, c.id, `${c.id} ${sid} whisper is about themselves`);
      const subject = data.characters.find((x) => x.id === r.about);
      for (const word of [subject.short, ...subject.name.split(/[\s,]+/).filter((w) => w.length > 3 && /^[A-Z]/.test(w) && !['Opera', 'Five', 'Keeper', 'Prima', 'Donna', 'Chorus', 'Doctor', 'Chief', 'Ballet', 'Dancer', 'Patron', 'Manager', 'Pianist', 'Count', 'Machinist'].includes(w))]) {
        assert.ok(!r.text.includes(word), `${c.id} ${sid} whisper names ${word}`);
      }
    }
  }
});

test('stage 3.4 is the box: last stage, a word puzzle, nothing hidden, and the killer pushes a wrong word', () => {
  const last = data.stages[data.stages.length - 1];
  assert.equal(last.id, '3.4');
  assert.ok(!last.searchOnly, 'no key hunt: the user asked for puzzles, not hiding');
  assert.ok(last.minutes && last.minutes.discuss, '3.4 has ordinary timers');
  assert.equal(last.setPieceAfter, 'lastLetter');
  assert.equal(data.setPieces.lastLetter.cue, 'The box is open');
  assert.deepEqual(logic.voiceGroup(data, 'set-lastLetter').map((l) => l.voice), ['narrator']);
  assert.equal(data.box.word, 'ANGEL');
  for (const id of data.killerIds) {
    const card = data.characters.find((c) => c.id === id).cards['3.4'];
    assert.match(card.sabotage, /ANGLE/);
  }
  /* Every innocent rule holds for ANGEL; ANGLE breaks at least two of them. */
  const rules = {
    'begins with the letter A': (w) => w[0] === 'A', 'begins with A': (w) => w[0] === 'A',
    'N comes right after A': (w) => w.indexOf('N') === w.indexOf('A') + 1,
    'E comes right after G': (w) => w.indexOf('E') === w.indexOf('G') + 1,
    'the letter E comes right after the letter G': (w) => w.indexOf('E') === w.indexOf('G') + 1,
    'ends with the letter L': (w) => w[w.length - 1] === 'L', 'last one is L': (w) => w[w.length - 1] === 'L'
  };
  let broken = 0;
  for (const c of data.characters.filter((x) => !x.killer)) {
    const text = c.cards['3.4'].text;
    for (const [phrase, ok] of Object.entries(rules)) {
      if (!text.includes(phrase)) continue;
      assert.ok(ok('ANGEL'), `${c.id}: "${phrase}" holds for ANGEL`);
      if (!ok('ANGLE')) broken++;
    }
  }
  assert.ok(broken >= 2, `ANGLE breaks ${broken} innocent rules`);
  const r = logic.buildRoster(data, selectionWithout('gustave'));
  assert.deepEqual(logic.orphanedClues(data, r, '3.4').map((h) => h.kind), ['box rule']);
});

test('formatRemaining renders mm:ss, flags urgency and overrun', () => {
  assert.deepEqual(logic.formatRemaining(300), { text: '05:00', urgent: false, over: false });
  assert.deepEqual(logic.formatRemaining(29), { text: '00:29', urgent: true, over: false });
  assert.deepEqual(logic.formatRemaining(0), { text: '00:00', urgent: false, over: true });
  assert.deepEqual(logic.formatRemaining(-65), { text: '-01:05', urgent: false, over: true });
});

test('talkFor picks the first table-talk line whose subject is present', () => {
  const card = { talk: [{ about: 'nina', text: 'ask nina' }, { about: 'lucia', text: 'ask lucia' }] };
  assert.equal(logic.talkFor(card, ['nina', 'lucia']).text, 'ask nina');
  assert.equal(logic.talkFor(card, ['lucia']).text, 'ask lucia');
  assert.equal(logic.talkFor(card, []), null);
  assert.equal(logic.talkFor({ talk: [{ text: 'no subject' }] }, []).text, 'no subject');
  assert.equal(logic.talkFor({}, ['nina']), null);
});

test('every present card still has table talk when the prima donna stays home too', () => {
  const presentIds = data.characters.filter((c) => !c.optional && c.id !== 'lucia').map((c) => c.id);
  for (const id of presentIds) for (const sid of data.STAGE_IDS) assert.ok(logic.talkFor(data.characters.find((c) => c.id === id).cards[sid], presentIds), `${id} ${sid}`);
});

test('every card has a table-talk line for any roster that keeps the required guests', () => {
  const presentIds = data.characters.filter((c) => !c.optional).map((c) => c.id);
  for (const c of data.characters) for (const sid of data.STAGE_IDS) assert.ok(logic.talkFor(c.cards[sid], presentIds), `${c.id} ${sid}`);
});

test('voiceLines voices the narrator, the Ghost\'s letters, the Count and Victor, and never a stage direction', () => {
  const lines = logic.voiceLines(data);
  assert.ok(lines.length > 0);
  for (const l of lines) {
    if (l.group.startsWith('absent-')) assert.ok(data.characters.some((c) => c.id === l.voice && !c.killer), `${l.id} is an absent guest's own voice`);
    else assert.ok(['narrator', 'phantom', 'julien', 'victor'].includes(l.voice), l.id);
    assert.ok(!/^Stage direction/.test(l.speaker), `${l.id} is not a stage direction`);
  }
  assert.equal(new Set(lines.map((l) => l.id)).size, lines.length, 'ids are unique');
  for (const st of data.stages) assert.ok(logic.voiceGroup(data, `stage-${st.id.replace('.', '-')}`).length, `stage ${st.id} is voiced`);
  assert.equal(logic.voiceGroup(data, 'reveal')[0].voice, 'julien', 'the Count names the Ghost');
  for (const st of data.stages) assert.deepEqual(logic.voiceGroup(data, `quote-${st.id.replace('.', '-')}`).map((l) => l.voice), ['narrator'], `${st.id} closing quote is narrated`);
  assert.deepEqual(logic.voiceGroup(data, 'set-prologue').map((l) => l.voice), ['victor'], 'Victor gives the toast');
  assert.deepEqual(logic.voiceGroup(data, 'announce-1-3').map((l) => l.voice), ['julien'], 'the Count makes the announcement');
  assert.deepEqual(logic.voiceGroup(data, 'set-sheIsDead').map((l) => l.voice), ['narrator', 'phantom', 'victor']);
  for (const g of ['reveal-saved', 'reveal-lost']) assert.ok(logic.voiceGroup(data, g).length, `${g} ending is voiced`);
  assert.ok(lines.some((l) => l.voice === 'phantom'), 'the Ghost\'s letters are voiced');
});

test('an interlude separates the scenes: the sandbag in the dark after 1.3, the Ghost\'s letter after 2.3', () => {
  const after = (id) => data.stages.find((s) => s.id === id).setPieceAfter;
  assert.equal(after('1.3'), 'lightsOut');
  assert.equal(after('2.3'), 'twoGhosts');
  assert.equal(data.setPieces.twoGhosts.then, 'victorReturns', 'the letter leads straight into Victor forming the teams');
  for (const id of ['1.3', '2.3']) assert.ok(data.setPieces[after(id)].cue, `the host button after ${id} has a label`);
  assert.deepEqual(logic.voiceGroup(data, 'set-lightsOut').map((l) => l.voice), ['narrator', 'phantom']);
  assert.deepEqual(logic.voiceGroup(data, 'set-twoGhosts').map((l) => l.voice), ['phantom']);
});

test('every soundboard effect has a recorded clip on disk', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'audio.js'), 'utf8');
  const block = src.slice(src.indexOf('const sounds = {'), src.indexOf('};', src.indexOf('const sounds = {')));
  const names = [...block.matchAll(/^\s{4}(\w+):/gm)].map((m) => m[1]);
  assert.ok(names.length >= 10, 'found the soundboard names');
  const sfx = require('../js/sfx-manifest.js');
  for (const n of names) {
    assert.ok(sfx.clips[n], `${n} is recorded`);
    assert.ok(fs.existsSync(path.join(__dirname, '..', sfx.clips[n].src)), `${n} clip file exists`);
  }
});

test('the killer sits on the team that investigates the poison, and each team sentence has one word per member', () => {
  assert.equal(data.characters.find((c) => c.id === 'armand').team, 'julien');
  const all = logic.buildRoster(data, { presentIds: data.characters.map((c) => c.id) });
  assert.equal(logic.teamSentence(data, all, 'victor', '3.1').sentence, 'GREEN THINGS GROW HERE QUIETLY');
  assert.equal(logic.teamSentence(data, all, 'victor', '3.2').sentence, 'IT SHOWS YOU TO YOURSELF');
  assert.equal(logic.teamSentence(data, all, 'julien', '3.2').sentence, 'MANY SPINES BUT NO BONES');
  for (const team of ['julien', 'victor']) for (const sid of ['3.1', '3.2']) assert.ok(!data.DECOYS.includes(data.teamEnvelopes[team][sid].picture));
});

test('tally counts a voter once per suspect and ignores absent voters', () => {
  const r = logic.tally({ a: ['armand', 'armand'], gone: ['rosalie'] }, ['armand'], ['a', 'armand', 'rosalie']);
  assert.deepEqual(r.counts, { armand: 1 });
  assert.equal(r.houseWins, true);
});

test('an absent guest\'s important clues carry a voiced group, in the first person', () => {
  const r = logic.buildRoster(data, selectionWithout('edouard', 'nina'));
  const at32 = logic.orphanedClues(data, r, '3.2');
  const baron = at32.find((x) => x.characterId === 'edouard' && x.kind === 'team clue');
  assert.equal(baron.group, 'absent-edouard-3-2');
  assert.match(baron.spoken, /^I lived in Milan.*My word is YOURSELF\. Number 5\.$/);
  assert.equal(at32.find((x) => x.kind === 'witness').group, 'absent-nina-witness');
  assert.ok(!logic.orphanedClues(data, r, '1.1').some((x) => x.group), 'introductions are not voiced');
  for (const c of data.characters) if (c.cards['3.3'].absentVoice) assert.equal(c.cards['3.3'].absentVoice, c.cards['3.3'].alibi, c.id);
});

test('cardFixes lists printed table talk and whispers about absent guests, with the line to use instead', () => {
  const all = data.characters.map((c) => c.id);
  assert.deepEqual(logic.cardFixes(data, all, '1.1'), []);
  const without = all.filter((id) => id !== 'lucia');
  const fixes = logic.cardFixes(data, without, '1.1');
  const victor = fixes.find((f) => f.kind === 'talk' && f.holder === 'victor');
  assert.ok(victor, 'Victor\'s 1.1 table talk asks about Lucia');
  assert.equal(victor.about, 'lucia');
  assert.equal(victor.instead, (logic.talkFor(data.characters.find((c) => c.id === 'victor').cards['1.1'], without) || { text: null }).text);
  for (const f of fixes) {
    assert.equal(f.about, 'lucia');
    assert.notEqual(f.holder, 'lucia');
  }
  for (const id of all) {
    for (const sid of data.STAGE_IDS) {
      for (const f of logic.cardFixes(data, all.filter((x) => x !== id), sid)) assert.equal(f.about, id);
    }
  }
});

test('cardFixes with the print roster lists only lines that are on paper', () => {
  const all = data.characters.map((c) => c.id);
  const printed = all.filter((id) => id !== 'gustave' && id !== 'nina');
  for (const sid of data.STAGE_IDS) {
    assert.deepEqual(logic.cardFixes(data, printed, sid, printed), [], `nothing to fix at ${sid} when tonight matches the print`);
  }
  const tonight = printed.filter((id) => id !== 'lucia');
  for (const sid of data.STAGE_IDS) {
    for (const f of logic.cardFixes(data, tonight, sid, printed)) {
      assert.equal(f.about, 'lucia', `${sid}: only the newly absent guest`);
      const card = data.characters.find((c) => c.id === f.holder).cards[sid];
      if (f.kind === 'talk') assert.equal(f.printed, logic.talkFor(card, printed).text);
      else assert.equal(f.printed, logic.rumourFor(card, printed).text);
    }
  }
  assert.ok(data.STAGE_IDS.some((sid) => logic.cardFixes(data, tonight, sid, printed).length), 'Lucia is mentioned somewhere');
});

test('playerView opens cards one stage at a time, with strips, team words and only the guest\'s own orders', () => {
  const at = (id, stageIndex, phase, extra) => logic.playerView(data, id, Object.assign({ prologueDone: true, stageIndex, phase, screen: 'game' }, extra));
  assert.equal(logic.playerView(data, 'edouard', {}).cards.length, 0, 'nothing before the night');
  assert.equal(at('edouard', 5, 'narration').cards.length, 5, 'this stage stays closed until the cards are out');
  const baron = at('edouard', 6, 'search');
  assert.equal(baron.cards.length, 7);
  assert.equal(baron.name, 'Baron Édouard Vasseur, Patron', 'without nameRevealStage the name shows at once');
  assert.ok(baron.cards[5].strip && baron.cards[5].strip.number === data.ledger.find((s) => s.holder === 'edouard').number, 'the torn strip is on the phone');
  assert.deepEqual(baron.cards[6].word, data.characters.find((c) => c.id === 'edouard').cards['3.1'].word);
  const armand = data.characters.find((c) => c.id === 'armand');
  assert.ok(!JSON.stringify(baron).includes(armand.cards['2.3'].sabotage), 'an innocent never receives the killer\'s orders');
  assert.ok(at('armand', 5, 'search').cards[5].orders.includes(armand.cards['2.3'].sabotage), 'the killer gets his orders on his own phone');
  assert.equal(at('edouard', 9, 'narration', { screen: 'vote' }).cards.length, 10, 'every card at the vote');
  assert.equal(logic.playerView(data, 'nobody', {}), null);
  const hidden = Object.assign({}, data, { nameRevealStage: '1.1' });
  assert.equal(logic.playerView(hidden, 'edouard', { prologueDone: true, stageIndex: 0, phase: 'search' }).name, null, 'a game can hide the name until a stage is over');
  assert.equal(logic.playerView(hidden, 'edouard', { prologueDone: true, stageIndex: 1, phase: 'narration' }).name, 'Baron Édouard Vasseur, Patron');
});

test('phones are enough: opened envelopes reach the team\'s phones and the witness reads from her own', () => {
  const view = (id, opened) => logic.playerView(data, id, { prologueDone: true, stageIndex: 7, phase: 'search', screen: 'game', opened });
  assert.deepEqual(view('colette', []).found, []);
  const found = view('colette', ['julien-3.1', 'victor-3.1']).found;
  assert.deepEqual(found.map((f) => f.title), ['THE BOTTLE'], 'only the guest\'s own team\'s envelopes');
  assert.match(found[0].text, /hollow pillar/);
  assert.deepEqual(view('lucia', ['julien-3.1', 'victor-3.1']).found.map((f) => f.title), ['THE WIRE']);
  const witness = view('nina', ['julien-3.2']).found[0];
  assert.equal(witness.reader, 'nina');
  assert.equal(witness.text, data.witnessCards.julien.text, 'the witness envelope shows the witness card itself');
  assert.equal(view('nina', []).cards[7].witness, data.witnessCards.julien.text, 'the witness has her card on her phone at 3.2');
  assert.equal(view('colette', []).cards[7].witness, null);
});
