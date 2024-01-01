const Misc = {
    FLASH_DURATION: 500,
    MAX_TOUCH_COUNT: 4,
    DISABLE_ELEMENT_OPACITY: 0.7,

    Colors: {
        GREY: "#808080",
        WHITE: "#FFFFFF",
        BLACK: "#000000",
        DARK: "#222222",
        GREEN: "#99FF99",
        BROWN: "#b36523",
        PINK: "#d676e5",
        YELLOW: "#FFFF00",
        BLUE: "#33bee0",
        RED: "#d83e3e",
    },

    fancyTimeFormat : function(duration) {
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
    },
   
    FontFamily: {
        PixelFont: "pixelFont"
    }
};

export default Misc;