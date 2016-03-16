import { THREE } from "three";
import {banana} from "./banana";
import { scene } from "./vrserver"
import { Layer } from './wiget/Layer';
import { Dat } from './wiget/ConGui'

banana.subscribe('pp', function ( event ) {

});
//banana.publish('pp');

var canvas = new scene();

widgetInit();

function widgetInit () {
	var layer = new Layer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	layer.createLayer(canvas);
	new Dat();
}



function render (){
	canvas.render(canvas);
	requestAnimationFrame(render);
}

console.log(canvas);

render();