import Phaser from 'phaser';
import { audio } from '../audio/AudioEngine';

// A collectible Owen can pick up: construction tools, or yummy treats.
export interface ItemConfig {
  texture: string;
  worldX: number;
  worldZ: number;
  effect: (scene: Phaser.Scene) => void;
  scale?: number;
}

export class Item extends Phaser.GameObjects.Sprite {
  public worldX: number;
  public worldZ: number;
  private effect: (scene: Phaser.Scene) => void;
  private floatOffset: number = 0;
  private floatTimer: number = 0;
  private collected: boolean = false;

  constructor(scene: Phaser.Scene, config: ItemConfig) {
    super(scene, config.worldX, config.worldZ, config.texture);

    this.worldX = config.worldX;
    this.worldZ = config.worldZ;
    this.effect = config.effect;

    scene.add.existing(this);
    this.setOrigin(0.5, 1);
    this.setScale(config.scale ?? 2);
    this.setDepth(config.worldZ);
  }

  update(delta: number): void {
    if (this.collected) return;
    // Gentle bobbing so collectibles look inviting.
    this.floatTimer += delta;
    this.floatOffset = Math.sin(this.floatTimer / 1000) * 10;
  }

  updateScreenPosition(cameraX: number): void {
    if (this.collected) return;
    this.x = this.worldX - cameraX;
    this.y = this.worldZ + this.floatOffset;
  }

  checkCollision(playerX: number, playerZ: number): boolean {
    if (this.collected) return false;
    const dx = this.worldX - playerX;
    const dz = this.worldZ - playerZ;
    return Math.sqrt(dx * dx + dz * dz) < 44;
  }

  collect(): void {
    if (this.collected) return;
    this.collected = true;
    audio.sfx('collect');
    this.effect(this.scene);

    // Fun pop animation
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: (this.scale || 2) * 1.6,
      duration: 300,
      onComplete: () => this.destroy(),
    });
  }
}
