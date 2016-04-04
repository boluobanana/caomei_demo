import {banana} from './banana';
import {THREE} from 'three';
import TWEEN from '../libs/Tween';
import {shaderTest} from './test/shader';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.set(0,40,-30);
camera.lookAt(scene);

document.querySelector( '#containe' ).appendChild( renderer.domElement );
var g = new THREE.CircleGeometry( 4, 16 );
var m = new THREE.MeshBasicMaterial({color: 0x114949});
//scene.add( circle );

var shaderMaterial =
	new THREE.ShaderMaterial({
		vertexShader:   shaderTest.vertexShaderLight,
		fragmentShader: shaderTest.fragmentShaderLight
	});


var radius = 50, segments = 16, rings = 16;

// create a new mesh with sphere geometry -
// we will cover the sphereMaterial next!
window.sphere = new THREE.Mesh(
	new THREE.SphereGeometry(radius, segments, rings),
	shaderMaterial);
	sphere.position.z = -400;
scene.add(sphere);


console.log(1111);

window.addEventListener('click', function(){
	//ringAnimate.start();

});


var update = function() {
	//circle.position.x += 0.01;
	//line.geometry.vertices[0].x = circle.position.x;
	//circle.position.x += 0.01;
	//line.geometry.vertices[ 0 ].x = circle.position.x;
	//line.geometry.verticesNeedUpdate = true;
};


var render = function() {
	renderer.render(scene, camera);
};

var loop = function() {
	TWEEN.update();
	update();
	render();
	requestAnimationFrame(loop, renderer.canvas);
};
loop();