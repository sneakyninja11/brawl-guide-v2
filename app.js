(function(){
  const nav = document.getElementById('nav');
  const content = document.getElementById('content');
  const search = document.getElementById('search');
  const toggleTheme = document.getElementById('toggleTheme');

  // theme
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  toggleTheme.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // build nav
  function buildNav(){
    nav.innerHTML = '';
    GUIDE.modes.forEach(mode => {
      const wrap = document.createElement('div');
      wrap.className = 'mode';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = `<span>${mode.icon} ${mode.name}</span><span class="badge">${mode.maps.length} maps</span>`;
      btn.addEventListener('click', ()=> wrap.classList.toggle('open'));

      const maps = document.createElement('div');
      maps.className = 'maps';

      mode.maps.forEach(m => {
        const mb = document.createElement('button');
        mb.className = 'mapbtn';
        mb.type = 'button';
        mb.dataset.key = m.key;
        mb.innerHTML = `<span>${m.name}</span><span class="badge">${mode.name}</span>`;
        mb.addEventListener('click', ()=> selectMap(m.key));
        maps.appendChild(mb);
      });

      wrap.appendChild(btn);
      wrap.appendChild(maps);
      nav.appendChild(wrap);
    });

    // open first mode by default
    const firstMode = nav.querySelector('.mode');
    if(firstMode) firstMode.classList.add('open');
  }

  function setActive(key){
    nav.querySelectorAll('.mapbtn').forEach(b=> b.classList.toggle('active', b.dataset.key===key));
  }

  function selectMap(key){
    const item = GUIDE.byKey[key];
    if(!item){
      content.innerHTML = `<article><h2>Not found</h2><p>Map key: ${key}</p></article>`;
      return;
    }
    setActive(key);
    const html = item.html || `<p>Coming soon.</p>`;
    content.innerHTML = `
      <article>
        <h2>${item.name}</h2>
        <div class="meta">
          <span class="chip">Mode: ${item.mode}</span>
          <span class="chip">Map pool: Jan 17, 2026</span>
        </div>
        ${html}
      </article>
    `;

    // scroll content top
    content.scrollTop = 0;

    // set hash
    location.hash = encodeURIComponent(key);
  }

  // search
  function esc(s){return s.replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}

  function highlight(text, q){
    if(!q) return text;
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')})`, 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }

  function runSearch(q){
    q = q.trim();
    if(!q){
      // reset current view if any
      const key = decodeURIComponent(location.hash.replace('#',''));
      if(key) selectMap(key);
      return;
    }

    const results = [];
    for(const key in GUIDE.byKey){
      const item = GUIDE.byKey[key];
      const plain = (item.searchText || '').toLowerCase();
      if(plain.includes(q.toLowerCase())){
        results.push(item);
      }
    }

    const out = [];
    out.push(`<article><h2>Search results for “${esc(q)}”</h2><p class="note">${results.length} match(es)</p><hr />`);

    results
      .sort((a,b)=> a.mode.localeCompare(b.mode) || a.name.localeCompare(b.name))
      .slice(0,60)
      .forEach(r=>{
        out.push(`
          <div class="kv">
            <div class="k">${esc(r.mode)}</div>
            <div class="v">
              <a href="#${encodeURIComponent(r.key)}" data-key="${esc(r.key)}"><strong>${highlight(esc(r.name), q)}</strong></a>
              <div style="margin-top:6px;color:var(--muted);font-size:12px;line-height:1.4">${highlight(esc(r.preview || ''), q)}</div>
            </div>
          </div>
        `);
      });

    out.push(`</article>`);
    content.innerHTML = out.join('');

    // wire links
    content.querySelectorAll('a[data-key]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        selectMap(a.dataset.key);
      });
    });
  }

  let t;
  search.addEventListener('input', ()=>{
    clearTimeout(t);
    t = setTimeout(()=> runSearch(search.value), 120);
  });

  // init
  buildNav();

  // hash routing
  function routeFromHash(){
    const key = decodeURIComponent(location.hash.replace('#',''));
    if(key && GUIDE.byKey[key]) selectMap(key);
  }
  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();
})();
