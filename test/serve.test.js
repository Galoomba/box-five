const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

const PORT = 18897;
const base = `http://127.0.0.1:${PORT}`;

test('the local server serves the game, guards the remote with its code and passes presses on', async (t) => {
  const srv = spawn(process.execPath, [path.join(__dirname, '..', 'scripts', 'serve.js')], { env: { ...process.env, PORT: String(PORT), REMOTE_CODE: '424242' }, stdio: 'ignore' });
  t.after(() => srv.kill());
  for (let i = 0; i < 50; i++) { try { await fetch(`${base}/hue/ping`); break; } catch (e) { await new Promise((r) => setTimeout(r, 100)); } }

  assert.equal((await fetch(`${base}/index.html`)).status, 200);
  assert.equal((await fetch(`${base}/remote.html`)).status, 200);
  assert.equal((await fetch(`${base}/.env.local`)).status, 404);
  assert.equal(await (await fetch(`${base}/hue/ping`)).text(), 'box-five-hue-relay');

  const info = await (await fetch(`${base}/remote/info`)).json();
  assert.equal(info.code, '424242');
  assert.match(info.url, /\/remote\.html\?k=424242$/);

  assert.equal((await fetch(`${base}/remote/state`)).status, 403, 'the phone needs the code');
  assert.equal((await fetch(`${base}/remote/cmd`, { method: 'POST', body: '{"id":0,"label":"x"}' })).status, 403);

  await fetch(`${base}/remote/state?host=a`, { method: 'POST', body: JSON.stringify({ heading: '1.1 Who you are', groups: [] }) });
  const other = await (await fetch(`${base}/remote/state?host=b`, { method: 'POST', body: JSON.stringify({ heading: 'second tab', groups: [] }) })).json();
  assert.equal(other.busy, true, 'a second host tab does not take over');
  const st = await (await fetch(`${base}/remote/state?k=424242`)).json();
  assert.equal(st.snapshot.heading, '1.1 Who you are');

  const first = await (await fetch(`${base}/remote/cmd?since=0&host=a`)).json();
  const sent = await (await fetch(`${base}/remote/cmd?k=424242`, { method: 'POST', body: JSON.stringify({ id: 3, label: 'Cards out (2 min)' }) })).json();
  assert.ok(sent.ok);
  const got = await (await fetch(`${base}/remote/cmd?since=${first.seq}&host=a`)).json();
  assert.deepEqual(got.cmds.map((c) => [c.id, c.label]), [[3, 'Cards out (2 min)']]);
  assert.equal(got.cmds[0].confirmed, false, 'a plain press is not pre-confirmed');
  await fetch(`${base}/remote/cmd?k=424242`, { method: 'POST', body: JSON.stringify({ id: 5, label: 'Show on TV', confirmed: true }) });
  const asked = await (await fetch(`${base}/remote/cmd?since=${got.seq}&host=a`)).json();
  assert.equal(asked.cmds.pop().confirmed, true, 'a press the phone already confirmed says so');
  assert.deepEqual((await (await fetch(`${base}/remote/cmd?since=${first.seq}&host=b`)).json()).cmds, [], 'only the holding tab gets presses');
  assert.equal((await fetch(`${base}/remote/cmd?k=424242`, { method: 'POST', body: '{"id":"x"}' })).status, 400);
  assert.equal((await fetch(`${base}/hue/8.8.8.8/api`)).status, 400, 'only home-network bridges');
});

test('guest phones join with the code, get a character from the host, and read only their own cards so far', async (t) => {
  const os = require('node:os');
  const fs = require('node:fs');
  const file = path.join(os.tmpdir(), `mmn-players-${process.pid}.json`);
  const port = PORT + 1;
  const local = `http://127.0.0.1:${port}`;
  const srv = spawn(process.execPath, [path.join(__dirname, '..', 'scripts', 'serve.js')], { env: { ...process.env, PORT: String(port), PLAY_CODE: '7777', PLAYERS_FILE: file }, stdio: 'ignore' });
  t.after(() => { srv.kill(); try { fs.unlinkSync(file); } catch (e) { /* gone */ } });
  for (let i = 0; i < 50; i++) { try { await fetch(`${local}/hue/ping`); break; } catch (e) { await new Promise((r) => setTimeout(r, 100)); } }
  const data = require('../js/data.js');
  const [killer] = data.killerIds;
  const innocent = data.characters.find((c) => !c.killer).id;

  assert.match((await (await fetch(`${local}/play/info`)).json()).url, /\/play\.html\?j=7777$/);
  assert.equal((await fetch(`${local}/play/join?j=1111`, { method: 'POST', body: '{"name":"Ann"}' })).status, 403, 'the join code is needed');
  assert.equal((await fetch(`${local}/play/join?j=7777`, { method: 'POST', body: '{"name":"  "}' })).status, 400, 'a name is needed');
  const ann = await (await fetch(`${local}/play/join?j=7777`, { method: 'POST', body: '{"name":"Ann"}' })).json();
  const bob = await (await fetch(`${local}/play/join?j=7777`, { method: 'POST', body: '{"name":"Bob"}' })).json();
  assert.equal((await (await fetch(`${local}/play/me?t=${ann.token}`)).json()).assigned, false, 'waiting for a character');
  assert.equal((await fetch(`${local}/play/me?t=nope`)).status, 404);

  const list = (await (await fetch(`${local}/play/players`)).json()).players;
  assert.deepEqual(list.map((p) => p.name), ['Ann', 'Bob']);
  assert.ok(list.every((p) => !p.token), 'the host list never carries tokens');
  await fetch(`${local}/play/assign`, { method: 'POST', body: JSON.stringify({ id: list[0].id, characterId: killer }) });
  await fetch(`${local}/play/assign`, { method: 'POST', body: JSON.stringify({ id: list[1].id, characterId: killer }) });
  assert.deepEqual((await (await fetch(`${local}/play/players`)).json()).players.map((p) => p.characterId), [null, killer], 'one phone per character');
  await fetch(`${local}/play/assign`, { method: 'POST', body: JSON.stringify({ id: list[0].id, characterId: innocent }) });

  const me = async (tok) => (await (await fetch(`${local}/play/me?t=${tok}`)).json()).view;
  assert.equal((await me(ann.token)).cards.length, 0, 'no cards before the night starts');
  /* The killer's first secret orders: the sign (two killers) or a sabotage order (one killer). */
  const kc = data.characters.find((c) => c.id === killer);
  const signAt = data.STAGE_IDS.findIndex((sid) => kc.cards[sid].secretSign || kc.cards[sid].sabotage);
  const secret = kc.cards[data.STAGE_IDS[signAt]].secretSign ? data.SIGN : kc.cards[data.STAGE_IDS[signAt]].sabotage;
  await fetch(`${local}/play/progress`, { method: 'POST', body: JSON.stringify({ prologueDone: true, stageIndex: signAt, phase: 'search', screen: 'game', presentIds: data.characters.map((c) => c.id) }) });
  assert.equal((await me(ann.token)).cards.length, signAt + 1);
  assert.ok(!JSON.stringify(await me(ann.token)).includes(secret), 'nobody else\'s secrets reach a phone');
  assert.ok((await me(bob.token)).cards[signAt].orders.includes(secret), 'the killer sees the orders on their own phone');

  /* Opened picture envelopes travel with the progress, so phones are enough without paper. */
  const team = data.characters.find((c) => c.id === innocent).team;
  await fetch(`${local}/play/progress`, { method: 'POST', body: JSON.stringify({ prologueDone: true, stageIndex: 6, phase: 'search', screen: 'game', presentIds: data.characters.map((c) => c.id), opened: [`${team}-3.1`, '<script>', 42] }) });
  assert.deepEqual((await me(ann.token)).found.map((f) => f.title), [data.teamEnvelopes[team]['3.1'].title]);

  const lan = Object.values(os.networkInterfaces()).flat().find((a) => a && a.family === 'IPv4' && !a.internal);
  if (lan) {
    const far = `http://${lan.address}:${port}`;
    assert.equal((await fetch(`${far}/js/data.js`)).status, 404, 'another device cannot read the story');
    assert.equal((await fetch(`${far}/index.html`)).status, 404, 'nor open the host page');
    assert.equal((await fetch(`${far}/play.html`)).status, 200, 'the phone page is open');
    assert.equal((await fetch(`${far}/play/players`)).status, 404, 'only the laptop sees the phone list');
  }
});
