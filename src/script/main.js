import { THREE } from "three";
import {banana} from "./banana";
import { vrserver } from "./vrserver"
import { Layer } from './wiget/Layer';
import { Dat } from './wiget/ConGui'
import { LittleSprite } from './wiget/LittleSprite'

banana.subscribe('pp', function ( event ) {

});
//banana.publish('pp');

var canvas = new vrserver();
banana.canvas = canvas;
widgetInit();

function widgetInit () {
	//var layer = new Layer(canvas);
	var sprite = new LittleSprite(canvas);
	//layer.createLayer();

	var t = banana.ajax({
		url:'src/script/data/chapter1.json'
	}).done(function (data){
		console.log(JSON.parse(data));
	});
	sprite.createLittleSprite(0,0,-10);
	var i = 100;
	while(i--){
		sprite.createLittleSprite(rand(), rand(), rand());
	}
	new Dat();
	console.log(1);
	function rand(){
		var r = Math.random() - 0.5;
		return r * 100;
	}


}



//function render (){
//	canvas.render(canvas);
//	requestAnimationFrame(render);
//}


//render();