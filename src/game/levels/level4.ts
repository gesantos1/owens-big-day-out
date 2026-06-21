import type { LevelConfig } from "./types";

// LEVEL 4 — The Dinosaur Museum. Big friendly dinosaurs and a fun surprise.
export const LEVEL_4: LevelConfig = {
  key: "Level4Scene",
  title: "DINOSAUR\nMUSEUM!",
  subtitle: "RAWR means hello in dinosaur!",
  nextScene: "Level5Scene",
  worldWidth: 4000,
  groundTile: "museum_floor",
  showSkyline: false,
  music: "dino",
  themeColor: "#8a6ac3",

  buildings: [
    { texture: "dino_museum", worldX: 0, y: 150, label: "Natural History Museum" },
    { texture: "storefront", worldX: 380, label: "Fossil Hall" },
    { texture: "storefront", worldX: 940, label: "T-Rex Room" },
    { texture: "storefront", worldX: 1520, label: "Dig Site" },
    { texture: "storefront", worldX: 2100, label: "Sea Reptiles" },
    { texture: "storefront", worldX: 2680, label: "Flying Dinos" },
    { texture: "storefront", worldX: 3260, label: "Museum Cafe" },
    { texture: "storefront", worldX: 3600, label: "Gift Shop" },
  ],

  props: [
    { texture: "bench", worldX: 250, worldZ: 470 },
    { texture: "streetlamp", worldX: 420, worldZ: 388 },
    { texture: "trashcan", worldX: 600, worldZ: 505, isObstacle: true, width: 28, height: 30 },
    { texture: "bench", worldX: 820, worldZ: 470 },
    { texture: "flower_bed", worldX: 1100, worldZ: 505 },
    { texture: "streetlamp", worldX: 1320, worldZ: 388 },
    { texture: "bench", worldX: 1600, worldZ: 470 },
    { texture: "trashcan", worldX: 1850, worldZ: 505, isObstacle: true, width: 28, height: 30 },
    { texture: "bench", worldX: 2200, worldZ: 470 },
    { texture: "streetlamp", worldX: 2480, worldZ: 388 },
    { texture: "flower_bed", worldX: 2760, worldZ: 505 },
    { texture: "bench", worldX: 3080, worldZ: 470 },
    { texture: "directional_sign", worldX: 3900, worldZ: 470, label: "To the Playground →" },
  ],

  npcs: [
    {
      name: "Dr. Fossil", texture: "scientist", worldX: 320, worldZ: 470, wandering: false,
      dialog: [
        "Welcome to the museum, Owen! These dinosaurs are SO old and friendly.",
        "The T-Rex had teeth as big as bananas! But this one only eats leaves.",
        "Want to be a paleontologist? Grab a tool and let's dig!",
      ],
    },
    {
      name: "Dad", texture: "dad", worldX: 720, worldZ: 480, wandering: false,
      dialog: [
        "Whoa, look how TALL the brontosaurus is, Owen! Up to the ceiling!",
        "Can you stomp like a dinosaur? Stomp stomp ROAR!",
        "This is your favorite part, isn't it, buddy?",
      ],
    },
    {
      name: "Spider-Friend", texture: "spiderman", worldX: 1450, worldZ: 470, wandering: true,
      dialog: [
        "Thwip! Your friendly neighborhood Spider-Friend says hi, Owen!",
        "Even superheroes love dinosaurs. This place is amazing!",
        "Wanna do a superhero pose with me? Hands on hips — POW!",
      ],
    },
    {
      name: "Nonno", texture: "nonno", worldX: 2300, worldZ: 480, wandering: false,
      dialog: [
        "Mamma mia, look at the size of that dino, Owen!",
        "Nonno will hold your hand. Those teeth are just for show!",
        "Andiamo! Let's find more dinosaurs together!",
      ],
    },
    {
      name: "Museum Kid", texture: "friend_kid", worldX: 3000, worldZ: 460, wandering: true,
      dialog: [
        "I found a dino footprint as big as my whole body!",
        "Did you know some dinosaurs had feathers? Like big birdies!",
      ],
    },
  ],

  animals: [
    { texture: "stegosaurus", worldX: 560, worldZ: 515, width: 80, height: 44, scale: 1.6 },
    { texture: "triceratops", worldX: 1080, worldZ: 515, width: 80, height: 44, scale: 1.6 },
    { texture: "trex", worldX: 1700, worldZ: 520, width: 80, height: 56, scale: 1.5 },
    { texture: "brontosaurus", worldX: 2350, worldZ: 525, width: 80, height: 64, scale: 1.4 },
    { texture: "triceratops", worldX: 2950, worldZ: 515, width: 80, height: 44, scale: 1.6 },
  ],

  items: [
    { texture: "tool_paint", worldX: 480, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Paint!" },
    { texture: "star", worldX: 1000, worldZ: 460, points: 15, label: "+15 Points!" },
    { texture: "tool_bulldozer", worldX: 1600, worldZ: 470, points: 30, tool: true, label: "+1 Tool! Bulldozer!" },
    { texture: "treat_pretzel", worldX: 2600, worldZ: 480, points: 10, label: "+10! Pretzel!" },
    { texture: "star", worldX: 3200, worldZ: 460, points: 15, label: "+15 Points!" },
  ],
};
