# Owen's BIG Day Out! 🎉

A happy, wholesome retro adventure game for kids. Follow **Owen** — a cheerful kid
with bright red hair — through six levels of **Philadelphia**: his street, a big walk
to the park, the zoo, a dinosaur museum, a giant sandbox, and back home. Everyone is
friendly, nobody gets hurt, and there are fun surprises along the way.

## Tech stack

- **Astro** — website framework
- **Phaser 3** — the game engine (side-scrolling "belt scroll" style)
- **TypeScript**
- All artwork is **drawn in code** (pixel art via Phaser graphics — no image files)
- All music & sound is **generated in code** (Web Audio chiptune — no audio files,
  nothing to license)

## Run it on your computer

```bash
npm install     # install once
npm run dev      # start the game at http://localhost:4321
```

Then open **http://localhost:4321** in your browser and click **PLAY**.

## Build for the web

```bash
npm run build    # creates the production site in ./dist
npm run preview  # preview that production build locally
```

## How to play

- **Arrow keys** or **WASD** to move
- **SPACE** to jump
- Walk **right** to explore each level and reach the next one
- Collect **construction tools** 🔧 and **treats**, and say hi to everyone!

## Project layout

```
src/
  pages/            Astro pages (index = home, play = the game)
  components/        PhaserGame.tsx mounts the game
  game/
    Game.ts         Phaser config + scene list
    audio/          AudioEngine.ts (chiptune music + sound effects)
    entities/       Player (Owen), NPC, Item
    textures/       all the pixel art, drawn in code
    scenes/         BootScene, LevelSelectScene, LevelScene, FinalScene
    levels/         level1..level6 — the data for each of the 6 levels
    utils/          MobileControls
```

### Want to change a level?

Open `src/game/levels/level1.ts` (through `level6.ts`). Each file is just a list of
buildings, props, characters (with their dialog), animals, and collectibles. Edit the
text, move things around, or add new entries — no game code required.
