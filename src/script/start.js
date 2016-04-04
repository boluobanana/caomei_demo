import {THREE} from 'three';
import {banana} from './banana';
import '../libs/GeometryUtils'
import { Sprite } from './wiget/Sprite';
import TWEEN from '../libs/Tween';
import {chapter1} from './chapter1'

window.THREE = THREE;

var group = new THREE.Group(),
	startGroup = new THREE.Group(),
	continueGroup = new THREE.Group(),
	firstSprite;

var text = 'Welcome VR Game',
	height = 2,
	size = 2,
	hover = 30,
	curveSegments = 4,


	bevelThickness = 2,
	bevelSize = 1.5,
	bevelSegments = 3,
	bevelEnabled = true,

	font = undefined,

	fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
	fontWeight = "bold";


var start = function () {
	loadFont();

	group.position.set(0,-30,-90);
	group.rotation.set(0.3,0,0);
	group.scale.set(1.5,1.5,1.5);

	startGroup.position.set(-20,-40,-90);
	continueGroup.position.set(20,-40,-90);

	banana.canvas.scene.add(group);
	banana.canvas.scene.add(startGroup);
	banana.canvas.scene.add(continueGroup);

	var sprite = new Sprite();
	firstSprite = sprite.createSprite(5,true,1,0xffffff,0,0,0,-60);


};



function createText(text, group, color1, color2) {


	var textGeo = new THREE.TextGeometry( text, {

		font: font,

		size: size, height: height, curveSegments: curveSegments,

		bevelThickness: bevelThickness, bevelSize: bevelSize, bevelEnabled: bevelEnabled,

		material: 0, extrudeMaterial: 1

	} );

	textGeo.computeBoundingBox();
	textGeo.computeVertexNormals();

	var material = new THREE.MultiMaterial( [
		new THREE.MeshPhongMaterial( { color: color1, shading: THREE.FlatShading } ), // front
		new THREE.MeshPhongMaterial( { color: color2, shading: THREE.SmoothShading } ) // side
	] );

	// "fix" side normals by removing z-component of normals for side faces
	// (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

	if (true) {

		var triangleAreaHeuristics = 0.1 * ( height * size );

		for (var i = 0; i < textGeo.faces.length; i++) {

			var face = textGeo.faces[i];

			if (face.materialIndex == 1) {

				for (var j = 0; j < face.vertexNormals.length; j++) {

					face.vertexNormals[j].z = 0;
					face.vertexNormals[j].normalize();

				}

				var va = textGeo.vertices[face.a];
				var vb = textGeo.vertices[face.b];
				var vc = textGeo.vertices[face.c];

				var s = THREE.GeometryUtils.triangleArea( va, vb, vc );

				if (s > triangleAreaHeuristics) {

					for (var j = 0; j < face.vertexNormals.length; j++) {

						face.vertexNormals[j].copy( face.normal );

					}

				}

			}

		}

	}
	var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

	var textMesh1 = new THREE.Mesh( textGeo, material );

	textMesh1.position.x = centerOffset;
	textMesh1.position.y = hover;
	textMesh1.position.z = 0;

	textMesh1.rotation.x = 0;
	textMesh1.rotation.y = Math.PI * 2;

	banana.canBeChoseObjs.push(textMesh1);
	group.add( textMesh1 );
	return textMesh1;
}
function loadFont() {

	var loader = new THREE.FontLoader();
	loader.load( 'src/script/font/' + fontName + '_' + fontWeight + '.typeface.js', function ( response ) {

		font = response;
		var welcome = createText('Welcome VR Game', group, 0xFF9800, 0xC41212);
		var startBtn = createText('Start Game', startGroup, 0xFF9800, 0xC41212);
		var continueBtn = createText('Continue ', continueGroup, 0xFF9800, 0xC41212);
		startBtn.name = "startBtn";
		const hoverAction = ele => {
			banana.makeAnimate({
				from:{x:1},
				to:{x:1.4},
				duration:200
			},function(){
				ele.scale.set(this.x,this.x,this.x);
			}).start();
		};
		const outAction = ele => {
			banana.makeAnimate({
				from:{x:1.4},
				to:{x:1},
				duration:200
			}, function () {
				ele.scale.set(this.x,this.x,this.x);
			}).start();
		};
		startBtn.onhover = ()=>{
			hoverAction(startBtn);
		};
		startBtn.onout = () => {
			outAction(startBtn);
		};
		startBtn.onclick = () =>{
			start.prototype.leave();
		};
		continueBtn.name = 'continueBtn';
		continueBtn.onhover = ()=>{
			hoverAction(continueBtn);
		};
		continueBtn.onout = () =>{
			outAction(continueBtn);
		};
		continueBtn.onclick =() =>{
			console.log('you click continue');
		}
	} );

}


start.prototype.leave = ()=>{

	banana.makeAnimate({
		from:{x:-90},
		to:{x:-900},
		duration:500,
		complete:()=>{
			banana.canvas.scene.remove(group);
			banana.canvas.scene.remove(startGroup);
			banana.canvas.scene.remove(continueGroup);

			var a = banana.makeAnimate({
				from:{x:1},to:{x:0},duration:2000
				,complete:()=>{
					chapter1.enter();
				}
			}, function () {
				firstSprite.material.opacity = this.x
			});
			a.easing(TWEEN.Easing.Bounce.InOut);
			a.start();
		}
	}, function () {

		group.position.z = this.x;
		startGroup.position.z = this.x;
		continueGroup.position.z = this.x;


	}).start();


};

export { start } ;
