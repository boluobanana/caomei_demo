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

widgetInit();

function widgetInit () {
	//var layer = new Layer(canvas);
	var sprite = new LittleSprite(canvas);
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	//layer.createLayer();
	sprite.createLittleSprite(0,0,-10);
	var i = 100;
	while(i--){
		sprite.createLittleSprite(rand(), rand(), -3);
	}

	new Dat();
	console.log(222);

	function rand(){
		var r = Math.random() - 0.5;
		return r * 100;
	}


}



function render (){
	canvas.render(canvas);
	requestAnimationFrame(render);
}

console.log(canvas);

render();