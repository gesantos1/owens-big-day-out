import Phaser from "phaser";

function gen(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

export function createBackgroundTextures(scene: Phaser.Scene): void {
  // Bright happy sky gradient (drawn as horizontal bands)
  gen(scene, "sky", 2048, 200, (g) => {
    const bands = [0x7ec8ff, 0x8fd0ff, 0xa3d8ff, 0xb8e2ff, 0xcdeaff];
    const bh = 200 / bands.length;
    bands.forEach((c, i) => {
      g.fillStyle(c, 1);
      g.fillRect(0, i * bh, 2048, bh + 1);
    });
  });

  // Fluffy cloud
  gen(scene, "cloud", 100, 40, (g) => {
    g.fillStyle(0xffffff, 1);
    g.fillRect(20, 16, 60, 16);
    g.fillRect(10, 22, 80, 12);
    g.fillRect(34, 8, 30, 14);
    g.fillRect(54, 12, 24, 12);
  });

  // Sun with a smile
  gen(scene, "sun", 70, 70, (g) => {
    g.fillStyle(0xffe24a, 1);
    g.fillRect(18, 18, 34, 34);
    g.fillRect(12, 24, 46, 22);
    g.fillRect(24, 12, 22, 46);
    // rays
    g.fillRect(33, 0, 4, 10);
    g.fillRect(33, 60, 4, 10);
    g.fillRect(0, 33, 10, 4);
    g.fillRect(60, 33, 10, 4);
    // face
    g.fillStyle(0xd9a020, 1);
    g.fillRect(28, 30, 3, 4);
    g.fillRect(40, 30, 3, 4);
    g.fillRect(30, 40, 10, 2);
  });

  // Philadelphia skyline silhouette (Comcast towers, Liberty Place spires, etc.)
  gen(scene, "far_city", 420, 110, (g) => {
    g.fillStyle(0x9fb8cc, 1);
    // BNY Mellon-ish
    g.fillRect(10, 40, 36, 70);
    g.fillRect(20, 30, 16, 12);
    // One Liberty Place (spired)
    g.fillRect(60, 24, 34, 86);
    g.fillTriangle(60, 24, 94, 24, 77, 4);
    // Two Liberty Place (shorter spire)
    g.fillRect(104, 44, 26, 66);
    g.fillTriangle(104, 44, 130, 44, 117, 28);
    // Comcast Technology Center (tallest, flat)
    g.fillRect(150, 12, 30, 98);
    g.fillRect(160, 4, 4, 10); // antenna
    // Comcast Center
    g.fillRect(196, 34, 28, 76);
    // generic blocks
    g.fillRect(238, 54, 30, 56);
    g.fillRect(280, 40, 26, 70);
    g.fillRect(318, 58, 30, 52);
    g.fillRect(360, 30, 28, 80);
    g.fillTriangle(360, 30, 388, 30, 374, 14);
    // window dots
    g.fillStyle(0xbcd0e0, 1);
    for (let x = 14; x < 400; x += 12) {
      for (let y = 50; y < 105; y += 12) {
        if ((x + y) % 24 === 0) g.fillRect(x, y, 3, 4);
      }
    }
  });

  // Sidewalk / path tile (light pavement)
  gen(scene, "sidewalk_tile", 64, 64, (g) => {
    g.fillStyle(0xc9c4ba, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(0xb5b0a6, 1);
    g.fillRect(0, 0, 64, 2);
    g.fillRect(0, 32, 64, 2);
    g.fillRect(0, 0, 2, 64);
    g.fillRect(32, 0, 2, 64);
  });

  // Street tile (road) — used as a path band
  gen(scene, "street_tile", 64, 140, (g) => {
    g.fillStyle(0x6a6f74, 1);
    g.fillRect(0, 0, 64, 140);
    g.fillStyle(0x7a7f84, 1);
    g.fillRect(0, 0, 64, 6); // curb edge
    g.fillStyle(0xffe24a, 1);
    g.fillRect(24, 70, 16, 6); // center line dash
  });

  // Grass tile (parks / zoo / playground)
  gen(scene, "grass_tile", 64, 64, (g) => {
    g.fillStyle(0x5bb24a, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(0x4fa340, 1);
    for (let i = 0; i < 24; i++) {
      const x = (i * 37) % 64;
      const y = (i * 53) % 64;
      g.fillRect(x, y, 2, 4);
    }
  });

  // Zoo / park dirt path
  gen(scene, "zoo_path", 64, 64, (g) => {
    g.fillStyle(0xc9a36a, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(0xbb945c, 1);
    for (let i = 0; i < 16; i++) {
      g.fillRect((i * 29) % 60, (i * 41) % 60, 5, 3);
    }
  });

  // Museum marble floor
  gen(scene, "museum_floor", 64, 64, (g) => {
    g.fillStyle(0xd8d2e0, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(0xc4bdd2, 1);
    g.fillRect(0, 0, 64, 2);
    g.fillRect(0, 0, 2, 64);
    g.fillRect(32, 0, 1, 64);
    g.fillRect(0, 32, 64, 1);
  });

  // Confetti speck (used for surprises/celebration)
  gen(scene, "confetti", 6, 6, (g) => {
    g.fillStyle(0xffffff, 1);
    g.fillRect(0, 0, 6, 6);
  });

  // Balloon (decoration + held by balloon_man)
  gen(scene, "balloon", 24, 40, (g) => {
    g.fillStyle(0xe23636, 1);
    g.fillRect(4, 2, 16, 20);
    g.fillRect(2, 6, 20, 12);
    g.fillStyle(0xffffff, 0.4);
    g.fillRect(7, 5, 3, 5);
    g.fillStyle(0x888888, 1);
    g.fillRect(11, 22, 1, 16); // string
  });
}
