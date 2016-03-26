import { THREE } from "three";
import {banana} from "./banana";
import { vrserver } from "./vrserver"
import { Layer } from './wiget/Layer';
import { Dat } from './wiget/ConGui'
import { LittleSprite } from './wiget/LittleSprite'

banana.subscribe( 'pp', function ( event ) {

} );
//banana.publish('pp');

var canvas = new vrserver();
banana.canvas = canvas;

widgetInit();

function widgetInit() {
	//var layer = new Layer(canvas);
	var sprite = new LittleSprite( canvas );
	//layer.createLayer();
	let rend = ( r = 100 )=>r * (Math.random() - 0.5);

	var t = banana.ajax( {
		url: 'src/script/data/chapter1.json'
	} ).done( function ( data ) {
		console.log('from ajax' + JSON.parse( data ) );
	} );
	for (var x = -5; x < 5; x++) {
		for (var y = -5; y < 5; y++) {
			sprite.createLittleSprite( x * 10, y * 10, -100 );

		}
	}
	new Dat();
}


function render() {
	canvas.render();
	requestAnimationFrame( render );
}


render();