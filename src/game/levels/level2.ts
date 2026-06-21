import type { LevelConfig } from "./types";

// LEVEL 2 — The Big Walk. Silly characters, dogs & cats, and Nonno helps out.
export const LEVEL_2: LevelConfig = {
  key: "Level2Scene",
  title: "THE BIG WALK",
  subtitle: "Meet silly friends on the way to the park!",
  nextScene: "Level3Scene",
  worldWidth: 3900,
  groundTile: "sidewalk_tile",
  showSkyline: true,
  music: "walk",
  themeColor: "#4ac3ff",

  buildings: [
    { texture: "rowhouse_blue", worldX: 0 },
    { texture: "storefront", worldX: 150, label: "Toy Shop" },
    { texture: "rowhouse", worldX: 300 },
    { texture: "rowhouse_red", worldX: 470 },
    { texture: "city_hall", worldX: 640, y: 130, label: "City Hall" },
    { texture: "rowhouse_blue", worldX: 840 },
    { texture: "rowhouse", worldX: 1010 },
    { texture: "storefront", worldX: 1180 },
    { texture: "rowhouse_red", worldX: 1320 },
    { texture: "rowhouse_blue", worldX: 1500 },
    { texture: "rowhouse", worldX: 1680 },
    { texture: "storefront", worldX: 1860, label: "Ice Cream!" },
    { texture: "rowhouse_red", worldX: 2010 },
    { texture: "rowhouse_blue", worldX: 2190 },
    { texture: "rowhouse", worldX: 2370 },
    { texture: "storefront", worldX: 2550 },
    { texture: "rowhouse_red", worldX: 2700 },
    { texture: "rowhouse_blue", worldX: 2880 },
    { texture: "rowhouse", worldX: 3060 },
    { texture: "storefront", worldX: 3240 },
    { texture: "rowhouse_red", worldX: 3400 },
    { texture: "rowhouse_blue", worldX: 3580 },
  ],

  props: [
    { texture: "tree", worldX: 120, worldZ: 392 },
    { texture: "streetlamp", worldX: 280, worldZ: 388 },
    { texture: "bench", worldX: 420, worldZ: 470 },
    { texture: "fountain", worldX: 760, worldZ: 510, label: "Logan Fountain" },
    { texture: "flower_bed", worldX: 980, worldZ: 505 },
    { texture: "balloon", worldX: 1150, worldZ: 430 },
    { texture: "streetlamp", worldX: 1300, worldZ: 388 },
    { texture: "hydrant", worldX: 1450, worldZ: 510, isObstacle: true, width: 26, height: 30 },
    { texture: "tree", worldX: 1620, worldZ: 392 },
    { texture: "bench", worldX: 1920, worldZ: 470 },
    { texture: "trashcan", worldX: 2120, worldZ: 505, isObstacle: true, width: 28, height: 30 },
    { texture: "streetlamp", worldX: 2320, worldZ: 388 },
    { texture: "flower_bed", worldX: 2600, worldZ: 505 },
    { texture: "tree", worldX: 2900, worldZ: 392 },
    { texture: "bench", worldX: 3180, worldZ: 470 },
    { texture: "directional_sign", worldX: 3800, worldZ: 470, label: "To the Zoo →" },
  ],

  npcs: [
    {
      name: "Nonno", texture: "nonno", worldX: 360, worldZ: 470, wandering: false,
      dialog: [
        "Owen! It's-a me, Nonno! Let me walk with you, bambino.",
        "When I was little, I loved this walk too. Watch for the squirrels!",
        "You're doing so good! Nonno is very proud of you.",
      ],
    },
    {
      name: "Clown", texture: "clown", worldX: 700, worldZ: 470, wandering: true,
      dialog: [
        "Honk honk! Wanna see me juggle? Whoops — caught 'em!",
        "Why did Owen cross the street? To get to the FUN side!",
        "Here's a balloon animal! It's a... wobbly giraffe!",
      ],
    },
    {
      name: "Juggler", texture: "juggler", worldX: 1250, worldZ: 480, wandering: true,
      dialog: [
        "One ball, two balls, three balls... ta-da!",
        "Bet you can't hop on one foot like me! Boing boing!",
      ],
    },
    {
      name: "Balloon Man", texture: "balloon_man", worldX: 1700, worldZ: 470, wandering: false,
      dialog: [
        "Free balloons for everybody! Red, blue, your favorite colors!",
        "Hold on tight or it'll float away to the clouds!",
      ],
    },
    {
      name: "Ice Cream Vendor", texture: "ice_cream_vendor", worldX: 1980, worldZ: 470, wandering: false,
      dialog: [
        "Scoops for Owen! Pink, yellow, ALL the flavors!",
        "Brain freeze? Just wiggle your ears, that helps!",
      ],
    },
    {
      name: "Street Musician", texture: "musician", worldX: 2700, worldZ: 470, wandering: true,
      dialog: [
        "♪ La la la, it's a beautiful day with Owen! ♪",
        "Wanna clap along? Clap-clap, stomp-stomp, YAY!",
      ],
    },
  ],

  animals: [
    { texture: "dog", worldX: 540, worldZ: 500, width: 50, height: 26 },
    { texture: "cat2", worldX: 1080, worldZ: 510, width: 40, height: 24 },
    { texture: "dog2", worldX: 1820, worldZ: 500, width: 50, height: 26 },
    { texture: "cat", worldX: 2480, worldZ: 510, width: 40, height: 24 },
    { texture: "dog", worldX: 3120, worldZ: 500, width: 50, height: 26 },
  ],

  items: [
    { texture: "treat_icecream", worldX: 880, worldZ: 480, points: 10, label: "+10! Ice Cream!" },
    { texture: "tool_wrench", worldX: 1380, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Wrench!" },
    { texture: "star", worldX: 2050, worldZ: 460, points: 15, label: "+15 Points!" },
    { texture: "tool_hammer", worldX: 2780, worldZ: 470, points: 25, tool: true, label: "+1 Tool! Hammer!" },
    { texture: "treat_pretzel", worldX: 3300, worldZ: 480, points: 10, label: "+10! Pretzel!" },
  ],
};
