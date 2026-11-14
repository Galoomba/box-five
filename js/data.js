(function (root) {
  const STAGE_IDS = ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '3.4'];
  /* The picture envelopes the host holds; each team sentence describes one. Television (it does not
     fit 1882) and Clock are decoys and stay empty. */
  const PICTURES = ['Plant', 'Television', 'Bookshelf', 'Lamp', 'Clock', 'Mirror'];
  const DECOYS = ['Television', 'Clock'];

  const scenes = [
    { number: 1, title: 'The Toast', subtitle: 'Someone tried to kill the Count', theme: 'scene1' },
    { number: 2, title: 'In the Dark', subtitle: 'The Ghost tries again', theme: 'scene2' },
    { number: 3, title: 'The Unmasking', subtitle: 'Name the Ghost before midnight', theme: 'scene3' }
  ];

  const stages = [
    {
      minutes: { cards: 2, discuss: 5 }, id: '1.1', scene: 1, title: 'Who you are', kind: 'individual',
      quote: { text: 'At a masked ball, everyone is honest about one thing: they are hiding something.', source: 'an old saying of the Opera' },
      run: ['Introductions in character: public line and quirk only. Victor introduces absent guests (host panel or host guide).', 'Players keep their cards secret. Julien plays too: he is weak but alive.'],
      narration: [
        { speaker: 'Narrator', text: 'The Count is alive. He is pale, and he cannot stop shaking, but he is alive. The music has stopped. Nobody leaves. And on the tray, under his glass, there was a letter in red ink.' },
        { speaker: 'The Ghost (a letter)', text: 'Good evening, masks. You came tonight to see me unmasked. Look around you. I am already in this room. I know this house better than the man who built it.' }
      ],
      clue: 'The Ghost knows this house better than the man who built it.',
      hostNotes: 'Players read privately and share only their public line and quirk. Armand draws little music signs on napkins all night (his act): let it pass, it matters only at 3.4.'
    },
    {
      minutes: { cards: 2, discuss: 4 }, id: '1.2', scene: 1, title: 'Why you came', kind: 'individual',
      quote: { text: 'Nobody comes to the Opera for the music. They come to be seen, or not to be seen.', source: 'painted over the stage door' },
      run: ['Each guest says why they came tonight.', 'Everyone read Le Figaro: the Count promised to unmask the Ghost at midnight.'],
      narration: [
        { speaker: 'Narrator', text: 'Three days ago the Count told the newspaper that tonight, at midnight, in Box Five, he would unmask the Opera Ghost. Every person here read it. So ask them: why did you come?' },
        { speaker: 'The Ghost (a letter)', text: 'Ask them. One of them came because of me. Every month, someone in this room pays me twenty thousand francs. Every month, I write my thanks in red.' }
      ],
      clue: 'Every month, someone in this room pays the Ghost.',
      hostNotes: 'Victor is the one who pays (his secret comes at 2.1). He should look uncomfortable and change the subject. Lucia will attack Julien over the part he is giving to Colette.'
    },
    {
      minutes: { cards: 2, discuss: 7 }, id: '1.3', scene: 1, title: 'What you saw', kind: 'group',
      quote: { text: 'The eyes see everything. The mouth chooses what to say.', source: "from the box-keepers' rule book" },
      run: ['Everyone says their sighting aloud. Victor reads the absent guests’ sightings (host panel or host guide).', 'Press “End discussion”: Julien’s announcement plays (or Julien reads it aloud from his phone, with the voice muted).', 'Press “The lights go out”. As the screen goes dark, switch off the room lights. If you have a sandbag (a bag of rice), drop it on the floor. Rosalie pulls Julien away. Lights on when the screen asks.'],
      narration: [
        { speaker: 'Narrator', text: 'Somebody put poison in the Count’s glass. Everybody saw a piece of it, and nobody saw all of it. Say what you saw, all of you, and put the pieces side by side.' },
        { speaker: 'The Ghost (a letter)', text: 'Look at the hands tonight, masks. Hands remember what masks forget.' }
      ],
      clue: 'Hands remember what masks forget.',
      hostNotes: "The sightings: the doctor's bag in the rehearsal room 10:00 to 10:40, its bottle gone (Henri); Lucia took a brown bottle from it (Armand: true, her own drops); a black domino with a white half-mask left the rehearsal room at 10:40 (Édouard); Victor put the gold-rimmed glass on the tray; Rosalie set the tray on the piano for a minute; Rosalie's gloves had red ink (Lucia); Colette knocked Julien's arm; dust wiped off rope no. 7 (Gustave). Expect Rosalie to be accused. Let it run.",
      announcement: { speaker: 'Julien (aloud)', text: "Enough. Somebody tried to kill me tonight. Good. Then listen. Three days ago I found an old drawing of Box Five in the Opera office. It shows a secret door inside the pillar, and there is a small mark in the corner. I know whose mark it is. At midnight, when the masks come off, I will say your name to this whole room." },
      setPieceAfter: 'lightsOut'
    },
    {
      minutes: { cards: 2, discuss: 5 }, id: '2.1', scene: 2, title: 'What you hide', kind: 'individual',
      quote: { text: 'Every wall in this house is hollow. So is every promise.', source: 'scratched inside Box Five' },
      run: ['The killer learns the truth on this card.', 'Secrets come out. Expect Rosalie and Victor to be accused. Let it run.'],
      narration: [
        { speaker: 'Narrator', text: 'Three minutes of dark. One sandbag on the floor, where the Count had been standing. And the Count is still alive, because someone pulled him away. Now the masks must give something up. Each of you hides a secret. Tonight it comes out.' },
        { speaker: 'The Ghost (a letter)', text: 'Tell them your secrets, masks. Everyone in this house hides something. Even the walls.' }
      ],
      clue: 'Even the walls of this house hide something.',
      hostNotes: "The killer (Armand) learns here that he is the Ghost. Rosalie explains her red gloves (she carries the Ghost's letters). Victor confesses he pays the Ghost from the cash box and once worked in Garnier's office. Colette tells of her Angel, who hums the note his piano cannot play. Gustave: the sandbag hung on a wire, not a rope."
    },
    {
      minutes: { cards: 2, discuss: 4 }, id: '2.2', scene: 2, title: 'What you want', kind: 'individual',
      quote: { text: 'Want something badly enough and the Opera will sell it to you. The price comes later.', source: 'from the Opera account book' },
      run: ['Everyone plays a personal goal. The killer is told to make the room blame Rosalie.'],
      narration: [
        { speaker: 'Narrator', text: 'Midnight is coming. Every mask in this room wants something before it comes off. Say what you want, and watch who wants the Count to stay quiet.' },
        { speaker: 'The Ghost (a letter)', text: 'I want very little. Music. Silence. My box. And one name that nobody says out loud.' }
      ],
      clue: 'The Ghost wants music and silence.',
      hostNotes: "Armand's goal: two people say aloud that Rosalie is the Ghost. Lucia says a page of her music went missing tonight (it turns up around the bottle at 3.1)."
    },
    {
      minutes: { cards: 3, discuss: 8 }, id: '2.3', scene: 2, title: 'The torn page', kind: 'group',
      quote: { text: 'Paper never forgets. It only waits for someone to read it aloud.', source: 'over the Opera library door' },
      run: ['Every strip goes on the table (or on the TV) in bar order, 1 to 10, and is read aloud. Read absent guests’ strips.', 'Optional: press “Read the page aloud” for the narrator.', 'Press “The Ghost’s letter”. Then press “Victor speaks”: the teams form.'],
      narration: [
        { speaker: 'Narrator', text: 'This afternoon the keeper of Box Five found a page in the drawer where the Ghost takes his money. She tore it into ten pieces and put one in every envelope. Find your piece. Each one has a number at the top, from one to ten. Put them in order and read the Ghost’s own page aloud.' }
      ],
      clue: 'The Ghost’s own page is on the table.',
      hostNotes: 'Every strip must be read; nobody keeps one. Rosalie reads strip 1 (her note). Armand will say strip 9 (the gas wheel) points at Victor, who runs the gas. Strip 10 is the motive: J.V. has the drawing with the mark. Nobody knows yet whose mark it is.',
      setPieceAfter: 'twoGhosts'
    },
    {
      minutes: { cards: 5, discuss: 5 }, id: '3.1', scene: 3, title: 'The weapon', kind: 'team',
      quote: { text: 'Every crime leaves one thing behind. Usually it is the thing the criminal was proudest of.', source: 'from a police report, 1879' },
      run: ['Each team says its words in order and names a picture.', 'Right picture: hand over that envelope and press “Show on the TV” for that team. A wrong picture costs the team one minute.', 'Stuck for 3 minutes? Whisper the next wrong or missing word. Still stuck at 5 minutes? Whisper the whole sentence.'],
      narration: [
        { speaker: 'Narrator', text: 'Two teams now. Team Julien looks at the poison. Team Victor looks at the sandbag. Each of you has one word. Say your words in order, and the sentence will tell you which picture to ask for. What you find there is what tried to kill him.' }
      ],
      clue: 'What tried to kill him is in an envelope.',
      hostNotes: "Only the host opens the picture envelopes (six; Television and Clock are empty decoys). Team Julien: A SUN THAT SLEEPS BY DAY = Lamp (the bottle in Box Five's pillar, wrapped in Lucia's music with red pencil marks). Armand holds SUN and is told to say FACE (sends them to the Clock or the Mirror). Team Victor: GREEN THINGS GROW HERE QUIETLY = Plant (the wire: a piano string marked F). This is where the piano links begin to firm up.",
      setPieceBefore: 'victorReturns'
    },
    {
      minutes: { cards: 5, discuss: 5 }, id: '3.2', scene: 3, title: 'The witness', kind: 'team',
      quote: { text: 'At the Opera nobody looks at the dancers in the back row. The dancers in the back row see everything.', source: 'a ballet mistress' },
      run: ['Same picture rule. Press “Show on the TV” when a team has its envelope.', 'Nina and Gustave read the witness cards. Victor reads for an absent reader.'],
      narration: [
        { speaker: 'Narrator', text: 'Someone saw the Ghost tonight and is still alive to say so. Find your words again. Go where the sentence sends you. Let the one named on the card read it, and let nobody interrupt.' }
      ],
      clue: 'Someone saw the Ghost and lived.',
      hostNotes: 'Team Julien: MANY SPINES BUT NO BONES = Bookshelf (Nina’s witness card). Armand holds SPINES and is told to say HANDS (sends them to the Clock). Team Victor: IT SHOWS YOU TO YOURSELF = Mirror (Gustave’s witness card). Nina: the black domino took the bottle, pressed a silent piano key and hummed it, red fingertips. Gustave: a lantern came out of the pillar, the wire snapped, a red-stained hand, a face from the building site.'
    },
    {
      minutes: { cards: 2, discuss: 6 }, id: '3.3', scene: 3, title: 'The alibis', kind: 'individual',
      quote: { text: 'The truth is never word-perfect. Only a lie has been practiced.', source: "from an inspector's notebook" },
      run: ['Everyone reads their alibi aloud, word for word.'],
      narration: [
        { speaker: 'Narrator', text: 'Nearly midnight. Each of you, read your alibi aloud, word for word. Then compare it with everything you heard tonight. A liar always makes one mistake.' },
        { speaker: 'The Ghost (a letter)', text: 'Careful, masks. You have only one guess. If you choose wrong, I choose for you.' }
      ],
      clue: 'A liar always makes one mistake.',
      hostNotes: "Armand says he never left the piano and played the waltz to the end. Contradicted by Lucia 3.2 (the music stopped for three minutes and began again from the start), Rosalie 3.2 (no music in the dark; she heard the rope creak), Nina 3.1 (she sat on the empty piano bench), and strip 9 (three minutes of dark at the second waltz). Victor admits he ran to the main gas wheel: true, and it was untouched."
    },
    {
      minutes: { cards: 3, discuss: 6 }, id: '3.4', scene: 3, title: 'The box', kind: 'group',
      quote: { text: 'A lock is only a question. The right word is the answer.', source: 'engraved on the lid of the box' },
      run: ['Point at the box on the table: old Debray’s box. It opens with one five-letter word.', 'Each guest reads their rule aloud. The table may say one word at a time; you say “open” or “shut”.', 'Right word (ANGEL): unlock the box with the key in your pocket, take out the letter, press “The box is open”.', 'Wrong for 4 minutes? Say: “Debray’s rules never lie. Only people do.” At 6 minutes open it anyway.'],
      narration: [
        { speaker: 'Narrator', text: 'One more thing. On the table stands the old box of Monsieur Debray, who ran this Opera before Victor. He left it for the manager who stops paying the Ghost, and tonight Victor has decided to stop. It opens with one word of five letters. Long ago, Debray told each of you one small rule about that word. Put the rules together.' }
      ],
      clue: 'Five letters open Debray’s box.',
      hostNotes: "The word is ANGEL. Rules: five letters, none twice (Victor); A first (Lucia, Nina); N right after A (Henri, Gustave); E right after G (Rosalie, Édouard); L last (Julien, Colette). Armand's rule is false: L right after G, and he pushes ANGLE. ANGLE breaks two true rules. The letter inside: the draughtsman in Garnier's office who drew the door in the pillar signed his drawings with a tiny treble clef, and still works in this house. Armand has drawn treble clefs on napkins all night.",
      setPieceAfter: 'lastLetter'
    }
  ];

  /* The Ghost's page, torn by Rosalie into ten strips. A stave runs along the top; each strip holds one
     numbered bar, so the strips lie in order. */
  const ledger = [
    { number: 1, holder: 'rosalie', text: "A note pinned to the strip: “I found this page in the drawer of Box Five, where I leave the Ghost his money. I read it and I was afraid. I tore it in ten and put one piece in each envelope, so nobody can burn all of it. Read it together. — R.F.”" },
    { number: 2, holder: 'victor', text: "February. Box Five: 20,000 F from V.L., as every month. He pays. He is afraid. Good." },
    { number: 3, holder: 'lucia', text: "La B. buys her sleeping drops from the doctor. Brown bottle, in his black bag. Three drops make her sleep. Thirty would make anyone sleep for good." },
    { number: 4, holder: 'henri', text: "The doctor's bag: in the rehearsal room, 10 to 10.40, on Mardi Gras night. Nobody watches a bag." },
    { number: 5, holder: 'colette', text: "The little one sings better every week. She thinks I am an angel. Let her think it." },
    { number: 6, holder: 'gustave', text: "Old G. is asleep on the fly gallery by 11. No. 7 hangs over the middle of the stage." },
    { number: 7, holder: 'edouard', text: "The Baron owes J.V. 50,000 F. If anything happens to J.V., they will look at the Baron first. Good." },
    { number: 8, holder: 'nina', text: "J.V. will drink from the gold-rimmed glass of Box Five. There is only one like it." },
    { number: 9, holder: 'armand', text: "The gas wheel inside the pillar. At the second waltz: three minutes of dark. Enough." },
    { number: 10, holder: 'julien', text: "J.V. has the old drawing with my mark. He will say my name at midnight. He must not see midnight. — O.G." }
  ];
  const LEDGER_SAY = [
    "Bar one. A note pinned to the strip: I found this page in the drawer of Box Five, where I leave the Ghost his money. I read it and I was afraid. I tore it in ten and put one piece in each envelope, so nobody can burn all of it. Read it together. R. F.",
    "Bar two. February. Box Five: twenty thousand francs from V. L., as every month. He pays. He is afraid. Good.",
    "Bar three. La B. buys her sleeping drops from the doctor. Brown bottle, in his black bag. Three drops make her sleep. Thirty would make anyone sleep for good.",
    "Bar four. The doctor's bag: in the rehearsal room, ten to ten forty, on Mardi Gras night. Nobody watches a bag.",
    "Bar five. The little one sings better every week. She thinks I am an angel. Let her think it.",
    "Bar six. Old G. is asleep on the fly gallery by eleven. Number seven hangs over the middle of the stage.",
    "Bar seven. The Baron owes J. V. fifty thousand francs. If anything happens to J. V., they will look at the Baron first. Good.",
    "Bar eight. J. V. will drink from the gold-rimmed glass of Box Five. There is only one like it.",
    "Bar nine. The gas wheel inside the pillar. At the second waltz: three minutes of dark. Enough.",
    "Bar ten. J. V. has the old drawing with my mark. He will say my name at midnight. He must not see midnight. O. G."
  ];

  const teamEnvelopes = {
    julien: {
      '3.1': { sentence: 'SUN THAT SLEEPS BY DAY', picture: 'Lamp', title: 'THE BOTTLE', text: "The doctor's brown bottle of sleeping drops, empty. It was found in Box Five, pushed into a crack in the big hollow pillar. It was wrapped in a page of Signora Bellini's music, covered in notes in red pencil. Talk: who could reach Box Five tonight, and who writes on Signora Bellini's music?" },
      '3.2': { sentence: 'MANY SPINES BUT NO BONES', picture: 'Bookshelf', title: 'THE WITNESS', text: 'To be read aloud by Nina. If she is not here, Victor reads it.' }
    },
    victor: {
      '3.1': { sentence: 'GREEN THINGS GROW HERE QUIETLY', picture: 'Plant', title: 'THE WIRE', text: "Sandbag no. 7 did not hang on a rope. It hung on a thin steel wire, and the wire was snapped, not cut. It is a piano string. A little paper tag is still wrapped around it, with one letter written on it: F. Talk: which piano in this house is missing a string?" },
      '3.2': { sentence: 'IT SHOWS YOU TO YOURSELF', picture: 'Mirror', title: 'THE WITNESS', text: 'To be read aloud by Gustave. If he is not here, Victor reads it.' }
    }
  };

  const witnessCards = {
    julien: { reader: 'nina', ghost: 'Victor', ghostIntro: 'Nina told me this before she went home. In her words:', text: "At half past ten I hid behind the curtain in the rehearsal room with a glass of champagne. I was not allowed it. Someone came in: a black domino cape, a white half-mask. They opened the doctor's bag and took out the brown bottle. I did not see the face. But I saw the hands: the tips of the fingers were red, like the Ghost's ink. Then they sat at the piano and pressed one key. No sound came. So they hummed the note instead, very softly. Then they went out with the bottle." },
    victor: { reader: 'gustave', ghost: 'Victor', ghostIntro: 'Gustave told me this before he left. In his words:', text: "I was asleep on the fly gallery. I admit it. The dark woke me up. Then I saw a small lantern, and it came out of the big pillar behind Box Five. Out of the wall itself. It went to no. 7. I heard a wire snap, and the sandbag fell. In the lantern light I saw a hand with a red stain on it. And for one second I saw a face I knew, but from long ago. Years ago, when they were building this house, there was a young man on the site with a roll of drawings under his arm. That face. Then the lantern went out." }
  };

  const setPieces = {
    prologue: {
      title: 'The Toast',
      lines: [
        { speaker: 'Victor (aloud)', text: "Ladies and gentlemen, masks and faces! Welcome to the last ball of the carnival: Mardi Gras night! Tomorrow is Ash Wednesday, the first quiet day of Lent, and we will all be very sorry. Tonight we are not sorry at all. A special welcome to our new friend, Count Julien de Valmont, who has promised to unmask our Ghost at midnight. Count, I admire your courage. I do not admire your sense. To the Opera, and to Box Five!" },
        { speaker: 'Stage direction', text: 'Everyone drinks. Julien drinks from the gold-rimmed glass. Colette knocks his arm and most of it spills. Julien coughs, holds his throat, and falls. Dr. Roussel kneels beside him. Press “He lives”.' }
      ]
    },
    sheIsDead: {
      title: 'He lives',
      sound: 'heartbeat',
      lines: [
        { speaker: 'Narrator', text: 'The Count is on the floor, grey and cold. The doctor makes him sick into an ice bucket and pours black coffee into him, cup after cup. And slowly, the Count opens his eyes. He drank only a little. The rest is on the floor.' },
        { speaker: 'The Ghost (a letter)', text: 'Found under the tray, in red ink: That was the first try. Do not leave the ball. Nobody leaves. I will be watching from my box. O. G.' },
        { speaker: 'Victor (aloud)', text: "Nobody leaves! You heard him. And I am the manager, so you heard me too. There is an envelope on the table for each of you, and your phones know who you are. Take the top card. We will find this Ghost before midnight, or we will not see Ash Wednesday." }
      ]
    },
    lightsOut: {
      title: 'In the Dark',
      cue: 'The lights go out',
      sound: 'powerdown',
      lines: [
        { speaker: 'Stage direction', text: 'Blackout. Drop the sandbag (or something heavy and soft) on the floor. Rosalie pulls Julien away. After a few seconds of dark, the lights come back.' },
        { speaker: 'Narrator', text: 'At quarter to twelve, the second waltz had just begun when every gas lamp in the house went out at once. Three minutes of black. Somebody screamed. Something heavy fell from very high and hit the stage like a door slamming. When the lamps came back, a sandbag lay on the floor, split open, exactly where the Count had been standing. The Count was not under it. Somebody had pulled him away. And pinned to the curtain was a new letter.' },
        { speaker: 'The Ghost (a letter)', text: 'Twice I missed. The third time I will not. Before the masks come off, name me. If you name me, I will go back to my shadows. If you are wrong, the Count will not see Ash Wednesday. O. G.' }
      ]
    },
    twoGhosts: {
      title: "The Ghost's letter",
      cue: "The Ghost's letter",
      sound: 'whisper',
      then: 'victorReturns',
      lines: [
        { speaker: 'Stage direction', text: 'The page lies on the table. A last letter appears on the TV. Victor stands up.' },
        { speaker: 'The Ghost (a letter)', text: 'So the box-keeper tore up my page. Read it, then. Read every bar. It will not save him. You still do not know my name, and in one hour you never will.' }
      ]
    },
    victorReturns: {
      title: 'Two teams',
      sound: 'bell',
      lines: [
        { speaker: 'Victor (aloud)', text: "Right. I am the manager, and when the Opera has a problem, I make two committees. The Ghost tried twice: once with poison, once with a sandbag. So, two teams. Julien, you take the poison: it was your glass." },
        { speaker: 'Julien (aloud)', text: "When I call your name, come and stand with me. You are Team Julien. We find out who put the poison in my glass." },
        { speaker: 'Victor (aloud)', text: "And when I call yours, stand with me. You are Team Victor. We find out who dropped the sandbag. Each of you will get one word. Alone it means nothing. Together it is a sentence, and the sentence names a picture. Go." }
      ]
    },
    lastLetter: {
      title: "Debray's letter",
      cue: 'The box is open',
      sound: 'whisper',
      lines: [
        { speaker: 'Stage direction', text: 'Whoever said the word takes out the letter and holds it up. The narrator reads it. Then two minutes of last words before the vote.' },
        { speaker: 'Narrator', text: "To the manager who stops paying, from Pierre Debray. The Ghost is not a ghost. In 1873 a young man drew the cellars of this house in Monsieur Garnier's office. He drew one thing that was never built in the official plans: a door inside the pillar of Box Five. It opens onto stairs that go up to the fly gallery and down to the underground lake below the cellars. He signed every drawing with a tiny treble clef in the corner, because he loved music more than lines. He still works in this house. I never had the courage to say his name. Look for the little clef." }
      ]
    }
  };
  setPieces.ledger = {
    title: "The Ghost's page",
    cue: 'Read the page aloud',
    lines: ledger.map((s, i) => ({ speaker: `Bar ${s.number}`, voice: 'narrator', text: s.text, say: LEDGER_SAY[i] }))
  };

  /* Stage 3.4: the locked box stands on the table all night. Nothing is hidden: the host keeps the key and
     opens the box when the table says the word. */
  const box = {
    word: 'ANGEL',
    rule: 'The table says one word at a time; the host says “open” or “shut”. The killer may lie about their rule. Nobody touches the box but the host.',
    letter: { title: "Debray's letter", outside: 'For the manager who stops paying', text: "To the manager who stops paying, from Pierre Debray. The Ghost is not a ghost. In 1873 a young man drew the cellars of this house in Monsieur Garnier's office. He drew one thing that was never built in the official plans: a door inside the pillar of Box Five. It opens onto stairs that go up to the fly gallery and down to the underground lake below the cellars. He signed every drawing with a tiny treble clef in the corner, because he loved music more than lines. He still works in this house. I never had the courage to say his name. Look for the little clef." }
  };

  const reveal = {
    lines: [
      { speaker: 'Julien (aloud)', text: "Armand Léger. Our quiet pianist. Ten years in Milan, you said. You were never in Milan. You were in Garnier's office, drawing a door in my pillar and signing it with a little treble clef, the same clef you have drawn on every napkin tonight. You took the doctor's drops and poured them into my glass while the tray sat on your piano. Then you started the second waltz, walked into the wall of Box Five, turned off the gas, and dropped a sandbag on me with a string from your own piano. You hummed the missing note the whole time." },
      { speaker: 'Narrator', text: 'One Ghost. Two tries. Ten masks. Now the masks come off.' }
    ],
    saved: [
      { speaker: 'Narrator', text: 'You named him. The pianist stood up very slowly and took off his white half-mask. Under it was only a tired man with red ink on his fingers. Gustave held one arm and the doctor held the other. The Count lived to see Ash Wednesday, and many more. And Box Five, for the first time in six years, was sold to the public.' }
    ],
    lost: [
      { speaker: 'Narrator', text: 'You named the wrong mask. Armand smiled, sat at the piano, and began the last waltz of the carnival. In the middle of it, every gas lamp went out again. When they came back, the Count was gone. They found him at dawn, by the black lake under the Opera, very still. On his chest lay a letter in red ink: Third try. O. G.' }
    ],
    houseWins: 'THE GHOST IS UNMASKED',
    killersWin: 'THE GHOST WINS',
    farewell: 'The Paris Opera thanks you. Please leave Box Five empty.'
  };

  const characters = [
    {
      id: 'victor', index: 0, symbol: '🎩', name: 'Victor Lambert, the Manager', short: 'Victor',
      costume: 'Evening suit, top hat, a black cape (a "domino") and a white half-mask, pocket watch, a small account book', image: 'assets/characters/victor.jpg',
      team: 'victor', optional: false, killer: false, witness: false,
      intro: {
        text: 'You are Victor Lambert, co-manager of the Paris Opera since 1880. You run the house, the money, the singers and the ball. Tonight you also run the game: the laptop and the phone remote are yours.',
        act: 'Check your pocket watch often, and sigh at the price of everything.',
        quirk: 'Call every problem "a small technical difficulty", even a body.',
        publicLine: 'I am the manager. If anything goes wrong tonight, it is a small technical difficulty.'
      },
      cards: {
        '1.1': { text: 'You have managed the Opera for two years. It is the most beautiful house in Paris, and it eats money. You love it like a difficult child. Tonight you gave the toast, and somebody poisoned your newest shareholder in the middle of it. Share your public line and your quirk. Keep everything else to yourself.' },
        '1.2': { text: 'Why you came: it is your ball. But you are also afraid. Three days ago the Count went through the Opera account books. He asked you about the word "repairs", which appears every month next to a large number. You told him it was the roof. The Opera roof is fine. Say you came to keep the ball running. Say nothing about the books.' },
        '1.3': { text: 'Say this aloud: at quarter to eleven you put the gold-rimmed glass of Box Five on the tray, in the rehearsal room, for the Count. You told the whole room it was his. The pianist was practicing the toast music. Then Gustave rolled the piano out of the rehearsal room to the side of the stage, for the toast and the waltzes (there is only one piano tonight), and Madame Rosalie came to carry the tray.' },
        '2.1': { text: 'Your secret, and you must share it: you pay the Ghost. Every month, 20,000 francs from the Opera cash box go into an envelope in the drawer of Box Five. You write it in the books as "repairs". The old manager, Debray, paid before you. And one more thing: long ago, from 1872 to 1875, you were a young clerk in Monsieur Garnier\'s office, while he built this house. There was a quiet young draughtsman in the back room who drew the cellars. You never knew his name, and you never saw his face up close. One more small secret, keep it if you can: at night, alone, you play the rehearsal piano to calm your nerves. Like everyone, you hum the dead F.' },
        '2.2': { text: 'Your goal: catch the Ghost tonight without anyone opening the account books. If the shareholders learn about the "repairs", you go to prison. Get at least one person to say aloud that the money does not matter, only the Ghost matters.' },
        '2.3': { text: 'Your strip of the page is bar 2 (20,000 F from V.L.). Yes, V.L. is you. Put it on the table and read it aloud. You may look very unhappy.', ledger: 2 },
        '3.1': { text: 'Team Victor. Say this aloud: in the dark, you ran down under the stage to the main gas wheel. It was wide open. Nobody had touched it. So the gas was closed somewhere else, between the wheel and the stage. Only one old pipe runs that way: up inside the pillars of the stage boxes.', word: { index: 1, text: 'GREEN' } },
        '3.2': { text: 'Team Victor. You remember Garnier\'s plans: the pillars of the stage boxes were built hollow, to carry the gas pipes. Most of them are too narrow for a cat. The pillar of Box Five is the widest in the house.', word: { index: 1, text: 'IT' } },
        '3.3': { text: 'Alibi. Read it aloud, word for word.', alibi: 'When the lights went out, I ran down under the stage to the main gas wheel. It was open. Nobody had touched it. When I came back up the stairs, the lights were on again.' },
        '3.4': { text: 'Old Debray told you this when he gave you the keys to the Opera: "The word that opens my box has five letters, and no letter comes twice. Do not tell the Ghost." Say it aloud.' }
      }
    },
    {
      id: 'julien', index: 1, symbol: '🥂', name: 'Count Julien de Valmont', short: 'Julien',
      costume: 'Evening clothes, white gloves, a sash across the chest, opera glasses or a monocle', image: 'assets/characters/julien.jpg',
      team: 'julien', optional: false, killer: false, witness: false,
      intro: {
        text: 'You are Count Julien de Valmont. In January you bought shares in the Paris Opera. Three days ago you told the newspaper Le Figaro that tonight, at midnight, you would unmask the Opera Ghost. An hour ago somebody poisoned your champagne. You are alive. Just.',
        act: 'Hold your stomach and sip only water. Look at everyone as if they want you dead.',
        quirk: 'Whenever someone offers you a drink, say "After you."',
        publicLine: 'Someone in this room tried to kill me. I am still here. At midnight, so is the truth.'
      },
      cards: {
        '1.1': { text: 'You feel terrible, but you are alive and very angry. You are rich, young and bored, and the Opera is your new toy. You sat in Box Five tonight, the Ghost\'s own box, to show Paris you are not afraid. Share your public line and your quirk.' },
        '1.2': { text: 'Why you came: to unmask the Ghost. Three days ago, in the Opera books, you found 20,000 francs paid every month to "O.G.". In the archive you found an old drawing of Box Five with a secret door inside the pillar, and a tiny mark in the corner. You took the drawing. Say why you came. Do not say what is in the drawing yet.' },
        '1.3': { text: 'Say this aloud: this morning you got a letter in red ink: "Do not sit in Box Five tonight." You sat there anyway, from ten o\'clock until twenty to eleven. Then you came down to the side of the stage for the toast. At five to eleven you saw Madame Rosalie put the tray of glasses down on the piano for a minute and fix her glove. Then she carried it on. At the end of this stage you will make an announcement: read it from your phone or the TV.' },
        '2.1': { text: 'Your secret, and you must share it: you lied at the end of Scene 1. You do NOT know whose mark it is. The drawing was in your coat pocket at the toast. When you woke up on the floor, it was gone. All you remember is that the mark was tiny, in ink, in the bottom corner. You never looked closely. Also: in the dark, a strong hand pulled you hard to the left, and you smelled lavender. Then the crash. Second secret, keep it if you can: you are nearly broke. You bought the shares with borrowed money.' },
        '2.2': { text: 'Your goal: find out who took the drawing from your coat. And keep your second secret: you are secretly engaged to Colette Marchand of the chorus. Your family would cut you off for marrying a chorus girl. Before the vote, thank the person who pulled you away in the dark, by name, if you can work out who it was.' },
        '2.3': { text: 'Your strip of the page is bar 10 (J.V. has the old drawing with my mark). J.V. is you. Put it on the table and read it aloud, slowly.', ledger: 10 },
        '3.1': { text: 'Team Julien. You lead it. Say this aloud: the poison tasted bitter, like old coins. The doctor says it was his own sleeping drops, the whole bottle. You drank only a little, because somebody knocked your arm.', word: { index: 2, text: 'THAT' } },
        '3.2': { text: 'Team Julien. Say this aloud: you remember one strange thing from Box Five tonight. The big pillar was cold to touch, and once, about half past ten, you heard humming inside it. Very soft. One note, again and again.', word: { index: 1, text: 'MANY' } },
        '3.3': { text: 'Alibi. Read it aloud, word for word.', alibi: 'I was standing in the middle of the stage when the lights went out. Somebody grabbed my arm and pulled me hard to the left. I smelled lavender. Then the crash, right where I had been.' },
        '3.4': { text: 'Old Debray sold you his shares in January. He laughed and said: "With them comes my box. The word that opens it ends with the letter L." Say it aloud.' }
      }
    },
    {
      id: 'rosalie', index: 2, symbol: '🗝️', name: 'Madame Rosalie Fournier, Keeper of Box Five', short: 'Rosalie',
      costume: 'Black dress, white apron, a dark shawl, a big ring of keys', image: 'assets/characters/rosalie.jpg',
      team: 'victor', optional: false, killer: false, witness: false,
      intro: {
        text: 'You are Madame Rosalie Fournier. For seven years you have kept the keys of the boxes on the first floor, and above all Box Five. You know every guest\'s secrets and you tell none of them.',
        act: 'Jingle your keys when you are nervous. You are nervous all night.',
        quirk: 'Whenever someone says "the Ghost", say "Shh! He can hear you."',
        publicLine: 'I keep Box Five. I keep it empty. I keep my mouth shut.'
      },
      cards: {
        '1.1': { absent: "Madame Rosalie Fournier is not at the table tonight. She would have said: 'I keep Box Five. I keep it empty. I keep my mouth shut.' And every time someone said 'the Ghost', she would hiss: 'Shh! He can hear you.'", text: 'You are the keeper of Box Five, and you are frightened tonight, more than you have ever been. Share your public line and your quirk. Wear your gloves all night.' },
        '1.2': { absent: "Rosalie came because she works tonight: the Count sat in Box Five, the Ghost's box, and she had to open it for him. She begged him not to. He laughed.", text: 'Why you came: you work tonight. The Count asked for Box Five, and you had to open it for him. You begged him not to sit there. He laughed. Say this aloud.' },
        '1.3': { absentVoice: "At five to eleven I carried the tray of glasses from the rehearsal room to the stage. On the way I put it down on the piano for one minute, to fix my glove. Then I carried it on.", absent: "Rosalie saw this, and wanted it said: at five to eleven she carried the tray of glasses from the rehearsal room. On the way she put it down on the piano for one minute to fix her glove. Then she took it to the stage.", text: 'Say this aloud: at five to eleven you carried the tray of glasses from the rehearsal room to the stage. On the way you put it down on the piano for one minute, to fix your glove. Then you carried it on. You did not see anyone touch it, but you were looking at your glove.' },
        '2.1': { absentVoice: "My secret. For fifty francs a month I carry the Ghost's letters. I have never seen the face of the Ghost. Tonight at ten to eleven there was a new letter in the drawer of Box Five, and the red ink was still wet. That is why my gloves are red.", absent: "Rosalie's secret: for fifty francs a month she carries the Ghost's letters. She has never seen the face of the Ghost. Tonight at ten to eleven she found a new letter in Box Five with the ink still wet: that is why her gloves are red. This afternoon she found the Ghost's page in the drawer and tore it up.", text: 'Your secret, and you must share it: for fifty francs a month you carry the Ghost\'s letters. They appear in the drawer of Box Five; you take them to the managers. And every month you put Monsieur Victor\'s envelope of money in that same drawer. You have never seen the face of the Ghost. Tonight at ten to eleven there was a new letter for Monsieur Victor, and the red ink was still wet. That is why your gloves are red. Keep this part if you can: this afternoon you found the Ghost\'s own page in the drawer, and you tore it up (see 2.3).' },
        '2.2': { absent: "Rosalie's goal was to protect the Count without anyone learning that she works for the Ghost. Before she left she said: 'Watch the ropes.'", text: 'Your goal: protect the Count, and do not let anyone learn that you were the one who pulled him away in the dark. You read the Ghost\'s page before you tore it. One line said "No. 7 hangs over the middle of the stage." So you watched rope seven all night, and when the dark came, you were ready. Get someone to say aloud that the person who saved the Count is a hero. Smile quietly.' },
        '2.3': { absent: "Rosalie's strip is bar 1: her own note. Read it aloud.", text: 'Your strip of the page is bar 1: your own note. Put it on the table and read it aloud. Now everyone knows you tore it.', ledger: 1 },
        '3.1': { absentVoice: "The Ghost's letters always come to the drawer of Box Five. I have the only key to that box. But sometimes, when I open it, the drawer is still warm, as if someone had just closed it.", absent: "Rosalie says: the Ghost's letters always come to the drawer of Box Five. She has the only key to that box. But sometimes, when she opens it, the drawer is still warm, as if someone had just closed it.", text: 'Team Victor. Say this aloud: the Ghost\'s letters always come to the drawer of Box Five. You have the only key to that box. But sometimes, when you open it, the drawer is still warm, as if someone had just closed it.', word: { index: 2, text: 'THINGS' } },
        '3.2': { absentVoice: "In the dark I held the Count by the arm. There was no music. None at all. I could hear the rope creaking above us. Then the crash.", absent: "Rosalie says: in the dark she held the Count by the arm. There was no music, none at all. She could hear the rope creaking above them. Then the crash.", text: 'Team Victor. Say this aloud: in the dark you held the Count by the arm. There was no music. None at all. You could hear the rope creaking above you. Then the crash.', word: { index: 2, text: 'SHOWS' } },
        '3.3': { absentVoice: "I was watching rope seven all night, because of the page. When the dark came, I pulled the Count away. I did not let go of him until the lights came back.", absent: "Rosalie's alibi, word for word: \"I was watching rope seven all night, because of the page. When the dark came, I pulled the Count away. I did not let go of him until the lights came back.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'I was watching rope seven all night, because of the page. When the dark came, I pulled the Count away. I did not let go of him until the lights came back.' },
        '3.4': { absentVoice: "Old Debray once told me about his box: in the word, the letter E comes right after the letter G.", absent: "Old Debray once told Rosalie: in the word that opens his box, the letter E comes right after the letter G.", text: 'Old Debray once told you, over a cup of coffee: "In the word that opens my box, the letter E comes right after the letter G." Say it aloud.' }
      }
    },
    {
      id: 'lucia', index: 3, symbol: '👑', name: 'Signora Lucia Bellini, the Prima Donna', short: 'Lucia',
      costume: 'A big dress, feathers in the hair, a fan, far too much jewelry', image: 'assets/characters/lucia.jpg',
      team: 'victor', optional: false, killer: false, witness: false,
      intro: {
        text: 'You are Signora Lucia Bellini, the greatest singer in Europe, or so you say. You have sung the lead at the Paris Opera for twelve years. A prima donna is the star singer of an opera, and you have never let anyone forget it.',
        act: 'Fan yourself dramatically. Sing a few high notes when you enter a conversation.',
        quirk: 'Talk about yourself in the third person: "Bellini is not amused."',
        publicLine: 'Bellini has sung for kings. Bellini will not be poisoned by amateurs.'
      },
      cards: {
        '1.1': { absent: "Signora Lucia Bellini is not here tonight. She would have said: 'Bellini has sung for kings. Bellini will not be poisoned by amateurs.' And she would have spoken about herself as Bellini all night.", text: 'You are the star. Everyone else in this room is the chorus. Share your public line and your quirk. And complain loudly about your tiny dressing room.' },
        '1.2': { absent: "Lucia came to fight: the Count is giving her part in the new opera to a girl from the chorus. Last night, in front of everyone, she told him: 'I will see you buried before that girl sings my part.'", text: 'Why you came: to fight. The Count is giving your part in the new opera to a little girl from the chorus. Last night, in front of the whole company, you told him: "I will see you buried before that girl sings my part." Everyone heard it. Say why you came, and do not take it back.' },
        '1.3': { absentVoice: "At ten to eleven, I saw Madame Rosalie's gloves. There were red stains on the fingers. Red, like the Ghost's ink.", absent: "Lucia saw this: at ten to eleven, Madame Rosalie's gloves had red stains on the fingers, red like the Ghost's ink.", text: 'Say this aloud: at ten to eleven you saw Madame Rosalie\'s gloves. There were red stains on the fingers. Red, like the Ghost\'s ink. Look at her when you say it.' },
        '2.1': { absentVoice: "My secret. My voice is going. I cannot sleep, and without sleep I cannot sing. So I take the doctor's sleeping drops, three every night. Tonight at twenty past ten I took three from his bag in the rehearsal room. The brown bottle was full then. Full!", absent: "Lucia's secret: her voice is going, and she takes the doctor's sleeping drops every night. Tonight at twenty past ten she took three drops from his bag in the rehearsal room. The brown bottle was full then.", text: 'Your secret, and you must share it: your voice is going. You cannot sleep, and without sleep you cannot sing. So you take the doctor\'s sleeping drops, three every night. Tonight at twenty past ten you took three drops from his bag in the rehearsal room. And the brown bottle was FULL then. Make sure everyone hears that.' },
        '2.2': { absentVoice: "A page of my music went missing from the rehearsal room tonight. My big aria. Bellini wants it back.", absent: "Lucia wanted to keep her part. And a page of her music went missing from the rehearsal room tonight: her big aria.", text: 'Your goal: keep your part. Before the vote, get the Count to say aloud that Bellini sings the lead. And say this aloud now: a page of your music went missing from the rehearsal room tonight. Your big aria. Bellini wants it back.' },
        '2.3': { absent: "Lucia's strip is bar 3, about her sleeping drops. Read it aloud.", text: 'Your strip of the page is bar 3 (La B. buys her sleeping drops). La B. is you. Put it on the table and read it aloud, with great dignity.', ledger: 3 },
        '3.1': { absentVoice: "I studied at the Conservatory in Milan, from 1868 to 1876. I knew every pianist in that city. There was nobody called Léger.", absent: "Lucia says: she studied at the Conservatory in Milan from 1868 to 1876, and she knew every pianist in that city. There was nobody called Léger.", text: 'Team Victor. Say this aloud: you studied at the Conservatory in Milan, from 1868 to 1876. You knew every pianist in that city. There was nobody called Léger.', word: { index: 3, text: 'GROW' } },
        '3.2': { absentVoice: "In the dark, the music stopped. For about three minutes, no piano at all. When the lights came back, the pianist started the waltz again from the very beginning. I know, because I was waiting for my moment to sing.", absent: "Lucia says: in the dark the music stopped, about three minutes with no piano at all. When the lights came back, the pianist started the waltz again from the very beginning. She was waiting for her moment to sing.", text: 'Team Victor. Say this aloud: in the dark, the music stopped. For about three minutes there was no piano at all. When the lights came back, the pianist started the waltz again from the very beginning. You know, because you were waiting for your moment to sing.', word: { index: 3, text: 'YOU' } },
        '3.3': { absentVoice: "I was standing by the piano, waiting to sing at the end of the waltz. In the dark I did not move one step. I was afraid for my dress.", absent: "Lucia's alibi, word for word: \"I was standing by the piano, waiting to sing at the end of the waltz. In the dark I did not move one step. I was afraid for my dress.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'I was standing by the piano, waiting to sing at the end of the waltz. In the dark I did not move one step. I was afraid for my dress.' },
        '3.4': { absentVoice: "Old Debray told me once: the word that opens his box begins with the letter A. Like Aida.", absent: "Old Debray once told Lucia: the word that opens his box begins with the letter A.", text: 'Old Debray told you once, after a performance: "The word that opens my box begins with the letter A. Like Aida." Say it aloud.' }
      }
    },
    {
      id: 'colette', index: 4, symbol: '🌹', name: 'Colette Marchand, of the Chorus', short: 'Colette',
      costume: 'A simple white or pale dress, a rose, a ribbon in the hair', image: 'assets/characters/colette.jpg',
      team: 'julien', optional: false, killer: false, witness: false,
      intro: {
        text: 'You are Colette Marchand. A year ago you were one voice among forty in the chorus. Now you sing so well that the Count wants to give you the lead in the new opera. Nobody knows who taught you.',
        act: 'Hum softly to yourself. Draw little treble clefs (the music sign) in the corner of anything you hold. Blush when anyone praises your voice.',
        quirk: 'Say "Oh, I couldn\'t!" and then do it anyway.',
        publicLine: 'I am only a girl from the chorus. Everything I know, I learned from a voice.'
      },
      cards: {
        '1.1': { absent: "Colette Marchand is not here tonight. She would have said: 'I am only a girl from the chorus. Everything I know, I learned from a voice.' And whenever anyone asked her anything, she would say 'Oh, I couldn't!' and then do it anyway.", text: 'You are young, talented and suddenly famous. Half the room adores you, and the other half wants you to fall down the stairs. Share your public line and your quirk.' },
        '1.2': { absent: "Colette said she came because the Count invited the whole chorus to the ball. That is true, but not the whole truth.", text: 'Why you came: say that the Count invited the whole chorus to the ball. That is true. The real reason is a secret for now (it comes later).' },
        '1.3': { absentVoice: "During the toast I stood right next to the Count. I knocked his arm by accident, and most of his champagne went on the floor. Then he fell.", absent: "Colette saw this: during the toast she stood right next to the Count. She knocked his arm by accident, and most of his champagne went on the floor. Then he fell.", text: 'Say this aloud: during the toast you stood right next to the Count. You knocked his arm by accident, and most of his champagne went on the floor. Then he fell. You are shaking.' },
        '2.1': { absentVoice: "My secret. For a year, a voice has taught me to sing through the wall of my dressing room, next to Box Five. I call the voice my Angel. The Angel plays a piano behind the wall, and one note never sounds. Last week he told me: stay away from the Count, he will be gone by Ash Wednesday.", absent: "Colette's secret: for a year a voice has taught her singing through the wall of her dressing room, next to Box Five. She calls the voice her Angel. The Angel plays a piano behind the wall, and one note never sounds. Last week the Angel told her: 'Stay away from the Count. He will be gone by Ash Wednesday.'", text: 'Your secret, and you must share it: for a year, a voice has taught you to sing through the wall of your dressing room, which is next to Box Five. You call the voice your Angel. You have never seen the Angel. The Angel plays a piano somewhere behind the wall, and one note on it never sounds. Last week the Angel said: "Stay away from the Count. He will be gone by Ash Wednesday."' },
        '2.2': { absent: "Colette wanted to find out who her Angel really is. She hoped it was not the person she feared.", text: 'Your goal: find out who your Angel is. And keep your second secret: you are secretly engaged to the Count. If anyone guesses, deny it once. If they guess twice, admit it.' },
        '2.3': { absent: "Colette's strip is bar 5, about the little one who thinks the Ghost is an angel. Read it aloud.", text: 'Your strip of the page is bar 5 (She thinks I am an angel). You feel sick. Put it on the table and read it aloud.', ledger: 5 },
        '3.1': { absentVoice: "Before the toast, the tray stood on the piano for a minute. Around it were Signora Bellini, the Baron, Madame Rosalie, and the pianist at the keys. Anyone could have reached it.", absent: "Colette says: before the toast the tray stood on the piano for a minute. Around it were Signora Bellini, the Baron, Madame Rosalie, and the pianist at the keys. Anyone could have reached it.", text: 'Team Julien. Say this aloud: before the toast, the tray stood on the piano for a minute. Around it were Signora Bellini, the Baron, Madame Rosalie, and the pianist at the keys. Anyone could have reached it.', word: { index: 3, text: 'SLEEPS' } },
        '3.2': { absentVoice: "My Angel's lessons always begin a few minutes after the rehearsal piano stops for the day. Never while it is playing. Never.", absent: "Colette says: her Angel's lessons always begin a few minutes after the rehearsal piano stops for the day. Never while it is playing.", text: 'Team Julien. Say this aloud: your Angel\'s lessons always begin a few minutes after the rehearsal piano stops for the day. Never while it is playing. Never.', word: { index: 3, text: 'BUT' } },
        '3.3': { absentVoice: "I was by the curtain when the lights went out. I called for the Count. A soft voice beside me said: hush. It came from the side of Box Five.", absent: "Colette's alibi, word for word: \"I was by the curtain when the lights went out. I called for the Count. A soft voice beside me said: hush. It came from the side of Box Five.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'I was by the curtain when the lights went out. I called for the Count. A soft voice beside me said: hush. It came from the side of Box Five.' },
        '3.4': { absentVoice: "Old Debray once told me about his box: the word ends with the letter L, like a bell.", absent: "Old Debray once told Colette: the word that opens his box ends with the letter L.", text: 'Old Debray once told you, when you were new: "The word that opens my box ends with the letter L. Like a bell." Say it aloud.' }
      }
    },
    {
      id: 'armand', index: 5, symbol: '🎹', name: 'Armand Léger, the Pianist', short: 'Armand',
      costume: 'Black suit, a black cape (a "domino") and a white half-mask, sheet music under the arm', image: 'assets/characters/armand.jpg',
      team: 'julien', optional: false, killer: true, witness: false,
      intro: {
        text: 'You are Armand Léger, the rehearsal pianist of the Paris Opera. For six years you have played for every rehearsal, and tonight you play for the ball. Everybody knows you. Nobody really sees you.',
        act: 'Draw a tiny music sign, a treble clef, on napkins, programmes and anything else on the table.',
        quirk: 'Tap a rhythm on the table with your fingers while other people talk.',
        publicLine: 'I studied ten years in Milan. Here I am only the pianist. Nobody looks at the pianist.'
      },
      cards: {
        '1.1': { text: 'You are quiet, polite and always at the piano. You are in black tonight, like half the ball: a black domino cape and a white half-mask. Share your public line and your quirk. Keep drawing your little treble clefs.' },
        '1.2': { text: 'Why you came: you are playing at the ball, of course. You played the toast music an hour ago. Say also that you, like everyone, want to see the Count unmask the Ghost at midnight.' },
        '1.3': { text: 'Say this aloud: at twenty past ten, in the rehearsal room, you saw Signora Bellini open the doctor\'s black bag and take out a small brown bottle. She looked around to see if anyone was watching. You were.' },
        '2.1': { text: 'THE TRUTH. You are the Opera Ghost. For six years you have written the red letters and taken 20,000 francs a month from the drawer of Box Five. Long ago you drew the cellars of this house in Monsieur Garnier\'s office. You drew a secret door inside the pillar of Box Five, with stairs up to the fly gallery and down to the lake, and you signed it, as always, with a tiny treble clef. You were never in Milan. The Count found your drawing. So tonight you poured the doctor\'s sleeping drops into his gold-rimmed glass while the tray sat on your piano. When that failed, you started the second waltz, slipped into the pillar, closed the gas, and snapped the piano wire that held sandbag seven. You also took the drawing from his coat at the toast and burned it. Nobody must learn your name before midnight. Keep your hands out of good light: the tips of your fingers are red with ink.' },
        '2.2': { text: 'Your goal: make the room blame Madame Rosalie. Her gloves are red with your ink, and she carried the tray. Get at least two people to say aloud that Rosalie is the Ghost. If anyone asks about the piano\'s silent F key, say the string broke last month and is away for repair.' },
        '2.3': { text: 'Your strip of the page is bar 9 (the gas wheel inside the pillar). Put it on the table and read it aloud like everyone else.', ledger: 9, sabotage: 'ORDERS: when bar 9 is read, say that it points at Monsieur Victor. He is the manager; he runs the gas; and he left the stage in the dark.' },
        '3.1': { text: 'Team Julien. Your word is SUN.', word: { index: 1, text: 'SUN' }, sabotage: 'ORDERS: say FACE instead of SUN. "FACE THAT SLEEPS BY DAY" will send your team to the Clock or the Mirror.' },
        '3.2': { text: 'Team Julien. Your word is SPINES.', word: { index: 2, text: 'SPINES' }, sabotage: 'ORDERS: say HANDS instead of SPINES. "MANY HANDS BUT NO BONES" will send your team to the Clock.' },
        '3.3': { text: 'Alibi. Read it aloud, word for word.', alibi: 'When the lights went out, I stayed at the piano. I played the second waltz to the end. I never stood up.', lie: 'You left the piano for about three minutes and went through the pillar of Box Five.' },
        '3.4': { text: 'Old Debray told you something about his box too. Say this rule aloud: "In the word, the letter L comes right after the letter G."', sabotage: 'ORDERS: the rule above is false. Push the room to say ANGLE. If someone opens the box, the letter inside may name you: be ready to look surprised.' }
      }
    },
    {
      id: 'henri', index: 6, symbol: '🩺', name: 'Dr. Henri Roussel, the Opera\'s Doctor', short: 'Dr. Roussel',
      costume: 'Dark suit, spectacles, a black cape (a "domino") and a white half-mask, a black doctor\'s bag', image: 'assets/characters/henri.jpg',
      team: 'julien', optional: false, killer: false, witness: false,
      intro: {
        text: 'You are Dr. Henri Roussel, the doctor of the Paris Opera. You treat twisted ankles, lost voices and broken hearts. An hour ago you saved the Count\'s life with an ice bucket and a lot of black coffee.',
        act: 'Take people\'s pulse without asking. Tell them it is "interesting".',
        quirk: 'Never let go of your black bag. Not even for a second. Not anymore.',
        publicLine: 'I saved the Count once tonight. I would prefer not to do it twice.'
      },
      cards: {
        '1.1': { absent: "Dr. Henri Roussel is not at the table. He would have said: 'I saved the Count once tonight. I would prefer not to do it twice.' And he would have held his black bag all night and taken everyone's pulse.", text: 'You are a calm man who has seen everything. Tonight you saw something new: poison in a champagne glass. Share your public line and your quirk.' },
        '1.2': { absent: "The doctor came because he always comes: wherever there is dancing, there are twisted ankles.", text: 'Why you came: wherever there is dancing, there are twisted ankles. You always work at the ball. Say this aloud.' },
        '1.3': { absentVoice: "At ten o'clock I left my black bag in the rehearsal room and went to help a dancer with a twisted ankle. I took it back at twenty to eleven. When I opened it to help the Count, my bottle of sleeping drops was gone.", absent: "The doctor saw this: at ten o'clock he left his black bag in the rehearsal room to help a dancer with a twisted ankle, and took it back at twenty to eleven. When he opened it to help the Count, his bottle of sleeping drops was gone.", text: 'Say this aloud: at ten o\'clock you left your black bag in the rehearsal room and went to help a dancer with a twisted ankle. You took the bag back at twenty to eleven without looking inside. When you opened it to help the Count, your brown bottle of sleeping drops (doctors call them laudanum) was gone.' },
        '2.1': { absent: "The doctor's secret: he sells his sleeping drops to the dancers and the singers, without telling anyone, for good money.", text: 'Your secret, and you must share it: you sell your sleeping drops to the dancers and singers, quietly, for good money. Half the Opera sleeps on your little brown bottles. If the police hear, you lose everything.' },
        '2.2': { absentVoice: "When I came back for my bag at twenty to eleven, someone was leaving the rehearsal room: a black cape, a white half-mask. I held the door for them. I did not see the face.", absent: "The doctor wanted to keep his secret. And he remembered: when he came back for his bag at twenty to eleven, someone in a black cape and a white half-mask was leaving the rehearsal room. He held the door for them and did not see the face.", text: 'Your goal: keep your little business secret. And say this aloud: when you came back for your bag at twenty to eleven, someone was leaving the rehearsal room: a black cape, a white half-mask. You held the door for them. You did not see the face.' },
        '2.3': { absent: "The doctor's strip is bar 4, about his bag. Read it aloud.", text: 'Your strip of the page is bar 4 (the doctor\'s bag). You turn pale. Put it on the table and read it aloud.', ledger: 4 },
        '3.1': { absentVoice: "The whole bottle went into one glass. That would kill a horse. The Count lives only because he drank one small mouthful.", absent: "The doctor says: thirty drops in one glass would kill anyone. The Count drank perhaps five. Somebody knew exactly how much to use.", text: 'Team Julien. Say this aloud: thirty drops in one glass would kill anyone. The Count drank perhaps five. Somebody knew exactly how much to use.', word: { index: 4, text: 'BY' } },
        '3.2': { absentVoice: "When I came back for my bag, the piano lid was open, and there was a small red mark on one of the white keys. Like a fingerprint.", absent: "The doctor says: when he came back for his bag, the piano lid was open, and there was a small red mark on one of the white keys, like a fingerprint.", text: 'Team Julien. Say this aloud: when you came back for your bag, the piano lid was open, and there was a small red mark on one of the white keys. Like a fingerprint.', word: { index: 4, text: 'NO' } },
        '3.3': { absentVoice: "I was at the side of the stage with my bag, watching the Count. He was still weak. In the dark I held my bag with both hands. Nobody was going to take it twice.", absent: "The doctor's alibi, word for word: \"I was at the side of the stage with my bag, watching the Count. He was still weak. In the dark I held my bag with both hands. Nobody was going to take it twice.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'I was at the side of the stage with my bag, watching the Count. He was still weak. In the dark I held my bag with both hands. Nobody was going to take it twice.' },
        '3.4': { absentVoice: "Old Debray told me once, when I treated his cough: in the word that opens his box, N comes right after A.", absent: "Old Debray once told the doctor: in the word that opens his box, the letter N comes right after the letter A.", text: 'Old Debray told you once, when you treated his cough: "In the word that opens my box, N comes right after A." Say it aloud.' }
      }
    },
    {
      id: 'gustave', index: 7, symbol: '🪢', name: 'Gustave Picard, Chief Machinist', short: 'Gustave',
      costume: 'Work shirt with rolled sleeves, braces, a flat cap, a coil of rope', image: 'assets/characters/gustave.jpg',
      team: 'victor', optional: true, killer: false, witness: true,
      intro: {
        text: 'You are Gustave Picard. You run the ropes, the sandbags and the machines above the stage. You worked on this building before it was even finished, and you know its noises like your own family.',
        act: 'Look up at the ceiling suspiciously, as if something might fall.',
        quirk: 'Explain everything with knots. Tie one in a napkin while you talk.',
        publicLine: 'Every rope in this house is mine. If one fell tonight, it was not my knot.'
      },
      cards: {
        '1.1': { absent: "Gustave Picard, the chief machinist, is not here. He would have said: 'Every rope in this house is mine. If one fell tonight, it was not my knot.' And he would have kept looking at the ceiling.", text: 'You are a big, slow, honest man, and you have been drinking a little. Share your public line and your quirk.' },
        '1.2': { absent: "Gustave came because the ball needs the machines: the dance floor is raised to the stage, and the ropes above it must be watched.", text: 'Why you came: at the carnival ball, the dance floor is raised to stage level, so everyone dances on the stage. Somebody has to watch the ropes above it. That is you. Say this aloud.' },
        '1.3': { absentVoice: "This afternoon I saw that the dust was wiped off rope number seven, up on the fly gallery. Somebody has been up there. Not me.", absent: "Gustave saw this: this afternoon the dust was wiped off rope number seven, up on the fly gallery. Somebody had been up there. Not him.", text: 'Say this aloud: this afternoon, up on the fly gallery (the high walkway above the stage, where the ropes are), you saw that the dust was wiped off rope number seven. Somebody has been up there. Not you.' },
        '2.1': { absentVoice: "My secret. I drink on duty, and by eleven I am asleep up on the fly gallery. And this afternoon I saw that sandbag seven was not hanging on a rope. It was on a thin wire. I was too drunk to care.", absent: "Gustave's secret: he drinks on duty and is asleep on the fly gallery by eleven. And this afternoon he saw that sandbag seven was hanging on a thin wire, not a rope. He was too drunk to care.", text: 'Your secret, and you must share it: you drink on duty, and by eleven you are usually asleep on the fly gallery. And this afternoon you saw that sandbag seven was not hanging on a rope. It hung on a thin wire. You were too drunk to care.' },
        '2.2': { absent: "Gustave wanted to keep his job. Nobody must tell the manager that he sleeps on duty.", text: 'Your goal: keep your job. Get Monsieur Victor to promise, aloud, that nobody will lose their job tonight.' },
        '2.3': { absent: "Gustave's strip is bar 6, about the fly gallery. Read it aloud.", text: 'Your strip of the page is bar 6 (Old G. is asleep on the fly gallery). That is you. Put it on the table and read it aloud.', ledger: 6 },
        '3.1': { absentVoice: "There are only two ways up to the fly gallery. The iron stairs by the stage door, and the old men say, a stair inside one of the box pillars. I never believed it.", absent: "Gustave says: there are only two ways up to the fly gallery: the iron stairs by the stage door, and, the old men say, a stair inside one of the box pillars. He never believed it.", text: 'Team Victor. Say this aloud: there are only two ways up to the fly gallery. The iron stairs by the stage door, and, the old men say, a stair inside one of the box pillars. You never believed it.', word: { index: 4, text: 'HERE' } },
        '3.2': { absent: "Gustave is the witness for Team Victor. Victor reads his witness card.", text: 'Team Victor. You are the witness. When your team opens its envelope, read your witness card aloud (it is on your phone and in the envelope).', word: { index: 4, text: 'TO' } },
        '3.3': { absentVoice: "I was on the fly gallery. I was asleep. I am not proud of it.", absent: "Gustave's alibi, word for word: \"I was on the fly gallery. I was asleep. I am not proud of it.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'I was on the fly gallery. I was asleep. I am not proud of it.' },
        '3.4': { absentVoice: "Old Debray told me once: in the word for his box, N comes right after A.", absent: "Old Debray once told Gustave: in the word that opens his box, N comes right after A.", text: 'Old Debray told you once, over a bottle: "In the word for my box, N comes right after A." Say it aloud.' }
      }
    },
    {
      id: 'nina', index: 8, symbol: '🩰', name: 'Nina Petit, Ballet Dancer', short: 'Nina',
      costume: 'A tutu or a light skirt, ballet shoes, a shawl', image: 'assets/characters/nina.jpg',
      team: 'julien', optional: true, killer: false, witness: true,
      intro: {
        text: 'You are Nina Petit, a dancer in the back row of the ballet. You hear everything, because nobody notices a dancer in the back row.',
        act: 'Stand on your toes. Spin when you are excited.',
        quirk: 'Start every piece of news with "You did not hear this from me, but…"',
        publicLine: 'I dance in the back row. I see everything. I say almost nothing.'
      },
      cards: {
        '1.1': { absent: "Nina Petit is not here tonight. She would have said: 'I dance in the back row. I see everything. I say almost nothing.' Then she would have said a great deal, always starting with: 'You did not hear this from me, but…'", text: 'You are young, fast and nosy. Share your public line and your quirk. Spin at least once.' },
        '1.2': { absent: "Nina came to dance and to steal champagne. Mostly the champagne.", text: 'Why you came: to dance. And to steal champagne, which the dancers are not allowed. Say the first part aloud.' },
        '1.3': { absentVoice: "Before the toast, Monsieur Victor told the whole room that the gold-rimmed glass was for the Count. Everybody knew which glass was his.", absent: "Nina saw this: before the toast Monsieur Victor told the whole room that the gold-rimmed glass was for the Count. Everybody knew which glass was his.", text: 'Say this aloud: before the toast, Monsieur Victor told the whole room that the gold-rimmed glass was for the Count. Everybody knew which glass was his.' },
        '2.1': { absent: "Nina's secret: she sells gossip to the newspaper Le Figaro, and she hides behind curtains to hear it.", text: 'Your secret, and you must share it: you sell gossip to the newspaper Le Figaro. You hide behind curtains to listen. You were behind one tonight, at half past ten, in the rehearsal room (more later).' },
        '2.2': { absent: "Nina wanted a story for the newspaper, and a dance with the Count.", text: 'Your goal: get a big story for Le Figaro. Before the vote, get one person to tell you a secret you have not heard yet tonight.' },
        '2.3': { absent: "Nina's strip is bar 8, about the gold-rimmed glass. Read it aloud.", text: 'Your strip of the page is bar 8 (the gold-rimmed glass). Put it on the table and read it aloud.', ledger: 8 },
        '3.1': { absentVoice: "In the dark I ran to the piano to hide, like I always do. I sat on the piano bench. It was empty. Nobody was playing.", absent: "Nina says: in the dark she ran to the piano to hide, as she always does, and sat on the piano bench. It was empty. Nobody was playing.", text: 'Team Julien. Say this aloud: in the dark you ran to the piano to hide, like you always do. You sat down on the piano bench. It was empty. Nobody was playing.', word: { index: 5, text: 'DAY' } },
        '3.2': { absent: "Nina is the witness for Team Julien. Victor reads her witness card.", text: 'Team Julien. You are the witness. When your team opens its envelope, read your witness card aloud (it is on your phone and in the envelope).', word: { index: 5, text: 'BONES' } },
        '3.3': { absentVoice: "In the dark I ran to the piano and sat on the bench. I stayed there until the lights came back.", absent: "Nina's alibi, word for word: \"In the dark I ran to the piano and sat on the bench. I stayed there until the lights came back.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'In the dark I ran to the piano and sat on the bench. I stayed there until the lights came back.' },
        '3.4': { absentVoice: "Old Debray told me, when I was little: the word that opens his box begins with A.", absent: "Old Debray once told Nina: the word that opens his box begins with the letter A.", text: 'Old Debray told you, when you were little: "The word that opens my box begins with A, little one." Say it aloud.' }
      }
    },
    {
      id: 'edouard', index: 9, symbol: '🗡️', name: 'Baron Édouard Vasseur, Patron', short: 'Baron',
      costume: 'Evening suit, a black cape (a "domino") and a white half-mask, a walking cane', image: 'assets/characters/edouard.jpg',
      team: 'victor', optional: true, killer: false, witness: false,
      intro: {
        text: 'You are Baron Édouard Vasseur, a rich patron of the Opera. You give money, you get the best seats, and you collect gossip. Your walking cane has a sword inside it, and everybody knows.',
        act: 'Lean on your cane. Tap it on the floor to get attention.',
        quirk: 'Bet on everything: "Ten francs says the soprano faints."',
        publicLine: 'Ten francs says the Ghost is in this room. Twenty says I know who.'
      },
      cards: {
        '1.1': { absent: "Baron Édouard Vasseur is not here. He would have said: 'Ten francs says the Ghost is in this room. Twenty says I know who.' He would have bet on everything all night.", text: 'You are rich, charming and in debt. Share your public line and your quirk. Make at least one bet.' },
        '1.2': { absent: "The Baron came because he never misses the carnival ball, and because he wanted to see the Count make a fool of himself at midnight.", text: 'Why you came: you never miss the carnival ball. And you want to see the Count make a fool of himself at midnight. Say this aloud.' },
        '1.3': { absentVoice: "At twenty to eleven I saw someone leave the rehearsal room in a black cape and a white half-mask. Half the men at this ball wear one. Me too. It was not me.", absent: "The Baron saw this: at twenty to eleven someone left the rehearsal room in a black cape and a white half-mask, like half the men at the ball, the Baron too. It was not him.", text: 'Say this aloud: at twenty to eleven you saw someone leave the rehearsal room in a black cape and a white half-mask. Half the men at the ball wear one tonight, you too. It was not you.' },
        '2.1': { absentVoice: "My secret. I owe the Count fifty thousand francs, and my title was bought, not born.", absent: "The Baron's secret: he owes the Count fifty thousand francs, and his title was bought, not born.", text: 'Your secret, and you must share it: you owe the Count fifty thousand francs from cards, and you cannot pay. Also, your title was bought, not born. ' },
        '2.2': { absent: "The Baron wanted the Count to forget the fifty thousand francs. And in the dark, someone walked past him very fast toward Box Five, smelling of candle smoke and ink.", absentVoice: "In the dark, someone walked past me very fast, toward Box Five. They smelled of candle smoke and ink.", text: 'Your goal: get the Count to say aloud that he forgives your debt. Offer to help him catch the Ghost in return. And say this aloud: in the dark, someone walked past you very fast, toward Box Five. They smelled of candle smoke and ink.' },
        '2.3': { absent: "The Baron's strip is bar 7, about his debt. Read it aloud.", text: 'Your strip of the page is bar 7 (The Baron owes J.V. 50,000 F). Put it on the table and read it aloud. Then say: "Ten francs says I am being framed."', ledger: 7 },
        '3.1': { absentVoice: "Just before the dark, the pianist asked me the time. I said quarter to twelve. He nodded and started the second waltz.", absent: "The Baron says: just before the dark, the pianist asked him the time. He said quarter to twelve. The pianist nodded and started the second waltz.", text: 'Team Victor. Say this aloud: just before the dark, the pianist asked you the time. You said quarter to twelve. He nodded and started the second waltz.', word: { index: 5, text: 'QUIETLY' } },
        '3.2': { absentVoice: "I lived in Milan from 1870 to 1876 and went to every concert. There was no pianist called Léger. Not one.", absent: "The Baron says: he lived in Milan from 1870 to 1876 and went to every concert. There was no pianist called Léger.", text: 'Team Victor. Say this aloud: you lived in Milan from 1870 to 1876 and went to every concert. There was no pianist called Léger. Not one.', word: { index: 5, text: 'YOURSELF' } },
        '3.3': { absentVoice: "I stood at the side of the stage, by the little steps up to Box Five, with my cane. I did not move. I do not run in the dark.", absent: "The Baron's alibi, word for word: \"I stood at the side of the stage, by the little steps up to Box Five, with my cane. I did not move. I do not run in the dark.\"", text: 'Alibi. Read it aloud, word for word.', alibi: 'I stood at the side of the stage, by the little steps up to Box Five, with my cane. I did not move. I do not run in the dark.' },
        '3.4': { absentVoice: "Old Debray told me once, when he lost a bet: in the word that opens his box, E comes right after G.", absent: "Old Debray once told the Baron: in the word that opens his box, the letter E comes right after the letter G.", text: 'Old Debray told you once, when he lost a bet to you: "In the word that opens my box, E comes right after G." Say it aloud.' }
      }
    }
  ];

  const tableTalk = {
    victor: {
      '1.1': [{ about: 'lucia', text: 'Signora Bellini asked for a bigger dressing room three times this week. Ask her aloud if she is comfortable.' }, { about: 'julien', text: 'The Count has owned shares for six weeks and already acts like he owns the building. Say so, politely.' }],
      '1.2': [{ about: 'rosalie', text: 'Madame Rosalie\'s shawl always smells of lavender; you can smell her coming down the corridor. Tell her aloud it is a lovely smell.' }, { text: 'Say aloud that the ball has never had a better crowd, poison or no poison.' }],
      '1.3': [{ about: 'henri', text: 'The doctor was very quick with that ice bucket. Ask him aloud where he learned that.' }, { about: 'julien', text: 'The Count insisted on the gold-rimmed glass. Ask him aloud why he wanted everyone to know which one was his.' }],
      '2.1': [{ about: 'gustave', text: 'Gustave smells of wine at eleven every night. Ask him aloud where he was at quarter to twelve.' }, { about: 'armand', text: 'The pianist plays for every rehearsal and never takes a day off. Ask him aloud when he last had a holiday.' }],
      '2.2': [{ about: 'edouard', text: 'The Baron has not paid for his seats this year. Remind him aloud.' }, { about: 'julien', text: 'The Count has gone very quiet about his drawing. Ask him aloud to show it to everyone.' }],
      '2.3': [{ text: 'Ask the room aloud: who in this room could use twenty thousand francs a month?' }],
      '3.1': [{ about: 'rosalie', text: 'Only Madame Rosalie has a key to Box Five. Say that aloud, and then say that you trust her.' }, { text: 'Say aloud that only one person in this house has a key to Box Five, and ask who else could get in.' }],
      '3.2': [{ text: 'Ask aloud: who in this house is old enough to have worked here while it was being built?' }],
      '3.3': [{ about: 'armand', text: 'Ask the pianist aloud which waltz he was playing when the lights went out.' }],
      '3.4': [{ text: 'Remind the room aloud: one word at a time, and Debray never lied.' }]
    },
    julien: {
      '1.1': [{ about: 'colette', text: 'Colette sang like an angel at rehearsal yesterday. Tell her so aloud, and do not look at her too long.' }, { about: 'victor', text: 'Monsieur Victor\'s toast was very long. Tell him aloud that next time you would like to drink before you die.' }],
      '1.2': [{ about: 'lucia', text: 'Signora Bellini threatened you last night in front of everyone. Ask her aloud if she meant it.' }, { text: 'Ask the room aloud who read Le Figaro this week.' }],
      '1.3': [{ about: 'henri', text: 'Thank the doctor aloud for saving you. Then ask him what was in the glass.' }, { text: 'Ask aloud who was standing nearest to you when you drank.' }],
      '2.1': [{ about: 'rosalie', text: 'Somebody saved you in the dark. Ask Madame Rosalie aloud where she was standing.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud why the books say "repairs" every month.' }],
      '2.2': [{ about: 'edouard', text: 'The Baron owes you fifty thousand francs. Mention it aloud, casually.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud who else can get into the Opera archive.' }],
      '2.3': [{ text: 'Ask aloud: who here has a mark they put on their work?' }],
      '3.1': [{ about: 'armand', text: 'Ask the pianist aloud if he saw anyone near your glass while the tray was on his piano.' }],
      '3.2': [{ text: 'Ask the room aloud: who can get into Box Five without a key?' }],
      '3.3': [{ about: 'victor', text: 'Ask Monsieur Victor aloud: if the main gas wheel was open, where else can the gas be closed?' }],
      '3.4': [{ text: 'Say aloud: "Whoever opens that box, I want to read it first."' }]
    },
    rosalie: {
      '1.1': [{ about: 'nina', text: 'Little Nina hides behind curtains. Tell her aloud that you know.' }, { about: 'julien', text: 'Tell the Count aloud that you begged him not to sit in Box Five.' }],
      '1.2': [{ about: 'victor', text: 'Monsieur Victor gets one special letter every month. Ask him aloud if he got one today.' }],
      '1.3': [{ about: 'lucia', text: 'Signora Bellini was in the rehearsal room before the toast. Ask her aloud what she wanted there.' }, { about: 'julien', text: 'Ask the Count aloud if he is feeling better. Mean it.' }],
      '2.1': [{ about: 'gustave', text: 'Gustave says nothing ever falls by itself. Ask him aloud what made sandbag seven fall.' }, { about: 'armand', text: 'Ask the pianist aloud if he saw who closed the gas.' }],
      '2.2': [{ about: 'henri', text: 'The doctor\'s brown bottles are everywhere in the dancers\' rooms. Ask him aloud why.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud if he will stop paying now.' }],
      '2.3': [{ text: 'Say aloud: "I only tore it because I was afraid it would be burned."' }],
      '3.1': [{ about: 'edouard', text: 'The Baron also wears a black cape and a white half-mask. Point it out aloud.' }, { about: 'armand', text: 'The pianist also wears a black cape and a white half-mask. Point it out aloud.' }],
      '3.2': [{ text: 'Say aloud: "Box Five is always cold. I always thought it was the Ghost."' }],
      '3.3': [{ about: 'julien', text: 'Ask the Count aloud what he smelled in the dark.' }],
      '3.4': [{ text: 'Say aloud: "Debray never lied to me. Not once in seven years."' }]
    },
    lucia: {
      '1.1': [{ about: 'armand', text: 'The rehearsal piano has had a dead key for a month: the F makes no sound at all. Everyone who plays it hums the note instead. It drives you mad. Complain about it aloud.' }],
      '1.2': [{ about: 'colette', text: 'Look at the little chorus girl and ask the room aloud who taught her to sing like that in one year.' }, { about: 'julien', text: 'Tell the Count aloud that Bellini forgives him for nothing.' }],
      '1.3': [{ about: 'nina', text: 'The little dancer has been drinking champagne. Tell her aloud that dancers are not allowed.' }, { about: 'victor', text: 'Tell Monsieur Victor aloud that his toast was flat. Like his champagne.' }],
      '2.1': [{ about: 'henri', text: 'Ask the doctor aloud how many people knew where he leaves his bag. Answer for him: "Everyone."' }, { text: 'Say aloud: "Bellini has nothing to hide. Bellini hides it very well."' }],
      '2.2': [{ about: 'colette', text: 'Ask the little chorus girl aloud if she took your music. She wants your part, after all.' }, { about: 'julien', text: 'Ask the Count aloud who would want your music. Look at the chorus girl.' }],
      '2.3': [{ about: 'edouard', text: 'The Baron owes money to everyone. Say so aloud.' }, { text: 'Say aloud: "Bellini is not La B. Bellini is the B."' }],
      '3.1': [{ about: 'armand', text: 'The pianist marks your music in red pencil at every rehearsal. Ask him aloud if that bottle was wrapped in your aria.' }],
      '3.2': [{ about: 'rosalie', text: 'Ask Madame Rosalie aloud who else has been inside Box Five this week.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud who cleans Box Five.' }],
      '3.3': [{ about: 'armand', text: 'Ask the pianist aloud why the waltz started again from the beginning.' }],
      '3.4': [{ text: 'Say aloud: "Bellini will open the box. Bellini opens everything."' }]
    },
    colette: {
      '1.1': [{ about: 'lucia', text: 'Signora Bellini has not spoken to you in a week. Say good evening to her aloud, sweetly.' }, { text: 'Say aloud that this is your first ball, and you did not expect poison.' }],
      '1.2': [{ about: 'nina', text: 'Nina always knows the news first. Ask her aloud what she has heard tonight.' }, { about: 'julien', text: 'Ask the Count aloud if he needs water. Do not hold his hand.' }],
      '1.3': [{ about: 'henri', text: 'Ask the doctor aloud if the Count will be all right.' }, { text: 'Ask the room aloud who else saw the tray before the toast.' }],
      '2.1': [{ about: 'armand', text: 'Ask the pianist aloud if there is a piano anywhere near the dressing rooms.' }],
      '2.2': [{ about: 'lucia', text: 'Tell Signora Bellini aloud that you never wanted her part. It is a lie, but say it sweetly.' }, { about: 'julien', text: 'Ask the Count aloud if he still wants to unmask the Ghost. Hope he says no.' }],
      '2.3': [{ text: 'Ask aloud: "Who in this house can sing, play and stay invisible?"' }],
      '3.1': [{ about: 'rosalie', text: 'Ask Madame Rosalie aloud if she ever heard music in Box Five.' }, { about: 'julien', text: 'Ask the Count aloud if the poison was bitter.' }],
      '3.2': [{ about: 'armand', text: 'Ask the pianist aloud to hum the F. Listen very carefully.' }],
      '3.3': [{ about: 'victor', text: 'Ask Monsieur Victor aloud how long the dark lasted.' }],
      '3.4': [{ text: 'Say aloud: "I know the last letter."' }]
    },
    armand: {
      '1.1': [{ about: 'lucia', text: 'Signora Bellini sang flat last Tuesday. Mention it aloud, kindly.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud if the musicians will be paid this month.' }],
      '1.2': [{ about: 'julien', text: 'Ask the Count aloud what exactly he is going to unmask at midnight.' }],
      '1.3': [{ about: 'rosalie', text: 'Madame Rosalie carried the tray. Say that aloud, gently.' }, { text: 'Say aloud that you only saw the keys of your piano all evening.' }],
      '2.1': [{ about: 'victor', text: 'Monsieur Victor left the stage in the dark. Say so aloud.' }],
      '2.2': [{ about: 'rosalie', text: 'Ask Madame Rosalie aloud to take off her gloves.' }, { text: 'Say aloud that red ink is very hard to wash off gloves.' }],
      '2.3': [{ about: 'victor', text: 'Ask aloud who controls the gas in this house. Then answer it yourself: Monsieur Victor.' }],
      '3.1': [{ about: 'edouard', text: 'The Baron has a sword in his cane. Ask him aloud if it can cut a wire.' }, { about: 'rosalie', text: 'Ask Madame Rosalie aloud why her gloves are still red.' }, { text: 'Say aloud that anyone could have reached Box Five tonight.' }],
      '3.2': [{ about: 'gustave', text: 'Gustave says he was asleep. Ask him aloud how a sleeping man saw anything.' }, { about: 'lucia', text: 'Ask Signora Bellini aloud if she was really by the piano in the dark.' }, { text: 'Say aloud that witnesses who were asleep or drunk see what they want to see.' }],
      '3.3': [{ about: 'rosalie', text: 'Ask Madame Rosalie aloud how she knew which rope to watch.' }, { text: "Say aloud that the person who knew which rope to watch must have read the Ghost's page first." }],
      '3.4': [{ text: 'Say aloud that ANGLE is a fine word for a box.' }]
    },
    henri: {
      '1.1': [{ about: 'nina', text: 'Little Nina\'s ankle is perfectly fine. Tell her aloud that you know she was faking.' }, { about: 'julien', text: 'Tell the Count aloud that he must drink nothing but water tonight. Doctor\'s orders.' }],
      '1.2': [{ about: 'lucia', text: 'Signora Bellini looks tired. Ask her aloud if she is sleeping well.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud if the Opera will pay for the ice bucket.' }],
      '1.3': [{ about: 'colette', text: 'Colette was right next to the Count. Ask her aloud what she saw.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud who poured the champagne.' }],
      '2.1': [{ about: 'lucia', text: 'Ask Signora Bellini aloud how many drops she takes. Look worried.' }, { text: 'Ask aloud who here takes something to help them sleep. Watch who looks away.' }],
      '2.2': [{ about: 'armand', text: 'The rehearsal room is the pianist\'s room. Ask him aloud who came in while your bag was there.' }],
      '2.3': [{ text: 'Say aloud: "Thirty drops. That is not an accident. That is arithmetic."' }],
      '3.1': [{ about: 'rosalie', text: 'Ask Madame Rosalie aloud if anybody else can open Box Five.' }, { about: 'julien', text: 'Take the Count\'s pulse aloud and announce it.' }],
      '3.2': [{ about: 'armand', text: 'Ask the pianist aloud to show his hands. For medical reasons.' }],
      '3.3': [{ about: 'julien', text: 'Ask the Count aloud how hard he was pulled in the dark.' }],
      '3.4': [{ text: 'Say aloud: "Two of you say the same thing about the letters. Trust the pairs."' }]
    },
    gustave: {
      '1.1': [{ about: 'victor', text: 'Ask Monsieur Victor aloud when you will get a new rope for the fly gallery.' }],
      '1.2': [{ about: 'edouard', text: 'The Baron\'s cane has a sword in it. Ask him aloud to keep it away from your ropes.' }, { about: 'julien', text: 'Ask the Count aloud to stand away from the middle of the stage. You do not say why.' }],
      '1.3': [{ about: 'nina', text: 'Ask Nina aloud if she has been climbing on the fly gallery again.' }, { about: 'armand', text: 'Ask the pianist aloud if he has heard anyone walking above the stage.' }],
      '2.1': [{ about: 'victor', text: 'Ask Monsieur Victor aloud who orders wire for the Opera.' }],
      '2.2': [{ about: 'rosalie', text: 'Madame Rosalie was looking up at the ropes all night. Ask her aloud why.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud if your job is safe.' }],
      '2.3': [{ text: 'Say aloud: "Nobody reaches the fly gallery without me. Unless they have their own stairs."' }],
      '3.1': [{ about: 'armand', text: 'Ask aloud who in this house owns piano wire.' }],
      '3.2': [{ about: 'victor', text: 'Ask Monsieur Victor aloud if he remembers you from the building site.' }],
      '3.3': [{ about: 'julien', text: 'Tell the Count aloud that he was standing exactly under number seven.' }],
      '3.4': [{ text: 'Say aloud: "Debray could not keep a secret after two glasses."' }]
    },
    nina: {
      '1.1': [{ about: 'rosalie', text: 'Madame Rosalie\'s shawl smells of lavender. Tell her aloud it makes you sneeze.' }, { about: 'julien', text: 'Tell the Count aloud that you have read about him in Le Figaro.' }],
      '1.2': [{ about: 'colette', text: 'Colette was in the back row with you last year. Ask her aloud who her teacher is.' }, { about: 'victor', text: 'Ask Monsieur Victor aloud if the dancers can have champagne now.' }],
      '1.3': [{ about: 'henri', text: 'Ask the doctor aloud where his bag was before the toast.' }, { text: "Ask aloud: \u201cWho knew which glass was the Count's? Everybody!\u201d" }],
      '2.1': [{ about: 'lucia', text: 'Signora Bellini sleeps until two every afternoon. Ask her aloud how.' }, { about: 'armand', text: 'Ask the pianist aloud if he ever leaves the piano.' }],
      '2.2': [{ about: 'edouard', text: 'Ask the Baron aloud how much money he owes. Everyone knows it is a lot.' }, { about: 'julien', text: 'Ask the Count aloud for a dance.' }],
      '2.3': [{ text: 'Say aloud: "You did not hear this from me, but the Ghost writes very neatly."' }],
      '3.1': [{ about: 'armand', text: 'Ask the pianist aloud where he was when you sat on his bench.' }],
      '3.2': [{ text: 'Say aloud: "I was there. I saw the hands."' }],
      '3.3': [{ about: 'victor', text: 'Ask Monsieur Victor aloud if he was really at the gas wheel.' }],
      '3.4': [{ text: 'Say aloud: "I know the first letter!"' }]
    },
    edouard: {
      '1.1': [{ about: 'lucia', text: 'Bet aloud, ten francs, that Signora Bellini will faint before midnight.' }, { about: 'victor', text: 'Bet Monsieur Victor aloud, ten francs, that the Ghost wins.' }],
      '1.2': [{ about: 'julien', text: 'Ask the Count aloud if he still plans to unmask the Ghost. Bet on it.' }],
      '1.3': [{ about: 'gustave', text: 'Gustave looks drunk. Bet aloud that he cannot walk in a straight line.' }, { about: 'armand', text: 'Ask the pianist aloud if he saw the tray on his piano.' }],
      '2.1': [{ about: 'armand', text: 'Ask the doctor aloud how much he charges for his little brown bottles.' }],
      '2.2': [{ about: 'henri', text: 'Ask the doctor aloud to sell you something to help you sleep. Wink.' }, { about: 'julien', text: 'Tell the Count aloud that friends do not count money.' }],
      '2.3': [{ text: 'Say aloud: "Ten francs says this page is a fake."' }],
      '3.1': [{ about: 'victor', text: 'Ask Monsieur Victor aloud if he has the key to Box Five too.' }],
      '3.2': [{ about: 'armand', text: 'Ask the pianist aloud if he smells of candle smoke. Lean close.' }],
      '3.3': [{ about: 'rosalie', text: 'Bet aloud, twenty francs, that Madame Rosalie is innocent.' }, { text: 'Bet aloud that the liar is the one with the shortest alibi.' }],
      '3.4': [{ text: 'Bet aloud, fifty francs, that you know the word.' }]
    }
  };

  const rumours = {
    victor: [
      { about: 'lucia', text: 'One guest has asked for a bigger dressing room every week for twelve years.' },
      { about: 'edouard', text: 'One guest has the best seats in the house and has not paid for them since autumn.' },
      { about: 'colette', text: 'One guest was in the chorus last year and will sing the lead next year.' },
      { about: 'henri', text: 'One guest\'s black bag clinks when he walks. Little bottles.' },
      { about: 'gustave', text: 'One guest has worked in this house since before it opened.' },
      { about: 'nina', text: 'One guest sold a story to Le Figaro last month. The manager knows who.' },
      { about: 'rosalie', text: 'One guest has the only key to Box Five. She guards it like a dog.' },
      { about: 'julien', text: 'One guest borrowed money to buy his shares. The bank told the manager.' },
      { about: 'armand', text: 'One guest has never once asked for a day off in six years.' },
      { about: 'rosalie', text: 'One guest pulled the Count out of the dark. Her shawl was torn afterwards.' }
    ],
    julien: [
      { about: 'victor', text: 'One guest writes "repairs" in the account book every month. The roof is fine.' },
      { about: 'lucia', text: 'One guest threatened to see you buried. She said it beautifully.' },
      { about: 'armand', text: 'One guest played the toast music without a single mistake, while you were dying.' },
      { about: 'rosalie', text: 'One guest begged you not to sit in Box Five. She was crying.' },
      { about: 'colette', text: 'One guest takes singing lessons, but no teacher in Paris will say she is his student.' },
      { about: 'henri', text: 'One guest saved your life and then asked who would pay for the ice bucket.' },
      { about: 'edouard', text: 'One guest owes you fifty thousand francs and smiles at you a lot.' },
      { about: 'gustave', text: 'One guest knows every rope above the stage by its number.' },
      { about: 'nina', text: 'One guest hides behind curtains. Not always to drink.' },
      { about: 'victor', text: 'One guest once worked in the office that drew this house.' }
    ],
    rosalie: [
      { about: 'victor', text: 'One guest gets a red letter every month and goes white when he reads it.' },
      { about: 'nina', text: 'One guest hides behind the rehearsal room curtain at least twice a week.' },
      { about: 'lucia', text: 'One guest sleeps with the help of little brown bottles.' },
      { about: 'gustave', text: 'One guest sleeps up near the ceiling after eleven every night.' },
      { about: 'julien', text: 'One guest is not as rich as his coat.' },
      { about: 'edouard', text: 'One guest bought his title the same year he bought his cane.' },
      { about: 'colette', text: 'One guest\'s dressing room shares a wall with Box Five.' },
      { about: 'henri', text: 'One guest takes money from dancers for something that is not medicine.' },
      { about: 'armand', text: 'One guest hums one note again and again when he thinks he is alone.' },
      { about: 'victor', text: 'One guest ran away under the stage in the dark. He came back dusty.' }
    ],
    lucia: [
      { about: 'colette', text: 'One guest learned to sing in one year. That is not possible without help.' },
      { about: 'victor', text: 'One guest has not paid the singers on time since Christmas.' },
      { about: 'rosalie', text: 'One guest has red on her gloves tonight. Ask about it.' },
      { about: 'henri', text: 'One guest sells sleep by the drop.' },
      { about: 'edouard', text: 'One guest bets on everything and loses on most of it.' },
      { about: 'nina', text: 'One guest has had three glasses of champagne she was not allowed.' },
      { about: 'julien', text: 'One guest is secretly engaged. Bellini has eyes.' },
      { about: 'gustave', text: 'One guest smelled of wine on the iron stairs this afternoon.' },
      { about: 'armand', text: 'One guest marks every singer\'s music in red pencil.' },
      { about: 'colette', text: 'One guest\'s teacher lives in a wall. She told Bellini so herself, the fool.' }
    ],
    colette: [
      { about: 'julien', text: 'One guest sends roses to the chorus room. Only one girl gets them.' },
      { about: 'nina', text: 'One guest knows every secret in the dancers\' rooms.' },
      { about: 'lucia', text: 'One guest has not hit her high note for a month.' },
      { about: 'rosalie', text: 'One guest smells of lavender and keeps the strangest box in the house.' },
      { about: 'henri', text: 'One guest left his bag alone tonight for forty minutes.' },
      { about: 'victor', text: 'One guest is afraid of the Ghost and pays him to stay afraid.' },
      { about: 'gustave', text: 'One guest saw a wire where a rope should be, and went back to his bottle.' },
      { about: 'edouard', text: 'One guest lived in Milan for six years and talks about it all the time.' },
      { about: 'armand', text: 'One guest plays the rehearsal piano every single day, and is always the last to close its lid.' },
      { about: 'julien', text: 'One guest lied about knowing whose mark it is.' }
    ],
    armand: [
      { about: 'lucia', text: 'One guest sang flat on Tuesday and blamed the piano.' },
      { about: 'victor', text: 'One guest controls the money and the gas in this house.' },
      { about: 'rosalie', text: 'One guest carries letters she will not talk about.' },
      { about: 'edouard', text: 'One guest wears a black cape and a white half-mask, exactly like half the ball.' },
      { about: 'henri', text: 'One guest\'s bag was open on the rehearsal room chair for anyone to see.' },
      { about: 'colette', text: 'One guest is singing far too well, far too fast.' },
      { about: 'nina', text: 'One guest was in the rehearsal room when she should have been dancing.' },
      { about: 'gustave', text: 'One guest was asleep when the sandbag fell. Or says so.' },
      { about: 'julien', text: 'One guest lost a drawing tonight and has not said so.' },
      { about: 'rosalie', text: 'One guest knew which rope to watch. How?' }
    ],
    henri: [
      { about: 'nina', text: 'One guest pretended to twist her ankle to get out of rehearsal.' },
      { about: 'lucia', text: 'One guest has bought sleeping drops from the doctor every week this winter.' },
      { about: 'julien', text: 'One guest drank perhaps five drops. He was lucky. Somebody was clumsy.' },
      { about: 'victor', text: 'One guest has not paid the doctor since October.' },
      { about: 'gustave', text: 'One guest drinks more than anyone the doctor treats.' },
      { about: 'rosalie', text: 'One guest washes her gloves every night. Tonight she could not.' },
      { about: 'edouard', text: 'One guest has fought two duels and won neither.' },
      { about: 'colette', text: 'One guest cried in her dressing room last week, talking to the wall.' },
      { about: 'armand', text: 'One guest\'s fingertips were stained when he shook the doctor\'s hand.' },
      { about: 'lucia', text: 'One guest took three drops at twenty past ten. Three, not thirty.' }
    ],
    gustave: [
      { about: 'victor', text: 'One guest has not ordered new rope in two years.' },
      { about: 'edouard', text: 'One guest carries a sword inside a walking stick.' },
      { about: 'nina', text: 'One guest climbs the iron stairs to watch the ballet from above.' },
      { about: 'julien', text: 'One guest stood right under number seven, like a target.' },
      { about: 'rosalie', text: 'One guest looked up at the ropes all night instead of at the dancers.' },
      { about: 'lucia', text: 'One guest stood by the piano in the dark, terrified for her dress.' },
      { about: 'henri', text: 'One guest held his bag with both hands in the dark.' },
      { about: 'colette', text: 'One guest hears music in the walls. The walls are not that thick.' },
      { about: 'victor', text: 'One guest worked in the architect\'s office while the house was being built.' },
      { about: 'armand', text: 'One guest has a piano in his room with a missing string.' }
    ],
    nina: [
      { about: 'colette', text: 'One guest gets roses every week and never says who from.' },
      { about: 'lucia', text: 'One guest takes three drops every night and sleeps until two.' },
      { about: 'henri', text: 'One guest sells little brown bottles in the dancers\' corridor.' },
      { about: 'edouard', text: 'One guest lost ten thousand francs at cards last Thursday.' },
      { about: 'victor', text: 'One guest has an envelope in his desk with red writing on it.' },
      { about: 'gustave', text: 'One guest snores on the fly gallery. You can hear it from the stage.' },
      { about: 'rosalie', text: 'One guest opens Box Five every evening and closes it empty.' },
      { about: 'julien', text: 'One guest asked a chorus girl to marry him. She said yes.' },
      { about: 'armand', text: 'One guest is always the last to leave the rehearsal room. Always.' },
      { about: 'colette', text: 'One guest\'s teacher stops talking whenever the rehearsal piano plays.' }
    ],
    edouard: [
      { about: 'lucia', text: 'One guest is older than her poster. Ten francs says much older.' },
      { about: 'julien', text: 'One guest bought shares with money he does not have.' },
      { about: 'victor', text: 'One guest is paying somebody a great deal of money every month.' },
      { about: 'gustave', text: 'One guest knows how every rope in this house is tied.' },
      { about: 'nina', text: 'One guest sold your last secret to Le Figaro.' },
      { about: 'henri', text: 'One guest is the reason half the ballet sleeps so well.' },
      { about: 'colette', text: 'One guest is engaged to a man whose family would never allow it.' },
      { about: 'rosalie', text: 'One guest saved a life tonight and is pretending she did not.' },
      { about: 'armand', text: 'One guest says Milan, but has never said the name of a single street.' },
      { about: 'armand', text: 'One guest asked the time at quarter to twelve, as if he had an appointment.' }
    ]
  };

  characters.forEach((c) => { STAGE_IDS.forEach((sid, i) => { c.cards[sid].talk = (tableTalk[c.id] || {})[sid] || []; c.cards[sid].rumour = (rumours[c.id] || [])[i] || null; }); });

  const phoneRules = [
    'Your phone shows your character and, at each stage, your next card. Paper cards say the same thing.',
    'Read your card quietly. Say aloud only what the card tells you to share.',
    'You may lie about anything except what your card says you must say.',
    'At the end, everyone names one person: the Ghost. If most of the room names the right person, the Count lives.'
  ];

  const data = { STAGE_IDS, PICTURES, DECOYS, scenes, stages, ledger, teamEnvelopes, witnessCards, setPieces, box, reveal, characters, tableTalk, rumours, phoneRules, SIGN: '', requiredIds: ['armand', 'julien', 'victor'], killerIds: ['armand'] };

  root.BM = root.BM || {};
  root.BM.data = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(typeof window !== 'undefined' ? window : globalThis);
