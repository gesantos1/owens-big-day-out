import type { LevelConfig } from "./types";

// LEVEL 6 — Home Sweet Home. The walk back through Philly to a happy celebration.
export const LEVEL_6: LevelConfig = {
  key: "Level6Scene",
  title: "HOME SWEET\nHOME",
  subtitle: "What a BIG day! Everyone's waiting for you!",
  nextScene: "", // "" => the celebration finale
  worldWidth: 3700,
  groundTile: "sidewalk_tile",
  showSkyline: true,
  music: "home",
  themeColor: "#e23636",

  buildings: [
    { texture: "rowhouse_blue", worldX: 0 },
    { texture: "rowhouse", worldX: 130 },
    { texture: "liberty_bell", worldX: 280, y: 270, label: "Liberty Bell" },
    { texture: "rowhouse_red", worldX: 420 },
    { texture: "rowhouse", worldX: 560 },
    { texture: "love_statue", worldX: 720, y: 250, label: "LOVE Park" },
    { texture: "rowhouse_blue", worldX: 880 },
    { texture: "rowhouse", worldX: 1060 },
    { texture: "city_hall", worldX: 1240, y: 130, label: "City Hall" },
    { texture: "rowhouse_red", worldX: 1460 },
    { texture: "rowhouse", worldX: 1640 },
    { texture: "rowhouse_blue", worldX: 1820 },
    { texture: "storefront", worldX: 2000, label: "Corner Store" },
    { texture: "rowhouse", worldX: 2160 },
    { texture: "rowhouse_red", worldX: 2340 },
    { texture: "rowhouse_blue", worldX: 2520 },
    { texture: "rowhouse", worldX: 2700 },
    { texture: "rowhouse_red", worldX: 2880 },
    { texture: "rowhouse_blue", worldX: 3060 },
    { texture: "rowhouse", worldX: 3300, label: "Owen's House" },
  ],

  props: [
    { texture: "streetlamp", worldX: 120, worldZ: 388 },
    { texture: "tree", worldX: 380, worldZ: 392 },
    { texture: "flower_bed", worldX: 620, worldZ: 505 },
    { texture: "bench", worldX: 840, worldZ: 470 },
    { texture: "balloon", worldX: 1000, worldZ: 430 },
    { texture: "streetlamp", worldX: 1180, worldZ: 388 },
    { texture: "tree", worldX: 1500, worldZ: 392 },
    { texture: "balloon", worldX: 1700, worldZ: 430 },
    { texture: "flower_bed", worldX: 1950, worldZ: 505 },
    { texture: "bench", worldX: 2250, worldZ: 470 },
    { texture: "tree", worldX: 2600, worldZ: 392 },
    { texture: "balloon", worldX: 2900, worldZ: 430 },
    { texture: "pretzel_cart", worldX: 3150, worldZ: 500, label: "Party Snacks!" },
    { texture: "directional_sign", worldX: 3600, worldZ: 470, label: "Owen's House →" },
  ],

  // Mom & Dad walk WITH Owen again on the journey home. The grandparents greet
  // him along the way.
  companions: [
    { name: "Dad", texture: "dad", offsetX: -60, offsetZ: 14 },
    { name: "Mom", texture: "mom", offsetX: -105, offsetZ: 26 },
  ],

  npcs: [
    {
      name: "Nonno", texture: "nonno", worldX: 500, worldZ: 470, wandering: false,
      dialog: [
        "Bravo, Owen! What a big adventure you had today!",
        "Nonno saved you the biggest cannoli. You earned it, bambino!",
      ],
    },
    {
      name: "Grandmama", texture: "grandmama", worldX: 1080, worldZ: 470, wandering: false,
      dialog: [
        "There's my brave explorer! Grandmama missed you, darling!",
        "Tell me everything about the dinosaurs and the giraffes!",
      ],
    },
    {
      name: "Grandpa", texture: "grandpa", worldX: 1900, worldZ: 480, wandering: false,
      dialog: [
        "Look at all those tools, Owen! You're a real builder now!",
        "Almost home, champ. Everyone's so excited to see you!",
      ],
    },
  ],

  animals: [
    { texture: "dog", worldX: 700, worldZ: 500, width: 50, height: 26 },
    { texture: "cat", worldX: 1400, worldZ: 510, width: 40, height: 24 },
    { texture: "dog2", worldX: 2100, worldZ: 500, width: 50, height: 26 },
    { texture: "cat2", worldX: 2950, worldZ: 510, width: 40, height: 24 },
  ],

  items: [
    { texture: "star", worldX: 600, worldZ: 460, points: 15, label: "+15 Points!" },
    { texture: "treat_pretzel", worldX: 1300, worldZ: 480, points: 10, label: "+10! Pretzel!" },
    { texture: "star", worldX: 2050, worldZ: 460, points: 15, label: "+15 Points!" },
    { texture: "treat_waterice", worldX: 2800, worldZ: 480, points: 10, label: "+10! Water Ice!" },
  ],
};
