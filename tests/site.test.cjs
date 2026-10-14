const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {parseHTML} = require('linkedom');
const html = fs.readFileSync('index.html','utf8');
const {window} = parseHTML(html);
const {document} = window;
const context = {
  window, document, console, URL, AbortSignal,
  matchMedia:()=>({matches:true}),
  IntersectionObserver:class {observe(){} unobserve(){}},
  MutationObserver:window.MutationObserver,
  requestAnimationFrame:fn=>fn(),
  setTimeout:()=>0, clearTimeout:()=>{},
};
window.setTimeout=()=>0;window.clearTimeout=()=>{};window.scrollY=0;
Object.defineProperty(context,'localStorage',{get(){throw Error('Unexpected persistent storage access')}});
Object.defineProperty(context,'sessionStorage',{get(){throw Error('Unexpected session storage access')}});
for(const el of document.querySelectorAll('*')) {
  el.scrollTo=()=>{};el.scrollBy=()=>{};el.focus=()=>{};el.pause=()=>{};
  Object.defineProperty(el,'offsetLeft',{value:0});Object.defineProperty(el,'clientWidth',{value:600});
  Object.defineProperty(el,'scrollWidth',{value:1200});el.scrollLeft=0;
}
vm.createContext(context);
vm.runInContext(fs.readFileSync('script.js','utf8'),context);
vm.runInContext(fs.readFileSync('refinement.js','utf8'),context);
for(const lang of ['en','de','hu']) {
  vm.runInContext(`setLanguage('${lang}')`,context);
  assert.equal(document.documentElement.lang,lang);
  assert.ok(document.querySelector('#introTitle').textContent.length>20);
  assert.ok(!document.querySelector('.swipePanel--left').textContent.includes('18.5'));
  const missing=vm.runInContext(`Array.from(document.querySelectorAll('[data-i18n]')).map(e=>e.getAttribute('data-i18n')).filter(k=>getTranslation('${lang}',k) === undefined)`,context);
  assert.equal(missing.length,0,`Missing ${lang} translations: ${missing}`);
}
const filter=document.querySelector('[data-filter="engineering"]');filter.click();
assert.equal(document.querySelectorAll('.mediaTile:not([hidden])').length,2);
document.querySelector('[data-filter="all"]').click();
assert.equal(document.querySelectorAll('.mediaTile:not([hidden])').length,6);
const search=document.querySelector('#documentSearch');
search.value='118534';search.dispatchEvent(new window.Event('input'));
assert.equal(document.querySelectorAll('.documentCard:not([hidden])').length,1);
search.value='nothingmatches';search.dispatchEvent(new window.Event('input'));
assert.equal(document.querySelector('#documentEmpty').hidden,false);
search.value='';search.dispatchEvent(new window.Event('input'));
assert.equal(document.querySelectorAll('.documentCard:not([hidden])').length,6);
document.querySelector('#menuBtn').click();assert.equal(document.querySelector('#mobileNav').hidden,false);
document.querySelector('#menuBtn').click();assert.equal(document.querySelector('#mobileNav').hidden,true);
assert.equal(document.querySelectorAll('h1').length,1);
assert.equal(document.querySelectorAll('.patentPlaceholder').length,0);
for(const name of ['name','email','company','phone','message','topic'])assert.ok(document.querySelector(`[name="${name}"]`).closest('label'));
for(const file of ['index.html','impressum.html','datenschutz.html','terms.html']) {
 const {document:doc}=parseHTML(fs.readFileSync(file,'utf8'));
 const ids=[...doc.querySelectorAll('[id]')].map(el=>el.id);assert.equal(new Set(ids).size,ids.length,`Duplicate ID in ${file}`);
 for(const el of doc.querySelectorAll('[src],[href],[data-pdf-src],[poster]'))for(const attr of ['src','href','data-pdf-src','poster']) {
  const value=el.getAttribute(attr);if(!value||/^(https?:|mailto:|tel:|data:)/.test(value))continue;
  const [path,fragment]=decodeURIComponent(value).split('#');
  if(path){assert.ok(fs.existsSync(path.split('?')[0]),`${file}: missing ${value}`)}
  else if(fragment)assert.ok(doc.getElementById(fragment),`${file}: missing anchor ${value}`);
 }
 assert.equal(doc.querySelectorAll('script[src^="https:"],link[href^="https:"]').length,0);
}
// Verify original inline submission handler through a mocked transport; nothing is sent.
const form=document.querySelector('#contactForm');form.reportValidity=()=>true;form.reset=()=>{};
context.FormData=class {constructor(){this.values=new Map([['access_key','test-key']])}get(k){return this.values.get(k)}append(k,v){this.values.set(k,v)}};
let requests=0;
context.fetch=async()=>{requests++;return {ok:true,json:async()=>({success:true})}};
const inline=[...document.querySelectorAll('script:not([src])')].map(el=>el.textContent).join('\n');
vm.runInContext(inline,context);
(async()=>{
 form.dispatchEvent(new window.Event('submit',{cancelable:true}));
 form.dispatchEvent(new window.Event('submit',{cancelable:true}));
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(requests,1,'Duplicate submission must be suppressed');
 assert.equal(form.querySelector('[type="submit"]').disabled,false);
 assert.ok(document.querySelector('#contactResult').textContent.length>0);
 context.fetch=async()=>{throw Error('offline')};
 form.dispatchEvent(new window.Event('submit',{cancelable:true}));
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(form.querySelector('[type="submit"]').disabled,false);
 assert.ok(document.querySelector('#contactResult').textContent.length>0);
 console.log('PASS: translations, filters, document search, menu, labels, links, privacy resources, mocked form success/failure and duplicate-submit prevention.');
})().catch(error=>{console.error(error);process.exitCode=1});
