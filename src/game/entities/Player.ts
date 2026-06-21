import Phaser from 'phaser';
import { MobileControls } from '../utils/MobileControls';
import { audio } from '../audio/AudioEngine';

// Something Owen can bump into (a friendly squirrel, a puddle, a toy).
// Bumping never hurts — it just makes Owen do a silly stumble.
export interface Obstacle {
  worldX: number;
  worldZ: number;
  width: number;
  height: number;
}

export class Player extends Phaser.GameObjects.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private wasd: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key } | null = null;
  private spaceKey: Phaser.Input.Keyboard.Key | null = null;
  private mobileControls: MobileControls | null = null;

  // World position
  public worldX: number = 0;
  public worldZ: number = 0; // Depth on the path (up/down movement)

  private moveSpeed: number = 200;
  private walkFrame: number = 0;
  private walkTimer: number = 0;
  private facingRight: boolean = true;

  // Jump state
  private isJumping: boolean = false;
  private jumpVelocity: number = 0;
  private jumpHeight: number = 0;
  private jumpSpeed: number = 400;
  private gravity: number = 1200;

  // Belt-scroll bounds
  private streetTopY: number = 380;
  private streetBottomY: number = 520;
  private verticalMovementEnabled: boolean = true;

  // Bumpable things (squirrels, toys, puddles)
  private obstacles: Obstacle[] = [];

  // Silly stumble (replaces the old damage system — nobody gets hurt!)
  private stumbleCooldown: number = 0;

  // Points + collected construction tools
  private points: number = 0;
  private toolsCollected: number = 0;

  constructor(scene: Phaser.Scene, x: number, z: number) {
    super(scene, x, 450, 'player');

    this.worldX = x;
    this.worldZ = z;

    scene.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setScale(2);

    this.setupInput();
    this.updatePosition();
  }

  private setupInput(): void {
    if (this.scene.input.keyboard) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.wasd = {
        W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
      this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
  }

  setObstacles(obstacles: Obstacle[]): void {
    this.obstacles = obstacles;
  }

  setMobileControls(controls: MobileControls): void {
    this.mobileControls = controls;
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;

    const mobile = this.mobileControls?.getState();
    const mobileJump = this.mobileControls?.consumeJump() ?? false;

    // Handle jumping (keyboard or mobile)
    const keyboardJump = this.spaceKey && Phaser.Input.Keyboard.JustDown(this.spaceKey);
    if ((keyboardJump || mobileJump) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -this.jumpSpeed;
      audio.sfx('jump');
    }

    if (this.isJumping) {
      this.jumpVelocity += this.gravity * dt;
      this.jumpHeight += this.jumpVelocity * dt;

      if (this.jumpHeight >= 0) {
        this.jumpHeight = 0;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }

    let moveX = 0;
    let moveZ = 0;

    if (this.cursors?.left.isDown || this.wasd?.A.isDown || mobile?.left) {
      moveX = -1;
      this.facingRight = false;
    }
    if (this.cursors?.right.isDown || this.wasd?.D.isDown || mobile?.right) {
      moveX = 1;
      this.facingRight = true;
    }

    if (this.verticalMovementEnabled) {
      if (this.cursors?.up.isDown || this.wasd?.W.isDown || mobile?.up) {
        moveZ = -1;
      }
      if (this.cursors?.down.isDown || this.wasd?.S.isDown || mobile?.down) {
        moveZ = 1;
      }
    }

    // Normalize diagonal movement
    if (moveX !== 0 && moveZ !== 0) {
      moveX *= 0.707;
      moveZ *= 0.707;
    }

    // New position (movement is never hard-blocked, so kids never get stuck)
    this.worldX = this.worldX + moveX * this.moveSpeed * dt;
    this.worldZ = this.verticalMovementEnabled
      ? Phaser.Math.Clamp(
          this.worldZ + moveZ * this.moveSpeed * 0.6 * dt,
          this.streetTopY,
          this.streetBottomY
        )
      : this.worldZ;

    // Stumble cooldown
    if (this.stumbleCooldown > 0) {
      this.stumbleCooldown -= delta;
    }

    // Silly bump: a quick wobble + a soft "boop", no damage at all.
    if (!this.isJumping && this.stumbleCooldown <= 0) {
      for (const obs of this.obstacles) {
        if (this.checkCollision(this.worldX, this.worldZ, obs)) {
          this.stumble(obs);
          break;
        }
      }
    }

    // Update sprite facing
    this.setFlipX(!this.facingRight);

    // Walking animation
    if (moveX !== 0 || moveZ !== 0) {
      this.walkTimer += delta;
      if (this.walkTimer > 120) {
        this.walkTimer = 0;
        this.walkFrame = (this.walkFrame + 1) % 4;
        this.setTexture(`player_walk_${this.walkFrame}`);
      }
    } else {
      this.setTexture('player');
      this.walkFrame = 0;
      this.walkTimer = 0;
    }

    this.updatePosition();
  }

  // A gentle, funny stumble: tiny knock-back + a wobble spin. Owen pops right
  // back up. This replaces the old "take damage" behaviour entirely.
  private stumble(obs: Obstacle): void {
    this.stumbleCooldown = 900;
    audio.sfx('bump');

    // Small knock-back away from the thing we bumped.
    const dir = this.worldX < obs.worldX ? -1 : 1;
    this.worldX += dir * 14;

    // Wobble animation
    this.scene.tweens.add({
      targets: this,
      angle: { from: -14, to: 14 },
      duration: 90,
      yoyo: true,
      repeat: 1,
      onComplete: () => this.setAngle(0),
    });
  }

  private checkCollision(px: number, pz: number, obs: Obstacle): boolean {
    const playerWidth = 20;

    return (
      px + playerWidth / 2 > obs.worldX - obs.width / 2 &&
      px - playerWidth / 2 < obs.worldX + obs.width / 2 &&
      pz > obs.worldZ - obs.height &&
      pz < obs.worldZ + 10
    );
  }

  private updatePosition(): void {
    this.y = this.worldZ + this.jumpHeight;
    this.setDepth(this.worldZ + (this.isJumping ? 1000 : 0));
  }

  getWorldX(): number { return this.worldX; }
  getWorldZ(): number { return this.worldZ; }

  setVerticalBounds(top: number, bottom: number): void {
    this.streetTopY = top;
    this.streetBottomY = bottom;
  }

  setVerticalMovementEnabled(enabled: boolean): void {
    this.verticalMovementEnabled = enabled;
  }

  isInAir(): boolean { return this.isJumping; }

  setWorldX(x: number): void {
    this.worldX = x;
    this.updatePosition();
  }

  getStreetBounds(): { top: number; bottom: number } {
    return { top: this.streetTopY, bottom: this.streetBottomY };
  }

  addPoints(amount: number): void { this.points += amount; }
  getPoints(): number { return this.points; }
  setPoints(points: number): void { this.points = points; }

  addTool(): void { this.toolsCollected++; }
  getToolsCollected(): number { return this.toolsCollected; }
  setTools(tools: number): void { this.toolsCollected = tools; }
}
