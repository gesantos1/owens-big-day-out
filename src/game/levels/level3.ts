import type { LevelConfig } from "./types";

// LEVEL 3 — The Philadelphia Zoo. Happy animals everywhere; Grandmama joins in.
export const LEVEL_3: LevelConfig = {
  key: "Level3Scene",
  title: "THE PHILLY ZOO",
  subtitle: "So many happy animals to meet!",
  nextScene: "Level4Scene",
  worldWidth: 4000,
  groundTile: "zoo_path",
  showSkyline: false,
  music: "zoo",
  themeColor: "#5bb24a",

  buildings: [
    { texture: "zoo_gate", worldX: 0, y: 210, label: "Welcome to the Zoo!" },
    { texture: "storefront", worldX: 340, label: "Snack Shack" },
    { texture: "storefront", worldX: 760, label: "Reptile House" },
    { texture: "storefront", worldX: 1300, label: "Bird House" },
    { texture: "storefront", worldX: 1900, label: "Big Cat Lookout" },
    { texture: "storefront", worldX: 2500, label: "Safari Cafe" },
    { texture: "storefront", worldX: 3100, label: "Petting Barn" },
    { texture: "storefront", worldX: 3600, label: "Gift Shop" },
  ],

  props: [
    { texture: "tree", worldX: 200, worldZ: 392 },
    { texture: "bush", worldX: 300, worldZ: 500 },
    { texture: "flower_bed", worldX: 460, worldZ: 505 },
    { texture: "bench", worldX: 600, worldZ: 470 },
    { texture: "tree", worldX: 720, worldZ: 392 },
    { texture: "fountain", worldX: 980, worldZ: 510, label: "Splash Fountain" },
    { texture: "bush", worldX: 1180, worldZ: 500 },
    { texture: "tree", worldX: 1420, worldZ: 392 },
    { texture: "flower_bed", worldX: 1620, worldZ: 505 },
    { texture: "bench", worldX: 1820, worldZ: 470 },
    { texture: "bush", worldX: 2080, worldZ: 500 },
    { texture: "tree", worldX: 2300, worldZ: 392 },
    { texture: "flower_bed", worldX: 2560, worldZ: 505 },
    { texture: "bench", worldX: 2800, worldZ: 470 },
    { texture: "bush", worldX: 3020, worldZ: 500 },
    { texture: "tree", worldX: 3320, worldZ: 392 },
    { texture: "flower_bed", worldX: 3520, worldZ: 505 },
    { texture: "directional_sign", worldX: 3900, worldZ: 470, label: "To the Museum →" },
  ],

  npcs: [
    {
      name: "Grandmama", texture: "grandmama", worldX: 300, worldZ: 470, wandering: false,
      dialog: [
        "Owen, darling! Grandmama loves the zoo. Let's see the animals!",
        "Look at the giraffe's loooong neck. Can you stretch up tall too?",
        "Give the penguins a wave, sweetheart. They're saying hi!",
      ],
    },
    {
      name: "Zoo Keeper", texture: "zoo_keeper", worldX: 720, worldZ: 470, wandering: true,
      dialog: [
        "Welcome, Owen! All our animals are happy and well-fed today.",
        "Did you know elephants say hello with their trunks? Toot toot!",
        "The monkeys love to copy you. Try making a silly face!",
      ],
    },
    {
      name: "Bluey", texture: "bluey", worldX: 1500, worldZ: 470, wandering: true,
      dialog: [
        "Wackadoo! Wanna play a game, Owen? Let's pretend we're animals!",
        "I'm a kangaroo! Boing! Now you be a lion — roar!",
        "For real life, this zoo is the best! High five!",
      ],
    },
    {
      name: "Grandpa", texture: "grandpa", worldX: 2400, worldZ: 480, wandering: false,
      dialog: [
        "Hey there, Owen! Grandpa found the best bench to watch the lions.",
        "Want me to lift you up so you can see the giraffes? Up we go!",
        "You're being such a good explorer today. I'm proud of you!",
      ],
    },
    {
      name: "Zoo Friend", texture: "friend_kid", worldX: 3000, worldZ: 460, wandering: true,
      dialog: [
        "The zebras have stripes like a crosswalk! So cool!",
        "I fed the goats at the petting barn. They nibbled my sleeve!",
      ],
    },
  ],

  animals: [
    { texture: "lion", worldX: 520, worldZ: 510, width: 70, height: 34 },
    { texture: "monkey", worldX: 900, worldZ: 500, width: 44, height: 36, scale: 1.6 },
    { texture: "penguin", worldX: 1250, worldZ: 510, width: 36, height: 38, scale: 1.6 },
    { texture: "giraffe", worldX: 1700, worldZ: 510, width: 60, height: 60, scale: 1.4 },
    { texture: "zebra", worldX: 2200, worldZ: 510, width: 70, height: 36 },
    { texture: "elephant", worldX: 2700, worldZ: 515, width: 90, height: 40, scale: 1.6 },
    { texture: "monkey", worldX: 3200, worldZ: 500, width: 44, height: 36, scale: 1.6 },
  ],

  items: [
    { texture: "star", worldX: 460, worldZ: 460, points: 15, label: "+15 Points!" },
    { texture: "treat_waterice", worldX: 1050, worldZ: 480, points: 10, label: "+10! Water Ice!" },
    { texture: "tool_screwdriver", worldX: 1600, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Screwdriver!" },
    { texture: "treat_icecream", worldX: 2350, worldZ: 480, points: 10, label: "+10! Ice Cream!" },
    { texture: "tool_cone", worldX: 3050, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Cone!" },
  ],
};
