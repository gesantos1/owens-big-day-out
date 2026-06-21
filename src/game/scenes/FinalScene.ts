import Phaser from "phaser";
import { audio } from "../audio/AudioEngine";

// The happy celebration after Owen makes it home.
export class FinalScene extends Phaser.Scene {
  private screenW = 1024;
  private screenH = 600;

  constructor() {
    super({ key: "FinalScene" });
  }

  create(): void {
    this.add.rectangle(0, 0, this.screenW, this.screenH, 0x8fd0ff).setOrigin(0, 0);
    this.cameras.main.fadeIn(600, 0, 0, 0);

    if (this.registry.get("music") !== "off") audio.playMusic("home");

    const points = this.registry.get("carryPoints") || 0;
    const tools = this.registry.get("carryTools") || 0;

    // Owen, big and happy
    if (this.textures.exists("player")) {
      const owen = this.add.sprite(this.screenW / 2, 360, "player").setOrigin(0.5, 1).setScale(5);
      this.tweens.add({ targets: owen, y: 340, duration: 500, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    }

    const title = this.add.text(this.screenW / 2, 110, "YOU DID IT,\nOWEN!", {
      fontSize: "66px", color: "#ffd24a", fontStyle: "bold",
      stroke: "#000000", strokeThickness: 10, align: "center", fontFamily: "monospace",
    }).setOrigin(0.5).setScale(0.2);
    this.tweens.add({ targets: title, scale: 1, duration: 600, ease: "Back.easeOut" });

    this.add.text(this.screenW / 2, 410, `⭐ ${points} Points     🔧 ${tools} Tools Collected`, {
      fontSize: "24px", color: "#ffffff", fontStyle: "bold",
      stroke: "#000000", strokeThickness: 5, fontFamily: "monospace",
    }).setOrigin(0.5);

    this.add.text(this.screenW / 2, 450, "What a wonderful BIG day out!", {
      fontSize: "18px", color: "#222222", fontStyle: "bold", fontFamily: "monospace",
    }).setOrigin(0.5);

    // Play again
    const btn = this.add.rectangle(this.screenW / 2, 510, 300, 56, 0x4ac34a).setStrokeStyle(5, 0xffffff);
    btn.setInteractive({ useHandCursor: true });
    this.add.text(this.screenW / 2, 510, "▶  PLAY AGAIN", {
      fontSize: "24px", color: "#ffffff", fontStyle: "bold", fontFamily: "monospace",
    }).setOrigin(0.5);
    btn.on("pointerover", () => btn.setFillStyle(0x5ad35a));
    btn.on("pointerout", () => btn.setFillStyle(0x4ac34a));
    btn.on("pointerdown", () => this.scene.start("LevelSelectScene"));

    this.makeConfetti();
    audio.sfx("sparkle");
    this.time.delayedCall(500, () => audio.sfx("happy"));

    this.input.keyboard?.on("keydown-ESC", () => this.scene.start("LevelSelectScene"));
  }

  private makeConfetti(): void {
    const colors = [0xe23636, 0xffd24a, 0x4ac3ff, 0x5bb24a, 0x9b6ad9, 0xff7ac3];
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * this.screenW;
      const c = this.add.rectangle(x, -10, 6, 10, colors[i % colors.length]);
      c.setDepth(2000);
      this.tweens.add({
        targets: c,
        y: this.screenH + 20,
        angle: Math.random() * 360,
        duration: 2500 + Math.random() * 2500,
        delay: Math.random() * 1500,
        repeat: -1,
        onRepeat: () => { c.y = -10; c.x = Math.random() * this.screenW; },
      });
    }
  }
}
