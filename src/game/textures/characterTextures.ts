import Phaser from "phaser";

// All the friendly faces Owen meets. Everyone is happy and smiling.

const SKIN = 0xffe0bd;

interface PersonOpts {
  hair: number;
  shirt: number;
  pants: number;
  shoes?: number;
  hairBack?: boolean; // long hair behind shoulders
  bald?: boolean;
  glasses?: boolean;
  mustache?: boolean;
  hat?: number;       // hat color (simple cap)
  bun?: boolean;      // grandma-style bun
}

// Draw a standard friendly grown-up / kid at 32x52 with a big smile.
function drawPerson(g: Phaser.GameObjects.Graphics, o: PersonOpts): void {
  const shoes = o.shoes ?? 0x4a3728;

  // Long hair behind the shoulders (drawn first so it sits behind)
  if (o.hairBack) {
    g.fillStyle(o.hair, 1);
    g.fillRect(8, 14, 16, 16);
  }

  // Torso / shirt
  g.fillStyle(o.shirt, 1);
  g.fillRect(9, 18, 14, 18);
  // Arms
  g.fillRect(5, 19, 4, 11);
  g.fillRect(23, 19, 4, 11);
  // Hands
  g.fillStyle(SKIN, 1);
  g.fillRect(5, 30, 4, 3);
  g.fillRect(23, 30, 4, 3);

  // Pants / legs
  g.fillStyle(o.pants, 1);
  g.fillRect(9, 36, 6, 10);
  g.fillRect(17, 36, 6, 10);
  // Shoes
  g.fillStyle(shoes, 1);
  g.fillRect(8, 46, 7, 4);
  g.fillRect(17, 46, 7, 4);

  // Head
  g.fillStyle(SKIN, 1);
  g.fillRect(10, 4, 12, 13);
  // Ears
  g.fillRect(9, 9, 1, 3);
  g.fillRect(22, 9, 1, 3);

  // Hair on top
  if (!o.bald) {
    g.fillStyle(o.hair, 1);
    g.fillRect(9, 2, 14, 5);
    g.fillRect(9, 4, 2, 5);
    g.fillRect(21, 4, 2, 5);
    if (o.bun) {
      g.fillRect(13, 0, 6, 2);
      g.fillRect(20, 1, 4, 4); // side bun
    }
  } else {
    // a little hair on the sides for an older gentleman
    g.fillStyle(o.hair, 1);
    g.fillRect(9, 6, 2, 4);
    g.fillRect(21, 6, 2, 4);
  }

  // Hat (cap) if requested
  if (o.hat !== undefined) {
    g.fillStyle(o.hat, 1);
    g.fillRect(9, 1, 14, 4);
    g.fillRect(8, 4, 9, 2); // brim
  }

  // Eyes
  g.fillStyle(0x000000, 1);
  g.fillRect(12, 9, 2, 2);
  g.fillRect(18, 9, 2, 2);

  // Glasses
  if (o.glasses) {
    g.lineStyle(1, 0x222222, 1);
    g.strokeRect(11, 8, 4, 4);
    g.strokeRect(17, 8, 4, 4);
    g.fillStyle(0x222222, 1);
    g.fillRect(15, 9, 2, 1);
  }

  // Mustache
  if (o.mustache) {
    g.fillStyle(o.hair, 1);
    g.fillRect(12, 13, 8, 2);
  }

  // Smile
  g.fillStyle(0x000000, 1);
  g.fillRect(13, 14, 6, 1);
  g.fillRect(12, 13, 1, 1);
  g.fillRect(19, 13, 1, 1);
  // Rosy cheeks
  g.fillStyle(0xffb0a0, 1);
  g.fillRect(11, 12, 2, 1);
  g.fillRect(19, 12, 2, 1);
}

function person(scene: Phaser.Scene, key: string, o: PersonOpts): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  drawPerson(g, o);
  g.generateTexture(key, 32, 52);
  g.destroy();
}

// ---- Pets ----
function makeDog(scene: Phaser.Scene, key: string, color: number): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  // body
  g.fillStyle(color, 1);
  g.fillRect(6, 14, 24, 10);
  // head
  g.fillRect(26, 8, 10, 10);
  // ear
  g.fillStyle(Phaser.Display.Color.IntegerToColor(color).darken(20).color, 1);
  g.fillRect(27, 6, 4, 5);
  // snout
  g.fillStyle(color, 1);
  g.fillRect(34, 12, 4, 4);
  // nose
  g.fillStyle(0x000000, 1);
  g.fillRect(37, 13, 2, 2);
  // eye
  g.fillRect(31, 11, 2, 2);
  // legs
  g.fillStyle(color, 1);
  g.fillRect(8, 24, 3, 6);
  g.fillRect(14, 24, 3, 6);
  g.fillRect(20, 24, 3, 6);
  g.fillRect(26, 24, 3, 6);
  // tail (wagging up)
  g.fillRect(3, 9, 4, 6);
  // tongue (happy)
  g.fillStyle(0xff7777, 1);
  g.fillRect(35, 16, 2, 3);
  g.generateTexture(key, 42, 32);
  g.destroy();
}

function makeCat(scene: Phaser.Scene, key: string, color: number): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  g.fillStyle(color, 1);
  // body
  g.fillRect(6, 16, 20, 8);
  // head
  g.fillRect(22, 10, 9, 9);
  // ears (pointy)
  g.fillRect(22, 6, 3, 4);
  g.fillRect(28, 6, 3, 4);
  // legs
  g.fillRect(8, 24, 3, 5);
  g.fillRect(14, 24, 3, 5);
  g.fillRect(20, 24, 3, 5);
  // tail (curled up)
  g.fillRect(3, 10, 4, 8);
  g.fillRect(3, 8, 7, 3);
  // eyes
  g.fillStyle(0x33aa33, 1);
  g.fillRect(24, 13, 2, 2);
  g.fillRect(28, 13, 2, 2);
  // nose
  g.fillStyle(0xff7777, 1);
  g.fillRect(26, 15, 2, 1);
  g.generateTexture(key, 36, 30);
  g.destroy();
}

// ---- Zoo animals ----
function gen(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

export function createCharacterTextures(scene: Phaser.Scene): void {
  // ---- Family ----
  // Mom & Dad: white, dark hair
  person(scene, "mom", { hair: 0x2b1c0f, shirt: 0xe87aa8, pants: 0x394a6d, hairBack: true });
  person(scene, "dad", { hair: 0x2b1c0f, shirt: 0x3aa776, pants: 0x394a6d });
  // Grandparents
  person(scene, "nonno", { hair: 0x9a9a9a, shirt: 0x8a5a2b, pants: 0x5a5a5a, mustache: true, bald: true });
  person(scene, "grandmama", { hair: 0xbcbcbc, shirt: 0xb56cc4, pants: 0x6a4a8a, bun: true, hairBack: true, glasses: true });
  person(scene, "grandpa", { hair: 0xc4c4c4, shirt: 0x4a78b5, pants: 0x4a4a4a, glasses: true });

  // ---- Silly friendly characters ----
  person(scene, "clown", { hair: 0xff4444, shirt: 0xffe24a, pants: 0x4ac3ff, shoes: 0xff4444 });
  person(scene, "juggler", { hair: 0x6a3f22, shirt: 0xff8c42, pants: 0x2b5fd9, hat: 0xe23636 });
  person(scene, "balloon_man", { hair: 0x3a2a18, shirt: 0x4ac34a, pants: 0x8a5a2b });
  person(scene, "mail_carrier", { hair: 0x2b1c0f, shirt: 0x2b6fb5, pants: 0x223a6d, hat: 0x2b6fb5 });
  person(scene, "ice_cream_vendor", { hair: 0x4a3018, shirt: 0xffffff, pants: 0xe23636, hat: 0xffffff });
  person(scene, "pretzel_vendor", { hair: 0x2b1c0f, shirt: 0xffe24a, pants: 0x6a4a2b, hat: 0xe23636 });
  person(scene, "musician", { hair: 0x1a1a1a, shirt: 0x9b4ac3, pants: 0x2a2a2a, glasses: true });
  person(scene, "friend_kid", { hair: 0x6a3f22, shirt: 0x4ac3ff, pants: 0xff8c42 });
  person(scene, "zoo_keeper", { hair: 0x3a2a18, shirt: 0x6b8e23, pants: 0x4a5a2b, hat: 0x6b8e23 });
  person(scene, "scientist", { hair: 0x9a9a9a, shirt: 0xffffff, pants: 0x4a5a6d, glasses: true });

  // ---- Easter eggs / favourites ----
  // Spider-friend (red & blue with web lines + big white eyes)
  gen(scene, "spiderman", 32, 52, (g) => {
    g.fillStyle(0xe23636, 1); // red suit
    g.fillRect(9, 16, 14, 20);
    g.fillRect(5, 18, 4, 12);
    g.fillRect(23, 18, 4, 12);
    g.fillStyle(0x2b5fd9, 1); // blue legs
    g.fillRect(9, 36, 6, 12);
    g.fillRect(17, 36, 6, 12);
    g.fillStyle(0xe23636, 1); // head/mask
    g.fillRect(10, 4, 12, 13);
    // white eyes
    g.fillStyle(0xffffff, 1);
    g.fillRect(11, 8, 4, 4);
    g.fillRect(17, 8, 4, 4);
    g.lineStyle(1, 0x000000, 1);
    g.strokeRect(11, 8, 4, 4);
    g.strokeRect(17, 8, 4, 4);
    // web lines on chest
    g.lineStyle(1, 0x000000, 0.5);
    g.lineBetween(16, 17, 16, 35);
    g.lineBetween(10, 20, 22, 20);
    g.lineBetween(10, 26, 22, 26);
    g.lineBetween(11, 32, 21, 32);
  });

  // Blue puppy friend (a cheerful blue heeler-ish pup, standing)
  gen(scene, "bluey", 34, 40, (g) => {
    g.fillStyle(0x4a8fd6, 1); // blue body
    g.fillRect(8, 16, 16, 16);
    g.fillStyle(0xf2d9b0, 1); // tan tummy
    g.fillRect(11, 24, 10, 8);
    g.fillStyle(0x4a8fd6, 1); // head
    g.fillRect(9, 4, 14, 14);
    // lighter muzzle
    g.fillStyle(0xcfe3f5, 1);
    g.fillRect(12, 11, 8, 6);
    // ears
    g.fillStyle(0x356aa8, 1);
    g.fillRect(8, 2, 4, 5);
    g.fillRect(20, 2, 4, 5);
    // eyes + nose
    g.fillStyle(0x000000, 1);
    g.fillRect(12, 8, 2, 2);
    g.fillRect(18, 8, 2, 2);
    g.fillRect(15, 12, 2, 2);
    // legs
    g.fillStyle(0x4a8fd6, 1);
    g.fillRect(10, 32, 3, 6);
    g.fillRect(20, 32, 3, 6);
    // tail
    g.fillRect(24, 16, 5, 4);
  });

  // PJ-mask style hero (blue catboy suit with pointy ears + big eyes)
  gen(scene, "pjmask", 32, 52, (g) => {
    g.fillStyle(0x2b5fd9, 1); // blue suit
    g.fillRect(9, 16, 14, 20);
    g.fillRect(5, 18, 4, 12);
    g.fillRect(23, 18, 4, 12);
    g.fillRect(9, 36, 6, 12);
    g.fillRect(17, 36, 6, 12);
    // head + mask
    g.fillStyle(0x2b5fd9, 1);
    g.fillRect(10, 4, 12, 13);
    // cat ears
    g.fillRect(9, 0, 3, 5);
    g.fillRect(20, 0, 3, 5);
    // big white eye area
    g.fillStyle(0xffffff, 1);
    g.fillRect(11, 8, 10, 5);
    g.fillStyle(0x000000, 1);
    g.fillRect(13, 9, 2, 3);
    g.fillRect(17, 9, 2, 3);
    // little smile
    g.fillRect(14, 14, 4, 1);
  });

  // ---- Pets ----
  makeDog(scene, "dog", 0x8a5a2b);
  makeDog(scene, "dog2", 0x3a3a3a);
  makeCat(scene, "cat", 0xe28b2b);
  makeCat(scene, "cat2", 0x888888);

  // ---- Zoo animals ----
  gen(scene, "lion", 46, 34, (g) => {
    g.fillStyle(0xd99a3a, 1);
    g.fillRect(8, 14, 22, 10); // body
    g.fillRect(26, 8, 10, 11); // head
    g.fillStyle(0x8a5a1a, 1); // mane
    g.fillRect(24, 6, 14, 15);
    g.fillStyle(0xd99a3a, 1);
    g.fillRect(27, 9, 9, 9); // face over mane
    g.fillStyle(0x000000, 1);
    g.fillRect(29, 12, 2, 2);
    g.fillRect(33, 12, 2, 2);
    g.fillRect(31, 15, 2, 2); // nose
    g.fillStyle(0xd99a3a, 1);
    g.fillRect(10, 24, 3, 7); // legs
    g.fillRect(16, 24, 3, 7);
    g.fillRect(22, 24, 3, 7);
    g.fillRect(5, 12, 4, 4); // tail tuft
  });

  gen(scene, "monkey", 34, 36, (g) => {
    g.fillStyle(0x7a5230, 1);
    g.fillRect(11, 12, 12, 14); // body
    g.fillRect(10, 4, 14, 11); // head
    g.fillStyle(0xd9b88a, 1); // face
    g.fillRect(13, 7, 8, 7);
    g.fillStyle(0x000000, 1);
    g.fillRect(14, 8, 2, 2);
    g.fillRect(18, 8, 2, 2);
    g.fillRect(16, 11, 2, 1); // smile
    g.fillStyle(0x7a5230, 1); // ears
    g.fillRect(8, 6, 3, 4);
    g.fillRect(23, 6, 3, 4);
    g.fillRect(9, 26, 3, 8); // arms/legs
    g.fillRect(22, 26, 3, 8);
    g.fillRect(24, 16, 6, 3); // tail
  });

  gen(scene, "elephant", 54, 40, (g) => {
    g.fillStyle(0x9aa0a6, 1);
    g.fillRect(8, 12, 30, 18); // body
    g.fillRect(30, 8, 16, 16); // head
    g.fillRect(44, 14, 4, 16); // trunk
    g.fillRect(40, 6, 10, 10); // ear
    g.fillStyle(0x000000, 1);
    g.fillRect(38, 14, 2, 2); // eye
    g.fillStyle(0x9aa0a6, 1);
    g.fillRect(10, 30, 5, 8); // legs
    g.fillRect(18, 30, 5, 8);
    g.fillRect(26, 30, 5, 8);
    g.fillRect(33, 30, 5, 8);
    g.fillStyle(0xffffff, 1);
    g.fillRect(42, 22, 2, 4); // tusk
  });

  gen(scene, "giraffe", 40, 60, (g) => {
    g.fillStyle(0xe3c35a, 1);
    g.fillRect(10, 34, 18, 12); // body
    g.fillRect(22, 6, 6, 30); // long neck
    g.fillRect(22, 2, 12, 8); // head
    g.fillStyle(0x000000, 1);
    g.fillRect(30, 5, 2, 2); // eye
    g.fillStyle(0xb5894a, 1); // spots
    g.fillRect(12, 36, 4, 4);
    g.fillRect(20, 38, 4, 4);
    g.fillRect(23, 14, 4, 4);
    g.fillRect(23, 24, 4, 4);
    g.fillStyle(0xe3c35a, 1);
    g.fillRect(12, 46, 4, 11); // legs
    g.fillRect(22, 46, 4, 11);
    // little horns (ossicones)
    g.fillStyle(0x8a5a1a, 1);
    g.fillRect(24, 0, 2, 3);
    g.fillRect(30, 0, 2, 3);
  });

  gen(scene, "penguin", 28, 38, (g) => {
    g.fillStyle(0x1a1a2a, 1); // back
    g.fillRect(7, 6, 14, 26);
    g.fillStyle(0xffffff, 1); // belly
    g.fillRect(10, 12, 8, 20);
    g.fillStyle(0x1a1a2a, 1); // head
    g.fillRect(8, 2, 12, 10);
    g.fillStyle(0xffffff, 1);
    g.fillRect(11, 6, 6, 5); // face
    g.fillStyle(0x000000, 1);
    g.fillRect(11, 6, 2, 2);
    g.fillRect(15, 6, 2, 2);
    g.fillStyle(0xff9a3a, 1); // beak
    g.fillRect(12, 9, 4, 2);
    g.fillRect(9, 32, 4, 4); // feet
    g.fillRect(15, 32, 4, 4);
    g.fillStyle(0x1a1a2a, 1); // wings
    g.fillRect(5, 12, 3, 12);
    g.fillRect(20, 12, 3, 12);
  });

  gen(scene, "zebra", 46, 36, (g) => {
    g.fillStyle(0xffffff, 1);
    g.fillRect(8, 14, 22, 11); // body
    g.fillRect(26, 8, 10, 11); // head
    g.fillStyle(0x000000, 1); // stripes
    for (let i = 0; i < 5; i++) g.fillRect(11 + i * 4, 14, 2, 11);
    g.fillRect(28, 8, 2, 8);
    g.fillRect(32, 8, 2, 8);
    g.fillRect(30, 13, 2, 2); // eye
    g.fillStyle(0xffffff, 1);
    g.fillRect(10, 25, 3, 7); // legs
    g.fillRect(16, 25, 3, 7);
    g.fillRect(22, 25, 3, 7);
    g.fillStyle(0x000000, 1);
    g.fillRect(5, 12, 3, 6); // mane/tail
  });

  // ---- Dinosaurs (friendly, smiling) ----
  gen(scene, "trex", 60, 56, (g) => {
    g.fillStyle(0x5aa05a, 1);
    g.fillRect(10, 20, 26, 18); // body
    g.fillRect(30, 8, 18, 16); // head
    g.fillRect(8, 24, 8, 8); // tail base
    g.fillRect(2, 26, 8, 4); // tail tip
    g.fillStyle(0x4a8a4a, 1);
    g.fillRect(14, 38, 6, 12); // big leg
    g.fillRect(26, 38, 6, 12);
    g.fillStyle(0x5aa05a, 1);
    g.fillRect(28, 30, 3, 6); // tiny arm
    // mouth
    g.fillStyle(0xffffff, 1);
    g.fillRect(34, 20, 12, 2); // teeth
    g.fillStyle(0x000000, 1);
    g.fillRect(40, 12, 2, 2); // eye
    g.fillStyle(0x4a8a4a, 1); // back ridges
    g.fillRect(14, 18, 2, 3);
    g.fillRect(20, 18, 2, 3);
    g.fillRect(26, 18, 2, 3);
  });

  gen(scene, "triceratops", 60, 44, (g) => {
    g.fillStyle(0x6a9ac3, 1);
    g.fillRect(8, 18, 26, 16); // body
    g.fillRect(30, 14, 16, 16); // head
    g.fillStyle(0x5a8ab0, 1);
    g.fillRect(28, 8, 12, 12); // frill
    g.fillStyle(0xffffff, 1);
    g.fillRect(44, 12, 5, 2); // horn
    g.fillRect(40, 8, 2, 6); // horn
    g.fillRect(46, 8, 2, 6);
    g.fillStyle(0x000000, 1);
    g.fillRect(40, 18, 2, 2); // eye
    g.fillStyle(0x6a9ac3, 1);
    g.fillRect(12, 34, 5, 9); // legs
    g.fillRect(24, 34, 5, 9);
    g.fillRect(3, 22, 6, 5); // tail
  });

  gen(scene, "stegosaurus", 62, 46, (g) => {
    g.fillStyle(0x8a6ac3, 1);
    g.fillRect(10, 22, 30, 14); // body
    g.fillRect(2, 24, 10, 6); // tail
    g.fillRect(38, 18, 12, 12); // head/neck
    g.fillStyle(0x000000, 1);
    g.fillRect(45, 22, 2, 2); // eye
    g.fillStyle(0xffc04a, 1); // back plates
    for (let i = 0; i < 5; i++) {
      g.fillTriangle(13 + i * 6, 22, 17 + i * 6, 22, 15 + i * 6, 13);
    }
    g.fillStyle(0x8a6ac3, 1);
    g.fillRect(14, 36, 5, 9); // legs
    g.fillRect(28, 36, 5, 9);
  });

  gen(scene, "brontosaurus", 64, 64, (g) => {
    g.fillStyle(0x4aa0a0, 1);
    g.fillRect(8, 36, 30, 16); // body
    g.fillRect(2, 40, 10, 6); // tail
    g.fillRect(34, 10, 6, 30); // long neck
    g.fillRect(34, 4, 12, 10); // head
    g.fillStyle(0x000000, 1);
    g.fillRect(42, 7, 2, 2); // eye
    g.fillStyle(0x4aa0a0, 1);
    g.fillRect(12, 52, 5, 10); // legs
    g.fillRect(28, 52, 5, 10);
  });
}
