(function (root) {
  const data = root.BM.data;
  const logic = root.BM.logic;

  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  /* No emoji in print: colour emoji are bitmaps inside the font, and many printer drivers stop at
     the first page that carries one. Guests are named in plain text instead. */
  function charById(id) { return data.characters.find((c) => c.id === id); }
  function stageTitle(i) { return `${data.STAGE_IDS[i]} ${data.stages[i].title}`; }
  function teamLabel(team) { return team === 'julien' ? 'TEAM JULIEN' : 'TEAM VICTOR'; }

  function introSheet(c) {
    return `<div class="sheet intro">
      <img class="portrait" src="${c.image}" alt="">
      <h1>${esc(c.name)}</h1>
      <p><em>${esc(c.costume)} · The Paris Opera, Mardi Gras night, 1882</em></p>
      <h2>Who you are</h2><p>${esc(c.intro.text)}</p>
      <h2>How to act</h2><p>${esc(c.intro.act)}</p>
      <h2>Your quirk, all night</h2><p>${esc(c.intro.quirk)}</p>
      <h2>Your public line (say it to everyone)</h2><div class="boxed">“${esc(c.intro.publicLine)}”</div>
      <div class="intro-rules"><h2>How the night works</h2>
      <p>Every guest has an envelope on the table with their own picture on it. At each stage, take only the top card from <strong>your</strong> envelope (${esc(c.short)}) and check its stage number. Never look further down the pile, and never open anyone else's envelope. Read your cards privately unless the card says otherwise. Keep your cards; you will need them.</p>
      <p>The foot of every card carries a whisper: something true about another guest, who is never named. Work out who it is about, and use it. Most cards also carry <strong>table talk</strong>: a question to raise aloud in the discussion. Raise it.</p>
      <p>${data.killerIds.length === 1 ? 'At the end, each guest stands and names one suspect out loud. If the killer is clearly the most accused, the Count lives. If not, the killer wins.' : 'At the end, each guest stands and accuses two suspects out loud. The house wins only if both killers are clearly the top two.'}</p><p>Your phone can show all of this: scan the code on the TV, and the host gives your phone your character.</p></div>
    </div>`;
  }

  function allPresent() { return data.characters.map((x) => x.id); }

  function cardHtml(c, i, presentIds) {
    const sid = data.STAGE_IDS[i];
    const card = c.cards[sid];
    const parts = [];
    parts.push(`<div class="head"><span>${esc(c.short)}</span><span>Stage ${esc(stageTitle(i))}</span></div>`);
    if (card.word) parts.push(`<div>Your team word is number <strong>${card.word.index}</strong>:</div><div class="word">${esc(card.word.text)}</div>`);
    if (card.alibi) parts.push(`<p>Read aloud, exactly:</p><p>“${esc(card.alibi)}”</p>`);
    else parts.push(`<p>${esc(card.text)}</p>`);
    if (card.ledger) parts.push(`<p><strong>Torn strip ${card.ledger} lies under this card in your envelope (and is on your phone).</strong></p>`);
    if (card.secretSign) parts.push(`<div class="sab">${esc(data.SIGN)}</div>`);
    if (card.sabotage) parts.push(`<div class="sab">${esc(card.sabotage)}</div>`);
    if (card.lie) parts.push(`<div class="sab">${esc(card.lie)}</div>`);
    const talk = logic.talkFor(card, presentIds || allPresent());
    if (talk) parts.push(`<div class="talk">${esc(talk.text)}</div>`);
    const rumour = logic.rumourFor(card, presentIds || allPresent());
    if (rumour) parts.push(`<div class="whisper">${esc(rumour.text)}</div>`);
    return `<div class="card">${parts.join('')}</div>`;
  }

  function cardPages(c, presentIds) {
    const cards = data.STAGE_IDS.map((_, i) => cardHtml(c, i, presentIds));
    const pages = [];
    for (let p = 0; p < cards.length; p += 4) {
      const chunk = cards.slice(p, p + 4);
      while (chunk.length < 4) chunk.push('<div class="card"></div>');
      pages.push(`<div class="sheet"><div class="card-grid">${chunk.join('')}</div></div>`);
    }
    return pages.join('');
  }

  function characterPack(c, presentIds) { return introSheet(c) + cardPages(c, presentIds); }

  /* Envelope covers: one per guest with their portrait (their cards go inside, top card first),
     and the six picture envelopes for the team stages (two of them empty decoys). */
  function covers(picturesOnly) {
    const guests = data.characters.map((c) => `<div class="cover"><img src="${c.image}" alt=""><div class="cv-name">${esc(c.short)}</div><div class="cv-note">${esc(c.costume)}</div><div class="cv-note">Box Five · Mardi Gras 1882<br>Take only the top card, one stage at a time</div></div>`);
    const pictures = data.PICTURES.map((p) => `<div class="cover picture">${root.BM.art[p]}<div class="cv-note">Box Five · only the host opens this, when a team names it</div></div>`);
    const all = picturesOnly ? pictures : [...guests, ...pictures];
    const pages = [];
    for (let i = 0; i < all.length; i += 2) pages.push(`<div class="sheet"><div class="cover-grid">${all.slice(i, i + 2).join('')}</div></div>`);
    return pages.join('');
  }

  /* What the host puts in each guest's envelope, top to bottom. */
  function stocking() {
    return data.characters.map((c) => {
      const strip = data.ledger.find((x) => x.holder === c.id);
      return `<li><strong>${esc(c.short)}:</strong> cards ${data.STAGE_IDS[0]} to ${data.STAGE_IDS[data.STAGE_IDS.length - 1]}, 1.1 on top${strip ? `, torn strip ${strip.number} under the 2.3 card` : ''}</li>`;
    }).join('');
  }

  function envelopes() {
    const out = [];
    for (const team of ['julien', 'victor']) {
      for (const sid of ['3.1', '3.2']) {
        const env = data.teamEnvelopes[team][sid];
        out.push(`<div class="sheet"><h1>${teamLabel(team)} · Stage ${sid}</h1><p><em>Put this in the ${esc(env.picture)} envelope on the table. The team sentence is: ${esc(env.sentence)}.</em></p><h2>${esc(env.title)}</h2><div class="boxed"><p>${esc(env.text)}</p></div></div>`);
      }
      const w = data.witnessCards[team];
      out.push(`<div class="sheet"><h1>${teamLabel(team)} · The witness</h1><p><em>Put this in the ${esc(data.teamEnvelopes[team]['3.2'].picture)} envelope on the table, for stage 3.2. To be read aloud by ${esc(charById(w.reader).name)}, or by ${esc(w.ghost)} if absent.</em></p><div class="boxed"><p>${esc(w.text)}</p></div></div>`);
    }
    return out.join('');
  }

  function ledger() {
    const strips = data.ledger.map((s) => {
      const holder = charById(s.holder);
      return `<div class="strip"><div class="margin"><div class="bar-no">${s.number}</div></div><div class="body">${esc(s.text)}<br><small>holder: ${esc(holder.short)} (put in their envelope, under the 2.3 card)</small></div></div>`;
    });
    /* Two deliberate pages of strips, each with its own heading, so no page starts with stray strips. */
    const half = Math.ceil(strips.length / 2);
    const pages = [strips.slice(0, half), strips.slice(half)].filter((x) => x.length);
    return pages.map((list, i) => `<div class="sheet"><h1>${esc(data.setPieces.ledger.title)}${pages.length > 1 ? ` <small>· page ${i + 1} of ${pages.length}</small>` : ''}</h1><p><em>Cut along the dashed lines. Each strip goes into its holder's envelope, under their 2.3 card. The bar number in the margin orders the page: 1 to 10.</em></p>${list.join('')}</div>`).join('');
  }

  /* Stage 3.4: the letter to lock in the box, and the host's notes. Nothing is hidden: the box stands on
     the table all night and the host opens it when the table says the word. */
  function box() {
    const b = data.box;
    return `<div class="sheet letter"><p class="lt-outside">${esc(b.letter.outside)}</p><h1>${esc(b.letter.title)}</h1><p>${esc(b.letter.text)}</p></div>
    <div class="sheet"><h1>The box · stage 3.4</h1>
      <ol>
        <li>Fold the letter, seal it, and lock it in the box. Keep the key in your pocket all night. Nothing is hidden: the box stands on the table from the start.</li>
        <li>At 3.4, every guest reads one rule about the five-letter word. The word is <strong>${esc(b.word)}</strong>.</li>
        <li>House rule, read out at the start of 3.4: ${esc(b.rule)}</li>
        <li>When someone says ${esc(b.word)}, unlock the box, hand them the letter and press "The box is open". The narrator reads it (it is also on the TV). If they are still wrong after 4 minutes, say: "Debray's rules never lie. Only people do." At 6 minutes, open it anyway.</li>
      </ol>
    </div>`;
  }

  /* Things to find before the night: nothing here is printed. */
  const PROPS = [
    'Optional: a C5 envelope per guest for the printed cards, plus six picture envelopes (Plant, Television, Bookshelf, Lamp, Clock, Mirror). Phones are enough without them.',
    'Glasses on a tray for the toast. Tie a gold ribbon round one: the gold-rimmed glass of Box Five, for the Count.',
    'The lockable box and its padlock, on the table all night, with Debray\'s letter locked inside. You keep the key; the spare keys are not needed.',
    'The cabinet: the six picture envelopes stand on it, in plain sight. Only you open them.',
    'Optional: a "sandbag" (a cloth bag of rice or a cushion) to drop on the floor in the blackout after 1.3, and a letter in red ink under the tray at the toast.',
    'Optional: napkins and a pen near the pianist, so Armand can draw his little treble clefs.'
  ];

  /* The host's run sheet: headlines and what has to happen, in order, on two pages. */
  function runSheet() {
    const row = (head, sub, items) => `<tr><th>${head}${sub ? `<br><small>${esc(sub)}</small>` : ''}</th><td><ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></td></tr>`;
    const kind = { individual: 'On your own', group: 'Find alone, solve together', team: 'Teams' };
    const before = row('Before', 'the guests arrive', [
      'Tick everyone you expect on the setup screen, then print. Someone missing on the night: untick them, use their stand-in sheet. Props: see the host guide.',
      'Optional paper: lay the guests\' envelopes on the table, 1.1 on top. Stand the six picture envelopes on the cabinet (Television and Clock stay empty).',
      'The box: Debray\'s letter locked inside, on the table. The key stays in your pocket.',
      'Guests\' phones: they scan the code on the TV; give each phone its character on the laptop.',
      'Laptop: open the site. TV: press "Open TV screen", click it once, press F.',
      'Hand out the intro sheets at the door. Optional: "Introduce the game".'
    ]);
    const prologue = row('Prologue', 'The Toast', [
      'Press "Begin the night". Victor gives the toast (or lets the recording speak).',
      'Julien drinks from the gold-rimmed glass. Colette knocks his arm. Julien falls; Dr. Roussel kneels by him (Victor does, if the doctor is absent).',
      'Press "He lives". Everyone takes their first card.'
    ]);
    const loop = '<p class="rs-loop"><strong>Every stage:</strong> the voices speak → <strong>Cards out</strong> (everyone takes the top card) → <strong>Start discussion</strong> → <strong>End discussion</strong> → <strong>Next stage</strong>. The host panel shows absent guests\' lines and the answers.</p>';
    const rows = data.stages.map((st) => row(`${esc(st.id)} ${esc(st.title)}`, `${kind[st.kind]}${st.minutes ? ` · ${st.minutes.cards} + ${st.minutes.discuss} min` : ''}`, st.run || []));
    const end = row('Vote', 'and reveal', [
      'Round the table: each guest stands and says "I accuse X", with one reason. Enter each as it is said. You do not vote. A tie for first: 30 seconds of defence each, then each guest names one of them aloud.',
      'Press "Reveal the killer". Julien names the Ghost. Then the ending: the Count lives, or the Ghost wins.',
      'Optional: "Tell the whole story".'
    ]);
    const scene = (n) => `<tr class="rs-scene"><td colspan="2">Scene ${n}: ${esc(data.scenes[n - 1].title)}</td></tr>`;
    const body = [before, prologue, scene(1), ...rows.slice(0, 3), scene(2), ...rows.slice(3, 6), scene(3), ...rows.slice(6), end].join('');
    return `<div class="sheet runsheet"><h1>Host run sheet</h1><p><em>Box Five · what happens, in order. Answers and details are in the host guide and on the laptop.</em></p>${loop}<table>${body}</table></div>`;
  }

  /* The host guide's stage-by-stage section: how the two hosts split the night, then every stage with
     what happens, the buttons, the notes and the answers, all drawn from the game data. */
  const KIND = { individual: 'On your own', group: 'Whole room', team: 'Teams' };
  const HOST_SPLIT = [
    'Victor (the host) plays a suspect and runs the night: the laptop or phone remote, the buttons, the timers and the host panel. He is innocent, knows the whole answer, and does not vote.',
    'Victor reads the lines of absent guests (host panel, or their stand-in sheets), and opens the picture envelopes.',
    'Julien is a guest, alive all night. He reads his announcement at the end of 1.3 from his phone or the TV (or lets the recording speak), and leads Team Julien in Scene 3.',
    'The blackout after 1.3: when the screen goes dark, switch off the room lights, drop the sandbag, and switch them on again when the screen says so. Rosalie pulls Julien away in the dark.',
    'The recorded voices are the Narrator, the Ghost\'s letters, Victor and Julien. Mute "Voice-over" to speak the lines yourselves.'
  ];
  const TEAM_STEPS = [
    'Cards out: everyone takes their card. It shows their team word and its number, plus a personal clue to say aloud.',
    'Each team says its words aloud in number order. Victor says the words of absent teammates (host panel).',
    'The six picture envelopes stand on the cabinet; only Victor opens them. A team names one. Right: hand it over and press "Show on the TV" for that team (its phones show it too). Wrong (a decoy, or the other team\'s picture): shake your head, and the team waits one minute.',
    'Stuck for 3 minutes? Whisper the next wrong or missing word. Still stuck at 5 minutes? Whisper the whole sentence, which also exposes the killer\'s wrong word.',
    'Press +1 min as needed, then "Start discussion" once both teams have their evidence. Each team shows the room what it found.',
    'Rules: everyone must say the word on their card; the killers may say it wrong. Nobody reads anyone else\'s card.'
  ];

  function teamTable(sid) {
    const rows = ['julien', 'victor'].map((team) => {
      const env = data.teamEnvelopes[team][sid];
      const words = data.characters.filter((c) => c.team === team && c.cards[sid].word)
        .sort((a, b) => a.cards[sid].word.index - b.cards[sid].word.index)
        .map((c) => `${c.cards[sid].word.index} ${esc(c.cards[sid].word.text)} (${esc(c.short)}${c.optional ? '*' : ''}${c.killer ? ', killer' : ''})`).join(' · ');
      const killer = data.characters.find((c) => c.team === team && c.killer);
      const trap = killer && killer.cards[sid].sabotage ? esc(killer.cards[sid].sabotage.split('. ')[0]) + '.' : '';
      return `<tr><th>${teamLabel(team)}</th><td><strong>${esc(env.sentence)}</strong> → <strong>${esc(env.picture)}</strong><br><small>${words}</small><br>Inside: <strong>${esc(env.title)}</strong>. ${esc(env.text)}${trap ? `<br><em>${esc(killer.short)}'s trap:</em> ${trap}` : ''}</td></tr>`;
    });
    return `<table>${rows.join('')}</table><p><small>* optional guest. Decoys: ${data.DECOYS.map(esc).join(' and ')} (empty).</small></p>`;
  }

  function stageByStage() {
    const li = (items) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
    const parts = [`<div class="gs-block"><h2>How the hosts split the night</h2>${li(HOST_SPLIT)}</div>`,
      `<h2>Stage by stage</h2>`,
      `<div class="gs-stage"><h3>Prologue · The Toast</h3>${li(['Press "Begin the night". Victor gives the toast.', 'Julien drinks from the gold-rimmed glass. Colette knocks his arm. He falls; Dr. Roussel saves him (Victor plays the doctor if he is absent).', 'Press "He lives". Everyone takes their first card.'])}</div>`];
    data.stages.forEach((st) => {
      let extra = '';
      if (st.id === '2.3') extra = `<p><strong>The torn page, in order:</strong> ${data.ledger.map((x) => `${x.number} ${esc(charById(x.holder).short)}`).join(' · ')}</p>`;
      if (st.id === '3.1') extra = `<p><strong>How a team round runs (3.1 and 3.2):</strong></p><ol>${TEAM_STEPS.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>${teamTable('3.1')}`;
      if (st.id === '3.2') extra = teamTable('3.2') + `<p>Witness readers: ${['julien', 'victor'].map((t) => `${esc(charById(data.witnessCards[t].reader).short)} (${teamLabel(t)}), or ${esc(data.witnessCards[t].ghost)}`).join('; ')}.</p>`;
      if (st.id === '3.4') extra = `<p><strong>Answer:</strong> the word is ${esc(data.box.word)}. ${esc(data.box.rule)} ${data.killerIds.map((id) => `${esc(charById(id).short)}: ${esc(charById(id).cards['3.4'].sabotage.split('. ')[0])}.`).join(' ')}</p>`;
      parts.push(`<div class="gs-stage"><h3>${esc(st.id)} ${esc(st.title)} · ${esc(KIND[st.kind] || st.kind)}${st.minutes ? ` · ${st.minutes.cards} + ${st.minutes.discuss} min` : ''}</h3>${li(st.run || [])}<p><em>Notes:</em> ${esc(st.hostNotes)}</p>${extra}</div>`);
    });
    parts.push(`<div class="gs-stage"><h3>Vote and reveal</h3>${li(['Go round the table. Each guest stands and says "I accuse X", with one reason. The killer accuses too, and may lie. Victor does not vote. Enter each accusation on the laptop as it is said; the TV tally grows with every one.', 'Tie for first place? The tied guests get 30 seconds each to defend themselves, then go round again: each guest names one of them aloud.', 'Press "Reveal the killer". Julien names the Ghost. Then "The Ghost is unmasked" (the Count lives) or "The Ghost wins" (the losing ending plays).', 'Optional: "Tell the whole story".'])}</div>`);
    return parts.join('');
  }

  function guide(roster) {
    roster = roster || logic.buildRoster(data, { presentIds: data.characters.map((c) => c.id) });
    const killers = data.killerIds.map((id) => charById(id)).map((c) => `<div class="gs-block"><h3>${esc(c.name)}</h3><ul>${data.STAGE_IDS.filter((sid) => c.cards[sid].sabotage || c.cards[sid].lie).map((sid) => `<li><strong>${sid}:</strong> ${esc(c.cards[sid].sabotage || c.cards[sid].lie)}</li>`).join('')}</ul></div>`).join('');
    const sentences = ['3.1', '3.2'].map((sid) => ['julien', 'victor'].map((team) => { const ts = logic.teamSentence(data, roster, team, sid); return `<li><strong>${sid} ${teamLabel(team)}:</strong> ${esc(ts.sentence)} → the ${esc(ts.picture)} envelope</li>`; }).join('')).join('');
    const alibis = data.characters.map((c) => `<li><strong>${esc(c.short)}:</strong> “${esc(c.cards['3.3'].alibi)}”${c.cards['3.3'].lie ? ` <strong>LIE.</strong> ${esc(c.cards['3.3'].lie)}` : ''}</li>`).join('');
    return `<div class="sheet guide">
      <h1>Host guide</h1>
      <div class="gs-block"><h2>Night-of checklist</h2>
      <ol>
        <li>Phones are enough: every card, torn strip, team word, envelope and witness card reaches the guests' phones. Paper is a backup.</li>
        <li>For paper: print the packs, cut the cards, and fill each guest's envelope with their own cards, face down, 1.1 on top and 3.4 at the bottom, and their torn strip under the 2.3 card (list below).</li>
        <li>Put the team evidence and the witness cards in the picture envelopes (team sentences below) and stand all six on the cabinet. Television and Clock are empty decoys.</li>
        <li>Lock Debray's letter in the box and put it on the table. The key stays in your pocket.</li>
        <li>Before printing, tick everyone you expect on the setup screen; the cards' table talk and whispers are chosen for them. Anyone who then does not come: untick them on the night and use their stand-in sheet.</li>
        <li>Open the website, set the roster, open the TV window, test the sound. Guests scan the code on the TV; give each phone its character.</li>
        <li>Fill the glasses. The gold-ribboned glass is Julien's.</li>
        <li>Victor gives the toast. Julien falls. Play.</li>
      </ol></div>
      <div class="gs-block"><h2>Props</h2><ul>${PROPS.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
      ${stageByStage()}
      <div class="gs-block"><h2>What goes in each guest's envelope</h2><ul>${stocking()}</ul></div>
      <div class="gs-block"><h2>The box</h2><p>The word: ${esc(data.box.word)}. ${esc(data.box.rule)}</p></div>
      <div class="gs-block"><h2>Team sentences</h2><ul>${sentences}</ul></div>
      <h2>${data.killerIds.length === 1 ? 'The killer and his orders' : 'The killers and their orders'}</h2>${killers}
      <div class="gs-block"><h2>Alibis</h2><ul>${alibis}</ul></div>
      <div class="gs-block"><h2>Absent guests</h2><p>After this guide come the stand-in sheets: one for every guest except the killer, the Count and the host, with what to say for them at each stage and which printed cards mention them. Pull out the sheets of whoever does not come, and untick them on the setup screen: the laptop shows the same lines and plays the important ones on the TV.</p></div>
    </div>`;
  }

  /* One sheet per guest who could be absent (everyone but the killers): what to say for them at every
     stage, and which printed cards mention them. Pull out the sheets of whoever does not come. */
  function standins(roster) {
    const printed = roster && roster.present ? roster.present.map((c) => c.id) : allPresent();
    return data.characters.filter((c) => !(data.requiredIds || []).includes(c.id)).map((x) => {
      const without = data.characters.map((c) => c.id).filter((id) => id !== x.id);
      const r = logic.buildRoster(data, { presentIds: without });
      const lines = data.STAGE_IDS.map((sid) => {
        const items = logic.orphanedClues(data, r, sid);
        if (!items.length) return '';
        const said = items.map((o) => {
          if (o.kind === 'word') return `Their team word: <strong>${esc(o.text)}</strong>, number ${o.index}.`;
          if (o.kind === 'witness') return `<strong>Witness card</strong>, ${esc(o.reader)} reads it${o.group ? ' <span class="tv">TV</span>' : ''}.`;
          return `${esc(o.text)}${o.group ? ' <span class="tv">TV</span>' : ''}`;
        }).join(' ');
        return `<tr><th>${sid}<br><small>${esc(items[0].reader)}</small></th><td>${said}</td></tr>`;
      }).join('');
      /* What the printed cards say about this guest: only lines printed while they were ticked. */
      const wasTicked = printed.includes(x.id);
      const talk = [];
      const whispers = [];
      if (wasTicked) {
        const after = printed.filter((id) => id !== x.id);
        data.STAGE_IDS.forEach((sid) => data.characters.filter((c) => printed.includes(c.id) && c.id !== x.id).forEach((c) => {
          const card = c.cards[sid];
          const t = logic.talkFor(card, printed);
          if (t && t.about === x.id) {
            const instead = logic.talkFor(card, after);
            talk.push(`<li><strong>${sid} ${esc(c.short)}:</strong> ${instead ? `ask instead: “${esc(instead.text)}”` : 'skip it.'}</li>`);
          }
          const w = logic.rumourFor(card, printed);
          if (w && w.about === x.id) whispers.push(`${sid} ${esc(c.short)}`);
        }));
      }
      const cards = !wasTicked
        ? `<p>${esc(x.short)} was not ticked when this pack was printed, so no other card mentions them.</p>`
        : `${talk.length ? `<p><strong>Table talk on other cards that asks about ${esc(x.short)}</strong> (tell the guest when they take that card):</p><ul>${talk.join('')}</ul>` : ''}${whispers.length ? `<p><strong>Whispers that describe ${esc(x.short)}:</strong> ${whispers.join(' · ')}. They fit nobody tonight. If someone asks, the whisper is about a guest who could not come.</p>` : ''}`;
      return `<div class="sheet standin">
        <h1>If ${esc(x.name)} is absent</h1>
        <p><em>Untick ${esc(x.short)} on the setup screen before the game. The laptop's host panel then shows these lines at each stage, and plays the ones marked <span class="tv">TV</span> in ${esc(x.short)}'s own voice. This sheet is the paper copy. Keep ${esc(x.short)}'s envelope: the ledger strip is used at 2.3.</em></p>
        <table>${lines}</table>
        <h2>Cards that mention ${esc(x.short)}</h2>${cards}
      </div>`;
    }).join('');
  }

  /* "Print everything": the whole pack in one job, host material first, the players' packs last. */
  const EVERYTHING = ['runsheet', 'guide', 'standins', 'box', 'envelopes', 'ledger', 'covers', 'all'];
  /* Guests on phones: everything but the guests' own cards and envelopes. The torn strips are printed
     too (the phone shows each guest their strip, but laying the paper in order is the fun). */
  const PHONES = ['runsheet', 'guide', 'standins', 'box', 'envelopes', 'ledger', 'picturecovers'];

  function build(kind, id, roster) {
    const presentIds = roster && roster.present ? roster.present.map((c) => c.id) : allPresent();
    if (kind === 'everything') return EVERYTHING.map((k) => build(k, id, roster)).join('');
    if (kind === 'phones') return PHONES.map((k) => build(k, id, roster)).join('');
    if (kind === 'picturecovers') return covers(true);
    if (kind === 'all') return data.characters.map((c) => characterPack(c, presentIds)).join('');
    if (kind === 'character') return characterPack(charById(id), presentIds);
    if (kind === 'covers') return covers();
    if (kind === 'box') return box();
    if (kind === 'envelopes') return envelopes();
    if (kind === 'ledger') return ledger();
    if (kind === 'guide') return guide(roster);
    if (kind === 'runsheet') return runSheet();
    if (kind === 'standins') return standins(roster);
    return '';
  }

  function open(kind, id, roster) {
    const rootNode = document.getElementById('print-root');
    rootNode.innerHTML = build(kind, id, roster);
    const cleanup = () => { rootNode.innerHTML = ''; window.removeEventListener('afterprint', cleanup); };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => window.print(), 50);
  }

  root.BM = root.BM || {};
  root.BM.print = { open, build, characterPack, covers, envelopes, box, ledger, guide, runSheet };
})(window);
