import { THREE } from "three";
import {banana} from "./banana";
import { vrserver } from "./wiget/vrserver"
import { start } from  "./start";
import { LittleSprite } from './wiget/LittleSprite'

var canvas = new vrserver();
banana.canvas = canvas;
init();

function init() {
	widgetInit();
	start();
}



function widgetInit() {

	var sprite = new LittleSprite( canvas );
	sprite.createLittleSprite(0,0,-100);

	//for (var x = -5; x < 5; x++) {
	//	for (var y = -5; y < 5; y++) {
	//		sprite.createLittleSprite( x * 10, y * 10, -100 );
	//
	//	}
	//}

}

function render() {
	canvas.render();
	requestAnimationFrame( render );

}

render();