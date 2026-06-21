import Phaser from "phaser";

// Philadelphia buildings, landmarks, and street props — all drawn in code.

function gen(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

export function createBuildingTextures(scene: Phaser.Scene): void {
  // Brick wall backdrop tile
  gen(scene, "brick_wall", 64, 64, (g) => {
    g.fillStyle(0xa84b32, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(0x8f3d28, 1);
    for (let y = 0; y < 64; y += 16) {
      const off = (y / 16) % 2 === 0 ? 0 : 16;
      for (let x = -16; x < 64; x += 32) {
        g.fillRect(x + off, y, 30, 14);
      }
    }
  });

  // Classic Philly brick rowhome (with stoop) — three colour variants
  const rowhome = (key: string, brick: number, door: number) => {
    gen(scene, key, 120, 184, (g) => {
      g.fillStyle(brick, 1);
      g.fillRect(0, 10, 120, 174);
      // cornice
      g.fillStyle(0xeeeeee, 1);
      g.fillRect(0, 4, 120, 8);
      // brick lines
      g.fillStyle(Phaser.Display.Color.IntegerToColor(brick).darken(12).color, 1);
      for (let y = 16; y < 184; y += 12) g.fillRect(0, y, 120, 1);
      // windows (lit warm)
      const win = (x: number, y: number) => {
        g.fillStyle(0x5a3a22, 1);
        g.fillRect(x - 2, y - 2, 30, 38);
        g.fillStyle(0xfff3c4, 1);
        g.fillRect(x, y, 26, 34);
        g.fillStyle(0x5a3a22, 1);
        g.fillRect(x + 12, y, 2, 34);
        g.fillRect(x, y + 16, 26, 2);
      };
      win(18, 30); win(72, 30);
      win(18, 90); win(72, 90);
      // door
      g.fillStyle(door, 1);
      g.fillRect(46, 132, 28, 44);
      g.fillStyle(0xffd700, 1);
      g.fillRect(68, 152, 2, 3); // knob
      // stoop steps
      g.fillStyle(0xcfcfcf, 1);
      g.fillRect(40, 176, 40, 4);
      g.fillRect(36, 180, 48, 4);
    });
  };
  rowhome("rowhouse", 0xb55a3a, 0x2b4a6d);
  rowhome("rowhouse_red", 0xc0504a, 0x355e3b);
  rowhome("rowhouse_blue", 0x9a6a4a, 0x6a3a8a);

  // The famous LOVE sculpture (red LOVE letters on a base)
  gen(scene, "love_statue", 96, 110, (g) => {
    g.fillStyle(0x4a4a4a, 1); // base
    g.fillRect(36, 90, 24, 20);
    g.fillStyle(0xe23636, 1);
    // L O
    g.fillRect(8, 20, 10, 34); g.fillRect(8, 44, 22, 10); // L
    g.fillRect(34, 20, 30, 34); g.fillStyle(0x9ad0ff, 1); g.fillRect(42, 28, 14, 18); // O hole sky
    g.fillStyle(0xe23636, 1);
    // V E (lower row)
    g.fillRect(8, 56, 8, 26); g.fillRect(22, 56, 8, 26); g.fillRect(13, 78, 12, 8); // V-ish
    g.fillRect(40, 56, 24, 8); g.fillRect(40, 56, 8, 26); g.fillRect(40, 68, 18, 7); g.fillRect(40, 76, 24, 7); // E
  });

  // Liberty Bell (with crack!)
  gen(scene, "liberty_bell", 70, 90, (g) => {
    g.fillStyle(0x6b4a2a, 1); // yoke
    g.fillRect(20, 4, 30, 8);
    g.fillStyle(0xb08d57, 1); // bell bronze
    g.fillRect(18, 14, 34, 44);
    g.fillRect(14, 50, 42, 12);
    g.fillStyle(0x9a7647, 1);
    g.fillRect(12, 60, 46, 8); // lip
    // the crack
    g.fillStyle(0x4a3318, 1);
    g.fillRect(34, 30, 2, 6);
    g.fillRect(36, 36, 2, 6);
    g.fillRect(34, 42, 2, 8);
    g.fillRect(36, 50, 2, 10);
    // highlight
    g.fillStyle(0xcdb079, 1);
    g.fillRect(22, 18, 4, 30);
  });

  // Philadelphia City Hall (tower + William Penn statue on top)
  gen(scene, "city_hall", 150, 230, (g) => {
    g.fillStyle(0xb8b0a0, 1); // stone
    g.fillRect(10, 80, 130, 150);
    g.fillStyle(0xa39a88, 1);
    g.fillRect(50, 30, 50, 60); // tower
    g.fillStyle(0x8a8472, 1);
    g.fillRect(58, 12, 34, 20); // tower cap
    // William Penn statue
    g.fillStyle(0x5a6a5a, 1);
    g.fillRect(70, 0, 10, 14);
    // windows
    g.fillStyle(0x3a4a5a, 1);
    for (let y = 96; y < 220; y += 26) {
      for (let x = 22; x < 134; x += 26) g.fillRect(x, y, 14, 18);
    }
    g.fillStyle(0x6a5a3a, 1); // big arch door
    g.fillRect(64, 196, 22, 34);
  });

  // Zoo entrance gate
  gen(scene, "zoo_gate", 160, 150, (g) => {
    g.fillStyle(0x6b8e23, 1); // green arch
    g.fillRect(0, 40, 24, 110);
    g.fillRect(136, 40, 24, 110);
    g.fillRect(0, 20, 160, 24);
    g.fillStyle(0xffe24a, 1); // sign
    g.fillRect(30, 24, 100, 16);
    g.fillStyle(0x000000, 1);
    // "ZOO" blocks
    g.fillRect(46, 28, 8, 8);
    g.fillRect(62, 28, 10, 8); g.fillStyle(0xffe24a,1); g.fillRect(64,30,6,4); g.fillStyle(0x000000,1);
    g.fillRect(80, 28, 10, 8); g.fillStyle(0xffe24a,1); g.fillRect(82,30,6,4); g.fillStyle(0x000000,1);
    // banner pennants
    g.fillStyle(0xe23636, 1); g.fillRect(20, 44, 10, 10);
    g.fillStyle(0x2b5fd9, 1); g.fillRect(130, 44, 10, 10);
  });

  // Natural history / dinosaur museum facade (columns + pediment)
  gen(scene, "dino_museum", 180, 200, (g) => {
    g.fillStyle(0xe6e0d4, 1); // stone
    g.fillRect(10, 50, 160, 150);
    // pediment (triangle roof)
    g.fillTriangle(0, 50, 180, 50, 90, 8);
    g.fillStyle(0xd6cfc0, 1);
    g.fillTriangle(20, 48, 160, 48, 90, 16);
    // columns
    g.fillStyle(0xf2eee4, 1);
    for (let x = 24; x < 160; x += 28) g.fillRect(x, 64, 14, 120);
    g.fillStyle(0xcfc8b8, 1);
    for (let x = 24; x < 160; x += 28) { g.fillRect(x, 64, 2, 120); }
    // doorway
    g.fillStyle(0x4a4438, 1);
    g.fillRect(74, 140, 32, 44);
    // little dino sign
    g.fillStyle(0x5aa05a, 1);
    g.fillRect(80, 24, 20, 14);
  });

  // Playground play-set: slide + climbing frame
  gen(scene, "playground_set", 140, 120, (g) => {
    // frame
    g.fillStyle(0xe23636, 1);
    g.fillRect(20, 20, 6, 90); // posts
    g.fillRect(80, 20, 6, 90);
    g.fillRect(18, 20, 70, 6); // top bar
    // platform
    g.fillStyle(0x4ac34a, 1);
    g.fillRect(20, 60, 66, 8);
    // slide
    g.fillStyle(0xffd24a, 1);
    g.fillTriangle(86, 60, 130, 110, 86, 68);
    g.fillRect(86, 60, 8, 50);
    // ladder
    g.fillStyle(0x2b5fd9, 1);
    for (let y = 66; y < 110; y += 10) g.fillRect(24, y, 18, 3);
    // roof
    g.fillStyle(0x2b5fd9, 1);
    g.fillTriangle(14, 26, 92, 26, 53, 6);
  });

  // Monkey bars
  gen(scene, "monkey_bars", 90, 70, (g) => {
    g.fillStyle(0xff8c42, 1);
    g.fillRect(6, 16, 5, 54); // posts
    g.fillRect(79, 16, 5, 54);
    g.fillRect(6, 14, 78, 5); // top
    g.fillStyle(0xffd24a, 1);
    for (let x = 16; x < 78; x += 10) g.fillRect(x, 16, 3, 4); // rungs
  });

  // Big sandbox (the star of level 5)
  gen(scene, "sandbox", 150, 60, (g) => {
    g.fillStyle(0x8a5a2b, 1); // wooden frame
    g.fillRect(0, 14, 150, 46);
    g.fillStyle(0xf2dca0, 1); // sand
    g.fillRect(8, 22, 134, 34);
    // corner seats
    g.fillStyle(0xa9712f, 1);
    g.fillRect(0, 8, 22, 10);
    g.fillRect(128, 8, 22, 10);
    // little sand mounds + a bucket
    g.fillStyle(0xe6c98a, 1);
    g.fillRect(30, 40, 18, 8);
    g.fillRect(90, 44, 22, 8);
    g.fillStyle(0xe23636, 1);
    g.fillRect(60, 34, 10, 12); // toy bucket
    g.fillStyle(0x2b5fd9, 1);
    g.fillRect(58, 32, 14, 3); // bucket rim
  });

  // Generic cheerful storefront
  gen(scene, "storefront", 100, 160, (g) => {
    g.fillStyle(0xd9c2a3, 1);
    g.fillRect(0, 20, 100, 140);
    g.fillStyle(0xe23636, 1); // awning
    g.fillRect(0, 50, 100, 14);
    g.fillStyle(0xffffff, 1);
    for (let x = 0; x < 100; x += 20) g.fillRect(x, 50, 10, 14);
    // big window
    g.fillStyle(0x9ad0ff, 1);
    g.fillRect(10, 70, 80, 60);
    // door
    g.fillStyle(0x6a4a2b, 1);
    g.fillRect(40, 120, 24, 40);
  });

  // Soft pretzel cart (very Philly!)
  gen(scene, "pretzel_cart", 60, 56, (g) => {
    g.fillStyle(0xe23636, 1); // cart body
    g.fillRect(8, 24, 44, 22);
    g.fillStyle(0xffffff, 1);
    g.fillRect(8, 24, 44, 4);
    // umbrella
    g.fillStyle(0xffd24a, 1);
    g.fillTriangle(4, 16, 56, 16, 30, 2);
    g.fillStyle(0x8a5a2b, 1);
    g.fillRect(29, 16, 2, 10);
    // pretzels
    g.fillStyle(0x9a6a32, 1);
    g.fillRect(14, 18, 8, 6);
    g.fillRect(26, 18, 8, 6);
    g.fillRect(38, 18, 8, 6);
    // wheels
    g.fillStyle(0x333333, 1);
    g.fillRect(12, 46, 8, 8);
    g.fillRect(40, 46, 8, 8);
  });

  // Tree
  gen(scene, "tree", 56, 110, (g) => {
    g.fillStyle(0x6b4a2a, 1);
    g.fillRect(24, 60, 8, 50); // trunk
    g.fillStyle(0x3aa14a, 1);
    g.fillRect(8, 20, 40, 36);
    g.fillRect(2, 32, 52, 22);
    g.fillStyle(0x4abf5a, 1);
    g.fillRect(14, 12, 28, 16);
  });

  // Bush
  gen(scene, "bush", 40, 26, (g) => {
    g.fillStyle(0x3aa14a, 1);
    g.fillRect(2, 8, 36, 18);
    g.fillStyle(0x4abf5a, 1);
    g.fillRect(8, 2, 24, 12);
  });

  // Park bench
  gen(scene, "bench", 50, 30, (g) => {
    g.fillStyle(0x2e7d32, 1);
    g.fillRect(2, 14, 46, 5);
    g.fillRect(2, 6, 46, 4);
    g.fillStyle(0x333333, 1);
    g.fillRect(6, 19, 4, 10);
    g.fillRect(40, 19, 4, 10);
  });

  // Fountain (Logan Square vibes)
  gen(scene, "fountain", 90, 50, (g) => {
    g.fillStyle(0xbfc7cc, 1);
    g.fillRect(6, 30, 78, 18); // basin
    g.fillStyle(0x6ec6ff, 1);
    g.fillRect(10, 32, 70, 8); // water
    g.fillStyle(0xbfc7cc, 1);
    g.fillRect(40, 12, 10, 20); // center column
    g.fillStyle(0x9ad9ff, 1); // spray
    g.fillRect(43, 2, 4, 10);
    g.fillRect(38, 8, 3, 6);
    g.fillRect(49, 8, 3, 6);
  });

  // Flower bed
  gen(scene, "flower_bed", 50, 22, (g) => {
    g.fillStyle(0x4a8a2a, 1);
    g.fillRect(0, 12, 50, 10);
    const colors = [0xe23636, 0xffd24a, 0xff7ac3, 0x9b6ad9];
    for (let x = 4; x < 48; x += 8) {
      g.fillStyle(colors[(x / 8) % colors.length], 1);
      g.fillRect(x, 4, 5, 5);
      g.fillStyle(0xffe24a, 1);
      g.fillRect(x + 1, 5, 3, 3);
    }
  });

  // Street lamp
  gen(scene, "streetlamp", 16, 120, (g) => {
    g.fillStyle(0x2a2a2a, 1);
    g.fillRect(6, 10, 4, 110);
    g.fillStyle(0xffe9a0, 1);
    g.fillRect(2, 4, 12, 10);
  });

  // Fire hydrant
  gen(scene, "hydrant", 16, 24, (g) => {
    g.fillStyle(0xe23636, 1);
    g.fillRect(4, 6, 8, 16);
    g.fillRect(2, 10, 12, 4);
    g.fillStyle(0xb02020, 1);
    g.fillRect(6, 2, 4, 5);
  });

  // Mailbox (USPS blue)
  gen(scene, "mailbox", 20, 30, (g) => {
    g.fillStyle(0x2b5fb0, 1);
    g.fillRect(3, 8, 14, 16);
    g.fillRect(3, 6, 14, 6);
    g.fillStyle(0x1a3f80, 1);
    g.fillRect(6, 24, 8, 6);
  });

  // Trash can
  gen(scene, "trashcan", 20, 26, (g) => {
    g.fillStyle(0x4a7a4a, 1);
    g.fillRect(3, 6, 14, 20);
    g.fillStyle(0x3a5a3a, 1);
    g.fillRect(2, 4, 16, 4);
  });

  // Directional sign (points to next level)
  gen(scene, "directional_sign", 120, 100, (g) => {
    g.fillStyle(0x6b4a2a, 1);
    g.fillRect(56, 30, 8, 70); // post
    g.fillStyle(0x2e9e4a, 1);
    g.fillRect(10, 18, 100, 26);
    g.fillStyle(0xffffff, 1);
    g.fillRect(12, 20, 96, 2);
    // arrow
    g.fillTriangle(98, 22, 98, 42, 110, 32);
  });
}
