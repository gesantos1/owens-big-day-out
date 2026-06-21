export interface MobileInputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
}

export class MobileControls {
  private container: HTMLDivElement | null = null;
  private state: MobileInputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
  };
  private jumpJustPressed: boolean = false;

  constructor() {
    if (this.isMobile()) {
      this.create();
    }
  }

  private isMobile(): boolean {
    return window.matchMedia('(max-width: 900px)').matches ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  }

  private create(): void {
    this.container = document.createElement('div');
    this.container.id = 'mobile-controls';
    this.container.innerHTML = `
      <div class="dpad">
        <button class="dpad-btn up" data-dir="up">▲</button>
        <div class="dpad-middle">
          <button class="dpad-btn left" data-dir="left">◀</button>
          <div class="dpad-center"></div>
          <button class="dpad-btn right" data-dir="right">▶</button>
        </div>
        <button class="dpad-btn down" data-dir="down">▼</button>
      </div>
      <button class="jump-btn" data-action="jump">JUMP</button>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #mobile-controls {
        display: none;
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        padding: 0 20px;
        z-index: 1000;
        pointer-events: none;
        justify-content: space-between;
        align-items: flex-end;
      }
      @media (max-width: 900px), (pointer: coarse) {
        #mobile-controls {
          display: flex;
        }
      }
      #mobile-controls * {
        pointer-events: auto;
      }
      .dpad {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .dpad-middle {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .dpad-center {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
      }
      .dpad-btn {
        width: 50px;
        height: 50px;
        background: rgba(74, 158, 255, 0.7);
        border: 3px solid rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      .dpad-btn:active, .dpad-btn.active {
        background: rgba(74, 158, 255, 1);
        transform: scale(0.95);
      }
      .jump-btn {
        width: 80px;
        height: 80px;
        background: rgba(0, 255, 0, 0.7);
        border: 4px solid rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        color: white;
        font-family: 'Press Start 2P', monospace;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      .jump-btn:active, .jump-btn.active {
        background: rgba(0, 255, 0, 1);
        transform: scale(0.95);
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.container);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    const buttons = this.container.querySelectorAll('button');

    buttons.forEach((btn) => {
      const dir = btn.dataset.dir as keyof MobileInputState | undefined;
      const action = btn.dataset.action;

      const handleStart = (e: Event) => {
        e.preventDefault();
        btn.classList.add('active');
        if (dir && dir in this.state) {
          this.state[dir] = true;
        }
        if (action === 'jump') {
          this.state.jump = true;
          this.jumpJustPressed = true;
        }
      };

      const handleEnd = (e: Event) => {
        e.preventDefault();
        btn.classList.remove('active');
        if (dir && dir in this.state) {
          this.state[dir] = false;
        }
        if (action === 'jump') {
          this.state.jump = false;
        }
      };

      btn.addEventListener('touchstart', handleStart, { passive: false });
      btn.addEventListener('touchend', handleEnd, { passive: false });
      btn.addEventListener('touchcancel', handleEnd, { passive: false });
      btn.addEventListener('mousedown', handleStart);
      btn.addEventListener('mouseup', handleEnd);
      btn.addEventListener('mouseleave', handleEnd);
    });
  }

  getState(): MobileInputState {
    return { ...this.state };
  }

  consumeJump(): boolean {
    if (this.jumpJustPressed) {
      this.jumpJustPressed = false;
      return true;
    }
    return false;
  }

  destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
