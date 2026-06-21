import type { LevelConfig } from "./types";

// LEVEL 1 — Owen's Philadelphia street. He wakes up and meets Mom & Dad.
export const LEVEL_1: LevelConfig = {
  key: "Level1Scene",
  title: "GOOD MORNING,\nOWEN!",
  subtitle: "Owen's street in Philadelphia — let's go!",
  nextScene: "Level2Scene",
  worldWidth: 3800,
  groundTile: "sidewalk_tile",
  showSkyline: true,
  music: "morning",
  themeColor: "#ffd24a",

  buildings: [
    { texture: "rowhouse", worldX: 0, label: "Owen's House" },
    { texture: "rowhouse_red", worldX: 130 },
    { texture: "rowhouse_blue", worldX: 260 },
    { texture: "storefront", worldX: 400, label: "Corner Store" },
    { texture: "rowhouse", worldX: 520 },
    { texture: "rowhouse_red", worldX: 650 },
    { texture: "rowhouse_blue", worldX: 820 },
    { texture: "rowhouse", worldX: 950 },
    { texture: "love_statue", worldX: 1120, y: 250, label: "LOVE Park" },
    { texture: "rowhouse_red", worldX: 1280 },
    { texture: "rowhouse_blue", worldX: 1410 },
    { texture: "storefront", worldX: 1560 },
    { texture: "rowhouse", worldX: 1700 },
    { texture: "rowhouse_red", worldX: 1900 },
    { texture: "rowhouse_blue", worldX: 2030 },
    { texture: "rowhouse", worldX: 2200 },
    { texture: "storefront", worldX: 2360 },
    { texture: "rowhouse_red", worldX: 2500 },
    { texture: "rowhouse_blue", worldX: 2680 },
    { texture: "rowhouse", worldX: 2860 },
    { texture: "rowhouse_red", worldX: 3040 },
    { texture: "storefront", worldX: 3220 },
    { texture: "rowhouse_blue", worldX: 3360 },
    { texture: "rowhouse", worldX: 3520 },
  ],

  props: [
    { texture: "streetlamp", worldX: 120, worldZ: 388 },
    { texture: "tree", worldX: 300, worldZ: 392 },
    { texture: "hydrant", worldX: 240, worldZ: 510, isObstacle: true, width: 26, height: 30 },
    { texture: "mailbox", worldX: 470, worldZ: 500 },
    { texture: "streetlamp", worldX: 620, worldZ: 388 },
    { texture: "bench", worldX: 760, worldZ: 470 },
    { texture: "flower_bed", worldX: 1050, worldZ: 505 },
    { texture: "tree", worldX: 1180, worldZ: 392 },
    { texture: "streetlamp", worldX: 1340, worldZ: 388 },
    { texture: "trashcan", worldX: 1480, worldZ: 505, isObstacle: true, width: 28, height: 30 },
    { texture: "bench", worldX: 1760, worldZ: 470 },
    { texture: "tree", worldX: 2080, worldZ: 392 },
    { texture: "streetlamp", worldX: 2300, worldZ: 388 },
    { texture: "pretzel_cart", worldX: 2520, worldZ: 500, label: "Soft Pretzels!" },
    { texture: "flower_bed", worldX: 2900, worldZ: 505 },
    { texture: "tree", worldX: 3160, worldZ: 392 },
    { texture: "directional_sign", worldX: 3700, worldZ: 470, label: "To the Park →" },
  ],

  npcs: [
    {
      name: "Mom", texture: "mom", worldX: 520, worldZ: 470, wandering: false,
      dialog: [
        "Good morning, Owen! Ready for your BIG day out?",
        "Hold my hand near the street, sweetie. Off we go!",
        "I packed your favorite snacks. This is going to be so fun!",
      ],
    },
    {
      name: "Dad", texture: "dad", worldX: 700, worldZ: 480, wandering: false,
      dialog: [
        "There's my buddy! Let's go on an adventure, Owen!",
        "We'll see animals, dinosaurs, AND a giant sandbox today!",
        "High five, champ! This is the best day ever.",
      ],
    },
    {
      name: "Mail Carrier", texture: "mail_carrier", worldX: 1380, worldZ: 470, wandering: true,
      dialog: [
        "Special delivery: a great big HELLO for Owen!",
        "I love this neighborhood. Everyone's so friendly!",
        "Watch me wave to every single house. Hi! Hi! Hi!",
      ],
    },
    {
      name: "Friendly Neighbor", texture: "friend_kid", worldX: 2050, worldZ: 460, wandering: true,
      dialog: [
        "Hi Owen! Wanna race to the park? Ready, set, GO!",
        "I brought my favorite toy. Do you want to see it?",
        "My puppy says woof hello to you!",
      ],
    },
    {
      name: "Pretzel Vendor", texture: "pretzel_vendor", worldX: 2560, worldZ: 480, wandering: false,
      dialog: [
        "Fresh Philly soft pretzels! Here, this one's for you, Owen!",
        "Twisty and warm and yummy. Enjoy, little buddy!",
      ],
    },
  ],

  animals: [
    { texture: "dog", worldX: 900, worldZ: 500, width: 50, height: 26 },
    { texture: "cat", worldX: 1650, worldZ: 510, width: 40, height: 24 },
    { texture: "dog2", worldX: 2750, worldZ: 500, width: 50, height: 26 },
  ],

  items: [
    { texture: "tool_hardhat", worldX: 640, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Hard Hat!" },
    { texture: "treat_pretzel", worldX: 1240, worldZ: 480, points: 10, label: "+10! Yummy Pretzel!" },
    { texture: "star", worldX: 1850, worldZ: 460, points: 15, label: "+15 Points!" },
    { texture: "tool_shovel", worldX: 3000, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Shovel!" },
  ],
};
