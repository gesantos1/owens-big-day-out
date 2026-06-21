import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { LevelSelectScene } from './scenes/LevelSelectScene';
import { LevelScene } from './scenes/LevelScene';
import { FinalScene } from './scenes/FinalScene';
import { LEVELS } from './levels';

// The six levels are all the same LevelScene class, each fed its own data.
const levelScenes = LEVELS.map((cfg) => new LevelScene(cfg));

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 600,
  backgroundColor: '#8fd0ff',
  parent: 'game-container',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 }, debug: false },
  },
  scene: [BootScene, LevelSelectScene, ...levelScenes, FinalScene],
};

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({ ...gameConfig, parent });
}
