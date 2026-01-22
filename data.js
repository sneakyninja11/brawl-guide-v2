// Simple data store for the guide.
// Add/replace HTML for a map by editing GUIDE.byKey["<key>"].html.

const GUIDE = (() => {
  const modes = [
    { name: 'Gem Grab', icon: '💎', maps: [
      { key:'gg-undermine', name:'Undermine' },
      { key:'gg-hard-rock-mine', name:'Hard Rock Mine' },
      { key:'gg-double-swoosh', name:'Double Swoosh' },
      { key:'gg-gem-fort', name:'Gem Fort' },
    ]},
    { name: 'Bounty', icon: '🔫', maps: [
      { key:'bty-shooting-star', name:'Shooting Star' },
      { key:'bty-layer-cake', name:'Layer Cake' },
      { key:'bty-hideout', name:'Hideout' },
      { key:'bty-dry-season', name:'Dry Season' },
    ]},
    { name: 'Brawl Ball', icon: '⚽', maps: [
      { key:'bb-sneaky-fields', name:'Sneaky Fields' },
      { key:'bb-backyard-bowl', name:'Backyard Bowl' },
      { key:'bb-center-stage', name:'Center Stage' },
      { key:'bb-triple-dribble', name:'Triple Dribble' },
    ]},
    { name: 'Heist', icon: '🧨', maps: [
      { key:'hst-safe-zone', name:'Safe Zone' },
      { key:'hst-hot-potato', name:'Hot Potato' },
      { key:'hst-kaboom-canyon', name:'Kaboom Canyon' },
      { key:'hst-bridge-too-far', name:'Bridge Too Far' },
    ]},
    { name: 'Knockout', icon: '💥', maps: [
      { key:'ko-belles-rock', name:"Belle’s Rock" },
      { key:'ko-out-in-the-open', name:'Out in the Open' },
      { key:'ko-flaring-phoenix', name:'Flaring Phoenix' },
      { key:'ko-new-horizons', name:'New Horizons' },
    ]},
    { name: 'Hot Zone', icon: '🔵', maps: [
      { key:'hz-dueling-beetles', name:'Dueling Beetles' },
      { key:'hz-parallel-plays', name:'Parallel Plays' },
      { key:'hz-open-zone', name:'Open Zone' },
      { key:'hz-ring-of-fire', name:'Ring of Fire' },
    ]},
  ];

  function mkKeyIndex(){
    const byKey = {};
    modes.forEach(mode => mode.maps.forEach(m => {
      byKey[m.key] = { key: m.key, name: m.name, mode: mode.name, html: '', preview: '', searchText: '' };
    }));
    return byKey;
  }

  const byKey = mkKeyIndex();

  // --- CONTENT (paste/edit) ---
  // NOTE: This site is purely static. The text below is intentionally plain HTML.

  byKey['gg-undermine'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Mortis / Spike</strong></div></div>
      <div class="kv"><div class="k">Core plan</div><div class="v">Mortis = gem carrier & flank assassin. Emz holds mid choke with spray + Super. Spike anchors a lane and punishes stacking.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Hard anti-dive + reveal: Tara (vision/pull), Crow (chip + slow), Shelly/Gale (peel), plus comps that deny Mortis entries.</div></div>
      <div class="kv"><div class="k">Suggested bans</div><div class="v">Tara (vision/pull), Crow (anti-heal + slow), Shelly or Gale (anti-dive), and/or your biggest Mortis check in your lobby.</div></div>
    </section>
    <section class="block">
      <h3>Backup comp A (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Spike / Tara</strong></div></div>
      <div class="kv"><div class="k">Why</div><div class="v">Safer teamfight win con: Tara pull for wipes; Spike + Emz zone mid; Tara gadget gives bush info.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Long-range poke that outranges Emz (Belle/Piper/Mandy) + strong lane split that avoids Tara value.</div></div>
    </section>
    <section class="block">
      <h3>Backup comp B (heavy bans / low comfort)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Bo / Gus</strong></div></div>
      <div class="kv"><div class="k">Why</div><div class="v">Vision + peel. Bo mines deny flanks; Gus shield stabilizes gem carrier; Emz still wins mid space.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">High burst snipers + wall break (Brock/Colt) that open mid and force Emz off angles.</div></div>
    </section>
    <hr />
    <section class="block">
      <h3>Lanes & how to play</h3>
      <ul>
        <li><strong>Mid:</strong> Emz (or Gus) — stand just outside enemy range, spray to scout bushes, Super to hold gem mine on spawn.</li>
        <li><strong>Lane 1:</strong> Mortis/Tara — play bush side; don’t show until you can confirm value (kill, gadget trade, gem steal).</li>
        <li><strong>Lane 2:</strong> Spike/Bo — hold opposite lane, keep constant chip to set up dives.</li>
        <li><strong>Win condition:</strong> hit 10 gems, then tighten to defensive triangle. Make enemy walk into Emz slow + Spike burst.</li>
      </ul>
    </section>
  `;
  byKey['gg-undermine'].preview = 'Emz/Mortis/Spike (primary) • Bush control + assassin gem carry.';

  byKey['gg-hard-rock-mine'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Mortis / Rico</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Piper/Belle (out-range), Tara (pull vs Mortis), Shelly/Gale (anti-dive), or whatever hard-counters your Mortis.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Hard range + wall break that deletes Rico angles; anti-dive peel (Shelly/Gale); heavy CC.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Rico banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Mortis / Spike</strong></div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Same anti-dive + hard range; also throwers if Mortis is pressured off them.</div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bo / Emz / Rico</strong></div></div>
      <div class="kv"><div class="k">Plan</div><div class="v">Bo mines + Emz slow hold mid; Rico farms bounce corridors.</div></div>
    </section>
    <hr />
    <section class="block">
      <h3>Lanes & how to play</h3>
      <ul>
        <li><strong>Mid:</strong> Emz (or Bo) zones gem spawn, only steps up with gadget/super advantage.</li>
        <li><strong>Side:</strong> Rico takes wall-heavy lane; fish for bounces + Super to open pressure.</li>
        <li><strong>Mortis:</strong> avoid early feeding; punish over-peeks and finish chipped targets.</li>
      </ul>
    </section>
  `;
  byKey['gg-hard-rock-mine'].preview = 'Emz/Mortis/Rico • Rico bounce lanes + Mortis cleanup.';

  byKey['gg-double-swoosh'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Mortis / Spike</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Tara (vision/pull), Shelly/Gale (peel), Crow (chip), plus your worst Mortis counter.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Hard reveal + peel comps; double tank with strong anti-Emz answers if Mortis can’t isolate.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Spike banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Mortis / Tara</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Spike / Bo</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li><strong>Priority #1:</strong> own bushes. Spray bushes to scout; don’t give free flanks.</li>
        <li><strong>Mortis:</strong> threaten side bush → force enemy to back up → Emz/Spike take mine space.</li>
        <li><strong>Close-out:</strong> with 10 gems, turtle inside your safer bush triangle and punish entry.</li>
      </ul>
    </section>
  `;
  byKey['gg-double-swoosh'].preview = 'Emz/Mortis/Spike • bush map: vision + ambush wins.';

  byKey['gg-gem-fort'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Spike / Surge</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Hard Surge checks (long-range/CC), plus Tara or Crow if you’re relying on mid control.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Out-range snipers on open angles; hard dive that deletes Emz before control is set.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Surge banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Spike / Gale</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bo / Spike / Poco</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li><strong>Mid:</strong> Emz or Poco sits behind fences, collects gems safely.</li>
        <li><strong>Lanes:</strong> Spike anchors one side; Surge/Gale controls the other with mobility/peel.</li>
        <li><strong>Win:</strong> scale Surge levels; once ahead, don’t overextend—force enemy through chokes.</li>
      </ul>
    </section>
  `;
  byKey['gg-gem-fort'].preview = 'Emz/Spike/Surge • fence control + Surge scaling.';

  // Bounty
  byKey['bty-shooting-star'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Piper / Mandy / Pierce</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Nani (burst), Brock (wall break), Leon/Mortis (flank) depending on draft, plus your weakest sniper duel matchup.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Stealth/flank (Leon), hard dive (Mortis), or heavy wall-break that removes your safe angles.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Piper banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Pierce</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (multiple sniper bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Byron / Nani / Brock (or Piper)</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Secure blue star only if safe; otherwise, get first pick.</li>
        <li>Play triangle spacing (don’t clump vs pierce/bounce).</li>
        <li>Once ahead, back up and force approaches into crossfire.</li>
      </ul>
    </section>
  `;
  byKey['bty-shooting-star'].preview = 'Triple-range core: Piper/Mandy/Pierce.';

  byKey['bty-layer-cake'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Edgar / Tick / Pierce</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Tick (if you don’t have it), Shelly/Gale (anti-Edgar), Tara (vision), plus any hard thrower counter you fear.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Hard anti-dive (Shelly/Gale), vision spam (Tara), comps that delete Tick early.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Edgar banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Mortis / Tick / Dynamike</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Spike / (utility) / Tick</strong></div></div>
      <div class="kv"><div class="k">Notes</div><div class="v">Use a utility pick for vision/peel (Bo/Tara/Gus depending on bans).</div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Own bushes: Tick mines to “paint” lanes and force predictable movement.</li>
        <li>Assassin waits for chip → then commits (don’t yolo into full HP).</li>
        <li>When up on stars, turtle behind Tick minefields and deny approaches.</li>
      </ul>
    </section>
  `;
  byKey['bty-layer-cake'].preview = 'Bushy bounty: Edgar + Tick pressure.';

  byKey['bty-hideout'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Piper</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Nani (burst), Mortis (if you hate dive), and/or thrower that abuses cover.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Mandy banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mortis / Piper</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Piper banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Byron</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Brock breaks the walls the enemy uses to “head-glitch” and hide.</li>
        <li>Mandy anchors far back, only exposing when ready to shoot.</li>
        <li>Play for clean picks; once ahead on stars, don’t give trades.</li>
      </ul>
    </section>
  `;
  byKey['bty-hideout'].preview = 'Hideout: Brock wall-break sets up Piper/Mandy.';

  byKey['bty-dry-season'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Pierce / Piper</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Leon/Mortis (flanks), Nani (one-shot pressure), and/or Belle (bounce) depending on draft.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Stealth + dive that forces close range; also superior aim triple-sniper mirrors.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Piper banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Pierce</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy sniper bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Belle / Brock</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Wide spacing + crossfire. Don’t give bounce/pierce value.</li>
        <li>Once ahead, rotate back, force risky approaches for them.</li>
        <li>If behind, coordinate one “all-in pick” window (super/gadget).</li>
      </ul>
    </section>
  `;
  byKey['bty-dry-season'].preview = 'Dry Season: pure aim + spacing. Brock/Pierce/Piper.';

  // Brawl Ball
  byKey['bb-sneaky-fields'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Frank / Mortis</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Shelly (anti-tank), Gale (peel), Tara (pull), plus whatever deletes Frank in your lobby.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Shelly/Gale hard-stop dives; heavy CC chains; strong anti-Frank picks.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bibi / Frank / Emz</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Frank & Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bibi / Bull / Emz</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Own the giant mid bush: Emz sprays to reveal; Frank bodies space.</li>
        <li>Frank breaks goal walls early; Mortis converts off wipes/passes.</li>
        <li>Defend vs counter-goals: reset after scoring, don’t greed mid.</li>
      </ul>
    </section>
  `;
  byKey['bb-sneaky-fields'].preview = 'Sneaky Fields: mid bush control. Emz/Frank/Mortis.';

  byKey['bb-backyard-bowl'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Mortis / Spike</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Gale/Shelly (anti-dive), thrower that abuses walls if you can’t break them, or your worst Mortis matchup.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Fang / Spike</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Emz / Stu</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Break mid walls early (Colt). You want clean shooting + passing lanes.</li>
        <li>Spike holds midfield and deletes tanks; assassin converts when 1–2 are down.</li>
        <li>Overtime often favors your range—don’t force bad goals pre-OT.</li>
      </ul>
    </section>
  `;
  byKey['bb-backyard-bowl'].preview = 'Backyard Bowl: Colt wall break + Spike control.';

  byKey['bb-center-stage'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Rosa / Sandy</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Gale/Shelly (anti-tank), Tara (pull), and/or any bush-reveal that ruins Sandy value.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Rosa banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Emz / Jacky / Sandy</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if you need speed/finesse)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Max / Emz / Sandy</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Stack sandstorm + tank super + Emz slow for unstoppable pushes.</li>
        <li>Control center bush; don’t waste supers separately.</li>
        <li>Try to score before overtime if you’re tank-heavy; otherwise play for OT.</li>
      </ul>
    </section>
  `;
  byKey['bb-center-stage'].preview = 'Center Stage: Rosa + Sandy sandstorm wins fights.';

  byKey['bb-triple-dribble'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bibi / Dynamike / Mortis</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Gale/Shelly (anti-dive), strong thrower counters, and/or brawlers that hard stop Mortis entries.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Dynamike banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bibi / Emz / Mortis</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Bibi / Dynamike / Stu</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Thrower breaks a lane wall → assassin scores off chaos.</li>
        <li>Bibi holds mid and denies carries with knockback.</li>
        <li>In OT, mobility gets stronger; thrower gets weaker—adjust.</li>
      </ul>
    </section>
  `;
  byKey['bb-triple-dribble'].preview = 'Triple Dribble: thrower + assassin scoring.';

  // Heist
  byKey['hst-safe-zone'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Chuck / Jessie / Mandy</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Colt/Brock (wall break), Amber (lane burn), and/or whatever hard-races your safe faster.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Mandy banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Chuck / Colt / Jessie</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Amber / Belle</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Win mid → create safe angles. If you can’t hit brawlers, hit safe.</li>
        <li>Jessie turret placement matters: safe pressure without being sniped.</li>
        <li>After you get a safe lead, shift to defense and deny backdoors.</li>
      </ul>
    </section>
  `;
  byKey['hst-safe-zone'].preview = 'Safe Zone: ranged safe chip + turret pressure.';

  byKey['hst-hot-potato'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Chuck / Jessie / Nita</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Hyper bear races (mirror Nita), strong bear/turret deletes, plus the best wall-break in lobby.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Chuck banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Jessie / Nita</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Jessie banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Colt / Nita / Penny</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Build Nita bear fast → time bear + turret + DPS burst on safe.</li>
        <li>Decide race vs defend quickly (watch safe HP + alive count).</li>
        <li>Stun bear threats on defense; don’t ignore them.</li>
      </ul>
    </section>
  `;
  byKey['hst-hot-potato'].preview = 'Hot Potato: Nita bear + turret siege.';

  byKey['hst-kaboom-canyon'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Amber / Colt / Melodie</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Other top wall-breakers + backdoor threats (Bull/Darryl types) depending on draft.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Colt banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Amber / Mandy / Melodie</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Belle / (wall-break) / Jessie</strong></div></div>
      <div class="kv"><div class="k">Notes</div><div class="v">Use Brock or Colt if available for wall-break; Belle/Jessie for control.</div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Burn bushes for vision (Amber). Don’t allow silent flanks.</li>
        <li>Break safe-side cover intentionally; don’t open lanes for enemy unless winning.</li>
        <li>In OT, long range gets stronger—be ready to swap from fights to safe DPS.</li>
      </ul>
    </section>
  `;
  byKey['hst-kaboom-canyon'].preview = 'Kaboom Canyon: Amber vision + wall-break + safe DPS.';

  byKey['hst-bridge-too-far'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Amber / Colt / Mandy</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Brock/Colt mirrors (wall break), Belle (poke), and flankers that cross bridge safely.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Amber banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Belle / Colt / Mandy</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Colt banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Belle / Brock / Penny</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Control bridge, don’t cross without advantage.</li>
        <li>Break key walls to create spawn-to-safe sightlines for Mandy/Belle.</li>
        <li>When ahead on safe HP, shift to pure defense and deny backdoors.</li>
      </ul>
    </section>
  `;
  byKey['hst-bridge-too-far'].preview = 'Bridge Too Far: bridge control + ranged safe melt.';

  // Knockout
  byKey['ko-belles-rock'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Dynamike / Edgar / Mandy</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Anti-dive (Shelly/Gale), Tara (vision/pull), enemy thrower that outvalues Mike.</div></div>
      <div class="kv"><div class="k">Worst into</div><div class="v">Hard peel + reveal; comps that punish Edgar jump timings.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Edgar banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Dynamike / Mortis / Mandy</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (heavy bans)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Sprout / Edgar / Bo</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Thrower chips/stuns → assassin commits only on value.</li>
        <li>Play gas: if up in lives, wait; force them into your zone control.</li>
        <li>Track gadgets across rounds (stun, shield, reveal).</li>
      </ul>
    </section>
  `;
  byKey['ko-belles-rock'].preview = 'Belle’s Rock: thrower + assassin in KO.';

  byKey['ko-out-in-the-open'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Piper</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Nani (burst), Leon/Mortis (close), and/or Belle (chip) depending on draft.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Piper banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Belle</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if you need anti-tank tech)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Nani / Brock / Piper</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Triangle spacing; stagger shots to keep them dodging.</li>
        <li>First pick usually wins—don’t peek alone.</li>
        <li>If up 3v2, slow down and let gas close for free win.</li>
      </ul>
    </section>
  `;
  byKey['ko-out-in-the-open'].preview = 'Out in the Open: pure aim KO.';

  byKey['ko-flaring-phoenix'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Mortis</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Shelly/Gale (anti-dive), Tara (reveal), Gene (pull) depending on lobby.</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Mortis banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Mandy / Gene</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Mandy banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Belle / Mortis</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Poke until an opening, then assassin/pull confirms the kill.</li>
        <li>Save big tools for gas close if round is slow.</li>
      </ul>
    </section>
  `;
  byKey['ko-flaring-phoenix'].preview = 'Flaring Phoenix: range + closer (Mortis/Gene).' ;

  byKey['ko-new-horizons'].html = `
    <section class="block">
      <h3>Primary comp</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Piper / Leon</strong></div></div>
      <div class="kv"><div class="k">Bans</div><div class="v">Tara (reveal), Bo (mines/vision), Shelly (anti-Leon), and/or Nani (burst).</div></div>
    </section>
    <section class="block">
      <h3>Backup A (if Leon banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Piper / Nani</strong></div></div>
    </section>
    <section class="block">
      <h3>Backup B (if Piper + Leon banned)</h3>
      <div class="kv"><div class="k">Comp</div><div class="v"><strong>Brock / Belle / Gene</strong></div></div>
    </section>
    <hr />
    <section class="block">
      <h3>How to play</h3>
      <ul>
        <li>Snipers soften → stealth/pick tool (Leon/Gene/Nani) finishes.</li>
        <li>Don’t waste Leon invis; use it for a kill or game-breaking reposition.</li>
        <li>Save Gene pull for late gas if needed (less dodge space).</li>
      </ul>
    </section>
  `;
  byKey['ko-new-horizons'].preview = 'New Horizons: double sniper + stealth closer.';

  // Hot Zone placeholders (you asked to keep going; these will be filled next)
  ['hz-dueling-beetles','hz-parallel-plays','hz-open-zone','hz-ring-of-fire'].forEach(k=>{
    byKey[k].html = `
      <section class="block">
        <h3>Coming next</h3>
        <p>I’ll fill this Hot Zone map with: primary comp + 2 backups, bans, lane roles, worst matchups, and a step-by-step zone plan.</p>
      </section>
    `;
    byKey[k].preview = 'Hot Zone section to be added.';
  });

  // Build search text
  for(const key in byKey){
    const it = byKey[key];
    const tmp = document.createElement('div');
    tmp.innerHTML = it.html;
    const text = (it.name + ' ' + it.mode + ' ' + tmp.textContent).replace(/\s+/g,' ').trim();
    it.searchText = text;
  }

  return { modes, byKey };
})();
