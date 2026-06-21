# Owen's BIG Day Out! — Build & Deploy Guide

This is your finished game and everything you need to run it, change it, and put it
online. It's written for a brand-new coder — just follow the steps in order.

---

## 1. What this is

A happy, kid-friendly retro game starring **Owen** (a cheerful kid with red hair) on a
**BIG day out in Philadelphia**. It was rebuilt from an existing game ("Boston
Simulator"), reusing the same proven game engine and structure but with a **completely
new story, characters, artwork, music, and town**.

**What changed from the original:**

| Original | Owen's BIG Day Out! |
| --- | --- |
| Boston, screenwriter looking for Matt Damon | Philadelphia, Owen on a fun day out |
| Health bar + "Game Over" when animals hit you | ❌ removed — bumping just makes a silly wobble, nobody gets hurt |
| Online leaderboard (Supabase) + initials entry | ❌ removed entirely |
| Copyrighted 8-bit song files | ✅ replaced with original, copyright-safe chiptune music + sound effects (generated in code) |
| Author's name, email, donate link, analytics tracker, sponsors | ❌ all removed / de-personalized |
| 7 Boston levels | ✅ exactly **6 Philadelphia levels** |
| Adult townie characters | ✅ Owen, Mom, Dad, Nonno, Grandmama, Grandpa, silly friends, dogs, cats, zoo animals, dinosaurs |

**The 6 levels:**

1. **Good Morning, Owen!** — Owen's Philly street; meet Mom & Dad
2. **The Big Walk** — silly characters (clown, juggler, balloon man); Nonno helps
3. **The Philly Zoo** — lions, monkeys, elephants, giraffes; Grandmama & Grandpa
4. **Dinosaur Museum!** — friendly dinosaurs; a Spider-Friend surprise; Nonno
5. **The Big Sandbox** — playground + giant sandbox; collect construction tools; a PJ-pal surprise
6. **Home Sweet Home** — Liberty Bell, LOVE Park, City Hall; the whole family celebrates

**Fun touches you asked for:** level titles are shown **3× the normal size**, Owen
collects **construction tools** all the way through, **dogs and cats** appear in every
level, and there are **surprise cameos** of Owen's favorites (a Spider-Friend, a blue
puppy à la Bluey, and a PJ-pal). Everyone is happy — there is no conflict anywhere.

---

## 2. Run it on your own computer

You need **Node.js** installed (https://nodejs.org — get the "LTS" version). Then open
the Terminal app, and run these one at a time:

```bash
cd /Users/greg/code/owen
npm install
npm run dev
```

The last command prints a web address like `http://localhost:4321/`
(**note:** if that port is busy it may say 4322 — use whatever it prints).
Open that address in your web browser and click **PLAY**. 🎉

To stop the game server, click the Terminal and press **Ctrl + C**.

---

## 3. Put it online with Vercel (the easy way)

Your code is already on GitHub here:
**https://github.com/gesantos1/owens-big-day-out**

The simplest path — no commands, all in the browser:

1. Go to **https://vercel.com** and sign in (use **"Continue with GitHub"** so Vercel
   can see your repos).
2. Click **"Add New…" → "Project"**.
3. Find **`owens-big-day-out`** in the list and click **"Import"**.
   - If you don't see it, click **"Adjust GitHub App Permissions"** and give Vercel
     access to the repo, then come back.
4. Vercel will auto-detect the settings. They should already read:
   - **Framework Preset:** `Astro`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** none needed — leave this empty.
5. Click **"Deploy"** and wait ~1 minute.
6. You'll get a public link like **`https://owens-big-day-out.vercel.app`** — that's
   your live game! Share it with anyone.

**Updating the game later:** every time you push a change to GitHub (`git add -A &&
git commit -m "..." && git push`), Vercel automatically rebuilds and updates the live
site. Nothing else to do.

### Alternative: deploy from the Terminal

If you'd rather use commands (you already have the Vercel CLI installed):

```bash
cd /Users/greg/code/owen
vercel        # first run: answer the prompts (link to your account, accept defaults)
vercel --prod # publish to your public production URL
```

---

## 4. How to change the game (no deep coding needed)

Almost everything lives as simple **data files** you can edit:

- **Each level:** `src/game/levels/level1.ts` … `level6.ts`. Each file lists the
  buildings, props, characters (and the exact things they say), animals, and
  collectibles for that level. Change the words, move things around (the numbers are
  left-to-right `worldX` positions and up/down `worldZ` positions), or add new lines.
- **The home page text/title:** `src/pages/index.astro`.
- **Characters' looks (pixel art):** `src/game/textures/characterTextures.ts`
  (people, pets, zoo animals, dinosaurs). **Owen himself:** `playerTextures.ts`.
- **Buildings & landmarks:** `src/game/textures/buildingTextures.ts`.
- **Music & sound effects:** `src/game/audio/AudioEngine.ts` (the tunes are written as
  simple note lists you can edit).

After any change, run `npm run dev` to see it, then commit & push to update the live
site.

---

## 5. Where everything is

```
owen/
  PLAN.md                 ← this file
  README.md               ← short project readme
  package.json            ← project + commands
  src/
    pages/index.astro     ← home page (title + story + Play button)
    pages/play.astro      ← the page that runs the game
    components/PhaserGame.tsx
    game/
      Game.ts             ← lists the scenes
      audio/AudioEngine.ts
      entities/           ← Player (Owen), NPC, Item
      textures/           ← all artwork, drawn in code
      scenes/             ← BootScene, LevelSelectScene, LevelScene, FinalScene
      levels/             ← level1..level6 (the data for each level)
      utils/MobileControls.ts
```

---

## 6. Backup option — rebuild with a fresh Claude Code

You don't need this (the game is already built, tested, and online). But if you ever
want to regenerate it from scratch with a fresh Claude Code session and the original
zip, the exact prompt to hand it is saved in **`CLAUDE_PROMPT.md`**.
