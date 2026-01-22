// Ranked Draft Site v2
const DEFAULT_ALL = "All";

function normStr(s) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

function canonMode(s) {
  const x = normStr(s).toLowerCase();
  if (x === "hotzone" || x === "hot zone") return "Hot Zone";
  if (x === "gem grab" || x === "gemgrab") return "Gem Grab";
  if (x === "brawl ball" || x === "brawlball") return "Brawl Ball";
  if (x === "knockout" || x === "knock out") return "Knockout";
  if (x === "bounty") return "Bounty";
  if (x === "heist") return "Heist";
  return normStr(s);
}

function canonMap(s) {
  return normStr(s);
}

async function loadData() {
  const res = await fetch("./data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load data.json (use a local server, not file://).");
  const raw = await res.json();
  if (!Array.isArray(raw)) throw new Error("data.json must be an array.");
  return raw.map(e => ({
    ...e,
    mode: canonMode(e.mode),
    map: canonMap(e.map),
    primary_comp: Array.isArray(e.primary_comp) ? e.primary_comp : [],
    backup_comps: Array.isArray(e.backup_comps) ? e.backup_comps : [],
    bans: Array.isArray(e.bans) ? e.bans : [],
    substitutes: Array.isArray(e.substitutes) ? e.substitutes : [],
    win_plan: normStr(e.win_plan),
    notes: normStr(e.notes),
  }));
}

function uniqSorted(arr) {
  return [...new Set(arr.filter(Boolean))].sort((a,b) => a.localeCompare(b));
}

function fillSelect(select, items, preferredValue) {
  const prev = preferredValue ?? select.value ?? DEFAULT_ALL;
  select.innerHTML = "";
  for (const v of items) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  }
  select.value = items.includes(prev) ? prev : (items[0] ?? DEFAULT_ALL);
}

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined) n.textContent = text;
  return n;
}

function renderCard(entry) {
  const card = el("article", "card");

  const top = el("div", "card__top");
  const titleWrap = el("div");
  titleWrap.appendChild(el("h2", "card__title", entry.map));

  const badges = el("div", "badges");
  badges.appendChild(el("span", "badge badge--mode", entry.mode));
  badges.appendChild(el("span", "badge badge--map", entry.map));

  top.appendChild(titleWrap);
  top.appendChild(badges);

  const body = el("div", "card__body");

  const primary = el("section", "section");
  primary.appendChild(el("h3", null, "Best Comp"));
  const pList = el("ul", "list");
  entry.primary_comp.forEach(line => pList.appendChild(el("li", null, String(line))));
  primary.appendChild(pList);

  const backups = el("section", "section");
  backups.appendChild(el("h3", null, "Backup Comps (2)"));
  const grid = el("div", "grid2");
  entry.backup_comps.slice(0,2).forEach((comp, idx) => {
    const box = el("div", "section");
    box.appendChild(el("h3", null, `Backup ${idx+1}`));
    const ul = el("ul", "list");
    (comp || []).forEach(line => ul.appendChild(el("li", null, String(line))));
    box.appendChild(ul);
    grid.appendChild(box);
  });
  backups.appendChild(grid);

  const bans = el("section", "section");
  bans.appendChild(el("h3", null, "Best Bans"));
  const bansWrap = el("div", "kv");
  entry.bans.forEach(x => bansWrap.appendChild(el("span", "chip bad", String(x))));
  bans.appendChild(bansWrap);

  const subs = el("section", "section");
  subs.appendChild(el("h3", null, "Substitutes if Banned"));
  const sList = el("ul", "list");
  entry.substitutes.forEach(line => sList.appendChild(el("li", null, String(line))));
  subs.appendChild(sList);

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
    const okMode = (m === DEFAULT_ALL) || e.mode === m;
    const okMap  = (mp === DEFAULT_ALL) || e.map === mp;
    const okQ    = !q || JSON.stringify(e).toLowerCase().includes(q);
    return okMode && okMap && okQ;
  });
}

(async function main() {
  const data = await loadData();

  const modeSelect = document.getElementById("modeSelect");
  const mapSelect = document.getElementById("mapSelect");
  const searchInput = document.getElementById("searchInput");
  const resetBtn = document.getElementById("resetBtn");
  const results = document.getElementById("results");
  const hint = document.getElementById("hint");

  const allModes = uniqSorted(data.map(x => x.mode));
  fillSelect(modeSelect, [DEFAULT_ALL, ...allModes], DEFAULT_ALL);

  function mapsForMode(mode) {
    const m = canonMode(mode);
    const subset = (m === DEFAULT_ALL) ? data : data.filter(x => x.mode === m);
    return uniqSorted(subset.map(x => x.map));
  }

  function render() {
    const selectedMode = canonMode(modeSelect.value || DEFAULT_ALL);
    const prevMap = canonMap(mapSelect.value || DEFAULT_ALL);

    const maps = mapsForMode(selectedMode);
    fillSelect(mapSelect, [DEFAULT_ALL, ...maps], prevMap);

    const selectedMap = canonMap(mapSelect.value || DEFAULT_ALL);
    const q = searchInput.value || "";

    const filtered = applyFilters(data, selectedMode, selectedMap, q);

    const hzCount = data.filter(x => x.mode === "Hot Zone").length;
    hint.textContent = hzCount
      ? `Loaded ${data.length} entries. Hot Zone entries: ${hzCount}.`
      : `Loaded ${data.length} entries. Hot Zone entries: 0 (set mode exactly to "Hot Zone" in data.json).`;

    results.innerHTML = "";
    if (filtered.length === 0) {
      const empty = el("div", "section");
      empty.appendChild(el("h3", null, "No matches"));
      empty.appendChild(el("p", "small", "Try changing Mode/Map filters, or clear the search box."));
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
    modeSelect.value = DEFAULT_ALL;
    searchInput.value = "";
    render();
  });

  render();
})().catch(err => {
  console.error(err);
  const results = document.getElementById("results");
  const hint = document.getElementById("hint");
  if (hint) hint.textContent = "Error loading site.";
  if (results) {
    results.innerHTML = `<div class="section"><h3>Error</h3><p class="small">${String(err.message || err)}</p></div>`;
  }
});
