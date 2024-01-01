import Misc from '/src/utils/Misc.js';

class TextManager {
    constructor(parent) {
        this.parent = parent;

        TextManager.FontSize = {
            SMALL: "20px",
            NORMAL: "30px",
            BIG: "40px",
        };

        TextManager.Style = {
            SIMPLE: {
                fontSize: TextManager.FontSize.NORMAL,
                color: Misc.Colors.WHITE,
                fontFamily: Misc.FontFamily.PixelFont,
                resolution: 10,
            },
            STROKE: {
                fontSize: TextManager.FontSize.NORMAL,
                color: Misc.Colors.WHITE,
                fontFamily: Misc.FontFamily.PixelFont,
                stroke: Misc.Colors.DARK,
                strokeThickness: 7,
                resolution: 10,
            }
        };

    }

    createText(x, y, text, style = TextManager.Style.SIMPLE, config) {
        let textObj = this.parent.add.text(x, y, text, style);

        if (config) {
            if (config.fontSize)
                textObj.setFontSize(config.fontSize);
            if (config.strokeColor && config.strokeThickness)
                textObj.setStroke(config.strokeColor, config.strokeThickness);
        }

        return textObj;
    }
}

export default TextManager;