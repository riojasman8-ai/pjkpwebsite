const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const get=(o,p)=>p.split('.').reduce((a,k)=>a?.[k],o);
const put=(o,p,v)=>{const k=p.split('.'),l=k.pop();k.reduce((a,x)=>a[x],o)[l]=v};
const PH='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#ddd"/><text x="150" y="105" text-anchor="middle" font-family="sans-serif" fill="#777">klik untuk ganti foto</text></svg>');
const I=n=>'img/image'+n+'.png';
const DEF={t1:'PEMBANGUNAN JALAN',t2:'KAWASAN PENDUKUNG KIPP 1A',
logos:[I(27),I(4),I(5).replace('png','jpg')],
infoL:[{k:'Nama Paket',v:'Pembangunan Jalan Kawasan Pendukung KIPP 1A'},{k:'Pemberi Tugas',v:'Otorita Ibu Kota Nusantara'},{k:'Konsultan Supervisi',v:'Empat Pola Selaras – AIN – PTK, KSO'},{k:'Penyedia Jasa',v:'PT. Jaya Konstruksi Manggala Pratama\nPT. Bahagia Bangunnusa\nPT. Bumi Karsa\nPT. Duta Mega Perkasa'},{k:'Lingkup Pekerjaan',v:'Divisi 1 – Pek. Umum\nDivisi 2 – Pek. Drainase\nDivisi 3 – Pek. Tanah dan Geosintetik\nDivisi 5 – Pek. Perkerasan Berbutir\nDivisi 6 – Pek. Perkerasan Aspal\nDivisi 7 – Pek. Struktur\nDivisi 9 – Pek. Harian dan Lain-lain'}],
infoR:[{k:'Lokasi Pekerjaan',v:'Ibu Kota Nusantara, Kab. Penajam Paser Utara, Kaltim'},{k:'Nilai Kontrak',v:'Rp1.145.275.834.721,- (inc ppn)'},{k:'Jenis Kontrak',v:'Unit Price'},{k:'Uang Muka',v:'20% dari Kontrak'},{k:'Sumber Dana',v:'APBN 2025-2027\n2025 : Rp243.305.252.000,-\n2026 : Rp261.637.000.000,-\n2027 : Rp702.605.077.000,-'},{k:'Jangka Waktu Pelaksanaan',v:'750 Hari Kalender\n31 Oktober 2025 – 18 November 2027'},{k:'Jangka Waktu Pemeliharaan',v:'365 Hari Kalender\n19 November 2027 – 18 November 2028'}],
lingkup:[[8,'DIVISI 1\nPEK. UMUM'],[12,'DIVISI 2\nPEK. DRAINASE'],[10,'DIVISI 3\nPEK. TANAH & GEOSINTETIK'],[9,'DIVISI 5\nPEK. PERKERASAN BERBUTIR'],[11,'DIVISI 6\nPEK. PERKERASAN ASPAL'],[13,'DIVISI 7\nPEK. STRUKTUR'],[14,'DIVISI 8\nPEK. JEMBATAN'],[15,'DIVISI 9\nPEK. HARIAN & LAIN-LAIN'],[16,'DIVISI 10\nPEMELIHARAAN']].map(([n,t])=>({img:I(n),t})),
visual:[I(25),I(7).replace('png','jpg'),I(29),I(28)],
tipikal:[[22,'TIPIKAL ROW 44'],[18,'TIPIKAL ROW 36'],[20,'TIPIKAL ROW 16']].map(([n,t])=>({img:I(n),t})),
alat:[[24,'HYAPCRANE','2 UNIT'],[3,'EXCAVATOR','10 UNIT'],[32,'BOREPILE CRAWLER','2 UNIT'],[33,'MOTOR GRADER','1 UNIT'],[31,'DUMP TRUCK','14 UNIT'],[35,'WATER TANK','2 UNIT'],[34,'WIRTGEN','1 UNIT'],[49,'VIBRO','3 UNIT'],[48,'SHEEP FOOT','1 UNIT'],[17,'DOZZER','4 UNIT'],[50,'CONCRETE PUMP','5 UNIT']].map(([n,t,u])=>({img:I(n),t,n:u})),
layout:I(1),
rows:[['#b026ff','ROW 44B','±1,3km'],['#6cc12b','ROW 44C','±1,4km'],['#ffeb3b','ROW 36','±1,5km'],['#ff9f1c','ROW 16 B-17','±0,3km'],['#4dd9e8','ROW 16 B-18','±0,6km'],['#ee3ec6','ROW 16 C-23','±0,4km'],['#ff2d2d','TOTAL ROW','±5,399 km']].map(([c,t,v])=>({c,t,v})),
capai:I(56),kurva:I(55),
day:{used:'346',left:'404'},man:{lap:'315',kso:'100',lokal:'291',non:'124'},
doc:[[46,'ROW 44B','Jalan Akses Bank Indonesia'],[45,'ROW 44C','Jalan Lingkar Sepaku 1'],[47,'ROW 36','Jalan Akses Masjid Negara']].map(([n,a,b])=>({img:I(n).replace('png','jpg'),t:a,s:b})),
keu:{pagu:'Rp. 371.035.863.000',real:'Rp. 269.588.047.907',realp:'(72,66%)',sisa:'Rp. 101.447.815.093',sisap:'(27,34%)'},
prog:{renc:'36.315',real:'37.307',dev:'+0.992',cut:'11 Oktober 2026'}};
const ADD={infoL:{k:'Judul',v:'Isi'},infoR:{k:'Judul',v:'Isi'},lingkup:{img:PH,t:'DIVISI BARU'},visual:PH,tipikal:{img:PH,t:'TIPIKAL BARU'},alat:{img:PH,t:'ALAT BARU',n:'1 UNIT'},rows:{c:'#cccccc',t:'ROW BARU',v:'±0 km'},doc:{img:PH,t:'ROW',s:'Keterangan foto'}};
let S,IM={},pending={},admin=false,B;
// ---------- Backend: Firebase (jika dikonfigurasi) atau mode demo (localStorage)
const cfg=window.FIREBASE_CONFIG;
if(cfg){
 const v='https://www.gstatic.com/firebasejs/10.12.2/',[A,Au,F]=await Promise.all([import(v+'firebase-app.js'),import(v+'firebase-auth.js'),import(v+'firebase-firestore.js')]);
 const app=A.initializeApp(cfg),au=Au.getAuth(app),db=F.getFirestore(app);
 B={name:'firebase',
  async load(){let s=null,im={};try{const d=await F.getDoc(F.doc(db,'site','main'));if(d.exists())s=JSON.parse(d.data().json);(await F.getDocs(F.collection(db,'imgs'))).forEach(x=>im[x.id]=x.data().d)}catch(e){console.warn(e)}return{s,im}},
  async save(s,np){await F.setDoc(F.doc(db,'site','main'),{json:JSON.stringify(s)});for(const id in np)await F.setDoc(F.doc(db,'imgs',id),{d:np[id]})},
  async login(u,p){await Au.signInWithEmailAndPassword(au,u.includes('@')?u:u+'@kipp.local',p)},
  async logout(){await Au.signOut(au)},onAuth(cb){Au.onAuthStateChanged(au,x=>cb(!!x))}};
}else{
 let cb=()=>{};
 B={name:'demo',async load(){return{s:JSON.parse(localStorage.kS||'null'),im:JSON.parse(localStorage.kI||'{}')}},
  async save(s,np){localStorage.kS=JSON.stringify(s);localStorage.kI=JSON.stringify({...IM})},
  async login(u,p){if(u!=='admin'||p!=='admin123')throw Error('x');sessionStorage.adm=1;cb(true)},
  async logout(){sessionStorage.removeItem('adm');cb(false)},onAuth(f){cb=f;f(!!sessionStorage.adm)}};
 $('#hint').textContent='MODE DEMO: username admin, password admin123. Data hanya tersimpan di browser ini sampai Firebase dipasang (lihat README).';
}
$('#mode').textContent=B.name==='demo'?'(mode demo) ':'';
// ---------- Render
const src=v=>v?.startsWith('db:')?(IM[v.slice(3)]||PH):(v||PH);
const T=(p,tag='span',cls='')=>`<${tag} class="${cls}" data-p="${p}">${esc(get(S,p))}</${tag}>`;
const IMG=(p,cls='')=>`<img class="${cls}" data-img="${p}" src="${esc(src(get(S,p)))}" alt="">`;
const X=p=>`<button class="x adm" data-del="${p}">✕</button>`, AD=(p,l='+ Tambah')=>`<button class="add adm" data-add="${p}">${l}</button>`;
const kv=(a)=>S[a].map((_,i)=>`<div class="kv" style="position:relative">${X(a+'.'+i)}<b>${T(a+'.'+i+'.k')}</b>${T(a+'.'+i+'.v','div')}</div>`).join('')+AD(a);
function render(){
 $('#hd').innerHTML=`<div class="hl">${IMG('logos.0')}</div><div class="ttl"><div class="a">${T('t1')}</div><div class="b">${T('t2')}</div></div><div class="hl">${IMG('logos.1')}${IMG('logos.2')}</div>`;
 const m=S.man,tot=(+m.lap||0)+(+m.kso||0),lk=+m.lokal||0,nl=+m.non||0,pc=lk+nl?Math.round(lk/(lk+nl)*100):0;
 $('#app').innerHTML=`
 <section class="card wide"><span class="rb">Informasi Umum</span><div class="two"><div>${kv('infoL')}</div><div>${kv('infoR')}</div></div></section>
 <section class="card"><span class="rb">Lingkup Pekerjaan</span><div class="grid sc">${S.lingkup.map((x,i)=>`<div class="it">${X('lingkup.'+i)}${IMG('lingkup.'+i+'.img')}${T('lingkup.'+i+'.t','span','')}</div>`).join('')}</div>${AD('lingkup')}</section>
 <section class="card"><span class="rb">Visualisasi Design</span><div class="pic">${S.visual.map((_,i)=>`<div class="it">${X('visual.'+i)}${IMG('visual.'+i)}</div>`).join('')}</div>${AD('visual','+ Tambah foto')}</section>
 <section class="card wide"><span class="rb">Tipikal Pekerjaan</span><div class="pic">${S.tipikal.map((x,i)=>`<div class="it">${X('tipikal.'+i)}${IMG('tipikal.'+i+'.img')}${T('tipikal.'+i+'.t','div')}</div>`).join('')}</div>${AD('tipikal')}</section>
 <section class="card"><span class="rb b">Alat Berat</span><div class="grid">${S.alat.map((x,i)=>`<div class="it">${X('alat.'+i)}${IMG('alat.'+i+'.img')}${T('alat.'+i+'.t','div')}${T('alat.'+i+'.n','div')}</div>`).join('')}</div>${AD('alat','+ Tambah alat')}</section>
 <section class="card"><span class="rb b">Layout Pekerjaan</span><div class="lay">${IMG('layout','full')}<div>${S.rows.map((r,i)=>`<div class="chip" style="background:${esc(r.c)}">${X('rows.'+i)}<input type="color" class="col adm" data-c="rows.${i}.c" value="${esc(r.c)}">${T('rows.'+i+'.t')}<small>${T('rows.'+i+'.v')}</small></div>`).join('')}${AD('rows','+ Tambah ROW')}</div></div></section>
 <section class="card"><span class="rb g">Pencapaian Pekerjaan</span>${IMG('capai','full')}</section>
 <section class="card"><span class="rb g">Berdasarkan Kurva-S</span>${IMG('kurva','full')}</section>
 <section class="card"><span class="rb b">Personil &amp; Waktu</span><div class="stat">
  <div class="big"><small>DAY</small><small>USED</small>${T('day.used')}</div><div class="big"><small>DAY</small><small>LEFT</small>${T('day.left')}</div>
  <div class="man"><b>Man Power ${tot} Orang</b><br><span class="tag" style="background:#e8892b">LAPANGAN</span> ${T('man.lap')}<br><span class="tag" style="background:#7a3e12">PEGAWAI KSO</span> ${T('man.kso')}</div>
  <div style="display:flex;gap:12px;align-items:center"><div class="pie" style="background:conic-gradient(var(--gold) 0 ${pc}%,#f6dc8c 0)"></div><div class="lg"><i style="background:var(--gold)"></i>Lokal ${T('man.lokal')} (${pc}%)<br><i style="background:#f6dc8c"></i>Non Lokal ${T('man.non')} (${100-pc}%)</div></div></div></section>
 <section class="card"><span class="rb g">Progress Keuangan</span><div class="keu"><p><b>PAGU</b> ${T('keu.pagu')}</p><p><b>REAL</b> ${T('keu.real')} ${T('keu.realp')}</p><p><b>SISA</b> ${T('keu.sisa')} ${T('keu.sisap')}</p></div>
  <span class="rb b" style="margin-top:20px">Progress</span><div class="prg"><div><h4>RENC.</h4><span>${T('prog.renc')}</span></div><div><h4>REAL.</h4><span>${T('prog.real')}</span></div><div><h4>DEV.</h4><span>${T('prog.dev')}</span></div><div class="cut">CUT OFF: ${T('prog.cut')}</div></div></section>
 <section class="card wide"><span class="rb g">Dokumentasi</span><div class="pic">${S.doc.map((x,i)=>`<div class="it">${X('doc.'+i)}${IMG('doc.'+i+'.img')}${T('doc.'+i+'.t','div')}${T('doc.'+i+'.s','div')}</div>`).join('')}</div>${AD('doc','+ Tambah foto')}</section>`;
 document.body.classList.toggle('admin',admin);
 document.querySelectorAll('[data-p]').forEach(e=>e.contentEditable=admin);
}
// ---------- Interaksi admin
const toast=t=>{const e=$('#toast');e.textContent=t;e.style.display='block';setTimeout(()=>e.style.display='none',2800)};
document.addEventListener('focusout',e=>{const p=e.target.dataset?.p;if(admin&&p)put(S,p,e.target.innerText.replace(/\n+$/,''))});
document.addEventListener('paste',e=>{if(admin&&e.target.dataset?.p){e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'))}});
document.addEventListener('keydown',e=>{if(admin&&e.key==='Enter'&&e.target.dataset?.p&&e.target.tagName==='SPAN'){e.preventDefault();e.target.blur()}});
document.addEventListener('input',e=>{const p=e.target.dataset?.c;if(admin&&p){put(S,p,e.target.value);e.target.parentElement.style.background=e.target.value}});
document.addEventListener('click',e=>{
 if(!admin)return;const t=e.target;
 if(t.dataset.del){const k=t.dataset.del.split('.'),i=+k.pop();get(S,k.join('.')).splice(i,1);render()}
 else if(t.dataset.add){get(S,t.dataset.add).push(structuredClone(ADD[t.dataset.add]));render()}
 else if(t.dataset.img){const f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=async()=>{if(!f.files[0])return;const d=await shrink(f.files[0]),id='i'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);IM[id]=d;pending[id]=d;put(S,t.dataset.img,'db:'+id);render()};f.click()}
});
function shrink(file){return new Promise(r=>{const i=new Image();i.onload=()=>{const s=Math.min(1,1000/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/webp',.8))};i.src=URL.createObjectURL(file)})}
$('#sv').onclick=async()=>{try{await B.save(S,pending);pending={};toast('✔ Tersimpan. Pengunjung akan melihat data terbaru.')}catch(e){toast('Gagal menyimpan: '+e.message)}};
$('#lg').onclick=()=>$('#dlg').showModal();
$('#lo').onclick=()=>B.logout();
$('#fm').onsubmit=async()=>{try{await B.login($('#u').value.trim(),$('#p').value);$('#p').value=''}catch(e){toast('Username atau password salah')}};
// ---------- Mulai
const r=await B.load();IM=r.im||{};S=r.s||structuredClone(DEF);
for(const k in DEF)if(!(k in S))S[k]=structuredClone(DEF[k]);
render();
B.onAuth(a=>{admin=a;render();$('#lg').style.display=a?'none':''});
