import Phaser from "phaser";
import {
  createPlayerTextures,
  createCharacterTextures,
  createBackgroundTextures,
  createBuildingTextures,
  createItemTextures,
  createUITextures,
} from "../textures";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  create(): void {
    // All art is generated in code — no files to load.
    createPlayerTextures(this);
    createCharacterTextures(this);
    createBackgroundTextures(this);
    createBuildingTextures(this);
    createItemTextures(this);
    createUITextures(this);

    this.registry.set("music", "on");
    this.registry.set("carryPoints", 0);
    this.registry.set("carryTools", 0);

    this.scene.start("LevelSelectScene");
  }
}
