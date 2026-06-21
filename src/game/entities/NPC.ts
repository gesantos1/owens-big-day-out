import Phaser from 'phaser';

// Every character Owen meets is friendly. They just say happy things.
export interface NPCConfig {
  name: string;
  texture: string;
  worldX: number;
  worldZ: number;
  dialog: string[];
  wandering?: boolean;
  scale?: number;
}

export class NPC extends Phaser.GameObjects.Sprite {
  public worldX: number;
  public worldZ: number;
  public npcName: string;
  public dialog: string[];

  private wandering: boolean;
  private wanderTimer: number = 0;
  private wanderDirection: { x: number; z: number } = { x: 0, z: 0 };
  private startX: number;
  private startZ: number;
  private dialogActive: boolean = false;
  private moveSpeed: number = 40;

  private streetTopY: number = 380;
  private streetBottomY: number = 520;

  constructor(scene: Phaser.Scene, config: NPCConfig) {
    super(scene, config.worldX, config.worldZ, config.texture);

    this.worldX = config.worldX;
    this.worldZ = config.worldZ;
    this.startX = config.worldX;
    this.startZ = config.worldZ;
    this.npcName = config.name;
    this.dialog = config.dialog;
    this.wandering = config.wandering ?? false;

    scene.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setScale(config.scale ?? 2);
    this.updatePosition();
  }

  update(delta: number): void {
    if (!this.wandering || this.dialogActive) return;

    this.wanderTimer -= delta;

    if (this.wanderTimer <= 0) {
      if (Math.random() < 0.4) {
        this.wanderDirection = { x: 0, z: 0 };
      } else {
        this.wanderDirection = {
          x: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
        };
      }
      this.wanderTimer = 1000 + Math.random() * 2000;
    }

    const dt = delta / 1000;
    this.worldX += this.wanderDirection.x * this.moveSpeed * dt;
    this.worldZ += this.wanderDirection.z * this.moveSpeed * 0.6 * dt;

    this.worldZ = Phaser.Math.Clamp(this.worldZ, this.streetTopY, this.streetBottomY);

    const maxWanderX = 90;
    const maxWanderZ = 35;
    if (Math.abs(this.worldX - this.startX) > maxWanderX) {
      this.worldX = this.startX + Math.sign(this.worldX - this.startX) * maxWanderX;
      this.wanderDirection.x *= -1;
    }
    if (Math.abs(this.worldZ - this.startZ) > maxWanderZ) {
      this.worldZ = this.startZ + Math.sign(this.worldZ - this.startZ) * maxWanderZ;
      this.wanderDirection.z *= -1;
    }

    if (this.wanderDirection.x !== 0) {
      this.setFlipX(this.wanderDirection.x < 0);
    }

    this.updatePosition();
  }

  private updatePosition(): void {
    this.y = this.worldZ;
    this.setDepth(this.worldZ);
  }

  distanceTo(targetX: number, targetZ: number): number {
    const dx = this.worldX - targetX;
    const dz = (this.worldZ - targetZ) * 2;
    return Math.sqrt(dx * dx + dz * dz);
  }

  setDialogActive(active: boolean): void {
    this.dialogActive = active;
    if (active) {
      this.wanderDirection = { x: 0, z: 0 };
    }
  }

  getRandomDialog(): string {
    return this.dialog[Math.floor(Math.random() * this.dialog.length)];
  }

  setWorldX(x: number): void {
    this.worldX = x;
    this.startX = x;
    this.updatePosition();
  }
}
