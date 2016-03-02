import { THREE } from 'three';
console.log(THREE);
banana.canvas = {};

class scene {

	constructor(){
		console.log('canvas')
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45 , window.innerWidth/window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();



		this.renderer.setClearColor(0xffffff);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		var light = new THREE.AmbientLight(0xcccccc);
		var axes = new THREE.AxisHelper( 20 );
		this.scene.add(light);
		this.scene.add(axes);

		var plane = new THREE.Mesh(new THREE.PlaneGeometry(60,60), new THREE.MeshBasicMaterial({color:0x000000}));
		plane.y = -10;
		this.scene.add(plane);


		document.querySelector('#containe').appendChild(this.renderer.domElement);

	}
	render(canvas){
		console.log('scene1');
		canvas.renderer.render(canvas.scene, canvas.camera);

	}
}


var scene2 = function () {

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45 , window.innerWidth/window.innerHeight, 0.1, 1000);
	this.renderer = new THREE.WebGLRenderer();



	this.renderer.setClearColor(0xffffff);
	this.renderer.setSize(window.innerWidth, window.innerHeight);

	var light = new THREE.AmbientLight(0xcccccc);
	var axes = new THREE.AxisHelper( 20 );
	this.scene.add(light);
	this.scene.add(axes);

	var plane = new THREE.Mesh(new THREE.PlaneGeometry(60,60), new THREE.MeshBasicMaterial({color:0x000000}));
	plane.y = -10;
	this.scene.add(plane);


	document.querySelector('#containe').appendChild(this.renderer.domElement);
}

scene2.prototype.render = function (canvas) {
	canvas.renderer.render(canvas.scene, canvas.camera);
}

export { scene ,scene2 };



