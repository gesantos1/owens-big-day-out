import type { NPCConfig } from "../entities/NPC";
import type { TrackName } from "../audio/AudioEngine";

// A building in the back scenery row.
export interface BuildingDef {
  texture: string;
  worldX: number;
  y?: number;        // top Y (default 200)
  label?: string;    // floating landmark label
}

// A prop sitting on the ground (lamp, bench, tree, sandbox, etc.).
export interface PropDef {
  texture: string;
  worldX: number;
  worldZ: number;    // baseline Y on the path
  scale?: number;
  isObstacle?: boolean; // can Owen bump into it? (silly stumble)
  width?: number;       // bump box width
  height?: number;      // bump box height
  label?: string;       // optional floating label
}

// A wandering critter — always friendly, bumping just causes a stumble.
export interface AnimalDef {
  texture: string;
  worldX: number;
  worldZ: number;
  width?: number;
  height?: number;
  scale?: number;
}

// A collectible.
export interface ItemDef {
  texture: string;
  worldX: number;
  worldZ: number;
  points: number;
  tool?: boolean;    // counts toward the construction-tools tally
  label: string;     // floating feedback e.g. "+1 Tool!"
  scale?: number;
}

// A family member who walks ALONGSIDE Owen (follows him), instead of standing
// still. Used for Mom & Dad in level 1 and level 6.
export interface CompanionDef {
  name: string;
  texture: string;
  offsetX: number;   // how far behind Owen (negative = trails him)
  offsetZ?: number;  // depth stagger so companions don't overlap
}

export interface LevelConfig {
  key: string;          // Phaser scene key
  title: string;        // BIG level title shown on entry (3x size)
  subtitle?: string;
  nextScene: string;    // next scene key ("" => the finale)
  worldWidth: number;
  groundTile: string;   // tile texture for the walkable path
  showSkyline: boolean; // draw the Philadelphia skyline behind?
  music: TrackName;
  themeColor: string;   // hex string for the title text
  buildings: BuildingDef[];
  props: PropDef[];
  npcs: NPCConfig[];
  animals: AnimalDef[];
  items: ItemDef[];
  companions?: CompanionDef[]; // family who walk with Owen this level
}
