import { banana } from '../banana';
import { THREE } from 'three';

function BgController(scene) {

	var geometry = new THREE.SphereBufferGeometry(999, 60, 40 );
	geometry.scale( - 1, 1, 1 );

	var texture = new THREE.TextureLoader().load( "./src/assets/imgs/pano_sphere.jpg" );

	var material   = new THREE.MeshBasicMaterial( { map : texture } );

	var mesh = new THREE.Mesh( geometry, material );

	scene.add(mesh);

}

export { BgController };

