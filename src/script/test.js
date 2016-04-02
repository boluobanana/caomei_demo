import {banana} from './banana';
import {THREE} from 'three';
import TWEEN from '../libs/Tween';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.set(0,40,-30);
camera.lookAt(scene);

document.querySelector( '#containe' ).appendChild( renderer.domElement );
var g = new THREE.CircleGeometry( 4, 16 );
var m = new THREE.MeshBasicMaterial({color: 0x114949});
var circle = new THREE.Mesh( g, m );

circle.position.x = 2;
circle.position.y = 2;
circle.position.z = -1;
//scene.add( circle );

var material = new THREE.LineBasicMaterial({color: 0xDF4949, linewidth: 5});

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(1, 1, 0));
geometry.verticesNeedUpdate = true;
geometry.dynamic = true;

var line = new THREE.Line(geometry, material);
scene.add(line);

var t = new THREE.RingGeometry( 10, 20, 20, 20, 0, 3 );
var ring = new THREE.Mesh( new THREE.RingGeometry( 10, 20, 20, 20, 0, 6.3 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
var group = new THREE.Group();
group.add(ring);

scene.add(group);
//ring.geometry.vertices = t.vertices;
console.log(ring.geometry);
//ring.verticesNeedUpdate = true;

ring.position.z = -60;

var ringAnimate = banana.makeAnimate({
	from:{x:0},
	to:{x:1},
	duration:1000
}, function () {
	var c = new THREE.Color(1,this.x,0);
	ring.material.color = c;
	ring.geometry.vertices = t.vertices;
	ring.geometry.verticesNeedUpdate = true;

	console.log(123123);
});



window.addEventListener('click', function(){
	//ringAnimate.start();

	ring.geometry._bufferGeometry.attributes.position.dynamic = true;
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