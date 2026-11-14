(function (root) {
  /* The whole story of Box Five, told slide by slide for the host's "Full story" tab.
     Every slide is narrated aloud (voice: narrator, julien, victor) and drawn by js/story-view.js.
     layout: title | portrait | duo | gallery | evidence | ghosts
     memorial: the Ghost's letter; risen: the Opera Ghost's mask.
     people: character ids whose portraits appear; killers: ids drawn with the blood-red frame.
     chips: evidence tags that pop in one by one (lie: true marks a broken alibi).
     scene: backdrop tint 0-3; sfx: a sound from BM.audio played when the slide starts;
     effect: flicker (lights out), flash (lightning), ghost (cold glow). */

  const slides = [
    /* ---------- I. The house ---------- */
    {
      id: 'open', chapter: 'Prologue', layout: 'title', scene: 0, sfx: 'toll', voice: 'narrator',
      title: 'The Whole Story', kicker: 'Box Five · Mardi Gras, 1882',
      text: 'Every opera has a story the audience never sees. This is the one behind the curtain, from the cellars to the last waltz.'
    },
    {
      id: 'house', chapter: 'I. The house', layout: 'evidence', scene: 1, sfx: 'wind', voice: 'narrator',
      title: 'A house with hollow walls', kicker: '1872 to 1875',
      chips: [{ text: 'Garnier\'s office' }, { text: 'The cellars and the lake' }, { text: 'Box Five' }, { text: 'A hollow pillar' }],
      text: 'When Monsieur Garnier built the new Paris Opera, a young man in his office drew the cellars. He loved music more than lines. In the pillar of Box Five he drew a door that was never in the official plans, with stairs up to the ropes above the stage and down to the black lake under the house. He signed it, as he signed everything, with a tiny treble clef.'
    },
    {
      id: 'ghost-born', chapter: 'I. The house', layout: 'memorial', scene: 1, sfx: 'whisper', voice: 'narrator',
      title: 'The Ghost is born', kicker: '1876',
      text: 'The house opened. The young man came back, not as a draughtsman, but as the rehearsal pianist. Nobody looks at the pianist. Soon the first letters in red ink arrived, signed O.G. The Opera Ghost wanted Box Five kept empty, and twenty thousand francs a month in its drawer. The managers laughed. Then a few small accidents happened, and they stopped laughing.'
    },
    {
      id: 'g-victor', chapter: 'I. The house', layout: 'portrait', scene: 1, voice: 'victor', people: ['victor'],
      title: 'Victor Lambert', kicker: 'The Manager',
      text: 'I took over the Opera in 1880, and the Ghost\'s letters came with the keys. I paid. Every month, twenty thousand francs from the cash box, written in the books as repairs. I was a young clerk in Garnier\'s office once. I sat ten meters from the boy who drew that door, and I never learned his name.'
    },
    {
      id: 'g-rosalie', chapter: 'I. The house', layout: 'portrait', scene: 1, voice: 'narrator', people: ['rosalie'],
      title: 'Madame Rosalie Fournier', kicker: 'Keeper of Box Five',
      text: 'Rosalie carried the Ghost\'s letters for fifty francs a month and never saw his face. On Mardi Gras afternoon she found his own page in the drawer of Box Five. She read it, she was afraid, and she did the bravest thing in this story: she tore it in ten and hid a piece in every envelope. Then she watched rope seven all night.'
    },
    /* ---------- II. Before the ball ---------- */
    {
      id: 'g-julien', chapter: 'II. Before the ball', layout: 'portrait', scene: 1, voice: 'julien', people: ['julien'],
      title: 'Count Julien de Valmont', kicker: 'The target',
      text: 'I bought shares in the Opera with money I did not have. In the books I found the payments to O.G. In the archive I found the drawing of Box Five, with a door in the pillar and a tiny mark in the corner. I told Le Figaro I would unmask the Ghost at midnight. I did not know whose mark it was. I was bluffing. The Ghost did not know that.'
    },
    {
      id: 'g-armand', chapter: 'II. Before the ball', layout: 'portrait', scene: 1, voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'Armand Léger', kicker: 'The Pianist, and the Ghost',
      text: 'Armand Léger said he studied ten years in Milan. He never went to Milan. He was the boy in Garnier\'s office, and he was the Opera Ghost. When the Count found his drawing, Armand decided the Count would not see Ash Wednesday. He took the F string out of his own piano a month before, and tied sandbag seven to it. Since then, he hummed the missing note.'
    },
    {
      id: 'g-colette', chapter: 'II. Before the ball', layout: 'portrait', scene: 1, voice: 'narrator', people: ['colette'],
      title: 'Colette Marchand', kicker: 'Of the Chorus',
      text: 'For a year a voice taught Colette to sing through the wall of her dressing room. She called him her Angel. He was the Ghost, playing a piano in the passage behind the wall, humming the note it could not play. He told her to stay away from the Count. She was secretly engaged to him instead.'
    },
    /* ---------- III. The toast ---------- */
    {
      id: 'bottle', chapter: 'III. The toast', layout: 'evidence', scene: 1, sfx: 'tick', voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'The brown bottle', kicker: '10:20 to 10:40',
      chips: [{ text: 'The doctor\'s bag, rehearsal room' }, { text: 'Bellini: three drops, 10:20' }, { text: 'Black domino, white mask: 10:30' }, { text: 'Out the door: 10:40' }],
      text: 'The doctor left his black bag in the rehearsal room from ten until twenty to eleven. At twenty past ten Signora Bellini took her three drops; the bottle was full. At half past, a black domino with a white half-mask took the whole bottle, pressed a silent piano key, and hummed the note. Little Nina was behind the curtain with stolen champagne, and saw the red ink on the fingers.'
    },
    {
      id: 'g-lucia', chapter: 'III. The toast', layout: 'portrait', scene: 1, voice: 'narrator', people: ['lucia'],
      title: 'Signora Lucia Bellini', kicker: 'The Prima Donna',
      text: 'Bellini threatened to see the Count buried, and she took drops from the doctor\'s bag. She looked guilty all night. She was only tired: her voice was going, and three drops a night were all that let her sleep. But she was the one who noticed that the piano stopped in the dark, and started again from the beginning.'
    },
    {
      id: 'g-henri', chapter: 'III. The toast', layout: 'portrait', scene: 1, voice: 'narrator', people: ['henri'],
      title: 'Dr. Henri Roussel', kicker: 'The Opera\'s Doctor',
      text: 'The doctor sold sleep by the drop to half the ballet, and that is why his bag was full of it. He left it alone for forty minutes. When he came back, he held the door for a black domino, and he saw a red fingerprint on a white piano key. Then he saved the Count with an ice bucket and black coffee.'
    },
    {
      id: 'tray', chapter: 'III. The toast', layout: 'evidence', scene: 1, voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'One minute on the piano', kicker: '10:55',
      chips: [{ text: 'The gold-rimmed glass' }, { text: 'The tray on the piano' }, { text: 'Rosalie fixes her glove' }, { text: 'The letter under the tray' }],
      text: 'Victor set the gold-rimmed glass of Box Five on the tray and told the whole room it was the Count\'s. At five to eleven Rosalie carried the tray out and put it down on the piano for one minute, to fix her glove. The pianist was at the keys. The whole bottle went into the gold-rimmed glass, and a letter went under the tray. Then Armand played the toast music without a single mistake.'
    },
    {
      id: 'toast', chapter: 'III. The toast', layout: 'duo', scene: 1, sfx: 'heartbeat', voice: 'narrator', people: ['julien', 'colette'],
      title: 'The first try', kicker: '11:00',
      text: 'Victor raised his glass to the Opera and to Box Five. The Count drank. Colette, beside him, knocked his arm, and most of the champagne went on the floor. He drank one small mouthful. It was enough to drop him, and not enough to kill him. Under the tray lay the letter: That was the first try.'
    },
    /* ---------- IV. In the dark ---------- */
    {
      id: 'announce', chapter: 'IV. In the dark', layout: 'portrait', scene: 2, voice: 'julien', people: ['julien'],
      title: 'A bluff', kicker: '11:40',
      text: 'I stood up, still grey, and said I knew whose mark it was. I said I would say the name at midnight. I did not know. I wanted the Ghost to panic. It worked better than I wanted.'
    },
    {
      id: 'dark', chapter: 'IV. In the dark', layout: 'evidence', scene: 2, sfx: 'powerdown', effect: 'flicker', voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'Three minutes of dark', kicker: '11:45',
      chips: [{ text: 'The pianist asks the time' }, { text: 'The second waltz' }, { text: 'Into the pillar' }, { text: 'The gas, closed' }, { text: 'The wire, snapped' }],
      text: 'At quarter to twelve Armand asked the Baron the time, nodded, and started the second waltz. Half a minute later he slipped into Box Five and through the pillar. Inside, he closed the gas, and every lamp in the house went out. He climbed to the fly gallery, past sleeping Gustave, and snapped the piano wire that held sandbag seven over the Count\'s head.'
    },
    {
      id: 'saved', chapter: 'IV. In the dark', layout: 'memorial', scene: 2, sfx: 'glass', voice: 'narrator',
      title: 'Twice I missed',
      text: 'But Rosalie had read sandbag seven on the Ghost\'s page, and she had watched that rope all night. In the dark she pulled the Count away by the arm. The sandbag hit the stage where he had stood. The Ghost opened the gas, came back through the pillar, and began the waltz again, from the very beginning. On the curtain he pinned a new letter: Twice I missed.'
    },
    {
      id: 'g-gustave', chapter: 'IV. In the dark', layout: 'portrait', scene: 2, voice: 'narrator', people: ['gustave'],
      title: 'Gustave Picard', kicker: 'Chief Machinist',
      text: 'Gustave drank on duty and slept on the fly gallery. The dark woke him. He saw a lantern come out of the pillar of Box Five, heard a wire snap, and saw a face he knew from long ago: a young man on the building site, with a roll of drawings under his arm.'
    },
    {
      id: 'g-edouard', chapter: 'IV. In the dark', layout: 'portrait', scene: 2, voice: 'narrator', people: ['edouard'],
      title: 'Baron Édouard Vasseur', kicker: 'Patron',
      text: 'The Baron owed the Count fifty thousand francs, wore the same black domino and white mask as the Ghost, and carried a sword in his cane. Everything pointed at him except the truth. He had lived in Milan for six years, and he knew there had never been a pianist called Léger.'
    },
    {
      id: 'g-nina', chapter: 'IV. In the dark', layout: 'portrait', scene: 2, voice: 'narrator', people: ['nina'],
      title: 'Nina Petit', kicker: 'Ballet Dancer',
      text: 'Nina sold gossip to Le Figaro and hid behind curtains to find it. In the dark she ran to the piano, where she always hides, and sat on the bench. It was empty. Earlier, behind the rehearsal room curtain, she had seen the hands that took the bottle.'
    },
    /* ---------- V. The page and the teams ---------- */
    {
      id: 'page', chapter: 'V. The page', layout: 'evidence', scene: 2, voice: 'narrator',
      title: 'The torn page', kicker: 'Ten bars',
      chips: [{ text: 'V.L. pays' }, { text: 'La B.\'s drops' }, { text: 'The doctor\'s bag' }, { text: 'The little angel' }, { text: 'No. 7' }, { text: 'The gas wheel in the pillar' }, { text: 'My mark' }],
      text: 'Put together, Rosalie\'s ten strips were the Ghost\'s own plan: who paid him, where the bottle was, which glass the Count would use, which sandbag hung over the stage, when the dark would come, and why. J.V. has the old drawing with my mark. He must not see midnight. Everything except his name.'
    },
    {
      id: 'letter-2', chapter: 'V. The page', layout: 'risen', scene: 3, sfx: 'whisper', voice: 'narrator',
      title: 'The last letter',
      text: 'The Ghost sent one more letter: read every bar, it will not save him. He was wrong about that. The page had told them how. Now they needed who.'
    },
    {
      id: 'teams', chapter: 'V. The page', layout: 'duo', scene: 3, voice: 'victor', people: ['julien', 'victor'],
      title: 'Two committees',
      text: 'When the Opera has a problem, I make two committees. Team Julien took the poison. Team Victor took the sandbag. The pianist joined Team Julien and tried to send it to the clock. Twice.'
    },
    /* ---------- VI. The evidence ---------- */
    {
      id: 'wire', chapter: 'VI. The evidence', layout: 'evidence', scene: 3, voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'The bottle and the wire',
      chips: [{ text: 'The bottle in the pillar' }, { text: 'Bellini\'s music, red pencil' }, { text: 'A piano string, tagged F' }, { text: 'The dead F key' }],
      text: 'The bottle was in the crack of Box Five\'s pillar, wrapped in a page of Bellini\'s music covered in the pianist\'s red pencil. The sandbag had hung on a piano string with a paper tag: F. And the rehearsal piano had a dead F key for a month, which its player hummed instead. So did Colette\'s Angel. So did the black domino Nina saw.'
    },
    {
      id: 'alibi', chapter: 'VI. The evidence', layout: 'evidence', scene: 3, sfx: 'heartbeat', voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'The alibi',
      chips: [{ text: 'I never left the piano', lie: true }, { text: 'Bellini: three minutes, no music' }, { text: 'Rosalie: only the rope creaking' }, { text: 'Nina: the bench was empty' }],
      text: 'Armand said he never left the piano and played the waltz to the end. Bellini heard three minutes of silence and a waltz that began again from the start. Rosalie heard only the rope above her. Nina sat on the empty bench. One liar, one mistake.'
    },
    {
      id: 'angel', chapter: 'VI. The evidence', layout: 'evidence', scene: 3, voice: 'narrator', people: ['armand'], killers: ['armand'],
      title: 'Five letters',
      chips: [{ text: 'A first' }, { text: 'N after A' }, { text: 'E after G' }, { text: 'L last' }, { text: 'L after G', lie: true }],
      text: 'Old Debray\'s box opened with ANGEL. The pianist tried to make it ANGLE. Inside, Debray had written what he never dared to say: the draughtsman who drew the door in the pillar signed his drawings with a tiny treble clef, and still worked in the house. All night, Armand had drawn treble clefs on the napkins.'
    },
    /* ---------- VII. The reveal ---------- */
    {
      id: 'reveal', chapter: 'VII. The reveal', layout: 'portrait', scene: 3, sfx: 'ghost', effect: 'ghost', voice: 'julien', people: ['armand'], killers: ['armand'],
      title: 'The Ghost unmasked',
      text: 'Armand Léger. Our quiet pianist. You were never in Milan. You drew the door in my pillar, you poured the drops while the tray sat on your piano, and you dropped a sandbag on me with a string from your own piano. You hummed the missing note the whole time.'
    },
    {
      id: 'thanks', chapter: 'VII. The reveal', layout: 'duo', scene: 3, voice: 'julien', people: ['rosalie', 'colette'],
      title: 'Two arms',
      text: 'Two people saved me tonight. Colette knocked my glass, and Rosalie pulled me out of the dark. One of them I am going to marry. The other I am going to pay very well.'
    },
    {
      id: 'after', chapter: 'VII. The reveal', layout: 'gallery', scene: 0, voice: 'narrator', people: ['victor', 'julien', 'rosalie', 'lucia', 'colette', 'armand', 'henri', 'gustave', 'nina', 'edouard'], killers: ['armand'],
      title: 'What became of them',
      text: 'Victor stopped paying for repairs and confessed to the shareholders, who forgave him because the Count told them to. Bellini kept her part for one more season and taught Colette the rest. The doctor stopped selling sleep. Gustave stopped drinking, mostly. Nina sold the story of the year to Le Figaro. The Baron\'s debt was forgiven. Rosalie got a raise and a new pair of gloves.'
    },
    {
      id: 'end', chapter: 'VII. The reveal', layout: 'title', scene: 0, sfx: 'toll', voice: 'narrator',
      title: 'Curtain', kicker: 'The Paris Opera thanks you',
      text: 'And Box Five, for the first time in six years, was sold to the public. Some nights, people say, you can still hear one note humming inside the pillar. Please leave Box Five empty.'
    }
  ];


  /* Split narration into sentences for the voice and the highlighting. Titles like "Dr." and
     single initials such as "Z." do not end a sentence. */
  function splitSentences(text) {
    const guarded = String(text)
      .replace(/\b(Dr|Mr|Mrs|Ms|Mme|Pvt|St)\./g, '$1\u0000')
      .replace(/\b([A-Z])\.(?=\s*[A-Z]\.|\s+[a-z]|[,;:])/g, '$1\u0000');
    const parts = guarded.match(/[^.!?]+(?:[.!?]+["'’”)]*|$)/g) || [];
    return parts.map((p) => p.replace(/\u0000/g, '.').trim()).filter(Boolean);
  }

  /* About 150 spoken words a minute at the narrator's pace, never less than 2.5 seconds. */
  function estimateMs(sentence) {
    const words = String(sentence).trim().split(/\s+/).filter(Boolean).length;
    return Math.max(2500, words * 400);
  }

  function chapters() {
    const out = [];
    slides.forEach((s, i) => { if (!out.length || out[out.length - 1].title !== s.chapter) out.push({ title: s.chapter, index: i }); });
    return out;
  }

  /* Start time in seconds of each sentence in a recorded clip, from the character timings that
     ElevenLabs returns (alignment.characters and alignment.character_start_times_seconds). */
  function sentenceStarts(text, sentences, alignment) {
    const chars = alignment.characters.join('');
    const times = alignment.character_start_times_seconds;
    let cursor = 0;
    return sentences.map((sentence) => {
      let at = chars.indexOf(sentence, cursor);
      if (at < 0) at = chars.indexOf(sentence.slice(0, 12), cursor);
      if (at < 0) at = cursor;
      cursor = at + 1;
      return Math.round((times[Math.min(at, times.length - 1)] || 0) * 1000) / 1000;
    });
  }

  const story = { slides, splitSentences, estimateMs, chapters, sentenceStarts };
  root.BM = root.BM || {};
  root.BM.story = story;
  if (typeof module !== 'undefined' && module.exports) module.exports = story;
})(typeof window !== 'undefined' ? window : globalThis);
