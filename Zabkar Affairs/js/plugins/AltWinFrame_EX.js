/*
var Imported = Imported || {};
Imported.AltWindowFrame_EXjs = true;

var Alkain = Alkain || {};
Alkain.AltWinFrame_EX = Alkain.AltWinFrame_EX || {};
Alkain.AltWinFrame_EX.version = 0.25;
*/
//=============================================================================
// AltWindowFrame_EXjs
//=============================================================================

/*:
 * @plugindesc Alternative Windowframe Extension.
 * @author KADOKAWA & Alkain Studios
 *
 * @help This plugin does not provide plugin commands.
 * @requiredAssets img/system/Window_Talk
 * @requiredAssets img/system/Window_Battle
 * @requiredAssets img/system/Window_Status
 * @requiredAssets img/system/Window_Other
 * 
 * 
 * @param == Window Skins ==
 * @desc The folder that contains the links to your custom window skins.
 * @default
 * 
 * @param Window_Talk
 * @text Talk Window Skin
 * @desc For setting the talking window skin.
 * Default: Window_Talk
 * @default Window_Talk
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window_Battle
 * @text Battle Window Skin
 * @desc For setting the status window skin.
 * Default: Window_Battle
 * @default Window_Battle
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window_Status
 * @text Status Window Skin
 * @desc For setting the status window skin.
 * Default: Window_Status
 * @default Window_Status
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window_Items
 * @text Items Window Skin
 * @desc For setting the Item window skin.
 * Default: Window_Status_Item
 * @default Window_Status_Item
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window_Equip
 * @text Status Window Skin
 * @desc For setting the status window skin.
 * Default: Window_Equip
 * @default Window_Equip
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window_Quest
 * @text Quest Window Skin
 * @desc For setting the quest window skin.
 * Default: Window_Quest
 * @default Window_Quest
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window_Other
 * @text Extra Window Skin
 * @desc For setting other window skins that are from other plugins.
 * Default: Window_Other
 * @default Window_Other
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * @param Window
 * @text Base Window
 * @desc For setting the window skin well be used as the base skin
 * Default: Window
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 * @parent == Window Skins ==
 * 
 * 
 */

/*:ja
 * @plugindesc ウィンドウのフレームを変更します。
 * @author KADOKAWA
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * @requiredAssets img/system/Window_Talk
 * @requiredAssets img/system/Window_Battle
 * @requiredAssets img/system/Window_Status
 * @requiredAssets img/system/Window_Other
 */

 
//_.AltWindowFrame = {};
// var Parameters = PluginManager.parameters();


//var Window_Status = String(Parameters["Window Status"]);

//Alkain.Parameters = PluginManager.parameters('AltWinFrame_EX');
//Alkain.Param = Alkain.Param || {};

var params = PluginManager.parameters('AltWinFrame_EX');

var _Window_Talk = String(params['Window_Talk']);
var _Window_Battle = String(params['Window_Battle']);
var _Window_Status = String(params['Window_Status']);
var _Window_Items = String(params['Window_Items']);
var _Window_Equip = String(params['Window_Equip']);
var _Window_Quest = String(params['Window_Quest']);
var _Window_Other = String(params['Window_Other']);
var _Window = String(params['Window']);


(function() {
    //var Window_Status = String(Parameters["Window Status"]);

    Window_Base.prototype.loadWindowskin = function() {
        this.windowskin = ImageManager.loadSystem(_Window_Talk);
        this.windowskin = ImageManager.loadSystem(_Window_Battle);
        this.windowskin = ImageManager.loadSystem(_Window_Status);
        this.windowskin = ImageManager.loadSystem(_Window_Items);
        this.windowskin = ImageManager.loadSystem(_Window_Equip);
        this.windowskin = ImageManager.loadSystem(_Window_Quest);
        this.windowskin = ImageManager.loadSystem(_Window_Other);
        this.windowskin = ImageManager.loadSystem(_Window);
    };

    var _Scene_Title_Create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_Create.call(this);
        this._commandWindow._windowskin = ImageManager.loadSystem(_Window_Other);
        this._commandWindow._refreshAllParts();
    };

    var _Scene_Menu_Create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_Create.call(this);
        var _image = ImageManager.loadSystem(_Window_Status);
        this._statusWindow._windowskin = _image;
        this._commandWindow._windowskin = _image;
        this._goldWindow._windowskin = _image;

        this._statusWindow._refreshAllParts();
        this._commandWindow._refreshAllParts();
        this._goldWindow._refreshAllParts();
    };

    var _Scene_Item_Create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_Create.call(this);
        var _image = ImageManager.loadSystem(_Window_Items);
        this._categoryWindow._windowskin = _image;
        this._itemWindow._windowskin = _image;
        this._helpWindow._windowskin = _image;
        this._actorWindow._windowskin = _image;

        this._categoryWindow._refreshAllParts();
        this._itemWindow._refreshAllParts();
        this._helpWindow._refreshAllParts();
        this._actorWindow._refreshAllParts();
    }

    var _Scene_Skill_Create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function() {
        _Scene_Skill_Create.call(this);
        var _image = ImageManager.loadSystem(_Window_Status);
        this._helpWindow._windowskin = _image;
        this._skillTypeWindow._windowskin = _image;
        this._statusWindow._windowskin = _image;
        this._itemWindow._windowskin = _image;
        this._actorWindow._windowskin = _image;

        this._helpWindow._refreshAllParts();
        this._skillTypeWindow._refreshAllParts();
        this._statusWindow._refreshAllParts();
        this._itemWindow._refreshAllParts();
        this._actorWindow._refreshAllParts();
    };

    var _Scene_Equip_Create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_Create.call(this);
        var _image = ImageManager.loadSystem(_Window_Equip);
        this._helpWindow._windowskin = _image;
        this._statusWindow._windowskin = _image;
        this._commandWindow._windowskin = _image;
        this._slotWindow._windowskin = _image;
        this._itemWindow._windowskin = _image;

        this._helpWindow._refreshAllParts();
        this._statusWindow._refreshAllParts();
        this._commandWindow._refreshAllParts();
        this._slotWindow._refreshAllParts();
        this._itemWindow._refreshAllParts();
    };


    var _Scene_Status_Create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _Scene_Status_Create.call(this);
        this._statusWindow._windowskin = ImageManager.loadSystem(_Window_Status);
        this._statusWindow._refreshAllParts();
    };

    var _Scene_Options_Create = Scene_Options.prototype.create;
    Scene_Options.prototype.create = function() {
        _Scene_Options_Create.call(this);
        this._optionsWindow._windowskin = ImageManager.loadSystem(_Window_Status);
        this._optionsWindow._refreshAllParts();
    };

    var _Scene_File_Create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_Create.call(this);
        var _image = ImageManager.loadSystem(_Window_Status);
        this._helpWindow._windowskin = _image;
        this._listWindow._windowskin = _image;

        this._helpWindow._refreshAllParts();
        this._listWindow._refreshAllParts();
    };

    var _Scene_GameEnd_Create = Scene_GameEnd.prototype.create;
    Scene_GameEnd.prototype.create = function() {
        _Scene_GameEnd_Create.call(this);
        this._commandWindow._windowskin = ImageManager.loadSystem(_Window_Status);
        this._commandWindow._refreshAllParts();
    };

    var _Scene_Battle_Create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function() {
        _Scene_Battle_Create.call(this);

        var _image = ImageManager.loadSystem(_Window_Battle);

        this._logWindow._windowskin          = _image;
        this._statusWindow._windowskin       = _image;
        this._partyCommandWindow._windowskin = _image;
        this._actorCommandWindow._windowskin = _image;
        this._helpWindow._windowskin         = _image;
        this._skillWindow._windowskin        = _image;
        this._itemWindow._windowskin         = _image;
        this._actorWindow._windowskin        = _image;
        this._enemyWindow._windowskin        = _image;
        this._messageWindow._windowskin      = _image;
        this._scrollTextWindow._windowskin   = _image;

        this._logWindow._refreshAllParts(); 
        this._statusWindow._refreshAllParts();  
        this._partyCommandWindow._refreshAllParts();    
        this._actorCommandWindow._refreshAllParts();    
        this._helpWindow._refreshAllParts();    
        this._skillWindow._refreshAllParts();   
        this._itemWindow._refreshAllParts();    
        this._actorWindow._refreshAllParts();   
        this._enemyWindow._refreshAllParts();   
        this._messageWindow._refreshAllParts(); 
        this._scrollTextWindow._refreshAllParts();  
    };

    var _Window_Message_Initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function() {
        _Window_Message_Initialize.call(this);
        this.windowskin = ImageManager.loadSystem(_Window_Talk);   
        this._refreshAllParts();
    };

    Window.prototype._refreshFrame = function() {
        var w = this._width;
        var h = this._height;
        var m = 24;
        var bitmap = new Bitmap(w, h);

        this._windowFrameSprite.bitmap = bitmap;
        this._windowFrameSprite.setFrame(0, 0, w, h);

        if (w > 0 && h > 0 && this._windowskin) {
            var skin = this._windowskin;

            // frame
            var p = 96;
            var q = 96;
            bitmap.blt(skin, p+0,   0+0,   m,     m,     0,   0,   m,     m);       // left top corner
            bitmap.blt(skin, p+0,   0+q-m, m,     m,     0,   h-m, m,     m);       // left bottom corner
            bitmap.blt(skin, p+q-m, 0+0,   m,     m,     w-m, 0,   m,     m);       // right top corner
            bitmap.blt(skin, p+q-m, 0+q-m, m,     m,     w-m, h-m, m,     m);       // right bottom corner

            var frameHeight = 48;
            var heightCount = Math.floor((h-frameHeight) / frameHeight);
            var remainder = (h-frameHeight) % frameHeight;            
            for(var i = 0; i < heightCount; i++) {
                bitmap.blt(skin, p+0,   0+m, m, p-m*2, 0,   m+frameHeight*i, m, frameHeight);   // left frame
                bitmap.blt(skin, p+q-m, 0+m, m, p-m*2, w-m, m+frameHeight*i, m, frameHeight);   // right frame
            }
            if(remainder != 0) {
                bitmap.blt(skin, p+0,   0+m, m, remainder, 0,   m+frameHeight*heightCount, m, remainder);   // left frame
                bitmap.blt(skin, p+q-m, 0+m, m, remainder, w-m, m+frameHeight*heightCount, m, remainder);   // right frame
            }

            var frameWidth = 48;
            var widthCount = Math.floor((w-frameWidth) / frameWidth);
            remainder = (w-frameWidth) % frameWidth;
            for(var j = 0; j < widthCount; j++) {
                bitmap.blt(skin, p+m,   0+0,   p-m*2, m, m+frameWidth*j, 0,   frameWidth, m); // top frame
                bitmap.blt(skin, p+m,   0+q-m, p-m*2, m, m+frameWidth*j, h-m, frameWidth, m); // bottom frame
            }
            if(remainder != 0) {
                bitmap.blt(skin, p+m,   0+0,   remainder, m, m+frameWidth*widthCount, 0,   remainder, m); // top frame                
                bitmap.blt(skin, p+m,   0+q-m, remainder, m, m+frameWidth*widthCount, h-m, remainder, m); // bottom frame
            }


            // corner
            var r = 48;
            var s = 48;
            bitmap.blt(skin, 0,   0+q*4, r, s, 0,   0,   r, s); // left top
            bitmap.blt(skin, r,   0+q*4, r, s, w-r, 0,   r, s); // right top
            bitmap.blt(skin, r*2, 0+q*4, r, s, 0,   h-r, r, s); // left bottom
            bitmap.blt(skin, r*3, 0+q*4, r, s, w-r, h-r, r, s); // right bottom

        }
    };

    Window.prototype._refreshBack = function() {
        var m = this._margin + 6;
        var w = this._width - m * 2;
        var h = this._height - m * 2;
        var bitmap = new Bitmap(w, h);

        this._windowBackSprite.bitmap = bitmap;
        this._windowBackSprite.setFrame(0, 0, w, h);
        this._windowBackSprite.move(m, m);

        if (w > 0 && h > 0 && this._windowskin) {            
            var p = 192;
            for (var y = 0; y < h; y += p) {
                for (var x = 0; x < w; x += p) {
                    bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
                }
            }
        }
    };

})();
