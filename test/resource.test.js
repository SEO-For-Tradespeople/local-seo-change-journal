import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('due follow-up does not mark work completed or verified',()=>{const r=analyse(data);assert.equal(r.changes.find(c=>c.id==='3').status,'planned');assert.ok(r.issues.some(i=>i.source==='3'));});
test('verified requires a real check reference',()=>{const d=structuredClone(data);delete d.changes[0].check_ref;assert.throws(()=>analyse(d),/check_ref/);});
test('missing observation remains missing and does not become an uplift',()=>{const r=analyse(data);assert.equal(r.observations[1].value,null);assert.match(render(r),/Not measured/);assert.match(render(r),/no causal claim/);});
