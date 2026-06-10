# Pole-Star Kingdom (v0.0.1 Alpha)

A 2D side-scrolling wave-based RPG prototype built with the **Phaser 3** game engine. The current version implements a basic gameplay loop: fighting waves of enemies, collecting loot, purchasing equipment from a merchant, and interacting with NPCs.

[🎮 Play Live Demo](https://a-a-borodin.github.io/pole-star-kingdom/main.html)

![Gameplay Preview](assets/media/gameplay.gif)

---

## Key Features

*   **Wave System:** Progression through wave-based encounters featuring different enemy types (Green Slime, Black Wolf, White Wolf, Blue Alien), each with unique attributes, difficulty levels, and entry costs.
*   **Inventory & Equipment System:** A basic equipment grid allowing players to equip weapons, helmets, chestplates, gloves, boots, rings, amulets, and cloaks to dynamically alter player stats (health, defense, damage, regeneration).
*   **Storage & Shop:** Items can be placed in a personal storage chest or traded with a goblin merchant. The merchant's inventory refreshes automatically and expands as the player's reputation increases.
*   **Interactive NPCs:** Dialogue-based interaction with the Wizard to select and trigger combat waves.
*   **Visual Feedback:** Camera shake on hit, floating combat text for health changes/item acquisition, and post-processing outline FX for interactive objects (via the Rex Outline Pipeline plugin).

---

## Project Structure

*   `src/core.js` — Phaser configuration and game bootstrap.
*   `src/scenes/` — Scene management (Preloader, MainMenu, MainScene, UIScene, and MenuScene).
*   `src/gameObjects/` — Game entities (Player, Enemies inheriting from `Entity`) and interactive items (chests, gold coins).
*   `src/inventorySystem/` — Systems managing items, equipment slots, container storage, and stat calculations.
*   `src/wavesSystem/` — Wave spawning and phase management.
*   `src/utils/` — Helper tools (event emitter wrapper, virtual joystick, custom text, and progress bar objects).

---

## Installation & Local Run

Because the project uses ES Modules, loading the `main.html` file directly from your local filesystem will cause CORS errors. A local web server is required.

### Option 1: Using Node.js (Recommended)
1. Install a lightweight static server, such as `http-server`:
   ```bash
   npm install -g http-server
   ```
2. Run the server from the project's root directory:
   ```bash
   http-server .
   ```
3. Open the provided address in your browser.

### Option 2: Code Editor Extensions
*   If you are using **VS Code**, install the **Live Server** extension, open the project workspace, and click the **Go Live** button in the status bar.

---

## Controls

*   **Keyboard:** Press the `Left` and `Right` arrow keys to move the player character.
*   **Mouse / Touch:**
    *   Click the menu button (top-left) to toggle the menu overlay (inventory, shop, storage).
    *   Click on the Wizard NPC to open the wave selection screen when in proximity.
    *   Interact with item dialog frames to equip, use, sell, or discard items.

---

## Third-Party Libraries & Plugins
*   [Phaser 3](https://phaser.io/) — Core game engine.
*   [Rex Outline Pipeline Plugin](https://github.com/rexrainbow/phaser3-rex-notes) — Post-processing pipeline used for object outlining.
*   [Stats.js](https://github.com/mrdoob/stats.js/) — Performance monitoring tool (FPS overlay).
