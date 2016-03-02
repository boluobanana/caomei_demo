import { THREE } from "three";
import {banana} from "./banana";
import { scene } from "./vrserver"

banana.subscribe('pp', function ( event ) {

	console.log('ppppppppppppppppppp');
})
//banana.publish('pp');

var canvas = new scene();

function render (){
	//canvas.render(canvas);
	requestAnimationFrame(render);
	console.log(1);
}
render();