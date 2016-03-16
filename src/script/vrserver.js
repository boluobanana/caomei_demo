import { THREE } from 'three';
import { banana } from './banana';
banana.canvas = {};

class scene {

	constructor(){

		this.scene = new THREE.Scene();
		this.scene.name = 'mainScene';
		this.camera = new THREE.PerspectiveCamera(45 , window.innerWidth/window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();



		this.renderer.setClearColor(0x000000);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		var light = new THREE.AmbientLight(0xcccccc);
		var axes = new THREE.AxisHelper( 20 );
		this.scene.add(light);
		this.scene.add(axes);

		var plane = new THREE.Mesh(new THREE.PlaneGeometry(60,60), new THREE.MeshBasicMaterial({color:0xffffff}));
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;

		plane.name = 'plane';

		this.camera.position.x = 0;
		this.camera.position.y = 40;
		this.camera.position.z = 80;
		this.camera.lookAt(this.scene.position);

		this.scene.add(plane);


		banana.publish('init');
		document.querySelector('#containe').appendChild(this.renderer.domElement);

	}
	render(canvas){
		canvas.renderer.render(canvas.scene, canvas.camera);
		banana.publish('animate');
	}
}



export { scene };



