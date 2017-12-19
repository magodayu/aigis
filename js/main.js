$(function(){
	var crystalLimitCheck = function(crystal){
		if(crystal<=0){
			alert("消費結晶が0以下のため+5で計算します");
			return 5;
		}else {
			return crystal;
		}
	}

	var unitLimitCheck = function(unit){
		if(unit<=0){
			alert("ユニット追加数が0以下のため+1で計算します");
			return 1;
		}else {
			return unit;
		}
	}
	//使用した合計金額を計算(推定)
	var oikuramanen = function(allCrystal){

	}
	//画像を表示（Storage）
	var loadStorageImages = function(){

	}

	//Storageへのデータの保存
	var saveStorage = function(called_realyty){
		//保存するStorage選択
		var Storage = sessionStorage;
		//初回呼び出し
		var array = new Array();
		var json2 = Storage.getItem("aigis");

		var realyty = called_realyty;
		//Storageがなければ新規作成しながら登録
		if(json2 == null){
			array.push(realyty);
			Storage.setItem("aigis",JSON.stringify(array));
		}else {
			//既にあるデータに新しいデータを追加する
			var array2 = JSON.parse(json2);
				array2.push(realyty);
				if(array2.length %30 ==0){
					array2.push("<br>");
				}
			Storage.setItem("aigis",JSON.stringify(array2));

		}
	}

	//レアリティの確率の計算と出力
	var averageCalc = function(allNum,silverNum,goldNum,platinumNum,blackNum){
		if(allNum > 0){
			//総数が０以上で除算して平均を求める
			var s_average = new BigNumber(silverNum).div(allNum).round(2).times(100);
			var g_average = new BigNumber(goldNum).div(allNum).round(2).times(100);
			var p_average = new BigNumber(platinumNum).div(allNum).round(2).times(100);
			var b_average = new BigNumber(blackNum).div(allNum).round(2).times(100);
		}else {
			//総数が０だった場合平均に０を代入
			var s_average = 0;
			var g_average = 0;
			var p_average = 0;
			var b_average = 0;
		}
		//値の出力
		$("#silverAve").val(s_average);
		$("#goldAve").val(g_average);
		$("#platinumAve").val(p_average);
		$("#blackAve").val(b_average);
		$("#allNum").val(allNum);

	}
	//シルバーユニットの召喚
	var silverCalc = function() {
		// 値の入力
		var crystal = $("#crystal").val()*1;
		crystal = crystalLimitCheck(crystal);
		var allCrystal = $("#allCrystal").val()*1+crystal;
		var silver = $("#silver").val()*1;
		silver = unitLimitCheck(silver);
		var silverNum = $("#silverNum").val()*1+silver;
		var goldNum = $("#goldNum").val()*1;
		var platinumNum = $("#platinumNum").val()*1;
		var blackNum = $("#blackNum").val()*1;
		var allNum = $("#allNum").val()*1+1;

		// 値の計算
		averageCalc(allNum,silverNum,goldNum,platinumNum,blackNum);
		oikuramanen(allCrystal);
		// 値の出力
		$("#silverNum").val(silverNum);
		$("#allCrystal").val(allCrystal);

		//Storageに呼び出したレアリティを保存する
		saveStorage("銀");
	};
	//ゴールドユニットの召喚
	var goldCalc = function(){
		var crystal = $("#crystal").val()*1;
		crystal = crystalLimitCheck(crystal);
		var allCrystal = $("#allCrystal").val()*1+crystal;
		var gold = $("#gold").val()*1;
		gold = unitLimitCheck(gold);
		var silverNum = $("#silverNum").val()*1;
		var goldNum = $("#goldNum").val()*1+gold;
		var platinumNum = $("#platinumNum").val()*1;
		var blackNum = $("#blackNum").val()*1;
		var allNum = $("#allNum").val()*1+1;

		// 値の計算
		averageCalc(allNum,silverNum,goldNum,platinumNum,blackNum);
		oikuramanen(allCrystal);

		// 値の出力
		$("#goldNum").val(goldNum);
		$("#allCrystal").val(allCrystal);

		saveStorage("金");
	};
	//プラチナユニットの召喚
	var platinumCalc = function(){
		var crystal = $("#crystal").val()*1;
		crystal = crystalLimitCheck(crystal);
		var allCrystal = $("#allCrystal").val()*1+crystal;
		var platinum = $("#platinum").val()*1;
		platinum = unitLimitCheck(platinum);
		var silverNum = $("#silverNum").val()*1;
		var goldNum = $("#goldNum").val()*1;
		var platinumNum = $("#platinumNum").val()*1+platinum;
		var blackNum = $("#blackNum").val()*1;
		var allNum = $("#allNum").val()*1+1;

		// 値の計算
		averageCalc(allNum,silverNum,goldNum,platinumNum,blackNum);
		oikuramanen(allCrystal);
		// 値の出力
		$("#platinumNum").val(platinumNum);
		$("#allCrystal").val(allCrystal);

		saveStorage("白");
	};
	//ブラックユニットの召喚
	var blackCalc = function(){
		var crystal = $("#crystal").val()*1;
		crystal = crystalLimitCheck(crystal);
		var allCrystal = $("#allCrystal").val()*1+crystal;
		var black = $("#black").val()*1;
		black = unitLimitCheck(black);
		var silverNum = $("#silverNum").val()*1;
		var goldNum = $("#goldNum").val()*1;
		var platinumNum = $("#platinumNum").val()*1;
		var blackNum = $("#blackNum").val()*1+black;
		var allNum = $("#allNum").val()*1+1;

		// 値の計算
		averageCalc(allNum,silverNum,goldNum,platinumNum,blackNum);
		oikuramanen(allCrystal);
		// 値の出力
		$("#blackNum").val(blackNum);
		$("#allCrystal").val(allCrystal);

		saveStorage("黒");
	};
	//排出数からレアリティの確率を計算する
	var allChecker = function(){
		var silverNum = $("#silverNum").val()*1;
		var goldNum = $("#goldNum").val()*1;
		var platinumNum = $("#platinumNum").val()*1;
		var blackNum = $("#blackNum").val()*1;


		// 値の計算
		var allNum = silverNum+goldNum+platinumNum+blackNum;
		averageCalc(allNum,silverNum,goldNum,platinumNum,blackNum);
		oikuramanen(allCrystal);
		//使用した結晶の数を計算　基本５
		var allCrystal = allNum *5;
		//値の出力
		$("#allCrystal").val(allCrystal);
	};
	//Storegeの中身を出力
	var realytyForm = function(){
		//表示位置取得
		var list = $("#list");
		//前回のデータを削除
		list.children().remove();
		var key, value, html = [];

		for(var i=0, len=sessionStorage.length; i<len; i++) {
			//ストレージのi番目のkeyを取得
			key = sessionStorage.key("aigis",i);
			//keyに対応したデータを取得
			value = sessionStorage.getItem("aigis",key);
			//配列に追加
			html.push($("<div>").html(value));

		}
		//配列に書き出し
		list.append(html);
		//ユニット画像の読み込み(xml)
		//loadImages();
		//ユニット画像の読み込み(Storage)
		//loadStorageImages();
	};
	//初期化
	var refresh = function(){
		//Storageのリセット
		sessionStorage.clear();
		var list = $("#list");
		list.children().remove();
		//xmlのリセット
	};
	//表を初期化する
	var reset = function(){
		$("#allNum").val(0);
		$("#allCrystal").val(0);
		$("#silverNum").val(0);
		$("#goldNum").val(0);
		$("#platinumNum").val(0);
		$("#blackNum").val(0);
		$("#silverAve").val(0);
		$("#goldAve").val(0);
		$("#platinumAve").val(0);
		$("#blackAve").val(0);
	}
	// ボタンにイベントを追加
	$("#callSilver").click(silverCalc);
	$("#callGold").click(goldCalc);
	$("#callPlatinum").click(platinumCalc);
	$("#callBlack").click(blackCalc);
	$("#reCalc").click(allChecker);
	$("#check").click(realytyForm);
	$("#refresh").click(refresh);
	$("#reset").click(reset);
});
