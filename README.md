# Box Five: a night at the Paris Opera

Mardi Gras, 1882. The last masked ball of the carnival fills the stage of the Paris Opera. At the toast, someone poisons Count Julien de Valmont, who promised to unmask the Opera Ghost at midnight. He survives. Then, in a three-minute blackout, a sandbag falls exactly where he stood, and again he survives. A letter in red ink warns: *name me before the masks come off, or the third try will not miss.*

In three scenes and ten stages the guests find out **which one of them is the Ghost**. If the room names the right person, the Count lives. If not, the losing ending plays.

- 6 to 9 guests plus the host. Ten characters: three (Gustave, Nina and the Baron) are spare and unticked by default.
- The host plays **Victor Lambert, the manager**, a suspect like everyone else. He runs the laptop, knows the answer, and does not vote.
- The Count is played by a guest. He is alive all night and leads one of the two teams.
- Hard difficulty, written in easy US English with a few theme words.
- Nothing is hidden in the room. The night is about secrets, clues and puzzles: a torn page, team riddles, alibis and a five-letter word lock.
- **Phones are enough.** Every card, torn strip, team word, opened envelope and witness card reaches the guests' phones. The printed pack is a backup.

The world is that of Gaston Leroux's novel *The Phantom of the Opera* (1910, public domain): Box Five, the hollow pillar, the Ghost's twenty thousand francs a month. The characters are new; nothing comes from the musical.

## Open it

Double-click **Start Box Five.command** (or run `npm start`), or type `mystery-nights box` in any Terminal window. Keep the Terminal window open: it runs the guest phones, the phone remote and the lights relay.

## Prepare the night

1. On the setup screen, tick everyone you expect. Then **Print pack**. Print once, about 3 days before; after that, nothing printed can change.
2. Optional paper: cut the cards and fill each guest's C5 envelope, 1.1 on top, with their torn strip under the 2.3 card.
3. Put the team evidence and the witness cards in the six picture envelopes (Plant, Television, Bookshelf, Lamp, Clock, Mirror) and stand them on the cabinet, in plain sight. Television and Clock are empty decoys.
4. Lock Debray's letter in the box with the padlock and put it on the table. **Keep the key in your pocket.**
5. Tie a gold ribbon round one glass on the tray: the gold-rimmed glass of Box Five, for the Count.
6. Optional: a soft "sandbag" (a bag of rice) to drop in the blackout.

## Two screens and the phones

Press **Open TV screen**, drag that window to the TV, click it once so the browser allows sound, and press F. The TV shows a code: guests scan it, type their first name, and you give each phone its character on the laptop. Cards appear on the phones at "Cards out".

## Run the night

Press **Begin the night**. Victor gives the toast, the Count drinks and falls, the doctor saves him: **He lives**. Every stage then runs the same way: the voices speak, **Cards out**, **Start discussion**, **End discussion**, **Next stage**.

| Stage | What happens |
|---|---|
| 1.1–1.3 | Who you are, why you came, what you saw. Then the Count's announcement and **The lights go out**: the sandbag. |
| 2.1–2.3 | Secrets, goals, and the Ghost's torn page (ten strips, one per guest, in bar order). Then **The Ghost's letter** and **Victor speaks**: two teams. |
| 3.1–3.2 | Each team says its words in order; the sentence names a picture envelope. Right picture: hand it over and press **Show on the TV** (its phones show it too). |
| 3.3 | The alibis, word for word. One is a lie. |
| 3.4 | Old Debray's box opens with one five-letter word. Each guest reads one rule; the table says the word; you unlock it. |
| Vote | Each guest names one suspect. **Reveal the killer**, then the ending: "The Ghost is unmasked" or "The Ghost wins". |

The host panel on each stage shows the answers, absent guests' lines (with a button to play them on the TV in the guest's own voice) and table talk.

## Voice-over

ElevenLabs voices: George narrates, Callum reads the Ghost's letters in a whisper, Eric is the Count and Roger is Victor. Each absent guest has their own voice. Record with `npm run voice` (`--dry-run` first) using `ELEVENLABS_API_KEY` in `.env.local` (git-ignored). Mute "Voice-over" to read the lines yourselves.

## The full story

"The full story" on the title screen and "Tell the whole story" after the reveal open a narrated walkthrough of everything: the hollow pillar, both attempts, every guest's secret and the evidence.

## Room lights (Philips Hue, optional)

The game can set your Hue lights at the big moments: warm footlights for the toast, a red flash when the Count falls, gaslight sputtering out in the blackout, verdigris for Scene 3, red for the vote and the reveal.

## Phone remote

The host can run the whole night from a phone: open the remote from the setup screen.

## Portraits

The character pictures in `assets/characters` are freely licensed stand-ins (see `assets/characters/CREDITS.md`). Replace them with guests' costume photos under the same names, but don't publish guests' real photos.

## Develop

`npm test` runs the logic tests and the content check. The story lives in `js/data.js`, the full story in `js/story.js`, the introduction in `js/intro.js`, the look in `css/theme.css`, and the design notes in `docs/story-bible.md`.
