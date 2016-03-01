banana.canvas = {};

class canvas {

	constructor(){
		var scene = new THREE.scene();
		var camera = new THREE.PerspectiveCamera(45 , window.innerWidth/window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WebGLRenderer();



		renderer.setClearColor(0xffffff);
		renderer.setSize(window.innerWidth, window.innerHeight);

		var light = new THREE.AmbientLight(0xcccccc);
		var axes = new THREE.AxisHelper( 20 );
		scene.add(light);
		scene.add(axes);

		var plane = new THREE.Mesh(new THREE.PlaneGeometry(60,60), new THREE.MeshBasicMaterial({color:0x000000}));
		plane.setPosition(new THREE.Vector3( 0, 0, -6 ));
		scene.add(plane);

		document.querySelector('#containe').appendChild(renderer.domElement);
		renderer.render(scene, camera);

	}
}

export { canvas };



