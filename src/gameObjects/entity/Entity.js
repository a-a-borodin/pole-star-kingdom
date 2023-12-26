import Inventory from "/src/inventorySystem/Inventory.js";
import TextManager from '/src/utils/TextManager.js';
import Colors from '/src/constants/Colors.js';
import ProgressBar from '/src/utils/ProgressBar.js';
import Resources from '/src/constants/Resources.js';
import EventCenter from '/src/constants/EventCenter.js';
import Events from '/src/constants/Events.js';

class Entity extends Phaser.Physics.Arcade.Sprite {
    stats = {};
    _anims = {};
    inventory = new Inventory(9);
    
    constructor(scene, x, y, texture, frame, stats, anims) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds();
        this.textManager = new TextManager(scene);
        this.scene = scene;
        this.setAttackReady(true);
        this.setBounce(0.3);
        Object.assign(this.stats, stats);
    
        if (anims != undefined) {
            this._anims = anims;
            this.generateAnims(anims);
            
            if (anims.idle != undefined)
                this.play(anims.idle.key, true);
        }

        this.setHealthBar(new ProgressBar(scene, x, y, 60, 6, {
            background: scene.add.sprite(0, 0, Resources.Sprites.UI.ProgressBars.GreenSimple, 0),
            progressBar: scene.add.sprite(30, 0, Resources.Sprites.UI.ProgressBars.GreenSimple, 1).setOrigin(1, 0.5),
            maxProgress: this.getMaxHealth(),
            progress: this.getHealth(),
        }).setAlpha(0));

        this.healthBarFollowTimer = this.scene.time.addEvent({
            delay: 10,
            callback: () => {
                this.getHealthBar().setPosition(this.x, this.y - this.displayHeight / 2);
            },
            callbackScope: this,
            loop: true,
        });

        this.healthRegenTimer = this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                if (this.getHealthRegen() == undefined)
                    return;

                if (this.getHealth() < this.getMaxHealth()) {
                    let healEq = this.getMaxHealth() - this.getHealth();
                    let healAmount = this.getHealthRegen();
                    if (healAmount > healEq)
                        healAmount = healEq;

                    this.setHealth(this.getHealth() + healAmount);
                }
            },
            callbackScope: this,
            repeat: -1,
        });
    }
    
    generateAnims(anims) {
       for (let key in anims) {
            let anim = anims[key];
            this.scene.anims.create({
                key: anim.key,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
                    frames: anim.frames
                }),
                frameRate: anim.frameRate,
                repeat: anim.repeat,
            });
        }
    }

    getHealthBar() {
        return this.healthBar;
    }

    setHealthBar(bar) {
        this.healthBar = bar;
    }

    getDamage() {
        return this.stats.damage;
    }

    setDamage(damage) {
        this.stats.damage = damage;
    }

    getSpeed() {
        return this.stats.speed;
    }

    setSpeed(speed) {
        this.stats.speed = speed;
    }

    getHealth() {
        return this.stats.health;
    }

    setHealth(health) {
        health = parseFloat(health.toFixed(1));
        if(health < 0)
            health = 0;
            
        let fancyTextColor;
        let fancyText;
        if (this.getHealth() > health){
            fancyTextColor = Colors.RED;
            fancyText = this.getHealth() - health;
        } 
        if (this.getHealth() < health) {
            fancyText = health - this.getHealth();
            fancyTextColor = Colors.GREEN;
        }
        if (this.getHealth() == health){
            fancyText = health - this.getHealth();
            fancyTextColor = Colors.GREY;
        }
        
        EventCenter.emit(Events.SHOW_FANCY_TEXT, {
            x: this.x,
            y: this.y,
            title: parseFloat(fancyText.toFixed(2)),
            color: fancyTextColor,
            scene: this.scene,
        });

        this.stats.health = health;
        if (this.stats.health > this.getMaxHealth())
            this.stats.health = this.getMaxHealth();

        if (this.getHealthBar() != undefined)
            this.getHealthBar().setProgress(health);
    }
    
    getHealthRegen() {
        return this.stats.healthRegen;
    }

    setHealthRegen(value) {
        this.stats.healthRegen = value;
    }


    getMaxHealth() {
        return this.stats.maxHealth;
    }

    setMaxHealth(health) {
        if (this.getHealthBar() != undefined)
            this.getHealthBar().setMaxProgress(health);

        this.stats.maxHealth = health;
    }

    getJumpPower() {
        return this.stats.jumpPower;
    }

    setJumpPower(jumpPower) {
        this.stats.jumpPower = jumpPower;
    }

    setDefense(value) {
        this.stats.defense = value;
    }

    getDefense() {
        return this.stats.defense;
    }

    getInventory() {
        return this.inventory;
    }

    getScore() {
        return this.stats.score;
    }

    setScore(score) {
        this.stats.score = score;
    }

    isOnGround() {
        return this.isOnGround;
    }

    setOnGround(value) {
        this.isOnGround = value;
    }

    getAttackSpeed() {
        return this.stats.attackSpeed;
    }

    setAttackSpeed(attackSpeed) {
        this.stats.attackSpeed = attackSpeed;
    }

    getKnockback() {
        return this.stats.knockback;
    }

    setKnockback(value) {
        this.stats.knockback = value;
    }

    setDead(value) {
        this.dead = value;
    }

    isDead() {
        return this.dead;
    }

    setGround(ground) {
        this.ground = ground;
        this.scene.physics.add.collider(this, this.ground);
    }

    getGround() {
        return this.ground;
    }

    setKnocked(value) {
        this.knocked = value;
    }

    isKnocked() {
        return this.knocked;
    }

    isAttackReady() {
        return this.attackReady;
    }

    setAttackReady(value) {
        this.attackReady = value;
    }

    onDead(func) {
        this.onDeadFunc = func;
    }

    onDestroy(func) {
        this.onDestroyFunc = func;
    }

    _onAttacked() {
        if (this._anims.hurt != undefined) {
            this.stopPlayingAnims = true;
            this.play(this._anims.hurt.key, true);
            this.on("animationcomplete", () => {
                this.stopPlayingAnims = false;
            });
        }
    }

    setEnemy(enemy) {
        this.enemy = enemy;
        this.scene.physics.add.overlap(this.enemy, this, () => {
            this.attack(enemy);
        });
    }

    getEnemy() {
        return this.enemy;
    }

    moveLeft() {
        if (this.isDead() || this.isKnocked())
            return;

        if (!this.stopPlayingAnims) {
            if (this._anims.walk != undefined)
                this.play(this._anims.walk.key, true);
            this.flipX = true;
        }

        this.setVelocityX(-this.getSpeed());
    }

    moveRight() {
        if (this.isDead() || this.isKnocked())
            return;

        if (!this.stopPlayingAnims) {
            if (this._anims.walk != undefined)
                this.play(this._anims.walk.key, true);
            this.flipX = false;
        }

        this.setVelocityX(this.getSpeed());
    }

    stopMove() {
        if (this.isDead() || this.isKnocked())
            return;

        if (this._anims.idle != undefined && !this.stopPlayingAnims)
            this.play(this._anims.idle.key, true);

        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    moveToObject(object) {
        if (this.isDead() || this.isKnocked())
            return;

        if (object.isDead()) {
            this.stopMove();
            return;
        }

        if (!this.stopPlayingAnims) {
            if (this._anims.run != undefined)
                this.play(this._anims.run.key, true);

            if (this.x >= object.x) {
                this.flipX = true;
            } else {
                this.flipX = false;
            }
        }

        this.scene.physics.moveToObject(this, {
            x: object.x,
            y: this.y
        }, this.getSpeed());
    }

    jump() {
        if (this.isDead())
            return;

        if (this._anims.jump != undefined && !this.stopPlayingAnims)
            this.play(this._anims.jump.key, true);

        this.setVelocityY(-this.getJumpPower());
    }

    attack(object) {
        if (this.isDead() || object.isDead() || !this.isAttackReady())
            return;

        this.setAttackReady(false);
        object._onAttacked();

        if (this.x >= object.x) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }

        if (this._anims.attack != undefined) {
            this.stopPlayingAnims = true;
            this.play(this._anims.attack.key, true);
            this.on("animationcomplete", () => {
                this.stopPlayingAnims = false;
            });
        }

        let percent = 100 * (object.getDefense() / (object.getDefense() + 100));

        let damage = this.getDamage() - (this.getDamage() / 100) * percent;
        if (damage < 0) damage = 0;

        object.setHealth(object.getHealth() - damage);
        if (object.getHealth() <= 0)
            object.kill();

        // this.createStatsText(object,damage,Colors.RED);
        this.knockObject(object);

        this.attackTimer = this.scene.time.addEvent({
            delay: this.getAttackSpeed(),
            callback: () => {
                this.setAttackReady(true);
            },
            callbackScope: this,
            loop: false,
        });

        this.healthRegenTimer.reset(this.healthRegenTimer);
        this.getHealthBar().setAlpha(1);

        if (this.healthBarTimer != undefined)
            this.healthBarTimer.remove();

        this.healthBarTimer = this.scene.time.addEvent({
            delay: 1300,
            callback: () => {
                this.getHealthBar().setAlpha(0);
            },
            callbackScope: this,
            repeat: 0,
        });
    }

    knockObject(object) {
        object.setKnocked(true);

        if (this.x >= object.x) {
            object.setVelocityX(-this.getKnockback());
        } else {
            object.setVelocityX(this.getKnockback());
        }

        this.knockBackTimer = this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                object.setVelocityX(0);
                object.setKnocked(false);
            },
            callbackScope: this,
            loop: false,
        });
    }

    kill() {
        this.stopMove();
        this.anims.stop();
        this.setDead(true);

        if (this.onDeadFunc != undefined)
            this.onDeadFunc();

        if (this._anims.dead != undefined) {
            this.play(this._anims.dead.key, true);
            this.on("animationcomplete", () => {
                this._kill();
            });
        } else {
            this._kill();
        }
    }

    _kill() {
        this.dyingTween = this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: 'Sine.easeInOut',
            duration: 5000,
            repeat: 0,
            yoyo: false,
        }).on("complete", () => {
            if (this.onDestroyFunc != undefined)
                this.onDestroyFunc();
            this.destroy();
        });
    }
}

export default Entity;