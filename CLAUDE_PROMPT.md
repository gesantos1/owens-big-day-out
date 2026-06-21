# Backup: Claude Code rebuild prompt

> **You do not need this** — the game is already fully built, type-checked, committed,
> pushed to GitHub, and ready to deploy. This file is only here in case you ever want a
> fresh Claude Code session to regenerate the game from the original zip.
>
> **How to use it:** start Claude Code in an empty folder, give it the original
> `BostonSimulator.zip`, and paste everything in the box below. (Optionally launch with
> `claude --dangerously-skip-permissions` so it runs without stopping to ask.)

---

```text
I'm giving you BostonSimulator.zip — an existing, deployed Astro + Phaser 3 game.
Unzip it and reuse its engine, structure, and code wherever possible. Keep the same
core mechanics (side-scrolling "belt scroll" movement, jump, NPC dialog, collectible
items, parallax, mobile touch controls), but transform it into a brand-new wholesome
kids' game called "Owen's BIG Day Out!". Build the whole thing, get `npm run build`
passing, then stop. Do everything you can without asking me.

STORY & CHARACTERS
- Title everywhere: "Owen's BIG Day Out!"
- Hero: Owen, a happy white kid with bright red hair. He loves Spider-Man/Marvel,
  Bluey, and PJ Masks — work in a few surprise cameos of those as friendly characters.
- Family (all friendly helpers along the way): Mom and Dad (white, dark hair),
  grandparents Nonno, Grandmama, and Grandpa.
- Owen also meets silly happy characters, plus dogs and cats, throughout.
- EVERYONE is happy and kind. There is NO conflict, no enemies, nobody gets hurt.

SETTING: Philadelphia. The game starts and ends in Philadelphia. Use Philly visuals
(brick rowhomes, the LOVE sculpture, Liberty Bell, City Hall with William Penn, the
Philadelphia skyline, soft pretzels, water ice, etc.).

EXACTLY 6 LEVELS:
  1. Owen's Philly street (morning) — meet Mom & Dad
  2. The walk to the park — silly characters; a grandparent helps
  3. The Philadelphia Zoo — happy animals (lion, monkey, elephant, giraffe, penguin,
     zebra); grandparents help
  4. The Dinosaur Museum — friendly dinosaurs; a Spider-Friend surprise
  5. A playground with a BIG sandbox — collect construction tools here especially
  6. Back home in Philadelphia — the family celebrates

GAMEPLAY CHANGES FROM THE ORIGINAL
- REMOVE the health bar and the "Game Over" state entirely. The original animals
  damaged the player; instead, bumping into a character/critter just causes a brief,
  silly stumble (a little wobble + soft "boop"). Nobody loses health.
- Owen collects CONSTRUCTION IMPLEMENTS (hard hat, shovel, wrench, hammer, screwdriver,
  traffic cone, paint, toy bulldozer) throughout, plus Philly treats (pretzel, ice
  cream, water ice). Show a points score and a tools-collected counter.
- Make each level's TITLE text 3x the normal size (show a big title card on entry).
- Add a few fun surprises (the hero cameos, confetti at the end, etc.).

ART: The original draws ALL sprites/buildings in code with Phaser Graphics (no image
files). Keep that approach — rewrite the texture files to draw Owen, the family, silly
characters, dogs, cats, zoo animals, dinosaurs, Philly buildings/landmarks, and the
construction tools.

MUSIC/SOUND: REMOVE the original copyrighted song files. Replace them with original,
copyright-safe, cheerful chiptune music + a few fun sound effects, generated in code
with the Web Audio API (no audio files to license). Keep a music on/off toggle.

DE-PERSONALIZE / CLEAN UP
- Remove the online leaderboard entirely (Supabase client, ScoreManager, the high-score
  list on the home page, and the arcade initials-entry screen).
- Remove ALL references to the original author: their name, email/contact link, the
  donate (Stripe) link, the sponsors list, and the PostHog analytics snippet.
- Remove Docker/nginx files; this will deploy as a static site on Vercel.
- Rewrite the home page (index.astro) with the new title, a kid-friendly story, simple
  controls, and a Play button.

STRUCTURE TIP: The original repeats ~1,600 lines per level scene. Refactor to ONE
reusable LevelScene class driven by a small per-level data file (buildings, props,
NPCs+dialog, animals, items), so each of the 6 levels is just easy-to-edit data.

DELIVERABLES: a runnable Astro project (`npm install` then `npm run dev`), a passing
`npm run build`, a clean type-check (`npx astro check` with no errors), a short README,
and a .gitignore. Then tell me the exact steps to push to GitHub and deploy on Vercel.
```
