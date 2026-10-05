const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/app.js'), 'utf8');
const fn = source.match(/function platformEventsForYear\(year\) \{[\s\S]*?\n      \}/)[0];
const ctx = { PROGRAMMED_EVENTS: [], DAY_BASE: {}, APP_STATE: { events: {} },
  dateKey: d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,
  parseDate: s => new Date(`${s}T12:00:00`), autoTime: () => '',
  mergeEvents: (a,b) => [...new Map([...a,...b].map(e => [`${e.date}|${e.title}`,e])).values()],
  platformEnrichEvent: e => e, sortByDate: (a,b) => a.date.localeCompare(b.date) };
vm.createContext(ctx); vm.runInContext(fn, ctx);
const dates = year => Array.from(ctx.platformEventsForYear(year), e => e.date);
assert.deepEqual(dates(2025), []);
assert.deepEqual(dates(2026), ['2026-10-09','2026-10-23','2026-11-06','2026-11-20','2026-12-04','2026-12-18']);
assert.equal(dates(2027)[0], '2027-01-01');
assert.equal(dates(2027).length, 27);
vm.runInContext(source.match(/function platformEnrichEvent\(raw\) \{[\s\S]*?\n      \}/)[0], ctx);
ctx.enrichEvent = e => ({ ...e, id: `${e.date}-${e.title}`, invitations: {} });
ctx.autoTime = () => '6:00 p. m.';
ctx.inferOrganizer = () => 'IPUC Villa del Río';
ctx.platformStatus = () => 'Proximo';
ctx.inferTags = () => [];
for (const event of ctx.platformEventsForYear(2026)) assert.equal(event.time, '7:00 p. m.');
for (const date of [...dates(2026), ...dates(2027)]) assert.equal(new Date(`${date}T12:00:00`).getDay(), 5);
ctx.APP_STATE.events.existing = { custom: true, title: 'Devocionales por sectores', date: '2026-10-09' };
assert.equal(dates(2026).length, 6);
console.log('Devotional recurrence: Friday dates, year rollover and no duplicates OK');
