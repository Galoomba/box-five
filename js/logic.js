(function (root) {
  function buildRoster(data, selection) {
    const presentIds = new Set(selection.presentIds || []);
    const present = data.characters.filter((c) => presentIds.has(c.id));
    const missing = data.characters.filter((c) => !presentIds.has(c.id));
    const errors = (data.requiredIds || []).filter((id) => !presentIds.has(id)).map((id) => {
      const c = data.characters.find((x) => x.id === id);
      return `${c ? c.name : id} is essential to the story and must be present.`;
    });
    return {
      present, missing, errors,
      teams: {
        julien: present.filter((c) => c.team === 'julien'),
        victor: present.filter((c) => c.team === 'victor')
      }
    };
  }

  /* What the host or ghost says for each absent guest at a stage: the guest's stand-in line,
     plus anything that has to be handed over (ledger strip, team word, witness card). */
  const ABSENT_KIND = { '1.1': 'introduction', '1.2': 'why they came', '1.3': 'observation', '2.1': 'secret', '2.2': 'goal', '2.3': 'torn strip', '3.1': 'team clue', '3.2': 'team clue', '3.3': 'alibi', '3.4': 'box rule' };
  /* Who speaks for an absent guest: the host, Victor, all night (nobody in this story is a ghost). */
  function readerFor() { return 'Victor'; }
  /* An absent guest's important clue, in their own words and voice, played on the TV: the
     card's absentVoice line (plus their team word at 3.1 and 3.2), or their witness card. */
  function absentGroup(characterId, stageId) { return `absent-${characterId}-${stageId.replace('.', '-')}`; }
  function absentSpoken(c, stageId) {
    const card = c.cards[stageId];
    if (!card || !card.absentVoice) return null;
    return card.word && (stageId === '3.1' || stageId === '3.2') ? `${card.absentVoice} My word is ${card.word.text}. Number ${card.word.index}.` : card.absentVoice;
  }
  function orphanedClues(data, roster, stageId) {
    const out = [];
    for (const c of roster.missing) {
      const card = c.cards[stageId];
      if (!card) continue;
      const base = { characterId: c.id, name: c.name, symbol: c.symbol, reader: readerFor(data, stageId, c.team) };
      const strip = stageId === '2.3' ? data.ledger.find((s) => s.holder === c.id) : null;
      const spoken = absentSpoken(c, stageId);
      if (card.absent) out.push({ ...base, kind: ABSENT_KIND[stageId], text: card.absent, ...(strip ? { number: strip.number, strip: strip.text } : {}), ...(spoken ? { group: absentGroup(c.id, stageId), spoken } : {}) });
      if ((stageId === '3.1' || stageId === '3.2') && card.word) {
        out.push({ ...base, kind: 'word', index: card.word.index, text: card.word.text, team: c.team });
      }
      if (stageId === '3.2' && c.witness) {
        const w = data.witnessCards[c.team];
        out.push({ ...base, kind: 'witness', reader: w.ghost, text: w.ghostIntro ? `${w.ghostIntro} ${w.text}` : w.text, group: `absent-${c.id}-witness`, spoken: w.text });
      }
    }
    return out;
  }

  function teamSentence(data, roster, team, stageId) {
    const presentIds = new Set(roster.present.map((c) => c.id));
    const words = data.characters
      .filter((c) => c.team === team && c.cards[stageId] && c.cards[stageId].word)
      .map((c) => ({ index: c.cards[stageId].word.index, text: c.cards[stageId].word.text, holder: c.id, holderName: c.short, present: presentIds.has(c.id) }))
      .sort((a, b) => a.index - b.index);
    const env = data.teamEnvelopes[team][stageId];
    return { words, sentence: words.map((w) => w.text).join(' '), picture: env.picture, missing: words.filter((w) => !w.present) };
  }

  function tally(votes, killerIds, presentIds) {
    /* Each voter counts once per suspect; votes from guests no longer present are ignored. */
    const counts = {};
    for (const [voter, picks] of Object.entries(votes || {})) {
      if (presentIds && !presentIds.includes(voter)) continue;
      for (const s of new Set((picks || []).filter(Boolean))) {
        if (presentIds && !presentIds.includes(s)) continue;
        counts[s] = (counts[s] || 0) + 1;
      }
    }
    const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    /* One killer: the house wins if the killer alone tops the vote. Two killers: if both are the clear top two. */
    const n = Math.max(1, killerIds.length);
    const top = ranked.slice(0, n);
    const next = ranked[n] ? ranked[n][1] : -1;
    const houseWins = top.length === n &&
      killerIds.every((k) => top.some((e) => e[0] === k)) &&
      top.every((e) => e[1] > next);
    /* A tie across the last winning place: the guests in it need a runoff before the reveal. */
    const last = ranked[n - 1] ? ranked[n - 1][1] : -1;
    const tie = last > 0 && last === next ? ranked.filter((e) => e[1] === last).map((e) => e[0]) : [];
    return { counts, ranked, houseWins, tie };
  }

  function formatRemaining(remaining) {
    const abs = Math.abs(remaining);
    const text = (remaining < 0 ? '-' : '') + String(Math.floor(abs / 60)).padStart(2, '0') + ':' + String(abs % 60).padStart(2, '0');
    return { text, urgent: remaining > 0 && remaining <= 30, over: remaining <= 0 };
  }

  /* The first table-talk entry on a card whose subject is present (or has no subject); null if none. */
  function talkFor(card, presentIds) {
    const present = new Set(presentIds || []);
    const list = (card && card.talk) || [];
    return list.find((t) => !t.about || present.has(t.about)) || null;
  }

  /* The rumour at the foot of a card, unless its (unnamed) subject is absent tonight. */
  function rumourFor(card, presentIds) {
    const r = card && card.rumour;
    if (!r) return null;
    return !r.about || (presentIds || []).includes(r.about) ? r : null;
  }

  /* Which recorded voice reads a line: the ghosts, the narrator and living Victor (the host can mute
     the voice and say his lines in person); stage directions are not. 'both' is the two ghosts together. */
  function voiceForSpeaker(speaker) {
    if (/^Stage direction/.test(speaker)) return null;
    /* The Ghost's red-ink letters, read in a disguised whisper. */
    if (/^The Ghost/.test(speaker)) return 'phantom';
    if (/^Narrator/.test(speaker)) return 'narrator';
    if (/^Julien\b/.test(speaker)) return 'julien';
    if (/^Victor\b/.test(speaker)) return 'victor';
    return null;
  }

  /* Every game line that has a voice-over, grouped by when it plays: 'stage-<id>' with the stage
     narration, 'announce-<id>' with Victor's announcement at the end of a stage, 'quote-<id>' with
     the closing quote (read by the narrator even when the ghost voice-over is muted), 'set-<key>'
     with a set piece, 'reveal' with the final reveal. */
  function voiceLines(data) {
    const out = [];
    const add = (group, lines) => lines.forEach((line, i) => {
      const voice = line.voice || voiceForSpeaker(line.speaker);
      if (voice) out.push({ id: `${group}-${i}`, group, voice, speaker: line.speaker, text: line.say || line.text });
    });
    data.stages.forEach((st) => add(`stage-${st.id.replace('.', '-')}`, st.narration));
    data.stages.forEach((st) => { if (st.announcement) add(`announce-${st.id.replace('.', '-')}`, [st.announcement]); });
    data.stages.forEach((st) => { if (st.quote) add(`quote-${st.id.replace('.', '-')}`, [{ speaker: 'Narrator', text: st.quote.text }]); });
    Object.keys(data.setPieces).forEach((key) => add(`set-${key}`, data.setPieces[key].lines));
    add('reveal', data.reveal.lines);
    /* The two endings, played on the result screen: the Count lives, or the Ghost wins. */
    if (data.reveal.saved) add('reveal-saved', data.reveal.saved);
    if (data.reveal.lost) add('reveal-lost', data.reveal.lost);
    /* Absent guests' important clues, each in that guest's own voice. */
    data.characters.forEach((c) => {
      data.STAGE_IDS.forEach((sid) => {
        const text = absentSpoken(c, sid);
        if (text) out.push({ id: `${absentGroup(c.id, sid)}-0`, group: absentGroup(c.id, sid), voice: c.id, speaker: c.name, text });
      });
      if (c.witness) out.push({ id: `absent-${c.id}-witness-0`, group: `absent-${c.id}-witness`, voice: c.id, speaker: c.name, text: data.witnessCards[c.team].text });
    });
    return out;
  }

  /* The printed cards carry table talk and a whisper chosen for the guests ticked when they were printed.
     For guests absent tonight, per present guest's card at this stage: any table talk that may ask about an
     absent guest, with the line to use instead (null: skip it), and any whisper that describes one. */
  /* Printed table talk and whispers that point at a guest who is not here tonight. With printedIds (the
     roster the cards were printed for) only the lines actually on paper are listed; without it, every line
     that might have been printed is, worded by the caller as "if the card reads…". */
  function cardFixes(data, presentIds, stageId, printedIds) {
    const present = new Set(presentIds);
    const short = (id) => (data.characters.find((c) => c.id === id) || {}).short;
    const out = [];
    for (const c of data.characters) {
      const card = c.cards[stageId];
      if (!present.has(c.id) || !card) continue;
      const now = talkFor(card, presentIds);
      const push = (t) => out.push({ kind: 'talk', holder: c.id, holderName: c.short, about: t.about, aboutName: short(t.about), printed: t.text, instead: now ? now.text : null });
      if (printedIds) {
        const onPaper = talkFor(card, printedIds);
        if (onPaper && onPaper !== now && onPaper.about && !present.has(onPaper.about)) push(onPaper);
      } else {
        for (const t of card.talk || []) { if (t === now) break; push(t); }
      }
      const r = printedIds ? rumourFor(card, printedIds) : card.rumour;
      if (r && r.about && !present.has(r.about)) out.push({ kind: 'whisper', holder: c.id, holderName: c.short, about: r.about, aboutName: short(r.about), printed: r.text });
    }
    return out;
  }

  /* ---------- guest phones (play.html) ---------- */
  /* Which cards a guest may see: every stage already reached, and this stage's once the cards are out. */
  function cardsOpen(data, progress) {
    const p = progress || {};
    if (!p.prologueDone) return 0;
    if (p.screen === 'vote' || p.screen === 'result') return data.STAGE_IDS.length;
    const i = Number(p.stageIndex) || 0;
    return Math.min(data.STAGE_IDS.length, p.phase && p.phase !== 'narration' ? i + 1 : i);
  }
  /* A game where guests must work out their own name sets data.nameRevealStage (a stage id): the phone
     shows only the room or character number until that stage is over. Without it the name shows at once. */
  function nameKnown(data, progress) {
    if (!data.nameRevealStage) return true;
    const p = progress || {};
    const at = data.STAGE_IDS.indexOf(data.nameRevealStage);
    const i = Number(p.stageIndex) || 0;
    return Boolean(p.prologueDone) && (i > at || (i === at && p.phase === 'done') || p.screen === 'vote' || p.screen === 'result');
  }
  const PHONE_RULES = [
    'At each stage, a new card appears here when the hosts say "cards out". Read it quietly first, then do what it says.',
    'Never show your phone to anyone. Your cards are only for you.',
    'The whisper at the foot of a card is something true about another guest, without a name. Who is it? Raise your table talk aloud.'
  ];
  /* One character's card for one stage, as the phone shows it: the same parts as the printed card. */
  function playerCard(data, c, sid, presentIds) {
    const card = c.cards[sid];
    const st = data.stages.find((x) => x.id === sid) || {};
    const talk = talkFor(card, presentIds);
    const whisper = rumourFor(card, presentIds);
    const strip = card.ledger && data.ledger ? data.ledger.find((x) => x.number === card.ledger) : null;
    const orders = [card.secretSign ? data.SIGN : null, card.sabotage || null, card.lie || null].filter(Boolean);
    const witness = sid === '3.2' && c.witness && data.witnessCards ? data.witnessCards[c.team].text : null;
    return { id: sid, label: `${sid.includes('.') ? 'Stage' : 'Scene'} ${sid}`, title: st.title || '', text: card.text, story: card.alibi || null, witness,
      spot: card.spot || null, question: card.question || null, word: card.word || null, strip: strip ? { number: strip.number, text: strip.text } : null,
      orders, talk: talk ? talk.text : null, whisper: whisper ? whisper.text : null };
  }
  /* The picture envelopes a team has opened (progress.opened holds "<team>-<stage>" keys): what was inside,
     so a phone is always enough, even without the printed sheets. */
  function openedFor(data, team, opened) {
    return (opened || []).filter((k) => k.startsWith(team + '-')).map((k) => {
      const sid = k.slice(team.length + 1);
      const env = data.teamEnvelopes && data.teamEnvelopes[team] && data.teamEnvelopes[team][sid];
      if (!env) return null;
      const w = sid === '3.2' && data.witnessCards ? data.witnessCards[team] : null;
      return { stage: sid, picture: env.picture, title: env.title, text: w ? w.text : env.text, reader: w ? w.reader : null };
    }).filter(Boolean);
  }
  /* Everything one guest's phone may show right now, and nothing more. */
  function playerView(data, characterId, progress) {
    const c = data.characters.find((x) => x.id === characterId);
    if (!c) return null;
    const p = progress || {};
    const presentIds = p.presentIds && p.presentIds.length ? p.presentIds : data.characters.filter((x) => !x.optional).map((x) => x.id);
    const known = nameKnown(data, p);
    const stage = p.prologueDone ? data.stages[Math.min(Number(p.stageIndex) || 0, data.stages.length - 1)] : null;
    return {
      number: c.room || c.index, name: known ? c.name : null, image: c.image, costume: c.costume, intro: c.intro,
      cards: data.STAGE_IDS.slice(0, cardsOpen(data, p)).map((sid) => playerCard(data, c, sid, presentIds)),
      stage: stage ? `${stage.id.includes('.') ? 'Stage' : 'Scene'} ${stage.id} of ${data.STAGE_IDS[data.STAGE_IDS.length - 1]}` : null,
      started: Boolean(p.prologueDone), over: p.screen === 'vote' || p.screen === 'result',
      rules: data.phoneRules || PHONE_RULES, numberLabel: c.room ? 'Room' : 'Guest',
      found: openedFor(data, c.team, p.opened)
    };
  }

  function voiceGroup(data, group) { return voiceLines(data).filter((l) => l.group === group); }

  const logic = { buildRoster, orphanedClues, teamSentence, tally, formatRemaining, talkFor, rumourFor, cardFixes, voiceLines, voiceGroup, cardsOpen, nameKnown, playerCard, playerView, openedFor, readerFor, voiceForSpeaker };

  root.BM = root.BM || {};
  root.BM.logic = logic;
  if (typeof module !== 'undefined' && module.exports) module.exports = logic;
})(typeof window !== 'undefined' ? window : globalThis);
