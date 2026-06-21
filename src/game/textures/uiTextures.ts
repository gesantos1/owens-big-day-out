import Phaser from "phaser";

export function createUITextures(scene: Phaser.Scene): void {
  // Speech / dialog box (rounded, friendly)
  const dialog = scene.make.graphics({ x: 0, y: 0 });
  dialog.fillStyle(0x1a1a3a, 0.9);
  dialog.fillRoundedRect(0, 0, 500, 100, 12);
  dialog.lineStyle(3, 0xffd24a, 1);
  dialog.strokeRoundedRect(0, 0, 500, 100, 12);
  dialog.generateTexture("dialog_box", 500, 100);
  dialog.destroy();

  // Little toolbox icon for the tools counter
  const tb = scene.make.graphics({ x: 0, y: 0 });
  tb.fillStyle(0xe23636, 1);
  tb.fillRect(2, 8, 24, 14);
  tb.fillStyle(0xb02020, 1);
  tb.fillRect(2, 8, 24, 3);
  tb.fillStyle(0x333333, 1);
  tb.fillRect(10, 4, 8, 5); // handle
  tb.fillStyle(0xffd24a, 1);
  tb.fillRect(12, 12, 4, 8);
  tb.generateTexture("toolbox_icon", 28, 24);
  tb.destroy();
}
