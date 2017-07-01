//=============================================================================
// GameoverMovie.js
//=============================================================================

/*:
 * @plugindesc Plays a gameover movie for game over.
 * @author Zach Aars
 *
 * @help This plugin does not provide plugin commands.
 *
 *
 * @param Gameover Movie
 * @desc The movie to use when showing "Gameover"
 * Default: GameoverMovie
 * @default GameoverMovie
 * @require 1
 * @dir movies
 * @type file
 *
 * @param Show Movie
 * @desc Enabled/Disables showing the Gameover Movie.
 * OFF - false     ON - true
 * Default: ON
 * @default true
 *
 */

var params = PluginManager.parameters('GameoverMovie');
var ShowMovie = Boolean('skip Movie' || true);
var Movie = file('GameOver Movie' || 'GameOver Movie');
var BattleMan = BattleManager.updateBattleEnd;

Scene_Gameover.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.playGameoverMusic();
    this.createBackground();
	this.Graphics.playVideo();
};