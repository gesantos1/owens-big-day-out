import Phaser from "phaser";
import { Player, type Obstacle } from "../entities/Player";
import { NPC } from "../entities/NPC";
import { Item } from "../entities/Item";
import { MobileControls } from "../utils/MobileControls";
import { audio } from "../audio/AudioEngine";
import type { LevelConfig, BuildingDef, PropDef, AnimalDef, CompanionDef } from "../levels/types";

interface Building extends BuildingDef { sprite?: Phaser.GameObjects.Sprite; }
interface Prop extends PropDef { sprite?: Phaser.GameObjects.Sprite; labelObj?: Phaser.GameObjects.Text; }
interface Animal extends AnimalDef {
  sprite?: Phaser.GameObjects.Sprite;
  startX: number; startZ: number;
  velocityX: number; velocityZ: number; wanderTimer: number;
  w: number; h: number;
}
interface Companion {
  def: CompanionDef;
  sprite: Phaser.GameObjects.Sprite;
  worldX: number; worldZ: number; bobT: number;
}

const SCREEN_W = 1024;
const SCREEN_H = 600;
const GROUND_TOP = 360;

// One reusable scene that renders any level from a LevelConfig. The six levels
// are just data — see src/game/levels/.
export class LevelScene extends Phaser.Scene {
  private cfg: LevelConfig;

  private player!: Player;
  private npcs: NPC[] = [];
  private items: Item[] = [];
  private buildings: Building[] = [];
  private props: Prop[] = [];
  private animals: Animal[] = [];
  private companions: Companion[] = [];

  // Parallax layers
  private skyLayer!: Phaser.GameObjects.TileSprite;
  private sun!: Phaser.GameObjects.Sprite;
  private clouds!: Phaser.GameObjects.Group;
  private skyline?: Phaser.GameObjects.TileSprite;
  private groundLayer!: Phaser.GameObjects.TileSprite;
  private buildingsLayer!: Phaser.GameObjects.Container;

  private cameraX = 0;
  private worldWidth = 4500;

  // Dialog
  private dialogBox!: Phaser.GameObjects.Sprite;
  private dialogName!: Phaser.GameObjects.Text;
  private dialogText!: Phaser.GameObjects.Text;
  private activeNPC: NPC | null = null;
  private dialogTimer = 0;
  private dialogCooldown = 0;
  private engaged = new Set<NPC>();

  // HUD
  private pointsText!: Phaser.GameObjects.Text;
  private toolsText!: Phaser.GameObjects.Text;
  private locationText!: Phaser.GameObjects.Text;

  // Music toggle
  private musicBtn!: Phaser.GameObjects.Text;

  private transitioning = false;
  private mobileControls!: MobileControls;

  constructor(config: LevelConfig) {
    super({ key: config.key });
    this.cfg = config;
  }

  create(): void {
    this.transitioning = false;
    this.engaged.clear();
    this.npcs = [];
    this.items = [];
    this.buildings = [];
    this.props = [];
    this.animals = [];
    this.companions = [];
    this.worldWidth = this.cfg.worldWidth;

    this.createSky();
    this.createSun();
    this.createClouds();
    if (this.cfg.showSkyline) this.createSkyline();
    this.createBuildings();
    this.createGround();
    this.createProps();
    this.createAnimals();

    this.mobileControls = new MobileControls();

    this.player = new Player(this, 180, 460);
    this.player.setMobileControls(this.mobileControls);
    this.player.setPoints(this.registry.get("carryPoints") || 0);
    this.player.setTools(this.registry.get("carryTools") || 0);

    this.createNPCs();
    this.createItems();
    this.createCompanions();

    this.setupDialogUI();
    this.setupHUD();
    this.setupMusicToggle();

    this.showTitleCard();

    // Start this level's happy tune
    if (this.registry.get("music") !== "off") {
      audio.playMusic(this.cfg.music);
    }

    this.input.keyboard?.on("keydown-ESC", () => {
      this.scene.start("LevelSelectScene");
    });

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  // ---------- Build world ----------
  private createSky(): void {
    this.skyLayer = this.add.tileSprite(0, 0, SCREEN_W, 240, "sky");
    this.skyLayer.setOrigin(0, 0).setScrollFactor(0).setDepth(0);
  }

  private createSun(): void {
    this.sun = this.add.sprite(SCREEN_W - 90, 80, "sun");
    this.sun.setScrollFactor(0).setDepth(1);
    this.tweens.add({ targets: this.sun, angle: 360, duration: 30000, repeat: -1 });
  }

  private createClouds(): void {
    this.clouds = this.add.group();
    const positions = [
      { x: 120, y: 40 }, { x: 420, y: 64 }, { x: 720, y: 34 },
      { x: 1040, y: 54 }, { x: 1440, y: 38 }, { x: 1840, y: 58 },
      { x: 2240, y: 46 }, { x: 2700, y: 30 }, { x: 3100, y: 60 }, { x: 3500, y: 42 },
    ];
    for (const p of positions) {
      const c = this.add.sprite(p.x, p.y, "cloud");
      c.setAlpha(0.9).setDepth(1).setData("worldX", p.x);
      this.clouds.add(c);
    }
  }

  private createSkyline(): void {
    this.skyline = this.add.tileSprite(0, 150, SCREEN_W, 110, "far_city");
    this.skyline.setOrigin(0, 0).setScrollFactor(0).setDepth(2);
  }

  private createBuildings(): void {
    this.buildingsLayer = this.add.container(0, 0).setDepth(10);
    for (const b of this.cfg.buildings) {
      const building: Building = { ...b };
      const sprite = this.add.sprite(b.worldX, b.y ?? 200, b.texture);
      sprite.setOrigin(0, 0).setDepth(10);
      building.sprite = sprite;
      this.buildingsLayer.add(sprite);

      if (b.label) {
        const label = this.add.text(b.worldX + sprite.width / 2, (b.y ?? 200) - 6, b.label, {
          fontSize: "12px", color: "#ffffff",
          backgroundColor: "#000000cc", padding: { x: 6, y: 3 },
          fontFamily: "monospace",
        });
        label.setOrigin(0.5, 1).setDepth(11);
        building.sprite.setData("label", label);
      }
      this.buildings.push(building);
    }
  }

  private createGround(): void {
    this.groundLayer = this.add.tileSprite(0, GROUND_TOP, SCREEN_W, SCREEN_H - GROUND_TOP, this.cfg.groundTile);
    this.groundLayer.setOrigin(0, 0).setScrollFactor(0).setDepth(5);
  }

  private createProps(): void {
    for (const p of this.cfg.props) {
      const prop: Prop = { ...p };
      const sprite = this.add.sprite(p.worldX, p.worldZ, p.texture);
      sprite.setOrigin(0.5, 1).setScale(p.scale ?? 2).setDepth(p.worldZ);
      prop.sprite = sprite;

      if (p.label) {
        const label = this.add.text(p.worldX, p.worldZ - (sprite.height * (p.scale ?? 2)) - 6, p.label, {
          fontSize: "11px", color: "#ffffff", align: "center",
          fontStyle: "bold", fontFamily: "monospace",
          backgroundColor: "#00000099", padding: { x: 4, y: 2 },
        });
        label.setOrigin(0.5, 0.5).setDepth(p.worldZ + 1);
        prop.labelObj = label;
      }
      this.props.push(prop);
    }
  }

  private createAnimals(): void {
    for (const a of this.cfg.animals) {
      const sprite = this.add.sprite(a.worldX, a.worldZ, a.texture);
      sprite.setOrigin(0.5, 1).setScale(a.scale ?? 2).setDepth(a.worldZ);
      this.animals.push({
        ...a, sprite,
        startX: a.worldX, startZ: a.worldZ,
        velocityX: 0, velocityZ: 0,
        wanderTimer: Math.random() * 2000,
        w: a.width ?? 50, h: a.height ?? 30,
      });
    }
  }

  private createNPCs(): void {
    for (const cfg of this.cfg.npcs) {
      this.npcs.push(new NPC(this, cfg));
    }
  }

  // Mom & Dad walk along with Owen (only on levels that list companions).
  private createCompanions(): void {
    const startX = this.player.getWorldX();
    const startZ = this.player.getWorldZ();
    for (const def of this.cfg.companions ?? []) {
      const wx = startX + def.offsetX;
      const wz = startZ + (def.offsetZ ?? 0);
      const sprite = this.add.sprite(wx, wz, def.texture);
      sprite.setOrigin(0.5, 1).setScale(2).setDepth(wz);
      this.companions.push({ def, sprite, worldX: wx, worldZ: wz, bobT: 0 });
    }
  }

  private updateCompanions(delta: number): void {
    const px = this.player.getWorldX();
    const pz = this.player.getWorldZ();
    const follow = Math.min(1, (delta / 1000) * 6); // smooth catch-up

    for (const c of this.companions) {
      const targetX = px + c.def.offsetX;
      const targetZ = Phaser.Math.Clamp(pz + (c.def.offsetZ ?? 0), 400, 540);
      const dx = targetX - c.worldX;
      c.worldX += dx * follow;
      c.worldZ += (targetZ - c.worldZ) * follow;

      const moving = Math.abs(dx) > 1.2;
      if (moving) c.sprite.setFlipX(dx < 0);
      c.bobT += delta;
      const bob = moving ? Math.abs(Math.sin(c.bobT / 120)) * 3 : 0;

      c.sprite.x = c.worldX - this.cameraX;
      c.sprite.y = c.worldZ - bob;
      c.sprite.setDepth(c.worldZ);
    }
  }

  private createItems(): void {
    for (const it of this.cfg.items) {
      const item = new Item(this, {
        texture: it.texture,
        worldX: it.worldX,
        worldZ: it.worldZ,
        scale: it.scale,
        effect: () => {
          this.player.addPoints(it.points);
          if (it.tool) this.player.addTool();
          this.showFeedback(it.label, "#ffd24a");
          audio.sfx(it.tool ? "sparkle" : "happy");
        },
      });
      this.items.push(item);
    }
  }

  // ---------- HUD ----------
  private setupDialogUI(): void {
    this.dialogBox = this.add.sprite(SCREEN_W / 2, 92, "dialog_box");
    this.dialogBox.setScrollFactor(0).setDepth(1100).setVisible(false);
    this.dialogName = this.add.text(SCREEN_W / 2 - 230, 56, "", {
      fontSize: "16px", color: "#ffd24a", fontStyle: "bold", fontFamily: "monospace",
    });
    this.dialogName.setScrollFactor(0).setDepth(1101).setVisible(false);
    this.dialogText = this.add.text(SCREEN_W / 2 - 230, 82, "", {
      fontSize: "14px", color: "#ffffff", wordWrap: { width: 460 }, fontFamily: "monospace",
    });
    this.dialogText.setScrollFactor(0).setDepth(1101).setVisible(false);
  }

  private setupHUD(): void {
    this.pointsText = this.add.text(SCREEN_W - 16, 14, "", {
      fontSize: "18px", color: "#ffd24a", fontStyle: "bold",
      stroke: "#000000", strokeThickness: 4, fontFamily: "monospace",
    });
    this.pointsText.setOrigin(1, 0).setScrollFactor(0).setDepth(1001);

    this.toolsText = this.add.text(SCREEN_W - 16, 40, "", {
      fontSize: "16px", color: "#ffe9a0", fontStyle: "bold",
      stroke: "#000000", strokeThickness: 4, fontFamily: "monospace",
    });
    this.toolsText.setOrigin(1, 0).setScrollFactor(0).setDepth(1001);

    this.locationText = this.add.text(16, 14, `📍 ${this.cfg.title}`, {
      fontSize: "13px", color: "#000000",
      backgroundColor: "#ffffffcc", padding: { x: 8, y: 4 }, fontFamily: "monospace",
    });
    this.locationText.setScrollFactor(0).setDepth(1001);
  }

  private setupMusicToggle(): void {
    this.musicBtn = this.add.text(16, 44, "", {
      fontSize: "13px", color: "#ffffff",
      backgroundColor: "#2b5fd9cc", padding: { x: 8, y: 4 }, fontFamily: "monospace",
    });
    this.musicBtn.setScrollFactor(0).setDepth(1001).setInteractive({ useHandCursor: true });
    this.updateMusicBtn();
    this.musicBtn.on("pointerdown", () => {
      const on = this.registry.get("music") !== "off";
      if (on) {
        this.registry.set("music", "off");
        audio.setEnabled(false);
      } else {
        this.registry.set("music", "on");
        audio.setEnabled(true);
        audio.playMusic(this.cfg.music);
      }
      this.updateMusicBtn();
    });
  }

  private updateMusicBtn(): void {
    const on = this.registry.get("music") !== "off";
    this.musicBtn.setText(on ? "🔊 Music: ON" : "🔈 Music: OFF");
  }

  // The BIG level title (≈3x normal), pops in then drifts away.
  private showTitleCard(): void {
    const title = this.add.text(SCREEN_W / 2, SCREEN_H / 2 - 30, this.cfg.title, {
      fontSize: "72px", color: this.cfg.themeColor, fontStyle: "bold",
      stroke: "#000000", strokeThickness: 10, align: "center",
      fontFamily: "monospace", wordWrap: { width: SCREEN_W - 80 },
    });
    title.setOrigin(0.5).setScrollFactor(0).setDepth(2000).setScale(0.2);

    let sub: Phaser.GameObjects.Text | undefined;
    if (this.cfg.subtitle) {
      sub = this.add.text(SCREEN_W / 2, SCREEN_H / 2 + 50, this.cfg.subtitle, {
        fontSize: "20px", color: "#ffffff", fontStyle: "bold",
        stroke: "#000000", strokeThickness: 5, fontFamily: "monospace",
      });
      sub.setOrigin(0.5).setScrollFactor(0).setDepth(2000).setAlpha(0);
    }

    this.tweens.add({ targets: title, scale: 1, duration: 500, ease: "Back.easeOut" });
    if (sub) this.tweens.add({ targets: sub, alpha: 1, duration: 500, delay: 200 });

    this.time.delayedCall(2200, () => {
      this.tweens.add({
        targets: [title, ...(sub ? [sub] : [])],
        alpha: 0, y: "-=40", duration: 700,
        onComplete: () => { title.destroy(); sub?.destroy(); },
      });
    });
  }

  private showFeedback(text: string, color: string): void {
    const t = this.add.text(SCREEN_W / 2, SCREEN_H / 2 - 90, text, {
      fontSize: "26px", color, fontStyle: "bold",
      stroke: "#000000", strokeThickness: 5, fontFamily: "monospace",
    });
    t.setOrigin(0.5).setScrollFactor(0).setDepth(1500);
    this.tweens.add({
      targets: t, alpha: 0, y: t.y - 50, duration: 1100,
      onComplete: () => t.destroy(),
    });
  }

  private showDialog(npc: NPC): void {
    this.activeNPC = npc;
    npc.setDialogActive(true);
    this.dialogBox.setVisible(true).setAlpha(1);
    this.dialogName.setVisible(true).setAlpha(1).setText(npc.npcName);
    this.dialogText.setVisible(true).setAlpha(1).setText(npc.getRandomDialog());
    this.dialogTimer = 4200;
    this.player.addPoints(5);
    this.showFeedback("+5 Points!", "#ffd24a");
    audio.sfx("hello");
  }

  private hideDialog(): void {
    if (!this.activeNPC) return;
    this.activeNPC.setDialogActive(false);
    this.activeNPC = null;
    this.dialogBox.setVisible(false);
    this.dialogName.setVisible(false);
    this.dialogText.setVisible(false);
    this.dialogCooldown = 400;
  }

  // ---------- Obstacles ----------
  private updateObstacles(): void {
    const obs: Obstacle[] = [];
    for (const a of this.animals) {
      obs.push({ worldX: a.worldX, worldZ: a.worldZ, width: a.w, height: a.h });
    }
    for (const p of this.props) {
      if (p.isObstacle) {
        obs.push({ worldX: p.worldX, worldZ: p.worldZ, width: p.width ?? 30, height: p.height ?? 40 });
      }
    }
    this.player.setObstacles(obs);
  }

  private updateAnimals(delta: number): void {
    const speed = 28;
    const dt = delta / 1000;
    for (const a of this.animals) {
      a.wanderTimer -= delta;
      if (a.wanderTimer <= 0) {
        if (Math.random() < 0.3) { a.velocityX = 0; a.velocityZ = 0; }
        else { a.velocityX = (Math.random() - 0.5) * 2; a.velocityZ = (Math.random() - 0.5) * 2; }
        a.wanderTimer = 1500 + Math.random() * 3000;
      }
      a.worldX += a.velocityX * speed * dt;
      a.worldZ += a.velocityZ * speed * 0.5 * dt;
      a.worldZ = Phaser.Math.Clamp(a.worldZ, 400, 540);

      const maxWander = 140;
      if (Math.abs(a.worldX - a.startX) > maxWander) {
        a.worldX = a.startX + Math.sign(a.worldX - a.startX) * maxWander;
        a.velocityX *= -1;
      }
      if (a.sprite) {
        a.sprite.x = a.worldX - this.cameraX;
        a.sprite.y = a.worldZ;
        a.sprite.setDepth(a.worldZ);
        if (a.velocityX !== 0) a.sprite.setFlipX(a.velocityX < 0);
      }
    }
  }

  // ---------- Main loop ----------
  update(time: number, delta: number): void {
    this.player.update(time, delta);
    this.updateObstacles();

    // HUD text
    this.pointsText.setText(`⭐ ${this.player.getPoints()}`);
    this.toolsText.setText(`🔧 Tools: ${this.player.getToolsCollected()}`);

    // Items
    for (const item of this.items) {
      item.update(delta);
      if (item.checkCollision(this.player.getWorldX(), this.player.getWorldZ())) {
        item.collect();
      }
    }

    // Dialog timers
    if (this.dialogCooldown > 0) this.dialogCooldown -= delta;
    if (this.activeNPC && this.dialogTimer > 0) {
      this.dialogTimer -= delta;
      if (this.dialogTimer < 800) {
        const a = this.dialogTimer / 800;
        this.dialogBox.setAlpha(a); this.dialogName.setAlpha(a); this.dialogText.setAlpha(a);
      }
      if (this.dialogTimer <= 0) this.hideDialog();
    }

    // Camera
    const playerX = this.player.getWorldX();
    this.cameraX = Phaser.Math.Clamp(playerX - SCREEN_W / 2, 0, this.worldWidth - SCREEN_W);
    if (playerX < 40) this.player.setWorldX(40);
    if (playerX > this.worldWidth - 40) this.player.setWorldX(this.worldWidth - 40);
    this.player.x = this.player.getWorldX() - this.cameraX;

    // Parallax
    this.skyLayer.tilePositionX = this.cameraX * 0.05;
    if (this.skyline) this.skyline.tilePositionX = this.cameraX * 0.2;
    this.groundLayer.tilePositionX = this.cameraX;

    this.clouds.children.iterate((c) => {
      const s = c as Phaser.GameObjects.Sprite;
      const wx = s.getData("worldX") as number;
      s.x = wx - this.cameraX * 0.1;
      return true;
    });

    // Buildings + labels
    for (const b of this.buildings) {
      if (b.sprite) {
        b.sprite.x = b.worldX - this.cameraX;
        const label = b.sprite.getData("label") as Phaser.GameObjects.Text | undefined;
        if (label) label.x = b.worldX + b.sprite.width / 2 - this.cameraX;
      }
    }

    // Props + labels
    for (const p of this.props) {
      if (p.sprite) p.sprite.x = p.worldX - this.cameraX;
      if (p.labelObj) p.labelObj.x = p.worldX - this.cameraX;
    }

    // NPCs
    for (const npc of this.npcs) {
      npc.update(delta);
      npc.x = npc.worldX - this.cameraX;
      const dist = npc.distanceTo(this.player.getWorldX(), this.player.getWorldZ());
      if (dist > 130) this.engaged.delete(npc);
      if (dist < 78 && this.dialogCooldown <= 0 && !this.activeNPC && !this.engaged.has(npc)) {
        this.engaged.add(npc);
        this.showDialog(npc);
      }
    }

    this.updateAnimals(delta);
    this.updateCompanions(delta);

    for (const item of this.items) item.updateScreenPosition(this.cameraX);

    this.checkTransition();
  }

  private checkTransition(): void {
    if (this.player.getWorldX() >= this.worldWidth - 60 && !this.transitioning) {
      this.transitioning = true;
      this.registry.set("carryPoints", this.player.getPoints());
      this.registry.set("carryTools", this.player.getToolsCollected());
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start(this.cfg.nextScene || "FinalScene");
      });
    }
  }
}
