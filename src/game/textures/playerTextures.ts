import Phaser from "phaser";

// Owen: a happy white kid with bright red hair. He's wearing a red-and-blue
// shirt (a little nod to a certain wall-crawling hero he loves) and shorts.

const SKIN = 0xffe0bd;
const HAIR = 0xd94e1f; // red/ginger hair
const SHIRT = 0xe23636; // hero red
const SHIRT_TRIM = 0x2b5fd9; // hero blue
const SHORTS = 0x3a6ea5;
const SHOES = 0xffffff;

function drawOwen(g: Phaser.GameObjects.Graphics, legOffset: number): void {
  // Shirt (torso) — child proportions: big head, short body
  g.fillStyle(SHIRT, 1);
  g.fillRect(9, 20, 14, 16);
  // Blue trim across the chest
  g.fillStyle(SHIRT_TRIM, 1);
  g.fillRect(9, 20, 14, 3);
  g.fillRect(14, 23, 4, 13); // central blue stripe

  // Arms
  g.fillStyle(SHIRT, 1);
  g.fillRect(5, 21, 4, 9);
  g.fillRect(23, 21, 4, 9);
  // Hands
  g.fillStyle(SKIN, 1);
  g.fillRect(5, 30, 4, 3);
  g.fillRect(23, 30, 4, 3);

  // Shorts
  g.fillStyle(SHORTS, 1);
  g.fillRect(9, 36, 6, 7);
  g.fillRect(17, 36, 6, 7);

  // Legs
  g.fillStyle(SKIN, 1);
  g.fillRect(10, 43, 4, 4 - Math.abs(legOffset));
  g.fillRect(18, 43, 4, 4 - Math.abs(legOffset));

  // Shoes (animate with legOffset)
  g.fillStyle(SHOES, 1);
  g.fillRect(8 + legOffset, 46, 7, 4);
  g.fillRect(17 - legOffset, 46, 7, 4);

  // Head
  g.fillStyle(SKIN, 1);
  g.fillRect(10, 6, 12, 12);

  // Ears
  g.fillRect(9, 10, 1, 3);
  g.fillRect(22, 10, 1, 3);

  // Red hair — spiky kid hair
  g.fillStyle(HAIR, 1);
  g.fillRect(9, 3, 14, 5);
  g.fillRect(9, 6, 2, 4);
  g.fillRect(21, 6, 2, 4);
  // spikes on top
  g.fillRect(11, 1, 2, 2);
  g.fillRect(15, 0, 2, 3);
  g.fillRect(19, 1, 2, 2);

  // Eyes
  g.fillStyle(0x000000, 1);
  g.fillRect(12, 11, 2, 2);
  g.fillRect(18, 11, 2, 2);
  // Big happy smile
  g.fillRect(13, 15, 6, 1);
  g.fillRect(12, 14, 1, 1);
  g.fillRect(19, 14, 1, 1);
  // Rosy cheeks
  g.fillStyle(0xffb0a0, 1);
  g.fillRect(11, 13, 2, 1);
  g.fillRect(19, 13, 2, 1);
}

export function createPlayerTextures(scene: Phaser.Scene): void {
  // Standing frame
  const g = scene.make.graphics({ x: 0, y: 0 });
  drawOwen(g, 0);
  g.generateTexture("player", 32, 50);
  g.destroy();

  // Walking frames
  for (let i = 0; i < 4; i++) {
    const wg = scene.make.graphics({ x: 0, y: 0 });
    const legOffset = Math.round(Math.sin((i * Math.PI) / 2) * 3);
    drawOwen(wg, legOffset);
    wg.generateTexture(`player_walk_${i}`, 32, 50);
    wg.destroy();
  }
}
