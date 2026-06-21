import Phaser from "phaser";

// Collectibles: construction tools Owen gathers, plus a few Philly treats.

function gen(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  const g = scene.make.graphics({ x: 0, y: 0 });
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

export function createItemTextures(scene: Phaser.Scene): void {
  // Hard hat
  gen(scene, "tool_hardhat", 28, 22, (g) => {
    g.fillStyle(0xffc107, 1);
    g.fillRect(4, 8, 20, 10);
    g.fillRect(8, 3, 12, 7);
    g.fillRect(2, 16, 24, 4); // brim
    g.fillStyle(0xe0a800, 1);
    g.fillRect(13, 3, 2, 13); // ridge
  });

  // Shovel
  gen(scene, "tool_shovel", 20, 34, (g) => {
    g.fillStyle(0x9a6a32, 1);
    g.fillRect(9, 2, 3, 22); // handle
    g.fillStyle(0xbfc7cc, 1);
    g.fillRect(5, 22, 11, 10); // blade
    g.fillTriangle(5, 32, 16, 32, 10, 34);
  });

  // Wrench
  gen(scene, "tool_wrench", 28, 28, (g) => {
    g.fillStyle(0xb0b8bf, 1);
    g.fillRect(6, 6, 6, 18); // shaft (diagonal-ish)
    g.fillRect(3, 2, 10, 8); // head
    g.fillStyle(0x8a9096, 1);
    g.fillRect(5, 4, 3, 4); // jaw gap
    g.fillRect(16, 18, 8, 8);
    g.fillStyle(0xb0b8bf, 1);
    g.fillRect(14, 16, 8, 8);
  });

  // Hammer
  gen(scene, "tool_hammer", 26, 30, (g) => {
    g.fillStyle(0x9a6a32, 1);
    g.fillRect(11, 8, 4, 22); // handle
    g.fillStyle(0x6a7077, 1);
    g.fillRect(4, 2, 18, 8); // head
    g.fillRect(2, 4, 6, 4); // claw
  });

  // Screwdriver
  gen(scene, "tool_screwdriver", 16, 32, (g) => {
    g.fillStyle(0xe23636, 1);
    g.fillRect(5, 2, 6, 12); // handle
    g.fillStyle(0xb0b8bf, 1);
    g.fillRect(7, 14, 2, 16); // shaft
  });

  // Paint bucket
  gen(scene, "tool_paint", 26, 26, (g) => {
    g.fillStyle(0xc0c6cc, 1);
    g.fillRect(4, 8, 18, 16);
    g.fillStyle(0x4ac34a, 1); // paint
    g.fillRect(6, 8, 14, 4);
    g.lineStyle(2, 0x8a9096, 1); // handle
    g.beginPath();
    g.arc(13, 8, 9, Math.PI, 0, false);
    g.strokePath();
  });

  // Traffic cone
  gen(scene, "tool_cone", 24, 28, (g) => {
    g.fillStyle(0xff6a00, 1);
    g.fillTriangle(12, 2, 4, 24, 20, 24);
    g.fillStyle(0xffffff, 1);
    g.fillRect(7, 12, 10, 4);
    g.fillStyle(0xff6a00, 1);
    g.fillRect(2, 24, 20, 4); // base
  });

  // Toy bulldozer (a fun surprise tool)
  gen(scene, "tool_bulldozer", 40, 28, (g) => {
    g.fillStyle(0xffc107, 1);
    g.fillRect(8, 8, 22, 12); // body
    g.fillRect(20, 2, 10, 8); // cab
    g.fillStyle(0x222222, 1);
    g.fillRect(8, 20, 8, 8); // wheels
    g.fillRect(20, 20, 8, 8);
    g.fillStyle(0xb0b8bf, 1);
    g.fillRect(2, 14, 6, 10); // blade
  });

  // ---- Treats ----
  // Philly soft pretzel
  gen(scene, "treat_pretzel", 26, 24, (g) => {
    g.fillStyle(0x9a6a32, 1);
    g.fillRect(4, 8, 18, 6);
    g.fillRect(4, 8, 6, 12);
    g.fillRect(16, 8, 6, 12);
    g.fillRect(8, 14, 10, 5);
    g.fillStyle(0xfff3c4, 1); // salt
    g.fillRect(7, 9, 2, 2);
    g.fillRect(14, 10, 2, 2);
    g.fillRect(11, 16, 2, 2);
  });

  // Ice cream cone
  gen(scene, "treat_icecream", 20, 32, (g) => {
    g.fillStyle(0xd9a05a, 1); // cone
    g.fillTriangle(10, 30, 4, 16, 16, 16);
    g.fillStyle(0xff9ad0, 1); // scoop pink
    g.fillRect(4, 8, 12, 9);
    g.fillStyle(0xfff0a0, 1); // scoop top
    g.fillRect(6, 2, 8, 8);
    g.fillStyle(0xe23636, 1); // cherry
    g.fillRect(9, 0, 3, 3);
  });

  // Water ice (Philly classic), cherry red in a cup
  gen(scene, "treat_waterice", 20, 26, (g) => {
    g.fillStyle(0xffffff, 1);
    g.fillRect(5, 10, 10, 16); // cup
    g.fillStyle(0xe23636, 1);
    g.fillRect(4, 4, 12, 8); // red ice mound
    g.fillStyle(0xff7a7a, 1);
    g.fillRect(6, 5, 4, 3);
  });

  // Star (points sparkle)
  gen(scene, "star", 20, 20, (g) => {
    g.fillStyle(0xffe24a, 1);
    g.fillTriangle(10, 0, 6, 10, 14, 10);
    g.fillTriangle(10, 20, 6, 10, 14, 10);
    g.fillTriangle(0, 10, 10, 6, 10, 14);
    g.fillTriangle(20, 10, 10, 6, 10, 14);
    g.fillRect(6, 6, 8, 8);
  });
}
