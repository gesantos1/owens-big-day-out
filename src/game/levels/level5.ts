import type { LevelConfig } from "./types";

// LEVEL 5 — The Big Sandbox. The playground with the giant sandbox + lots of tools.
export const LEVEL_5: LevelConfig = {
  key: "Level5Scene",
  title: "THE BIG\nSANDBOX",
  subtitle: "Dig and build with all your tools!",
  nextScene: "Level6Scene",
  worldWidth: 3900,
  groundTile: "grass_tile",
  showSkyline: true,
  music: "sandbox",
  themeColor: "#ff8c42",

  buildings: [
    { texture: "storefront", worldX: 0, label: "Playground Gate" },
    { texture: "rowhouse", worldX: 220 },
    { texture: "rowhouse_blue", worldX: 400 },
    { texture: "rowhouse_red", worldX: 1600 },
    { texture: "rowhouse", worldX: 1780 },
    { texture: "rowhouse_blue", worldX: 2600 },
    { texture: "rowhouse_red", worldX: 2780 },
    { texture: "storefront", worldX: 3400, label: "Snack Cart" },
  ],

  props: [
    { texture: "playground_set", worldX: 360, worldZ: 470, label: "Slide!" },
    { texture: "tree", worldX: 560, worldZ: 392 },
    { texture: "monkey_bars", worldX: 700, worldZ: 470, label: "Monkey Bars!" },
    { texture: "flower_bed", worldX: 880, worldZ: 505 },
    { texture: "sandbox", worldX: 1150, worldZ: 520, scale: 2.2, label: "THE BIG SANDBOX!" },
    { texture: "bench", worldX: 1450, worldZ: 470 },
    { texture: "tree", worldX: 1640, worldZ: 392 },
    { texture: "playground_set", worldX: 1950, worldZ: 470, label: "Swings!" },
    { texture: "flower_bed", worldX: 2200, worldZ: 505 },
    { texture: "monkey_bars", worldX: 2420, worldZ: 470 },
    { texture: "bench", worldX: 2700, worldZ: 470 },
    { texture: "tree", worldX: 2950, worldZ: 392 },
    { texture: "sandbox", worldX: 3150, worldZ: 520, label: "More Sand!" },
    { texture: "directional_sign", worldX: 3800, worldZ: 470, label: "Home →" },
  ],

  npcs: [
    {
      name: "Mom", texture: "mom", worldX: 250, worldZ: 470, wandering: false,
      dialog: [
        "The big sandbox, Owen! You've been waiting all day for this!",
        "Build a sandcastle with your shovel and bucket, sweetie!",
        "I'll watch from the bench. Have so much fun, my love!",
      ],
    },
    {
      name: "PJ Pal", texture: "pjmask", worldX: 900, worldZ: 470, wandering: true,
      dialog: [
        "Into the night to save the day — but first, the sandbox!",
        "We're going on a sandbox adventure, are you ready? Yeah yeah!",
        "Heroes love to build big sand towers too. Let's go, Owen!",
      ],
    },
    {
      name: "Builder Buddy", texture: "friend_kid", worldX: 1350, worldZ: 460, wandering: true,
      dialog: [
        "Let's build the BIGGEST sandcastle ever, Owen!",
        "I have a digger and a dump truck. Wanna share?",
        "Pat pat pat... look, a perfect sand tower!",
      ],
    },
    {
      name: "Grandpa", texture: "grandpa", worldX: 2000, worldZ: 480, wandering: false,
      dialog: [
        "Look at all the tools you collected today, Owen! What a builder!",
        "Grandpa will help you dig the deepest hole in the sandbox.",
        "You're the best little construction worker in Philadelphia!",
      ],
    },
    {
      name: "Sandbox Friend", texture: "balloon_man", worldX: 2850, worldZ: 470, wandering: false,
      dialog: [
        "Balloons AND a sandbox? Best playground ever!",
        "Tie your balloon to your wrist so it won't float away while you dig!",
      ],
    },
  ],

  animals: [
    { texture: "dog", worldX: 620, worldZ: 500, width: 50, height: 26 },
    { texture: "cat", worldX: 1500, worldZ: 510, width: 40, height: 24 },
    { texture: "dog2", worldX: 2300, worldZ: 500, width: 50, height: 26 },
    { texture: "cat2", worldX: 3000, worldZ: 510, width: 40, height: 24 },
  ],

  items: [
    { texture: "tool_hardhat", worldX: 480, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Hard Hat!" },
    { texture: "tool_shovel", worldX: 1000, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Shovel!" },
    { texture: "tool_bulldozer", worldX: 1300, worldZ: 470, points: 30, tool: true, label: "+1 Tool! Digger!" },
    { texture: "tool_wrench", worldX: 1820, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Wrench!" },
    { texture: "tool_cone", worldX: 2500, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Cone!" },
    { texture: "treat_icecream", worldX: 3050, worldZ: 480, points: 10, label: "+10! Ice Cream!" },
  ],
};
