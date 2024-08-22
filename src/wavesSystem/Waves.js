import Enemies from '/src/gameObjects/entity/enemy/Enemies.js';
import Resources from '/src/constants/Resources.js';


const Waves = new Map([
    [1, {
        enemy:Enemies.SlimeGreen,
        enemiesAmount:10,
        description:"Your enemy - green slime. They are slow and don't have any armor! *At this wave you can fill your inventory with different potions",
        title:"Green Slime's Wave",
    }],
    
    [2, {
        enemy:Enemies.WolfBlack,
        enemiesAmount:6,
        description:"The black wolf is dangerous enemy from wild forests. They are fast, have some armor and a lot of damage. Beware of razor-sharp fangs! *You can get some equipment at this wave",
        title:"Black Wolf's Wave"
    }],
    
    [3, {
        enemy:Enemies.WolfWhite,
        enemiesAmount:6,
        description:"The white wolf is the parent of the black wolf. White wolfes have more damage, speed and armor. *You can get some equipment at this wave",
        title: "White Wolf's Wave"
    }],
    
    [4, {
        enemy:Enemies.AlienBlue,
        enemiesAmount:4,
        description:"An enemy from another planet! Blue aliens have high damage and armor, but their attack's cooldown is very slow. *You can get some equipment at this wave",
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