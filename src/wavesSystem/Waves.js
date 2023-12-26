import Enemies from '/src/gameObjects/entity/enemy/Enemies.js';
import Resources from '/src/constants/Resources.js';


const Waves = new Map([
    [1, {
        enemy:Enemies.SlimeGreen,
        enemiesAmount:10,
        description:"At this wave you can fill your inventory with different potions. Your enemies - green slimes. They are slow, and don't have armor!",
        title:"Green Slime's Wave",
    }],
    
    [2, {
        enemy:Enemies.WolfBlack,
        enemiesAmount:6,
        description:"Black wolfs are dangerous enemies, from wild forests, they are fast, have some defense and lot of damage. You can get some equipment at this wave.",
        title:"Black Wolf's Wave"
    }],
    
    [3, {
        enemy:Enemies.WolfWhite,
        enemiesAmount:6,
        description:"White wolf is parent of black wolf. White wolfes have more damage,speed and armor. You can get some equipment at this wave.",
        title: "White Wolf's Wave"
    }],
    
    [4, {
        enemy:Enemies.AlienBlue,
        enemiesAmount:4,
        description:"Enemy from other planet!  Blue aliens have high damage and armor, but attacks cooldown is slow. You can get some equipment at this wave.",
        title:"Blue Alien's Wave",
    }],
]);

for(let i = 1; i <= Waves.size; i++){
    let wave = Waves.get(i);
    wave.currentTime = 0;
    wave.currentKills = 0;
    wave.currentEnemy = 0;
    wave.isStarted = false;
    wave.icon = {
        texture:Resources.Sprites.UI.Icons.EnemyIcons,
        frame:i-1,
    };
    wave.warpCost = Math.floor(i*1.5);
    wave.maxTime = 200000;
    wave.id = i;
}

export default Waves;