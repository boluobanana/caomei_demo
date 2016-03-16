import { banana } from '../banana';
import { THREE } from 'three';

import { Dat } from './ConGui';


class Layer{

	constructor(canvas){

		Layer.planes = [];


		Layer.controls();

	}
	createLayer (canvas) {

		let scene = canvas.scene;
		let camera = canvas.camera;

		let geo = new LayerPlane(10, 5);
		let mat = new THREE.MeshBasicMaterial({color:0x2ff000});
		let plane = Layer.plane =  new THREE.Mesh(geo,mat);
		let posX = -30 ,posY = 10 ,cor = 6, len = Layer.planes.length;
		posX += Math.floor(len%cor) * 11;
		posY += Math.floor(len/cor) * 6;

		plane.position.set(posX,posY,0);

		plane.name = 'layer' + Layer.planes.length;
		Layer.planes.push(plane);
		scene.add(plane);
	}
	static controls () {

		banana.subscribe('Controls', function (controls) {
			controls.positionX = 0;



		});

		Layer.gui();
	}

	static gui () {

		banana.subscribe('Gui', function (gui, controls) {
			var posX = gui.add(controls, 'positionX', -60,60);
			posX.listen();
			posX.onChange(function (value) {
				Layer.plane.position.x = controls.positionX;
			})
		})
	}
}


class LayerPlane extends THREE.PlaneGeometry{

	constructor (width,height,widthSegments,heightSegments){

		super (width,height,widthSegments,heightSegments);

	}

}


export { Layer };