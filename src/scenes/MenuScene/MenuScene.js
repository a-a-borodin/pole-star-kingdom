import Scenes from '/src/constants/Scenes.js';
import Strings from '/src/constants/Strings.js';
import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import EventManager from '/src/utils/EventManager.js';
import TextButton from '/src/utils/TextButton.js';
import BagWindow from './Windows/BagWindow.js';
import StorageWindow from './Windows/StorageWindow.js';
import ShopWindow from './Windows/ShopWindow.js';

class MenuScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    init() {
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
        this.scene.bringToTop(Scenes.INVENTORY);
        this.player = this.scene.get(Scenes.MAIN).player;
        this.textManager = new TextManager(this);
        this.margin = 15;
    }

    create() {
        let container = this.add.container(0, 0);
        container.setSize(this.sceneWidth, this.sceneHeight);

        this.buttonsLayer = this.add.container(0, 0);
        this.buttonsLayer.setSize(container.width / 4, container.height);
        container.add(this.buttonsLayer);

        let buttonsLayerPanel = this.add.image(0, 0, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setDisplaySize(this.buttonsLayer.width, this.buttonsLayer.height)
            .setAlpha(0.65);
        this.buttonsLayer.add(buttonsLayerPanel);
        this.initButtons();

        this.inventoryLayer = this.add.container(this.buttonsLayer.x + this.buttonsLayer.width + container.width / 6, 0);
        this.inventoryLayer.setSize(container.width - this.inventoryLayer.x, container.height);
        container.add(this.inventoryLayer);
       
        let inventoryLayerPanel = this.add.image(0, 0, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setDisplaySize(this.inventoryLayer.width, this.inventoryLayer.height)
            .setAlpha(0.65);
        this.inventoryLayer.add(inventoryLayerPanel);

        this.inventoryButtonsLayer = this.add.container(0, 0)
            .setSize(this.inventoryLayer.width, this.inventoryLayer.height / 6);
        this.inventoryLayer.add(this.inventoryButtonsLayer);

        let inventoryButtonsLayerPanel = this.add.image(0, 0, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setDisplaySize(this.inventoryButtonsLayer.width, this.inventoryButtonsLayer.height)
            .setAlpha(0.6);
        this.inventoryButtonsLayer.add(inventoryButtonsLayerPanel);
        this.initInventoryButtons();
        
        this.initEvents();
        
        this.storageWindow = new StorageWindow(this,this.margin, this.inventoryButtonsLayer.y + this.inventoryButtonsLayer.height + this.margin, this.inventoryLayer.width - this.margin, this.inventoryLayer.height - this.inventoryButtonsLayer.y - this.inventoryButtonsLayer.height);
        this.inventoryLayer.add(this.storageWindow);
        this.storageWindow.setAlpha(0);

        this.shopWindow = new ShopWindow(this,this.margin, this.inventoryButtonsLayer.y + this.inventoryButtonsLayer.height + this.margin, this.inventoryLayer.width - this.margin, this.inventoryLayer.height - this.inventoryButtonsLayer.y - this.inventoryButtonsLayer.height);
        this.inventoryLayer.add(this.shopWindow);
        this.shopWindow.setAlpha(0);

        this.bagWindow = new BagWindow(this,this.margin, this.inventoryButtonsLayer.y + this.inventoryButtonsLayer.height + this.margin, this.inventoryLayer.width - this.margin, this.inventoryLayer.height - this.inventoryButtonsLayer.y - this.inventoryButtonsLayer.height);
        this.inventoryLayer.add(this.bagWindow);
        
        this.currentWindow = this.bagWindow;
    }

    update() {
        this.currentWindow.update();
    }

    initButtons() {
        let buttonFont = TextManager.Style.STROKE;
        buttonFont.fontSize = "35px";

        let delem = this.textManager.createText(0, this.buttonsLayer.height / 4 - this.margin, "──────────── ▪ ▪ ▪", TextManager.Style.STROKE, {fontSize:TextManager.FontSize.SMALL})
            .setOrigin(0);
        this.buttonsLayer.add(delem);

        let resumeButton = new TextButton(this, this.margin, delem.y + delem.displayHeight + this.margin, Strings.Resume, buttonFont, null, true).setOrigin(0);
        resumeButton.onClick(() => {
            this.scene.switch(Scenes.UI);
        });
        this.buttonsLayer.add(resumeButton);

        let settingsButton = new TextButton(this, this.margin, resumeButton.y + resumeButton.displayHeight + this.margin, Strings.Settings, buttonFont, null, true).setOrigin(0);
        settingsButton.onClick(() => {});
        this.buttonsLayer.add(settingsButton);
        settingsButton
            .disableInteractive()
            .setAlpha(0.4);

        let achievementsButton = new TextButton(this, this.margin, settingsButton.y + settingsButton.displayHeight + this.margin, Strings.Achievements, buttonFont, null, true).setOrigin(0);
        achievementsButton.onClick(() => {});
        this.buttonsLayer.add(achievementsButton);
        achievementsButton
            .setAlpha(0.4)
            .disableInteractive();
    }

    initInventoryButtons() {
        let inventoryButtonsLayer = this.inventoryButtonsLayer;
        let fn = (elem) => {
            inventoryButtonsLayer.getAll().forEach((child) => {
                if (child == elem) {
                    child.setFrame(0);
                    return;
                }
                if(child.button)
                child.setFrame(1);
            });
        };

        this.bagButton = this.add.image(this.margin, 0, Resources.Sprites.UI.Buttons.BagButton, 0).setInteractive().setOrigin(0);
        this.bagButton.on("pointerup", () => {
            this.bagWindow.setAlpha(1);
            this.storageWindow.setAlpha(0);
            this.shopWindow.setAlpha(0);
            this.currentWindow = this.bagWindow;
            fn(this.bagButton);
        });
        this.bagButton.button = true;
        this.bagButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.bagButton);

        this.shopButton = this.add.image(this.bagButton.x + this.bagButton.displayWidth + this.margin, 0, Resources.Sprites.UI.Buttons.ShopCoinButton, 1).setInteractive().setOrigin(0);
        this.shopButton.on("pointerup", ()=>{
            this.bagWindow.setAlpha(0);
            this.storageWindow.setAlpha(0);
            this.shopWindow.setAlpha(1);
            this.currentWindow = this.shopWindow;
            fn(this.shopButton);
        });
        this.shopButton.button = true;
        this.shopButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.shopButton);

        this.storageButton = this.add.image(this.shopButton.x + this.shopButton.displayWidth + this.margin, 0, Resources.Sprites.UI.Buttons.ChestButton, 1).setInteractive().setOrigin(0);
        this.storageButton.on("pointerup", () => {
            this.bagWindow.setAlpha(0);
            this.storageWindow.setAlpha(1);
            this.shopWindow.setAlpha(0);
            this.currentWindow = this.storageWindow;
            fn(this.storageButton);
        });
        this.storageButton.button = true;
        this.storageButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.storageButton);

        this.upgradesButton = this.add.image(this.storageButton.x + this.storageButton.displayWidth + this.margin, 0, Resources.Sprites.UI.Buttons.BookButton, 1).setInteractive().setOrigin(0);
        this.upgradesButton.on("pointerup", ()=>{
            fn(this.upgradesButton);
        });
        this.upgradesButton.button = true;
        this.upgradesButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.upgradesButton);
        this.upgradesButton.disableInteractive();
        this.upgradesButton.setAlpha(0);
    }

    initEvents() {
        EventManager.on(EventManager.Events.SHOP_COLLIDE_START, () => {
            this.shopButton.setInteractive();
            this.shopButton.setAlpha(1);
        });
        EventManager.on(EventManager.Events.SHOP_COLLIDE_FINISH, () => {
            this.shopButton.disableInteractive();
            this.shopButton.setAlpha(0.4);

            if(this.currentWindow == this.shopWindow) {
                this.currentWindow = this.bagWindow;
                this.bagWindow.setAlpha(1);
                this.shopWindow.setAlpha(0);
                this.bagButton.setFrame(0);
                this.shopButton.setFrame(1);
            }
        });

        EventManager.on(EventManager.Events.HOME_COLLIDE_START, () => {
            //this.upgradesButton.setInteractive();
            //this.upgradesButton.setAlpha(1);
            
            this.storageButton.setInteractive();
            this.storageButton.setAlpha(1);
        });
        EventManager.on(EventManager.Events.HOME_COLLIDE_FINISH, () => {
            this.upgradesButton.disableInteractive();
            this.upgradesButton.setAlpha(0);
            
            this.storageButton.disableInteractive();
            this.storageButton.setAlpha(0.4);

            if(this.currentWindow == this.storageWindow) {
                this.currentWindow = this.bagWindow;
                this.bagWindow.setAlpha(1);
                this.storageWindow.setAlpha(0);
                this.bagButton.setFrame(0);
                this.storageButton.setFrame(1);
            }
        });
    }
}

export default MenuScene;