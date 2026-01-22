// Ranked Draft Site v3 (full code)
const ALL = "All";

function normStr(s) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

function canonMode(s) {
  const raw = normStr(s);
  const x = raw.toLowerCase();
  if (x === "hotzone" || x === "hot zone") return "Hot Zone";
  if (x === "gemgrab" || x === "gem grab") return "Gem Grab";
  if (x === "brawlball" || x === "brawl ball") return "Brawl Ball";
  if (x === "knock out" || x === "knockout") return "Knockout";
  if (x === "hotzone (ranked)" || x === "hot zone (ranked)") return "Hot Zone";
  if (x === "gem grab (ranked)") return "Gem Grab";
  if (x === "brawl ball (ranked)") return "Brawl Ball";
  if (x === "bounty") return "Bounty";
  if (x === "heist") return "Heist";
  return raw;
}

function canonMap(s) {
  return normStr(s);
}

async function loadData() {
  const res = await fetch("./data.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load data.json. Use a local server (Live Server or python -m http.server), not file://");
  }
  const raw = await res.json();
  if (!Array.isArray(raw)) throw new Error("data.json must be an array of entries.");

  return raw.map((e, idx) => {
    const mode = canonMode(e.mode);
    const map  = canonMap(e.map);
    return {
      id: e.id ?? `${mode}__${map}__${idx}`,
      mode,
      map,
      primary_comp: Array.isArray(e.primary_comp) ? e.primary_comp : [],
      backup_comps: Array.isArray(e.backup_comps) ? e.backup_comps : [],
      bans: Array.isArray(e.bans) ? e.bans : [],
      substitutes: Array.isArray(e.substitutes) ? e.substitutes : [],
      win_plan: normStr(e.win_plan),
      notes: normStr(e.notes),
    };
  });
}

function uniqSorted(arr) {
  return [...new Set(arr.filter(Boolean))].sort((a,b) => a.localeCompare(b));
}

function fillSelect(select, items, preferredValue) {
  const prev = preferredValue ?? select.value ?? ALL;
  select.innerHTML = "";
  for (const v of items) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  }
  select.value = items.includes(prev) ? prev : (items[0] ?? ALL);
}

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined) n.textContent = text;
  return n;
}

function makeList(lines) {
  const ul = el("ul", "list");
  (lines || []).forEach(line => ul.appendChild(el("li", null, String(line))));
  return ul;
}

function renderCard(entry) {
  const card = el("article", "card");

  const top = el("div", "card__top");
  const left = el("div");
  left.appendChild(el("h2", "card__title", entry.map));

  const badges = el("div", "badges");
  badges.appendChild(el("span", "badge badge--mode", entry.mode));
  badges.appendChild(el("span", "badge badge--map", entry.map));

  top.appendChild(left);
  top.appendChild(badges);

  const body = el("div", "card__body");

  const primary = el("section", "section");
  primary.appendChild(el("h3", null, "Best Comp"));
  primary.appendChild(makeList(entry.primary_comp.length ? entry.primary_comp : ["—"]));

  const backups = el("section", "section");
  backups.appendChild(el("h3", null, "Backup Comps (2)"));
  const grid = el("div", "grid2");
  (entry.backup_comps || []).slice(0,2).forEach((comp, idx) => {
    const box = el("div", "section");
    box.appendChild(el("h3", null, `Backup ${idx+1}`));
    box.appendChild(makeList((comp && comp.length) ? comp : ["—"]));
    grid.appendChild(box);
  });
  while (grid.children.length < 2) {
    const box = el("div", "section");
    box.appendChild(el("h3", null, `Backup ${grid.children.length+1}`));
    box.appendChild(el("p", "small", "—"));
    grid.appendChild(box);
  }
  backups.appendChild(grid);

  const bans = el("section", "section");
  bans.appendChild(el("h3", null, "Best Bans"));
  const chips = el("div", "kv");
  (entry.bans || []).forEach(b => chips.appendChild(el("span", "chip bad", String(b))));
  if (!chips.children.length) chips.appendChild(el("span", "chip warn", "—"));
  bans.appendChild(chips);

  const subs = el("section", "section");
  subs.appendChild(el("h3", null, "Substitutes if Banned"));
  subs.appendChild(entry.substitutes?.length ? makeList(entry.substitutes) : el("p", "small", "—"));

  const plan = el("section", "section");
  plan.appendChild(el("h3", null, "How to Win"));
  plan.appendChild(el("p", "small", entry.win_plan || "—"));

  body.appendChild(primary);
  body.appendChild(backups);

  const bottom = el("div", "grid2");
  bottom.appendChild(bans);
  bottom.appendChild(subs);
  body.appendChild(bottom);

  body.appendChild(plan);

  if (entry.notes) {
    const notes = el("section", "section");
    notes.appendChild(el("h3", null, "Notes"));
    notes.appendChild(el("p", "small", entry.notes));
    body.appendChild(notes);
  }

  card.appendChild(top);
  card.appendChild(body);
  return card;
}

function applyFilters(data, mode, map, qRaw) {
  const q = normStr(qRaw).toLowerCase();
  const m = canonMode(mode);
  const mp = canonMap(map);

  return data.filter(e => {
    const okMode = (m === ALL) || e.mode === m;
    const okMap  = (mp === ALL) || e.map === mp;
    const okQ    = !q || JSON.stringify(e).toLowerCase().includes(q);
    return okMode && okMap && okQ;
  });
}

function countByMode(data) {
  const counts = new Map();
  for (const e of data) counts.set(e.mode, (counts.get(e.mode) || 0) + 1);
  return [...counts.entries()].sort((a,b) => a[0].localeCompare(b[0]));
}

(async function main() {
  const data = await loadData();

  const modeSelect = document.getElementById("modeSelect");
  const mapSelect = document.getElementById("mapSelect");
  const searchInput = document.getElementById("searchInput");
  const resetBtn = document.getElementById("resetBtn");
  const results = document.getElementById("results");
  const status = document.getElementById("status");

  const modes = uniqSorted(data.map(x => x.mode));
  fillSelect(modeSelect, [ALL, ...modes], ALL);

  function mapsForMode(mode) {
    const m = canonMode(mode);
    const subset = (m === ALL) ? data : data.filter(x => x.mode === m);
    return uniqSorted(subset.map(x => x.map));
  }

  function render() {
    const selectedMode = canonMode(modeSelect.value || ALL);
    const prevMap = canonMap(mapSelect.value || ALL);

    fillSelect(mapSelect, [ALL, ...mapsForMode(selectedMode)], prevMap);

    const selectedMap = canonMap(mapSelect.value || ALL);
    const q = searchInput.value || "";

    const filtered = applyFilters(data, selectedMode, selectedMap, q);

    const counts = countByMode(data);
    const hotZoneCount = data.filter(x => x.mode === "Hot Zone").length;
    const countsText = counts.map(([k,v]) => `${k}: ${v}`).join(" · ");
    status.textContent =
      `Loaded ${data.length} entries. ${countsText}` +
      (hotZoneCount ? "" : " · Hot Zone: 0 (check mode spelling; use \"Hot Zone\")");

    results.innerHTML = "";
    if (!filtered.length) {
      const empty = el("div", "section");
      empty.appendChild(el("h3", null, "No matches"));
      empty.appendChild(el("p", "small", "Change Mode/Map, or clear search."));
      results.appendChild(empty);
      return;
    }

    filtered
      .slice()
      .sort((a,b) => (a.mode + a.map).localeCompare(b.mode + b.map))
      .forEach(entry => results.appendChild(renderCard(entry)));
  }

  modeSelect.addEventListener("change", render);
  mapSelect.addEventListener("change", render);
  searchInput.addEventListener("input", render);
  resetBtn.addEventListener("click", () => {
    modeSelect.value = ALL;
    searchInput.value = "";
    render();
  });

  render();
})().catch(err => {
  console.error(err);
  const status = document.getElementById("status");
  const results = document.getElementById("results");
  if (status) status.textContent = "Error loading site.";
  if (results) {
    results.innerHTML = `<div class="section"><h3>Error</h3><p class="small">${String(err.message || err)}</p></div>`;
  }
});
