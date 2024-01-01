import PreloaderScene from '/src/scenes/PreloaderScene.js';
import MainMenuScene from '/src/scenes/MainMenuScene.js';
import MainScene from '/src/scenes/MainScene.js';
import UIScene from '/src/scenes/UIScene.js';
import MenuScene from '/src/scenes/MenuScene/MenuScene.js';
import Scenes from '/src/constants/Scenes.js';
import Strings from '/src/constants/Strings.js';
import Resources from '/src/constants/Resources.js';

const TARGET_WIDTH = 960;
const TARGET_HEIGHT = 540;
const PARENT = Strings.APP_NAME;

let preloaderScene = new PreloaderScene({
	key: Scenes.PRELOADER,
	pack: {
		files: [{
			type: "spritesheet",
			key: Resources.Sprites.UI.ProgressBars.GreenSimple,
			url: "assets/sprites/ui/progressBars/greenProgressBarSimple.png",
			frameConfig: {
				frameWidth: 10,
				frameHeight: 10
			}
		}, ]
	}
});
let mainMenuScene = new MainMenuScene({
	key: Scenes.MAIN_MENU,
});
let mainScene = new MainScene({
	key: Scenes.MAIN,
});
let uiScene = new UIScene({
	key: Scenes.UI,
});
let menuScene = new MenuScene({
	key: Scenes.MENU,
});

let scenes = [
	preloaderScene,
	mainMenuScene,
	mainScene,
	uiScene,
	menuScene,
];

let config = {
	type: Phaser.CANVAS,
	parent: PARENT,
	width: TARGET_WIDTH,
	height: TARGET_HEIGHT,
	pixelArt: false,
	antialias: false,
	autoRound: false,
	roundPixels: false,
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {
				y: 1000,
			}
		}
	},
	scene: scenes,
};

let game = new Phaser.Game(config);