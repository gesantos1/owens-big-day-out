import Phaser from "phaser";
import { LEVELS } from "../levels";
import { audio } from "../audio/AudioEngine";

// Friendly menu: a big START button plus a button for each level.
export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelSelectScene" });
  }

  create(): void {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Sky background
    this.add.rectangle(0, 0, w, h, 0x8fd0ff).setOrigin(0, 0);
    if (this.textures.exists("far_city")) {
      this.add.tileSprite(0, h - 220, w, 110, "far_city").setOrigin(0, 0).setAlpha(0.6);
    }
    this.add.tileSprite(0, h - 110, w, 110, "sidewalk_tile").setOrigin(0, 0);

    // Owen waving on the menu
    if (this.textures.exists("player")) {
      const owen = this.add.sprite(w / 2, h - 120, "player").setOrigin(0.5, 1).setScale(3);
      this.tweens.add({ targets: owen, y: h - 132, duration: 600, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    }

    // Title (BIG)
    const title = this.add.text(w / 2, 70, "OWEN'S BIG\nDAY OUT!", {
      fontSize: "56px", color: "#ffd24a", fontStyle: "bold",
      stroke: "#000000", strokeThickness: 10, align: "center", fontFamily: "monospace",
    });
    title.setOrigin(0.5);
    this.tweens.add({ targets: title, scale: 1.05, duration: 900, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });

    // START button -> level 1
    const startBtn = this.add.rectangle(w / 2, 190, 320, 60, 0x4ac34a).setStrokeStyle(5, 0xffffff);
    startBtn.setInteractive({ useHandCursor: true });
    this.add.text(w / 2, 190, "▶  START", {
      fontSize: "30px", color: "#ffffff", fontStyle: "bold", fontFamily: "monospace",
    }).setOrigin(0.5);
    startBtn.on("pointerover", () => startBtn.setFillStyle(0x5ad35a));
    startBtn.on("pointerout", () => startBtn.setFillStyle(0x4ac34a));
    startBtn.on("pointerdown", () => this.startLevel(LEVELS[0].key));

    // A small button per level
    const cols = 3;
    const bw = 280, bh = 50, gapX = 26, gapY = 16;
    const totalW = cols * bw + (cols - 1) * gapX;
    const startX = w / 2 - totalW / 2 + bw / 2;
    const baseY = 270;
    const colors = [0xe23636, 0x4ac3ff, 0x5bb24a, 0x8a6ac3, 0xff8c42, 0xe23636];

    LEVELS.forEach((lvl, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (bw + gapX);
      const y = baseY + row * (bh + gapY);

      const box = this.add.rectangle(x, y, bw, bh, colors[i]).setStrokeStyle(3, 0xffffff);
      box.setInteractive({ useHandCursor: true });
      const label = lvl.title.replace(/\n/g, " ");
      this.add.text(x, y, `${i + 1}. ${label}`, {
        fontSize: "15px", color: "#ffffff", fontStyle: "bold",
        fontFamily: "monospace", align: "center", wordWrap: { width: bw - 20 },
      }).setOrigin(0.5);

      box.on("pointerover", () => box.setAlpha(0.85));
      box.on("pointerout", () => box.setAlpha(1));
      box.on("pointerdown", () => this.startLevel(lvl.key));
    });

    // Instructions
    this.add.text(w / 2, h - 60, "Arrow keys or WASD to move  •  SPACE to jump  •  Walk right to explore!", {
      fontSize: "14px", color: "#000000",
      backgroundColor: "#ffffffcc", padding: { x: 10, y: 6 }, fontFamily: "monospace",
    }).setOrigin(0.5);
  }

  private startLevel(key: string): void {
    // Fresh run from the menu: reset the carry-over totals.
    this.registry.set("carryPoints", 0);
    this.registry.set("carryTools", 0);
    audio.setEnabled(this.registry.get("music") !== "off");
    this.scene.start(key);
  }
}
