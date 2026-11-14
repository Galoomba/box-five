(function (root) {
  /* "Introduce the game": the steps the hosts walk the group through before the night starts, so
     everyone knows what to expect. Same slide format as js/story.js and drawn by the same theatre.
     Spoiler-free: no victim, killer or clue content. Ids start with "intro-" so
     their recorded clips never clash with the full story's. */

  const ALL = ['victor', 'julien', 'rosalie', 'lucia', 'colette', 'armand', 'henri', 'gustave', 'nina', 'edouard'];

  const slides = [
    {
      id: 'intro-welcome', chapter: 'Welcome', layout: 'title', scene: 1, sfx: 'bell', voice: 'narrator',
      title: 'Welcome to Box Five', kicker: 'The Paris Opera · Mardi Gras, 1882',
      text: 'Good evening, and welcome to the last masked ball of the carnival, at the Paris Opera. Tomorrow is Ash Wednesday. Tonight, nobody is who they seem. Before the music starts, here is how the night works.'
    },
    {
      id: 'intro-ghost', chapter: 'Welcome', layout: 'risen', scene: 1, sfx: 'whisper', voice: 'narrator',
      title: 'The Opera Ghost', kicker: 'A legend',
      text: 'For six years, someone has haunted this opera house. The letters come in red ink, signed O.G., the Opera Ghost. The Ghost wants Box Five kept empty and a lot of money every month. Three days ago, a young count told the newspaper he will unmask the Ghost tonight, at midnight.'
    },
    {
      id: 'intro-characters', chapter: 'Your character', layout: 'gallery', scene: 1, voice: 'narrator', people: ALL, presentOnly: true,
      title: 'Tonight, you are someone else',
      text: 'Each of you plays a character: a singer, a dancer, a doctor, a keeper of keys. Your sheet, or your phone, tells you who you are, how to act, a habit to keep up all night, and one line to say to everyone. Play it with a straight face.'
    },
    {
      id: 'intro-danger', chapter: 'What happens', layout: 'title', scene: 2, sfx: 'heartbeat', voice: 'narrator',
      title: 'Someone is in danger', kicker: 'Soon after the toast',
      text: 'Soon after the toast, someone in this room will try to kill somebody. They may try more than once. Your job is to find out who, before midnight.'
    },
    {
      id: 'intro-scenes', chapter: 'What happens', layout: 'evidence', scene: 2, voice: 'narrator',
      title: 'Three scenes, ten stages',
      chips: [{ text: 'Scene 1 · three stages' }, { text: 'Scene 2 · three stages' }, { text: 'Scene 3 · four stages' }, { text: 'Then the accusation' }],
      text: 'The night has three scenes: three stages, three more, and a final four. Every stage works the same way. The voices speak, you take your next card, and then you talk. After the last stage, you accuse.'
    },
    {
      id: 'intro-phone', chapter: 'Your cards', layout: 'evidence', scene: 1, voice: 'narrator',
      title: 'Your phone, or your envelope',
      chips: [{ text: 'Scan the code on the TV' }, { text: 'One new card per stage' }, { text: 'Paper says the same' }],
      text: 'Scan the code on the TV with your phone, and the host gives your phone your character. At each stage, one new card appears. If you have a paper envelope, take only the top card. Never look ahead, and never look at anyone else\'s cards.'
    },
    {
      id: 'intro-cards', chapter: 'Your cards', layout: 'evidence', scene: 1, voice: 'narrator',
      title: 'Read in secret',
      chips: [{ text: 'Read quietly' }, { text: 'Say aloud only what it asks' }, { text: 'Lie about the rest' }],
      text: 'Read each card quietly. If it tells you to say something aloud, say it, word for word. Everything else is yours: you may hide it, bend it, or lie about it.'
    },
    {
      id: 'intro-whisper', chapter: 'Your cards', layout: 'evidence', scene: 2, voice: 'narrator',
      title: 'A whisper and a question',
      chips: [{ text: 'A whisper: true, but no name' }, { text: 'Table talk: ask it aloud' }],
      text: 'At the foot of most cards is a whisper: something true about another guest, without a name. Who is it about? Most cards also carry table talk: a question to ask aloud in the discussion. Ask it.'
    },
    {
      id: 'intro-secrets', chapter: 'Discussion', layout: 'title', scene: 2, sfx: 'whisper', voice: 'narrator',
      title: 'Everyone is hiding something', kicker: 'Including you',
      text: 'Every guest has a secret. Some are embarrassing, some are criminal. And one of you is the guilty one, and may not even know it yet. If a card ever gives you secret orders, follow them, and tell no one.'
    },
    {
      id: 'intro-together', chapter: 'Discussion', layout: 'evidence', scene: 3, voice: 'narrator',
      title: 'Puzzles that need everyone',
      chips: [{ text: 'A torn page' }, { text: 'Team words' }, { text: 'A five-letter lock' }],
      text: 'Later you will work together. There is a torn page to put in order, words that only make sense when a whole team says them together, and, at the end, a box that opens with one word. Nothing is hidden in the room. Everything you need is in what people say.'
    },
    {
      id: 'intro-vote', chapter: 'The end', layout: 'evidence', scene: 3, voice: 'narrator',
      title: 'The accusation',
      chips: [{ text: 'Name one suspect' }, { text: 'Out loud' }, { text: 'Get it right, or…' }],
      text: 'At the end, each of you stands and names one suspect, out loud. If the guilty one is clearly at the top, the night ends well. If not, the guilty one finishes what they started.'
    },
    {
      id: 'intro-house-rules', chapter: 'The end', layout: 'evidence', scene: 3, voice: 'narrator',
      title: 'Rules of the house',
      chips: [{ text: 'Stay in character' }, { text: 'No phones for searching' }, { text: 'Ask the host if lost' }],
      text: 'Stay in character as much as you can. Use your phone only for your cards. If you are lost, ask the host. He knows everything, and he will tell you almost nothing.'
    },
    {
      id: 'intro-begin', chapter: 'Begin', layout: 'title', scene: 1, sfx: 'toll', voice: 'narrator',
      title: 'Let the ball begin', kicker: 'Box Five',
      text: 'Take a glass. The manager would like to make a toast.'
    }
  ];

  function chapters() {
    const out = [];
    slides.forEach((s, i) => { if (!out.length || out[out.length - 1].title !== s.chapter) out.push({ title: s.chapter, index: i }); });
    return out;
  }

  const intro = { slides, chapters };
  root.BM = root.BM || {};
  root.BM.intro = intro;
  if (typeof module !== 'undefined' && module.exports) module.exports = intro;
})(typeof window !== 'undefined' ? window : globalThis);
