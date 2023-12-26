import Colors from '/src/constants/Colors.js';

class TextManager {
    constructor(parent) {
        this.parent = parent;
        
        TextManager.SIMPLE = "simple";
        TextManager.STROKE = "stroke";
    }
  
    createText(x, y, text, style = null, fontSize = "30px", thickness = "7px") {
        let textConfig = TextManager.getStyle(style);
        let textObj;
        if (style == null) {
            textObj = this.parent.add.text(x, y, text);
        } else {
            textObj = this.parent.add.text(x, y, text, textConfig);
        }
        textObj.setFontSize(fontSize);
        textObj.setStroke(thickness);
        
        return textObj;
    }
    
    static getStyle(style) {
        var textConfig = null;
        switch (style) {
            case TextManager.SIMPLE:
                textConfig = {
                    fontSize:"30px",
                    color:Colors.WHITE,
                    fontFamily:"PixelFont",
                    resolution:10,
                };
            break;
            case TextManager.STROKE:
                textConfig = {
                    fontSize:"30px",
                    color:Colors.WHITE,
                    fontFamily:"PixelFont",
                    stroke:Colors.DARK,
                    strokeThickness:7,
                    resolution:10,
                    //wordWrap: { width: 100, useAdvancedWrap: true }
                };
            break;
        }
        return textConfig;
    }
}

export default TextManager;