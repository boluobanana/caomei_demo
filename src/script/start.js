import {THREE} from 'three';
import '../libs/GeometryUtils'

var group = new THREE.Group(),
	group2 = new THREE.Group(),
	group3 = new THREE.Group(),
	textMesh1;

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
	group.position.set(0,-30,-90);
	group.rotation.set(0.3,0,0);
	group.scale.set(1.5,1.5,1.5);

	group2.position.set(-20,-40,-90);
	//group2.rotation.set(0.3,0,0);
	//group2.scale.set(0.5,0.5,0.5);

	group3.position.set(20,-40,-90);
	//group3.rotation.set(0.3,0,0);
	//group3.scale.set(0.5,0.5,0.5);


	banana.canvas.scene.add(group);
	banana.canvas.scene.add(group2);
	banana.canvas.scene.add(group3);
	loadFont();

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

	group.add( textMesh1 );
}
function loadFont() {

	var loader = new THREE.FontLoader();
	loader.load( 'src/script/font/' + fontName + '_' + fontWeight + '.typeface.js', function ( response ) {

		font = response;
		createText('Welcome VR Game', group, 0xFF9800, 0xC41212);
		createText('Start Game', group2, 0xFF9800, 0xC41212);
		createText('Continue ', group3, 0xFF9800, 0xC41212);

	} );

}

export { start } ;
