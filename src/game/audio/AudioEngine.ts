// AudioEngine: copyright-safe, procedurally-generated chiptune music + sound effects.
// Uses the Web Audio API directly (no audio files needed). Everything here is
// generated from simple oscillators, so there is nothing to license.

// Note name -> frequency (Hz). Covers the range the melodies use.
const NOTE: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5,
  REST: 0,
};

// A "track" is a melody (lead) plus a simple bass line. Each entry is
// [noteName, beats]. The whole game is upbeat and major-key on purpose.
interface NoteEvent { note: string; beats: number; }

interface Track {
  tempo: number;       // beats per minute
  lead: NoteEvent[];
  bass: NoteEvent[];
}

function seq(pairs: [string, number][]): NoteEvent[] {
  return pairs.map(([note, beats]) => ({ note, beats }));
}

// Six cheerful loops — one signature tune per level, all happy & bouncy.
const TRACKS: Record<string, Track> = {
  // Level 1 - Owen's street: bright "good morning" bounce
  morning: {
    tempo: 132,
    lead: seq([["C5",0.5],["E5",0.5],["G5",0.5],["E5",0.5],["F5",0.5],["A5",0.5],["G5",1],
               ["D5",0.5],["F5",0.5],["A5",0.5],["F5",0.5],["E5",0.5],["G5",0.5],["C5",1]]),
    bass: seq([["C3",1],["G3",1],["F3",1],["G3",1],["C3",1],["G3",1],["C3",1],["G3",1]]),
  },
  // Level 2 - the walk: skippy adventure
  walk: {
    tempo: 140,
    lead: seq([["G4",0.5],["A4",0.5],["B4",0.5],["C5",0.5],["D5",1],["B4",0.5],["G4",0.5],
               ["C5",0.5],["B4",0.5],["A4",0.5],["G4",0.5],["A4",1],["REST",1]]),
    bass: seq([["G3",1],["D3",1],["E3",1],["C3",1],["G3",1],["D3",1],["G3",2]]),
  },
  // Level 3 - the zoo: playful safari
  zoo: {
    tempo: 124,
    lead: seq([["E5",0.5],["D5",0.5],["C5",0.5],["D5",0.5],["E5",0.5],["E5",0.5],["E5",1],
               ["D5",0.5],["D5",0.5],["D5",1],["E5",0.5],["G5",0.5],["G5",1]]),
    bass: seq([["C3",1],["C3",1],["G3",1],["G3",1],["A3",1],["F3",1],["C3",2]]),
  },
  // Level 4 - dinosaur museum: big friendly stomp
  dino: {
    tempo: 118,
    lead: seq([["C5",0.5],["C5",0.5],["E5",1],["F5",0.5],["F5",0.5],["A5",1],
               ["G5",0.5],["E5",0.5],["C5",0.5],["E5",0.5],["D5",1],["G4",1]]),
    bass: seq([["C3",0.5],["C3",0.5],["C3",1],["F3",0.5],["F3",0.5],["F3",1],
               ["G3",0.5],["G3",0.5],["G3",1],["C3",1]]),
  },
  // Level 5 - sandbox playground: busy, happy construction
  sandbox: {
    tempo: 138,
    lead: seq([["G5",0.5],["F5",0.5],["E5",0.5],["F5",0.5],["G5",0.5],["A5",0.5],["G5",1],
               ["E5",0.5],["F5",0.5],["G5",0.5],["E5",0.5],["C5",1],["REST",0.5],["C5",0.5]]),
    bass: seq([["C3",1],["E3",1],["F3",1],["G3",1],["C3",1],["A3",1],["G3",1],["C3",1]]),
  },
  // Level 6 - home celebration: warm triumphant finale
  home: {
    tempo: 120,
    lead: seq([["C5",0.5],["D5",0.5],["E5",0.5],["G5",0.5],["C6",1],["B5",0.5],["G5",0.5],
               ["A5",0.5],["G5",0.5],["E5",0.5],["G5",0.5],["C5",1.5],["REST",0.5]]),
    bass: seq([["C3",1],["G3",1],["A3",1],["F3",1],["C3",1],["F3",1],["G3",1],["C3",1]]),
  },
};

export type TrackName = keyof typeof TRACKS;

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private enabled = true;
  private currentTrack: TrackName | null = null;
  private loopTimer: number | null = null;
  private activeNodes: AudioNode[] = [];

  // Lazily create the AudioContext. Must be called from a user gesture
  // (a click/tap) so browsers allow audio to start.
  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.35;
      this.musicGain.connect(this.masterGain);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (!on) {
      this.stopMusic();
    } else if (this.currentTrack) {
      this.playMusic(this.currentTrack);
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // Schedule one note on a given gain bus.
  private playNote(
    freq: number,
    start: number,
    duration: number,
    type: OscillatorType,
    bus: GainNode,
    peak: number,
  ): void {
    if (!this.ctx || freq <= 0) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    // Soft attack + decay so it sounds like a bouncy chiptune, not a beep.
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.95);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(start);
    osc.stop(start + duration);
    this.activeNodes.push(osc);
  }

  playMusic(name: TrackName): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.musicGain) return;
    this.currentTrack = name;
    if (!this.enabled) return;

    this.stopScheduling();
    const track = TRACKS[name];
    const beat = 60 / track.tempo;

    const scheduleLoop = () => {
      if (!this.ctx || !this.musicGain) return;
      const now = this.ctx.currentTime + 0.05;

      // Lead melody (square wave = classic chiptune lead).
      let t = now;
      for (const ev of track.lead) {
        this.playNote(NOTE[ev.note] ?? 0, t, ev.beats * beat, "square", this.musicGain, 0.18);
        t += ev.beats * beat;
      }
      const leadLen = t - now;

      // Bass line (triangle wave = soft round bass).
      t = now;
      for (const ev of track.bass) {
        this.playNote((NOTE[ev.note] ?? 0) / 2, t, ev.beats * beat, "triangle", this.musicGain, 0.22);
        t += ev.beats * beat;
      }
      const bassLen = t - now;

      const loopLen = Math.max(leadLen, bassLen);
      this.loopTimer = window.setTimeout(scheduleLoop, loopLen * 1000 - 60);
    };

    scheduleLoop();
  }

  private stopScheduling(): void {
    if (this.loopTimer !== null) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  stopMusic(): void {
    this.stopScheduling();
    // Let already-scheduled notes ring out naturally; just stop new loops.
  }

  // ---- Sound effects (short, friendly blips) ----
  sfx(name: "collect" | "bump" | "jump" | "happy" | "sparkle" | "hello"): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain || !this.enabled) return;
    const now = ctx.currentTime;
    const bus = this.masterGain;

    switch (name) {
      case "collect": // rising two-note "ding!"
        this.playNote(NOTE.E5, now, 0.09, "square", bus, 0.25);
        this.playNote(NOTE.A5, now + 0.09, 0.14, "square", bus, 0.25);
        break;
      case "sparkle": // happy arpeggio up
        this.playNote(NOTE.C5, now, 0.07, "square", bus, 0.2);
        this.playNote(NOTE.E5, now + 0.07, 0.07, "square", bus, 0.2);
        this.playNote(NOTE.G5, now + 0.14, 0.07, "square", bus, 0.2);
        this.playNote(NOTE.C6, now + 0.21, 0.16, "square", bus, 0.22);
        break;
      case "jump": // quick "boing" up
        this.playNote(NOTE.C5, now, 0.06, "triangle", bus, 0.22);
        this.playNote(NOTE.G5, now + 0.06, 0.1, "triangle", bus, 0.22);
        break;
      case "bump": // soft low "boop" (silly, not scary)
        this.playNote(NOTE.G3, now, 0.12, "sine", bus, 0.3);
        this.playNote(NOTE.E3, now + 0.08, 0.14, "sine", bus, 0.28);
        break;
      case "happy": // cheery chord blip
        this.playNote(NOTE.C5, now, 0.18, "square", bus, 0.16);
        this.playNote(NOTE.E5, now, 0.18, "square", bus, 0.16);
        this.playNote(NOTE.G5, now, 0.18, "square", bus, 0.16);
        break;
      case "hello": // friendly two-note greeting
        this.playNote(NOTE.G4, now, 0.1, "triangle", bus, 0.22);
        this.playNote(NOTE.C5, now + 0.1, 0.14, "triangle", bus, 0.22);
        break;
    }
  }
}

// Single shared instance for the whole game.
export const audio = new AudioEngine();
