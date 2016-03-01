import { THREE } from "three";
import {banana} from "./banana";
import { canvas } from "./vrserver"

banana.subscribe('pp', function ( event ) {

	console.log('ppppppppppppppppppp');
})
//banana.publish('pp');

var canvas = new canvas();

console.log('test');


