import { banana } from './banana';
import { THREE } from 'three';





const addSpriteMap = obj => {
	let x = obj.position.x;
	let z = obj.position.z;

	var geo = new THREE.Geometry();
	var mat = new THREE.MeshBasicMaterial({color:0xffffff});

	var vector = new THREE.Vector3(x,z,-1);
	geo.vertices.push(vector);

	var mesh = new THREE.Mesh()


};

var gameServer = {
	addSpriteMap:addSpriteMap
};
export {gameServer};
