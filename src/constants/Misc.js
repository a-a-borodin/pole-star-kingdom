const Misc = {
    FLASH_DURATION: 500,
    MAX_TOUCH_COUNT: 4,
};

Misc.fancyTimeFormat = function fancyTimeFormat(duration) {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
};

Misc.getContainerSize = function(scene, con) {
    var top = scene.game.config.height;
    var bottom = 0;
    var left = scene.game.config.width;
    var right = 0;

    con.iterate(function(child) {
        var childX = child.x;
        var childY = child.y;

        var childW = child.displayWidth;
        var childH = child.displayHeight;

        var childTop = childY - (childH * child.originY);
        var childBottom = childY + (childH * (1 - child.originY));
        var childLeft = childX - (childW * child.originX);
        var childRight = childX + (childW * (1 - child.originY));

        if (childBottom > bottom) {
            bottom = childBottom;
        }
        if (childTop < top) {
            top = childTop;
        }
        if (childLeft < left) {
            left = childLeft;
        }
        if (childRight > right) {
            right = childRight;
        }
    }.bind(this));
    var h = Math.abs(top - bottom);
    var w = Math.abs(right - left);
    return {
        width: w,
        height: h
    };
};

export default Misc;