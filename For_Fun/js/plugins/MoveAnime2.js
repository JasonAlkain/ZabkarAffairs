//=============================================================================
// MoveAnime2.js
//=============================================================================
//Copyright (c) 2016 Trb
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//twitter https://twitter.com/Trb_surasura
/*: 
 * @plugindesc Plug-in skip animation 2
 * @author Trb
 *
 * @version 1.0 (2.0) 2016 4/22 Previously changed from Move_anime.js, so it changed as a separate plugin
 * 			1.1 2016 7/4 Fixed a bug that the starting point of the animation became wrong when the animation display position was [overhead], [center]
 *
 *
 * @help Animation can be skipped from the user to the other party.
 * There are two kinds of setting method, writing in the memo field of the skill and setting by the script command.
 *
 * ---- Setting method 1 ----
 * In the memo field of the skill
 * <Move: a>
 * <Arc: b>
 * <Deflection: c>
 * <Repeat: d>
 Please write *. (Enter arbitrary numbers in a, b, c, d respectively)
 * Movement setting is mandatory, but otherwise it is okay if blanking is not required.
 *
 * <Move: a>
 * The number of frames to move animation.
 * (If you want to skip over 10 frames, write <move: 10>)
 *
 * <Arc: b>
 * Setting this value will fly in the parabolic trajectory of height b.
 * (Arc: 1 = 1 pixel at standard resolution)
 *
 * <Deflection: c>
 * If this value is set, a random number of plus or minus c is added to the value of arc.
 * (When writing <(arc: 50> <deflection: 100>, the actual arc value will be in the range of -50 to 150)
 * Applying this setting to the multi-step hit technique will make it look like a disturbance shoot.
 *
 * <Repeat: d>
 * When this value is set, the same animation is played repeatedly d times.
 * This is a problem in which animation is displayed only once when consecutive attacks are put in YEP_BattleCore
 * It is a function added to correspond,
 * Please note that if it is used alone, the original number of times of playback * d times will be played.
 *
 *
 * ---- Setting method 2 ----
 * Script command: setParams (animation ID, move value, arc value, deflection value)
 *, You can specify parameters by specifying animation ID.
 * An event command, an animation displayed by another plug-in, an animation in a field,
 * Please use here if you can not set it in the memo field of skill.
 *
 * Example If you want to make animation of ID No. 5 skip in 10 frames
 Write like setParams (5, 10)
 * (As with the memo field, arc value, deflection value can be omitted if unnecessary)
 *
 * Once it is set, it is valid unless overwritten with another value, so at the beginning of the game
 * It is convenient to set it all together at the event.
 * However, if you do not set a variable for saving, it will not be saved in the save data.
 *
 *
 * ================================================= =============
 *
 * ---- other functions ----
 *
 * SetStartPosition (animation ID, x, y)
 * If this value is set, the start position of the animation is not the user of the skill
 * It becomes the specified coordinates.
 *
 *
 * Example Make it to skip the animation of ID 10 from the coordinates (100, 200)
 * SetParams_sp (10, 100, 200)
 *
 *
 * ClearParams (animation ID)
 * Resets all the settings of the specified animation ID.
 *
 *
 *
 * @ Param use_field
 * Do you want to make animation skip even on the @desc field
 * Not used in the field · · · false Used · · · true
 * @ Default false
 *
 * @ Param variable
 * @ Desc Variable number to save the value set with setParams.
 * If it is 0, it will not be saved.
 * @ Default 0
 *
 *
 */
(function () {
	
	var parameters = PluginManager.parameters('MoveAnime2');
	var UseField = String(parameters['use_field']);
	var Variable = parameters['variable'];
	
	var params = [];
	var subjectX = 0;//使用者の座標
	var subjectY = 0;
	//paramsの中身
	var moveDuration = 0, arcRate = 1,deflection = 2,repeats = 3,startX = 4,startY = 5;

//各設定値の代入用関数
	setParams = function(id,move,arc,def,rep){
		id = Math.max(id,0);
		if(!params[id])params[id] = [];
		params[id][moveDuration] = move || 0;
		params[id][arcRate] = arc || 0;
		params[id][deflection] = def || 0;
		params[id][repeats] = rep || 0;
	};

	setStartPosition = function(id,a,b){
		if(!params[id])params[id] = [];
		params[id][startX] = a;
		params[id][startY] = b;
	};

	clearParams = function(id){
		params[id] = [];
	};



	var SBu = Sprite_Battler.prototype.update;
	Sprite_Battler.prototype.update = function() {
		SBu.call(this);
		//行動中のキャラの座標を取得する
		if(this._battler != null && this._battler.isActing()){
			if(!$gameSystem.isSideView() && this._actor){
				//フロントビューの場合
				subjectX = Graphics.boxWidth / 2;
				subjectY = Graphics.boxHeight * 0.8;				
			}else{
				subjectX = this.x;
				subjectY = this.y;
			}
		}
		
	};
	
	var WBsa = Window_BattleLog.prototype.startAction;
	Window_BattleLog.prototype.startAction = function(subject, action, targets) {
		var item = action.item();
		if(Number(item.meta.move)>0){//スキルのメモにムーブ値が設定されていたら代入
			setParams(item.animationId,Number(item.meta.move),Number(item.meta.arc) || 0,
				Number(item.meta.deflection) || 0,Number(item.meta.repeat) || 0);
		}
		WBsa.call(this,subject, action, targets);
	};

	
	Window_BattleLog.prototype.showNormalAnimation = function(targets, animationId, mirror) {
		var animation = $dataAnimations[animationId];
		if (animation) {
			var delay = this.animationBaseDelay();
			var nextDelay = this.animationNextDelay();
			targets.forEach(function(target) {
				target.startAnimation(animationId, mirror, delay);
				delay += nextDelay;
				var repeat = params[animationId] ? params[animationId][repeats] : 0;
				while(repeat > 0 ){//repeat値の分アニメーションを繰り返す処理を追加
					target.startAnimation(animationId, mirror, delay);
					delay += nextDelay;
					repeat -= 1;
				}
			});
		}
	};


	var SAim = Sprite_Animation.prototype.initMembers;
	Sprite_Animation.prototype.initMembers = function() {
		SAim.call(this);
		this._x2 = 0;
		this._y2 = 0;
		this._duration2 = 0;
		this._arcRate = 0;
		this._arc = 0;
	};

	//アニメーションのセットアップ時に各パラメータを代入
	var SAs = Sprite_Animation.prototype.setup;
	Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
		if(params[animation.id] ){
			var prm = params[animation.id];
			if(prm[startX]){//startXが設定されてる場合はその値
				var sx = mirror ? Graphics.boxWidth - prm[startX] : prm[startX];
			}else{//そうでない場合は技使用者の座標
				sx = $gameParty.inBattle() ? subjectX : $gamePlayer.screenX();
			}
			if(prm[startY]){
				var sy = prm[startY];
			}else{
				sy = $gameParty.inBattle() ? subjectY : $gamePlayer.screenY();
			}
			
			if($gameParty.inBattle()){//戦闘時
				var t =target._battler ? target : target.parent;
				var pos = animation.position;//アニメーションのポジションに応じて位置補正を加える（ver.1.1修正箇所）
				this._x2 = sx - t.x;
				this._y2 = sy - t.y - t.height * (pos - 2) / 2;//

			}else if(UseField == 'true'){//フィールド時
				this._x2 = sx - target.x;
				this._y2 = sy - target.y;

			}
			this._duration2 = prm[moveDuration];
			this._arc = this._duration2;
			this._arcRate = prm[arcRate] + (Math.random() - 0.5) * prm[deflection] * 2;

		}
		SAs.call(this,target, animation, mirror, delay);
	};
	
	//上で代入した値を元に位置補正を加える
	var SAup = Sprite_Animation.prototype.updatePosition;
	Sprite_Animation.prototype.updatePosition = function() {
		SAup.call(this);
		//表示位置補正の計算
		if(this._duration2 > 0){
			this._x2 -= this._x2/this._duration2;
			this._y2 -= this._y2/this._duration2;
			this.x += this._x2;
			this.y += this._y2 - Math.sin(this._duration2 / this._arc * Math.PI) * this._arcRate;
			this._duration2 -= 1;
		}
	};


	//セーブ時にparamsを変数に入れる
	var SSof = Scene_Save.prototype.onSavefileOk;
	Scene_Save.prototype.onSavefileOk = function() {
		if(Variable > 0){
			$gameVariables._data[Variable] = params.clone();
		}
		SSof.call(this);
	};

	//ロード時にparamsに移す
	var SLol = Scene_Load.prototype.onLoadSuccess;
	Scene_Load.prototype.onLoadSuccess = function() {
		if(Variable > 0){
			try{
				params = $gameVariables._data[Variable].clone();
			}
			catch(e){}
		}
		SLol.call(this);
	};



})();